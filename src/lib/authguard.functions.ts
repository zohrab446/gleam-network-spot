import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * E-posta bazlı giriş koruması: 5 başarısız denemeden sonra 15 dakika kilit,
 * her 5 denemede bekleme süresi katlanır (exponential backoff).
 */
const FAIL_THRESHOLD = 5;
const BASE_LOCK_MINUTES = 15;
const MAX_LOCK_MINUTES = 240;
/** Bu sayıdan sonra arayüzde doğrulama adımı istenir. */
const VERIFY_THRESHOLD = 3;
/** Bu süre boyunca hareket yoksa sayaç sıfırlanır. */
const WINDOW_HOURS = 12;

const emailSchema = z.object({ email: z.string().trim().email().max(255) });

function parseEmail(input: unknown): { email: string } {
  const parsed = emailSchema.safeParse(input);
  if (!parsed.success) throw new Error("Geçersiz istek");
  return { email: parsed.data.email.toLowerCase() };
}

function lockMinutesFor(failedCount: number): number {
  const steps = Math.floor(failedCount / FAIL_THRESHOLD);
  if (steps < 1) return 0;
  return Math.min(BASE_LOCK_MINUTES * 2 ** (steps - 1), MAX_LOCK_MINUTES);
}

export type LoginGuardState = {
  locked: boolean;
  /** Kilidin bitmesine kalan saniye. */
  retryAfter: number;
  /** Arayüzde ek doğrulama adımı gösterilmeli mi. */
  requireVerification: boolean;
};

function lockedState(lockedUntil: string | null, failedCount: number): LoginGuardState {
  const until = lockedUntil ? new Date(lockedUntil).getTime() : 0;
  const remaining = Math.max(0, Math.ceil((until - Date.now()) / 1000));
  return {
    locked: remaining > 0,
    retryAfter: remaining,
    requireVerification: remaining > 0 || failedCount >= VERIFY_THRESHOLD,
  };
}

/** Giriş denemesinden önce hesap kilidi kontrolü. */
export const checkLoginGuard = createServerFn({ method: "POST" })
  .inputValidator(parseEmail)
  .handler(async ({ data }): Promise<LoginGuardState> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: row } = await supabaseAdmin
        .from("auth_login_attempts")
        .select("failed_count, locked_until, last_failed_at")
        .eq("email", data.email)
        .maybeSingle();
      if (!row) return { locked: false, retryAfter: 0, requireVerification: false };

      const stale =
        row.last_failed_at && Date.now() - new Date(row.last_failed_at).getTime() > WINDOW_HOURS * 3600_000;
      if (stale) return { locked: false, retryAfter: 0, requireVerification: false };

      return lockedState(row.locked_until, row.failed_count);
    } catch {
      return { locked: false, retryAfter: 0, requireVerification: false };
    }
  });

/** Başarısız giriş denemesini kaydeder ve gerekiyorsa hesabı kilitler. */
export const recordLoginFailure = createServerFn({ method: "POST" })
  .inputValidator(parseEmail)
  .handler(async ({ data }): Promise<LoginGuardState> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: row } = await supabaseAdmin
        .from("auth_login_attempts")
        .select("failed_count, last_failed_at")
        .eq("email", data.email)
        .maybeSingle();

      const stale =
        !row?.last_failed_at || Date.now() - new Date(row.last_failed_at).getTime() > WINDOW_HOURS * 3600_000;
      const failedCount = (stale ? 0 : (row?.failed_count ?? 0)) + 1;
      const minutes = lockMinutesFor(failedCount);
      const lockedUntil = minutes > 0 ? new Date(Date.now() + minutes * 60_000).toISOString() : null;

      await supabaseAdmin.from("auth_login_attempts").upsert(
        {
          email: data.email,
          failed_count: failedCount,
          locked_until: lockedUntil,
          last_failed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      );

      return lockedState(lockedUntil, failedCount);
    } catch {
      return { locked: false, retryAfter: 0, requireVerification: false };
    }
  });

/** Başarılı girişte sayaçları temizler. */
export const clearLoginAttempts = createServerFn({ method: "POST" })
  .inputValidator(parseEmail)
  .handler(async ({ data }): Promise<{ ok: true }> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("auth_login_attempts").delete().eq("email", data.email);
    } catch {
      // Sessiz geç: giriş akışını bloklamaz.
    }
    return { ok: true };
  });
