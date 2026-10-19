import { getTurnstileSiteKey } from "./turnstile-config.functions";

export type VerificationRequest = { action: string; resolve: (token: string) => void; reject: (error: Error) => void };
let listener: ((request: VerificationRequest | null) => void) | undefined;
let queue: Promise<unknown> = Promise.resolve();

export function subscribeVerification(callback: (request: VerificationRequest | null) => void) {
  listener = callback;
  return () => { listener = undefined; };
}

export function requestVerification(action: string): Promise<string> {
  const job = queue.catch(() => undefined).then(() => new Promise<string>((resolve, reject) => {
    const current = listener;
    if (!current) { reject(new Error("BOT_BLOCKED:unavailable")); return; }
    const timeout = window.setTimeout(() => finish(undefined), 120_000);
    function finish(token: string | undefined) {
      window.clearTimeout(timeout);
      current?.(null);
      if (token) resolve(token); else reject(new Error("BOT_BLOCKED:verification"));
    }
    current({ action, resolve: (token) => finish(token), reject: () => finish(undefined) });
  }));
  queue = job;
  return job;
}

type TurnstileAPI = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
export function widgetAPI(): TurnstileAPI | undefined {
  return (window as Window & { turnstile?: TurnstileAPI }).turnstile;
}

export async function loadTurnstile() {
  const { siteKey } = await getTurnstileSiteKey();
  if (!widgetAPI()) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      const timeout = window.setTimeout(() => reject(new Error("BOT_BLOCKED:unavailable")), 15_000);
      script.onload = () => { window.clearTimeout(timeout); resolve(); };
      script.onerror = () => { window.clearTimeout(timeout); reject(new Error("BOT_BLOCKED:unavailable")); };
      document.head.appendChild(script);
    });
  }
  return siteKey;
}