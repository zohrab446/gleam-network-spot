import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const schema = z.object({ code: z.string().trim().min(2).max(40) });

export type PromoRedeemResult = {
  ok: boolean;
  error?: string;
  code?: string;
  pro_plan?: string;
  duration_months?: number;
  pro_expires_at?: string;
};

export const redeemPromoCode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: result, error } = await supabaseAdmin.rpc("redeem_promo_code", {
      p_user: context.userId,
      p_code: data.code,
    });
    if (error) throw new Error(error.message);
    return result as PromoRedeemResult;
  });
