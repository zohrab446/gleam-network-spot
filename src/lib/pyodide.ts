/** Pyodide'ı CDN'den tembel yükler ve tek örnek olarak saklar. */

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type PyodideLike = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
  setStdin: (opts: { stdin: () => string; autoEOF?: boolean }) => void;
  globals: { clear?: () => void };
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideLike>;
  }
}

let instance: Promise<PyodideLike> | null = null;

export function isPyodideReady() {
  return instance !== null;
}

export function loadPyodideRuntime(): Promise<PyodideLike> {
  if (instance) return instance;
  instance = new Promise<PyodideLike>((resolve, reject) => {
    if (typeof document === "undefined") return reject(new Error("no-dom"));
    const start = () => {
      window
        .loadPyodide!({ indexURL: PYODIDE_URL })
        .then(resolve)
        .catch((e) => {
          instance = null;
          reject(e);
        });
    };
    if (window.loadPyodide) return start();
    const script = document.createElement("script");
    script.src = `${PYODIDE_URL}pyodide.js`;
    script.async = true;
    script.onload = start;
    script.onerror = () => {
      instance = null;
      reject(new Error("Python motoru yüklenemedi. İnternet bağlantını kontrol et."));
    };
    document.head.appendChild(script);
  });
  return instance;
}

export async function runPython(code: string, stdin: string[] = []): Promise<{ logs: string[]; error: string | null }> {
  const py = await loadPyodideRuntime();
  const logs: string[] = [];
  const lines = [...stdin];
  py.setStdout({ batched: (s) => logs.push(s) });
  py.setStderr({ batched: (s) => logs.push(s) });
  py.setStdin({ stdin: () => (lines.length ? lines.shift()! : ""), autoEOF: true });
  try {
    // Her çalıştırmada temiz global alan
    await py.runPythonAsync(
      "import sys\nfor _m in [m for m in list(sys.modules) if m.startswith('helper')]:\n    del sys.modules[_m]\n",
    );
    await py.runPythonAsync(code);
    return { logs, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const tail = message.trim().split("\n").filter(Boolean).slice(-1)[0] ?? message;
    return { logs, error: tail };
  }
}
