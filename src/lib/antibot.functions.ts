import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const schema = z.object({
  kind: z.string().trim().min(1).max(60),
  detail: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

/** Şüpheli otomasyon girişimlerini sunucu tarafında kaydeder. */
export const reportBotIncident = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("bot_incidents").insert({
      user_id: context.userId,
      kind: data.kind,
      detail: data.detail ?? {},
    });
    return { logged: true };
  });
