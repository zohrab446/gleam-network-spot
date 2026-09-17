import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const WANDBOX_URL = "https://wandbox.org/api/compile.json";

const RUNTIMES: Record<"cpp" | "java", { compiler: string; file: string; options?: string }> = {
  cpp: { compiler: "gcc-head", file: "main.cpp", options: "warning,gnu++2b" },
  java: { compiler: "openjdk-jdk-21+35", file: "Main.java" },
};

/** Java'da wandbox ana dosyayı prog.java olarak yazar; sınıf adı uyuşmazlığını launcher ile çözüyoruz. */
const JAVA_LAUNCHER = "public class prog { public static void main(String[] a) throws Exception { Main.main(a); } }";

export type RemoteRunResult = {
  stdout: string;
  stderr: string;
  compileError: string;
  ok: boolean;
};

type WandboxResponse = {
  status?: string;
  compiler_error?: string;
  compiler_output?: string;
  program_output?: string;
  program_error?: string;
};

/** C++ ve Java kodunu ücretsiz uzak derleyicide çalıştırır. */
export const executeRemote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({
        language: z.enum(["cpp", "java"]),
        files: z.array(z.object({ name: z.string().max(64), content: z.string().max(40_000) })).min(1).max(4),
        stdin: z.string().max(4_000).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<RemoteRunResult> => {
    const runtime = RUNTIMES[data.language];
    const mainFile = data.files.find((f) => f.name === runtime.file) ?? data.files[0]!;
    const extras = data.files.filter((f) => f !== mainFile);

    let body: Record<string, unknown>;
    if (data.language === "java") {
      const codes = [{ file: runtime.file, code: mainFile.content }, ...extras.map((f) => ({ file: f.name, code: f.content }))];
      body = {
        compiler: runtime.compiler,
        code: JAVA_LAUNCHER,
        codes,
        stdin: data.stdin ?? "",
        "compiler-option-raw": codes.map((c) => c.file).join("\n"),
      };
    } else {
      body = {
        compiler: runtime.compiler,
        code: mainFile.content,
        codes: extras.map((f) => ({ file: f.name, code: f.content })),
        stdin: data.stdin ?? "",
        options: runtime.options,
      };
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25_000);
    try {
      const res = await fetch(WANDBOX_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[wandbox] http", res.status, text.slice(0, 300));
        return {
          stdout: "",
          stderr: "",
          compileError:
            res.status === 429
              ? "Derleyici şu an yoğun. Birkaç saniye sonra tekrar dene."
              : "Uzak derleyiciye ulaşılamadı. Biraz sonra tekrar dene.",
          ok: false,
        };
      }
      const json = (await res.json()) as WandboxResponse;
      const rawCompileError = json.compiler_error || "";
      const compileError = normalizeJavaPaths(rawCompileError.trim() && json.status !== "0" ? rawCompileError : "");
      const exitOk = json.status === "0";
      return {
        stdout: json.program_output ?? "",
        stderr: normalizeJavaPaths(json.program_error ?? ""),
        compileError,
        ok: !compileError && exitOk,
      };
    } catch (err) {
      console.error("[wandbox] error", err);
      return {
        stdout: "",
        stderr: "",
        compileError: "Derleme zaman aşımına uğradı veya derleyiciye ulaşılamadı.",
        ok: false,
      };
    } finally {
      clearTimeout(timer);
    }
  });

/** Derleyici mesajlarındaki geçici dosya yollarını temizler. */
function normalizeJavaPaths(text: string): string {
  return text.replace(/\/[^\s:]*\/(prog|Main)\.(java|cpp)/g, "$1.$2").replace(/\bprog\.java\b/g, "Main.java");
}
