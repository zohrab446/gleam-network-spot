import { createServerFn } from "@tanstack/react-start";

// The widget site key is public configuration, never the verification secret.
export const getTurnstileSiteKey = createServerFn({ method: "GET" }).handler(() => {
  const siteKey = process.env["TURNSTILE_SITE_KEY"];
  if (!siteKey) throw new Error("BOT_BLOCKED:configuration");
  return { siteKey };
});