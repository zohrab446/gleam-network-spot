import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { requestVerification } from "./turnstile-browser";
import { acceptsTurnstile, type TurnstileResult } from "./turnstile-policy";

export function humanAction(action: string, skip?: (data: unknown) => boolean) {
  return createMiddleware({ type: "function" })
    .client(async ({ next, data }) => {
      if (skip?.(data)) return next();
      if (typeof window === "undefined") throw new Error("BOT_BLOCKED:verification");
      const token = await requestVerification(action);
      return next({ headers: { "x-cq-human-token": token } });
    })
    .server(async ({ next, data }) => {
      if (skip?.(data)) return next();
      const request = getRequest();
      const token = request.headers.get("x-cq-human-token");
      const secret = process.env["TURNSTILE_SECRET_KEY"];
      if (!token || token.length > 2048 || !secret) throw new Error("BOT_BLOCKED:verification");
      let valid = false;
      try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ secret, response: token }), signal: AbortSignal.timeout(10_000),
        });
        if (response.ok) valid = acceptsTurnstile(await response.json() as TurnstileResult, action, new URL(request.url).hostname);
      } catch { /* Fail closed without logging credentials or challenge tokens. */ }
      if (!valid) throw new Error("BOT_BLOCKED:verification");
      // Cloudflare consumes each token once; never cache successful verification.
      return next();
    });
}

export const verifyGameAction = humanAction("game_action", (data) => {
  return typeof data === "object" && data !== null && "action" in data && data.action === "sync";
});
export const verifyLesson = humanAction("complete_lesson");
export const verifySkip = humanAction("skip_lesson");
export const verifyStreak = humanAction("touch_streak");
export const verifyUsername = humanAction("save_username");
export const verifyHint = humanAction("unlock_hint");
export const verifyPromo = humanAction("redeem_promo");
export const verifyChat = humanAction("send_chat");
export const verifyExecute = humanAction("execute_code");
export const verifyCheckout = humanAction("create_checkout");