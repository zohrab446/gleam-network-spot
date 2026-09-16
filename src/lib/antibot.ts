/**
 * Arka planda çalışan bot koruması (istemci tarafı sinyaller).
 * Kullanıcıya hiçbir doğrulama sorulmaz; sadece davranış izlenir.
 * Şüpheli durumda ders tamamlama isteği hiç gönderilmez.
 */

type Signals = {
  keys: number;
  pointers: number;
  moves: number;
  firstEventAt: number | null;
  lastEventAt: number | null;
};

const signals: Signals = { keys: 0, pointers: 0, moves: 0, firstEventAt: null, lastEventAt: null };
let attached = false;

function mark() {
  const now = Date.now();
  if (signals.firstEventAt === null) signals.firstEventAt = now;
  signals.lastEventAt = now;
}

/** Uygulama açılışında bir kez çağrılır. */
export function initAntiBot() {
  if (attached || typeof window === "undefined") return;
  attached = true;
  window.addEventListener("keydown", () => {
    signals.keys += 1;
    mark();
  });
  window.addEventListener("pointerdown", () => {
    signals.pointers += 1;
    mark();
  });
  window.addEventListener(
    "pointermove",
    () => {
      signals.moves += 1;
      mark();
    },
    { passive: true },
  );
}

/** Otomasyon araçlarının bıraktığı belirgin izler. */
function automationDetected(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { webdriver?: boolean };
  if (nav.webdriver === true) return true;
  const w = window as unknown as Record<string, unknown>;
  const flags = [
    "__playwright",
    "__puppeteer_evaluation_script__",
    "__nightmare",
    "_phantom",
    "callPhantom",
    "__selenium_unwrapped",
    "__webdriver_evaluate",
    "cdc_adoQpoasnfa76pfcZLmcfl_Array",
  ];
  if (flags.some((flag) => flag in w)) return true;
  if (/headless|electron|phantomjs|puppeteer|playwright|selenium/i.test(navigator.userAgent)) return true;
  return false;
}

export type BotVerdict = { ok: true } | { ok: false; reason: string };

/**
 * Ders gönderiminin gerçek bir insandan gelip gelmediğini değerlendirir.
 * @param seconds Ders üzerinde geçen süre (saniye).
 */
export function verifyHumanActivity(seconds: number): BotVerdict {
  if (typeof window === "undefined") return { ok: false, reason: "no_window" };
  if (automationDetected()) return { ok: false, reason: "automation" };
  if (signals.keys + signals.pointers < 2) return { ok: false, reason: "no_input" };
  if (signals.moves === 0 && signals.keys === 0) return { ok: false, reason: "no_motion" };
  if (seconds < 3) return { ok: false, reason: "too_fast" };
  const span = signals.firstEventAt && signals.lastEventAt ? signals.lastEventAt - signals.firstEventAt : 0;
  if (span < 500) return { ok: false, reason: "no_dwell" };
  return { ok: true };
}

export const BOT_PREFIX = "BOT_BLOCKED:";

export function isBotBlocked(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return message.includes(BOT_PREFIX);
}

export const BOT_MESSAGE = "Otomatik (bot) hareket algılandı, bu gönderim kaydedilmedi.";
