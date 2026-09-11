import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const actionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("sync") }),
  z.object({ action: z.literal("spend"), amount: z.number().int().min(0).max(10), reason: z.enum(["challenge_fail", "skip_level"]), level: z.number().int().optional() }),
  z.object({ action: z.literal("daily") }),
  z.object({ action: z.literal("spin") }),
  z.object({ action: z.literal("ad") }),
  z.object({ action: z.literal("badge"), id: z.string().min(1).max(80) }),
  z.object({ action: z.literal("milestone"), id: z.string().min(1).max(80) }),
  z.object({ action: z.literal("referral-apply"), code: z.string().trim().min(3).max(30) }),
  z.object({ action: z.literal("referral-check") }),
  z.object({ action: z.literal("trial") }),
]);

export const runGameAction = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => actionSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let response;
    switch (data.action) {
      case "sync": response = await supabaseAdmin.rpc("energy_sync", { p_user: context.userId }); break;
      case "spend": response = await supabaseAdmin.rpc("energy_spend", { p_user: context.userId, p_amount: data.amount, p_reason: data.reason, p_meta: data.level ? { level: data.level } : {} }); break;
      case "daily": response = await supabaseAdmin.rpc("energy_claim_daily_login", { p_user: context.userId }); break;
      case "spin": response = await supabaseAdmin.rpc("energy_spin", { p_user: context.userId }); break;
      case "ad": response = await supabaseAdmin.rpc("energy_watch_ad", { p_user: context.userId }); break;
      case "badge": response = await supabaseAdmin.rpc("energy_claim_badge", { p_user: context.userId, p_badge_id: data.id }); break;
      case "milestone": response = await supabaseAdmin.rpc("energy_claim_milestone", { p_user: context.userId, p_id: data.id }); break;
      case "referral-apply": response = await supabaseAdmin.rpc("referral_apply", { p_user: context.userId, p_code: data.code }); break;
      case "referral-check": response = await supabaseAdmin.rpc("referral_check", { p_user: context.userId }); break;
      case "trial": response = await supabaseAdmin.rpc("pro_start_trial", { p_user: context.userId }); break;
    }
    if (response.error) throw new Error(response.error.message);
    return response.data;
  });

export const getLeaderboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ scope: z.enum(["all", "weekly"]) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const response = await supabaseAdmin.rpc("get_leaderboard", { p_scope: data.scope, p_limit: 50 });
    if (response.error) throw new Error(response.error.message);
    return response.data;
  });