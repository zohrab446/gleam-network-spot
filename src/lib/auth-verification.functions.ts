import { createServerFn } from "@tanstack/react-start";
import { humanAction } from "./turnstile-middleware";

// UI flow protection; native Auth CAPTCHA must also be enabled to protect
// callers contacting the Auth provider directly.
export const verifyAuthAction = createServerFn({ method: "POST" })
  .middleware([humanAction("auth_action")])
  .handler(() => ({ verified: true }));