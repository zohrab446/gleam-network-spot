import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { parseUsername } from "@/lib/validation";
import type { Json } from "@/integrations/supabase/types";

/** Şema/union detayları dışarıya sızmasın: tüm doğrulama hataları tek tip. */
const GENERIC_ERROR = "Geçersiz istek";

const actionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("sync") }),
  z.object({
    action: z.literal("spend"),
    amount: z.number().int().min(0).max(10),
    reason: z.enum(["challenge_fail", "skip_level"]),
    level: z.number().int().min(1).max(320).optional(),
  }),
  z.object({ action: z.literal("daily") }),
  z.object({ action: z.literal("spin") }),
  z.object({ action: z.literal("ad") }),
  z.object({ action: z.literal("badge"), id: z.string().min(1).max(80) }),
  z.object({ action: z.literal("milestone"), id: z.string().min(1).max(80) }),
  z.object({ action: z.literal("referral-apply"), code: z.string().trim().min(3).max(30) }),
  z.object({ action: z.literal("referral-check") }),
  z.object({ action: z.literal("trial") }),
]);

/** Son kullanıcıya gösterilebilecek, iç mantık sızdırmayan durum kodları. */
const PUBLIC_CODES = [
  "SPIN_COOLDOWN",
  "AD_LIMIT",
  "AD_COOLDOWN",
  "ALREADY_CLAIMED",
  "BADGE_NOT_EARNED",
  "NOT_ELIGIBLE",
  "ALREADY_REFERRED",
  "SELF_REFERRAL",
  "INVALID_CODE",
  "TRIAL_USED",
  "ALREADY_PRO",
  "NO_HINT_CREDITS",
  "BOT_BLOCKED",
] as const;

export type ActionResult<T = Json> = { ok: true; data: T } | { ok: false; code: string };

function publicCode(error: unknown): string {
  const raw = error instanceof Error ? error.message : "";
  const match = PUBLIC_CODES.find((code) => raw.includes(code));
  return match ?? "ACTION_FAILED";
}

function fail(error: unknown, scope: string): { ok: false; code: string } {
  // Ayrıntılı hata yalnızca sunucu günlüğüne yazılır.
  console.error(`[${scope}]`, error);
  return { ok: false, code: publicCode(error) };
}

function validate<T extends z.ZodTypeAny>(schema: T, input: unknown): z.infer<T> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) throw new Error(GENERIC_ERROR);
  return parsed.data;
}

export const runGameAction = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => validate(actionSchema, input))
  .handler(async ({ data, context }): Promise<ActionResult<Json>> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const user = context.userId;
      let response;
      switch (data.action) {
        case "sync":
          response = await supabaseAdmin.rpc("energy_sync", { p_user: user });
          break;
        case "spend":
          response = await supabaseAdmin.rpc("energy_spend", {
            p_user: user,
            p_amount: data.amount,
            p_reason: data.reason,
            p_meta: data.level ? { level: data.level } : {},
          });
          break;
        case "daily":
          response = await supabaseAdmin.rpc("energy_claim_daily_login", { p_user: user });
          break;
        case "spin":
          response = await supabaseAdmin.rpc("energy_spin", { p_user: user });
          break;
        case "ad":
          response = await supabaseAdmin.rpc("energy_watch_ad", { p_user: user });
          break;
        case "badge":
          response = await supabaseAdmin.rpc("energy_claim_badge", { p_user: user, p_badge_id: data.id });
          break;
        case "milestone":
          response = await supabaseAdmin.rpc("energy_claim_milestone", { p_user: user, p_id: data.id });
          break;
        case "referral-apply":
          response = await supabaseAdmin.rpc("referral_apply", { p_user: user, p_code: data.code });
          break;
        case "referral-check":
          response = await supabaseAdmin.rpc("referral_check", { p_user: user });
          break;
        case "trial":
          response = await supabaseAdmin.rpc("pro_start_trial", { p_user: user });
          break;
      }
      if (response.error) throw new Error(response.error.message);
      return { ok: true, data: (response.data ?? null) as Json };
    } catch (error) {
      return fail(error, "game-action");
    }
  });

export const getLeaderboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => validate(z.object({ scope: z.enum(["all", "weekly", "monthly"]) }), input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const response = await supabaseAdmin.rpc("get_leaderboard", { p_scope: data.scope, p_limit: 50 });
    if (response.error) {
      console.error("[leaderboard]", response.error);
      throw new Error("Liste yüklenemedi");
    }
    return response.data;
  });

const completeSchema = z.object({
  lessonId: z.string().trim().min(1).max(100),
  level: z.number().int().min(1).max(320),
  language: z.string().trim().min(1).max(30),
  code: z.string().max(20000).optional(),
  seconds: z.number().int().min(0).max(86400),
});

export type CompletionResult = {
  xp: number;
  coins: number;
  multiplier: number;
  new_level: number;
  already_completed: boolean;
  new_badges: string[];
};

/** XP / coin / seviye tamamen sunucuda hesaplanır; istemci değer gönderemez. */
export const completeLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => validate(completeSchema, input))
  .handler(async ({ data, context }): Promise<ActionResult<CompletionResult>> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: result, error } = await supabaseAdmin.rpc("game_complete_lesson", {
        p_user: context.userId,
        p_lesson_id: data.lessonId,
        p_level: data.level,
        p_language: data.language,
        p_code: data.code ?? "",
        p_seconds: data.seconds,
      });
      if (error) throw new Error(error.message);
      return { ok: true, data: result as unknown as CompletionResult };
    } catch (error) {
      return fail(error, "complete-lesson");
    }
  });

const skipSchema = z.object({
  lessonId: z.string().trim().min(1).max(100),
  level: z.number().int().min(1).max(320),
  language: z.string().trim().min(1).max(30),
});

export const skipLevel = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => validate(skipSchema, input))
  .handler(async ({ data, context }): Promise<ActionResult<{ new_level: number }>> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: result, error } = await supabaseAdmin.rpc("game_skip_level", {
        p_user: context.userId,
        p_lesson_id: data.lessonId,
        p_level: data.level,
        p_language: data.language,
      });
      if (error) throw new Error(error.message);
      return { ok: true, data: result as unknown as { new_level: number } };
    } catch (error) {
      return fail(error, "skip-level");
    }
  });

export const touchStreak = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ActionResult<Json>> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.rpc("game_touch_streak", {
        p_user: context.userId,
      });
      if (error) throw new Error(error.message);
      return { ok: true, data: null };
    } catch (error) {
      return fail(error, "touch-streak");
    }
  });

/** Kullanıcı adı: katı regex, HTML/olay yöneticisi içeren istekler reddedilir. */
export const saveUsername = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => {
    const parsed = z.object({ username: z.string(), onboarded: z.boolean().optional() }).safeParse(input);
    if (!parsed.success) throw new Error(GENERIC_ERROR);
    return { username: parseUsername(parsed.data.username), onboarded: parsed.data.onboarded ?? false };
  })
  .handler(async ({ data, context }): Promise<ActionResult<{ username: string }>> => {
    try {
      const { error } = await context.supabase
        .from("profiles")
        .update({ username: data.username, ...(data.onboarded ? { onboarded: true } : {}) })
        .eq("id", context.userId);
      if (error) throw new Error(error.message);
      return { ok: true, data: { username: data.username } };
    } catch (error) {
      console.error("[save-username]", error);
      const message = error instanceof Error ? error.message : "";
      // Benzersiz kullanıcı adı ihlali: aynı ad başka bir hesapta kullanılıyor.
      if (
        message.includes("USERNAME_TAKEN") ||
        message.includes("profiles_username_unique_lower") ||
        message.includes("duplicate key")
      ) {
        return { ok: false, code: "USERNAME_TAKEN" };
      }
      return { ok: false, code: "USERNAME_REJECTED" };
    }
  });
