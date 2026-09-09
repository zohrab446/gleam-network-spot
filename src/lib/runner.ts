import type { Lesson, LessonCheck, TrackId } from "@/data/types";
import { editableFile } from "@/data/lessons";

export type Files = Record<string, string>;

export type ConnectionStatus = {
  ok: boolean;
  /** HTML'e bağlı olmayan dosya adları */
  missing: string[];
  /** Bu derste bağlantı kontrolü gerekli mi */
  applicable: boolean;
};

export type RunResult = {
  logs: string[];
  error: string | null;
  /** Web trackleri için önizleme belgesi */
  previewHtml: string | null;
  connection: ConnectionStatus;
};

export type CheckResult = { label: string; passed: boolean };

export type Runner = {
  /** C++/Java için uzak çalıştırıcı (server function) */
  remote?: (input: { language: "cpp" | "java"; files: { name: string; content: string }[]; stdin?: string }) => Promise<{
    stdout: string;
    stderr: string;
    compileError: string;
    ok: boolean;
  }>;
};

export function filesToRecord(lesson: Lesson): Files {
  return Object.fromEntries(lesson.files.map((f) => [f.name, f.content]));
}

// ---------------------------------------------------------------------------
// Bağlantı doğrulama
// ---------------------------------------------------------------------------

const LINK_RE = /<link\b[^>]*href\s*=\s*["']\.?\/?style\.css["'][^>]*>/i;
const SCRIPT_RE = /<script\b[^>]*src\s*=\s*["']\.?\/?script\.js["'][^>]*>\s*<\/script>/i;
const BABEL_RE = /<script\b[^>]*src\s*=\s*["']\.?\/?App\.jsx["'][^>]*>\s*<\/script>/i;

export function checkConnections(lesson: Lesson, files: Files): ConnectionStatus {
  const html = files["index.html"];
  if (html === undefined) return { ok: true, missing: [], applicable: false };
  const missing: string[] = [];
  let applicable = false;
  if ("style.css" in files) {
    applicable = true;
    if (!LINK_RE.test(html) || !/rel\s*=\s*["']stylesheet["']/i.test(html.match(LINK_RE)?.[0] ?? "")) {
      missing.push("style.css");
    }
  }
  if ("script.js" in files) {
    applicable = true;
    if (!SCRIPT_RE.test(html)) missing.push("script.js");
  }
  if (lesson.language === "react" && "App.jsx" in files) {
    applicable = true;
    if (!BABEL_RE.test(html)) missing.push("App.jsx");
  }
  return { ok: missing.length === 0, missing, applicable };
}

export function connectionMessage(status: ConnectionStatus): string {
  if (status.ok) return "Bağlantılar Aktif (HTML ↔ CSS ↔ JS)";
  const first = status.missing[0]!;
  if (first === "style.css")
    return "Bağlantı Eksik: style.css dosyası HTML içinde <link> etiketiyle bağlanmamış!";
  if (first === "script.js")
    return "Bağlantı Eksik: script.js dosyası HTML içinde <script src=\"...\"> etiketiyle bağlanmamış!";
  return `Bağlantı Eksik: ${first} HTML'e bağlı değil!`;
}

// ---------------------------------------------------------------------------
// Web belgesi oluşturma
// ---------------------------------------------------------------------------

const CAPTURE_SCRIPT = `<script>
(function(){
  window.__logs = []; window.__error = null;
  var fmt = function(v){ try { if (typeof v === "string") return v; if (v instanceof Element) return v.outerHTML; return JSON.stringify(v); } catch(e){ return String(v); } };
  var push = function(args){ var line = Array.prototype.map.call(args, fmt).join(" "); window.__logs.push(line); try { parent.postMessage({ type: "cq-log", line: line }, "*"); } catch(e){} };
  ["log","info","warn","debug"].forEach(function(k){ console[k] = function(){ push(arguments); }; });
  console.error = function(){ push(arguments); };
  window.onerror = function(msg){ window.__error = String(msg); try { parent.postMessage({ type: "cq-error", message: String(msg) }, "*"); } catch(e){} };
  window.addEventListener("unhandledrejection", function(e){ var m = e.reason && e.reason.message ? e.reason.message : String(e.reason); window.__error = m; try { parent.postMessage({ type: "cq-error", message: m }, "*"); } catch(e2){} });
})();
<\/script>`;

const REACT_CDN = `
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
<script src="https://unpkg.com/@babel/standalone@7/babel.min.js"><\/script>`;

function escapeScript(code: string) {
  return code.replace(/<\/script>/gi, "<\\/script>");
}

function injectIntoHead(html: string, snippet: string): string {
  if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, (m) => `${m}\n${snippet}`);
  if (/<html[^>]*>/i.test(html)) return html.replace(/<html[^>]*>/i, (m) => `${m}\n<head>${snippet}</head>`);
  return `${snippet}\n${html}`;
}

/** index.html + diğer dosyaları tek bir çalıştırılabilir belgeye dönüştürür. */
export function buildWebDocument(lesson: Lesson, files: Files): string {
  let html = files["index.html"] ?? "<!DOCTYPE html><html><head></head><body></body></html>";
  const css = files["style.css"];
  const js = files["script.js"];
  const jsx = files["App.jsx"];

  if (css !== undefined) html = html.replace(LINK_RE, () => `<style>\n${css}\n</style>`);
  if (js !== undefined) html = html.replace(SCRIPT_RE, () => `<script>\n${escapeScript(js)}\n</script>`);
  if (lesson.language === "react" && jsx !== undefined) {
    html = html.replace(BABEL_RE, () => `<script type="text/babel" data-presets="react">\n${escapeScript(jsx)}\n</script>`);
    html = injectIntoHead(html, REACT_CDN);
  }
  html = injectIntoHead(html, CAPTURE_SCRIPT);
  return html;
}

type WebRun = { logs: string[]; error: string | null; doc: Document | null; win: Window | null; dispose: () => void };

/** Belgeyi gizli bir iframe'de çalıştırır; DOM ve loglara erişim verir. */
function runWebDocument(html: string, opts: { waitMs: number; waitFor?: string; maxWaitMs?: number }): Promise<WebRun> {
  if (typeof document === "undefined") {
    return Promise.resolve({ logs: [], error: null, doc: null, win: null, dispose: () => {} });
  }
  const iframe = document.createElement("iframe");
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
  iframe.setAttribute("aria-hidden", "true");
  Object.assign(iframe.style, { position: "fixed", left: "-9999px", width: "800px", height: "600px", border: "0", opacity: "0" });

  return new Promise<WebRun>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      let logs: string[] = [];
      let error: string | null = null;
      let doc: Document | null = null;
      let win: Window | null = null;
      try {
        win = iframe.contentWindow;
        const w = win as (Window & { __logs?: string[]; __error?: string | null }) | null;
        logs = [...(w?.__logs ?? [])];
        error = w?.__error ?? null;
        doc = iframe.contentDocument;
      } catch {
        error = "Kod çalıştırılamadı.";
      }
      resolve({ logs, error, doc, win, dispose: () => iframe.remove() });
    };

    iframe.onload = () => {
      const started = Date.now();
      const tick = () => {
        if (opts.waitFor) {
          const el = iframe.contentDocument?.querySelector(opts.waitFor);
          const hasChildren = !!el && el.childNodes.length > 0;
          const w = iframe.contentWindow as (Window & { __error?: string | null }) | null;
          if (hasChildren || w?.__error || Date.now() - started > (opts.maxWaitMs ?? 8000)) {
            window.setTimeout(finish, opts.waitMs);
            return;
          }
          window.setTimeout(tick, 100);
          return;
        }
        window.setTimeout(finish, opts.waitMs);
      };
      tick();
    };
    document.body.appendChild(iframe);
    iframe.srcdoc = html;
    window.setTimeout(finish, (opts.maxWaitMs ?? 8000) + opts.waitMs + 500);
  });
}

// ---------------------------------------------------------------------------
// Çalıştırma
// ---------------------------------------------------------------------------

function webWaitOptions(track: TrackId) {
  if (track === "react") return { waitMs: 700, waitFor: "#root", maxWaitMs: 9000 };
  if (track === "javascript") return { waitMs: 1300 };
  return { waitMs: 150 };
}

async function runWeb(lesson: Lesson, files: Files): Promise<{ run: RunResult; web: WebRun | null }> {
  const connection = checkConnections(lesson, files);
  const html = buildWebDocument(lesson, files);
  const web = await runWebDocument(html, webWaitOptions(lesson.language));
  const logs = [...web.logs];
  if (lesson.language === "html" || lesson.language === "css") logs.unshift("Önizleme hazır.");
  return { run: { logs, error: web.error, previewHtml: html, connection }, web };
}

async function runPythonLesson(lesson: Lesson, files: Files): Promise<RunResult> {
  const { runPython, loadPyodideRuntime } = await import("./pyodide");
  const py = await loadPyodideRuntime();
  // helper.py / data.json gibi ek dosyaları sanal dosya sistemine yaz
  for (const [name, content] of Object.entries(files)) {
    if (name === "main.py") continue;
    try {
      (py as unknown as { FS: { writeFile: (p: string, d: string) => void } }).FS.writeFile(`/home/pyodide/${name}`, content);
    } catch {
      /* yoksay */
    }
  }
  const { logs, error } = await runPython(files["main.py"] ?? "", lesson.stdin ?? []);
  return { logs, error, previewHtml: null, connection: { ok: true, missing: [], applicable: false } };
}

async function runRemoteLesson(lesson: Lesson, files: Files, runner: Runner): Promise<RunResult> {
  if (!runner.remote) {
    return {
      logs: [],
      error: "Uzak derleyici yapılandırılmamış.",
      previewHtml: null,
      connection: { ok: true, missing: [], applicable: false },
    };
  }
  const result = await runner.remote({
    language: lesson.language as "cpp" | "java",
    files: Object.entries(files).map(([name, content]) => ({ name, content })),
    stdin: (lesson.stdin ?? []).join("\n"),
  });
  const logs = result.stdout.split("\n");
  if (logs.length && logs[logs.length - 1] === "") logs.pop();
  const error = result.compileError || (result.stderr ? result.stderr.trim() : null) || null;
  return { logs, error, previewHtml: null, connection: { ok: true, missing: [], applicable: false } };
}

/** "Kodu çalıştır" — çıktı ve önizleme üretir, test yapmaz. */
export async function runCode(lesson: Lesson, files: Files, runner: Runner = {}): Promise<RunResult> {
  if (lesson.language === "python") return runPythonLesson(lesson, files);
  if (lesson.language === "cpp" || lesson.language === "java") return runRemoteLesson(lesson, files, runner);
  const { run, web } = await runWeb(lesson, files);
  web?.dispose();
  return run;
}

// ---------------------------------------------------------------------------
// Kontroller
// ---------------------------------------------------------------------------

function normalizeColor(value: string): string {
  const v = value.trim().toLowerCase();
  if (v.startsWith("#")) {
    let hex = v.slice(1);
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    if (hex.length === 6) {
      const n = parseInt(hex, 16);
      return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
    }
  }
  return v.replace(/\s+/g, " ").replace(/rgba\((\d+), (\d+), (\d+), 1\)/, "rgb($1, $2, $3)");
}

function styleMatches(actual: string, expected: string): boolean {
  const a = normalizeColor(actual);
  const e = normalizeColor(expected);
  if (a === e) return true;
  // "700" vs "bold"
  if ((e === "bold" && a === "700") || (e === "700" && a === "bold")) return true;
  return a.includes(e);
}

function checkOne(check: LessonCheck, lesson: Lesson, files: Files, logs: string[], web: WebRun | null): boolean {
  const main = editableFile(lesson).name;
  const fileOf = (name?: string) => files[name ?? main] ?? "";
  const output = logs.join("\n");

  switch (check.type) {
    case "includes":
      return fileOf(check.file).toLowerCase().includes(check.value.toLowerCase());
    case "not-includes":
      return !fileOf(check.file).toLowerCase().includes(check.value.toLowerCase());
    case "regex":
      try {
        return new RegExp(check.value, "is").test(fileOf(check.file));
      } catch {
        return false;
      }
    case "output":
      return output.toLowerCase().includes(check.value.toLowerCase());
    case "output-exact": {
      const norm = (s: string) =>
        s
          .split("\n")
          .map((l) => l.replace(/\s+$/, ""))
          .filter((l, i, arr) => !(l === "" && i === arr.length - 1))
          .join("\n")
          .trim();
      return norm(output) === norm(check.value);
    }
    case "dom": {
      const doc = web?.doc;
      if (!doc) return false;
      let nodes: Element[];
      try {
        nodes = Array.from(doc.querySelectorAll(check.selector));
      } catch {
        return false;
      }
      if (nodes.length === 0) return false;
      if (check.count !== undefined && nodes.length < check.count) return false;
      if (check.text !== undefined) {
        const t = check.text.toLowerCase();
        if (!nodes.some((n) => (n.textContent ?? "").toLowerCase().includes(t))) return false;
      }
      if (check.attr !== undefined) {
        const ok = nodes.some((n) => {
          const val = n.getAttribute(check.attr!);
          if (val === null) return false;
          if (check.attrValue === undefined) return true;
          return val.toLowerCase().includes(check.attrValue.toLowerCase());
        });
        if (!ok) return false;
      }
      return true;
    }
    case "style": {
      const doc = web?.doc;
      const win = web?.win;
      if (!doc || !win) return false;
      let el: Element | null = null;
      try {
        el = doc.querySelector(check.selector);
      } catch {
        return false;
      }
      if (!el) return false;
      const actual = win.getComputedStyle(el).getPropertyValue(check.property);
      return styleMatches(actual, check.value);
    }
  }
}

export async function gradeSubmission(
  lesson: Lesson,
  files: Files,
  runner: Runner = {},
): Promise<{ results: CheckResult[]; passed: boolean; run: RunResult }> {
  let run: RunResult;
  let web: WebRun | null = null;

  if (lesson.language === "python" || lesson.language === "cpp" || lesson.language === "java") {
    run = await runCode(lesson, files, runner);
  } else {
    const r = await runWeb(lesson, files);
    run = r.run;
    web = r.web;
  }

  const results = lesson.checks.map((c) => ({ label: c.label, passed: checkOne(c, lesson, files, run.logs, web) }));
  web?.dispose();

  // Bağlantı kopuksa seviye geçilemez
  const connectionOk = run.connection.ok;
  const hasCompileError = (lesson.language === "cpp" || lesson.language === "java" || lesson.language === "python") && !!run.error;
  const passed = connectionOk && results.every((r) => r.passed) && !hasCompileError;
  return { results, passed, run };
}
