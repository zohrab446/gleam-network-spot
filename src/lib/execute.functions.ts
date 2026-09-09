import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const RUNTIMES: Record<"cpp" | "java", { language: string; version: string; file: string }> = {
  cpp: { language: "c++", version: "10.2.0", file: "main.cpp" },
  java: { language: "java", version: "15.0.2", file: "Main.java" },
};

export type RemoteRunResult = {
  stdout: string;
  stderr: string;
  compileError: string;
  ok: boolean;
};

/** C++ ve Java kodunu ücretsiz Piston derleyicisinde çalıştırır. */
export const executeRemote = createServerFn({ method: "POST" })
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
    // Ana dosya ilk sırada olmalı
    const files = [...data.files].sort((a, b) =>
      a.name === runtime.file ? -1 : b.name === runtime.file ? 1 : 0,
    );

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);
    try {
      const res = await fetch(PISTON_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files,
          stdin: data.stdin ?? "",
          compile_timeout: 10_000,
          run_timeout: 5_000,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[piston] http", res.status, text.slice(0, 300));
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
      const json = (await res.json()) as {
        compile?: { stdout?: string; stderr?: string; code?: number | null };
        run?: { stdout?: string; stderr?: string; code?: number | null };
      };
      const compileError = json.compile && json.compile.code !== 0 ? (json.compile.stderr || json.compile.stdout || "") : "";
      return {
        stdout: json.run?.stdout ?? "",
        stderr: json.run?.stderr ?? "",
        compileError,
        ok: !compileError && (json.run?.code ?? 0) === 0,
      };
    } catch (err) {
      console.error("[piston] error", err);
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
