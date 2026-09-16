import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import type { Profile } from "@/hooks/useGameData";
import { useServerFn } from "@tanstack/react-start";
import { runGameAction } from "@/lib/game.functions";
import { unwrapAction } from "@/lib/action-result";

function invalidate(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: ["profile"] });
  queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
  queryClient.invalidateQueries({ queryKey: ["energy-history"] });
}

/** Zaman dolumu + günlük sıfırlama + Pro süre kontrolü. Sayfa açılışında çağrılır. */
export function useEnergySync() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useQuery({
    queryKey: ["energy-sync", user?.id],
    enabled: !!user,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    queryFn: async (): Promise<Profile | null> => {
      const data = unwrapAction(await runAction({ data: { action: "sync" } }));
      const profile = (Array.isArray(data) ? data[0] : data) as Profile | null;
      if (profile) queryClient.setQueryData(["profile", user?.id], profile);
      return profile;
    },
  });
}

/** Yanlış cevap / seviye atlama gibi enerji harcamaları. */
export function useSpendEnergy() {
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useMutation({
    mutationFn: async ({
      amount,
      reason,
      level,
    }: {
      amount: number;
      reason: "challenge_fail" | "skip_level";
      level?: number;
    }): Promise<Profile | null> => {
      const data = unwrapAction(
        await runAction({ data: { action: "spend", amount, reason, ...(level ? { level } : {}) } }),
      );
      return (Array.isArray(data) ? data[0] : data) as Profile | null;
    },
    onSuccess: (profile) => {
      if (profile) queryClient.setQueryData(["profile", profile.id], profile);
      invalidate(queryClient);
    },
  });
}

export function useClaimDailyLogin() {
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useMutation({
    mutationFn: async (): Promise<{ day: number; energy: number; coins: number }> =>
      unwrapAction(await runAction({ data: { action: "daily" } })) as {
        day: number;
        energy: number;
        coins: number;
      },
    onSuccess: () => invalidate(queryClient),
  });
}

export function useSpinWheel() {
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useMutation({
    mutationFn: async (): Promise<{ energy: number }> =>
      unwrapAction(await runAction({ data: { action: "spin" } })) as { energy: number },
    onSuccess: () => invalidate(queryClient),
  });
}

export function useWatchAd() {
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useMutation({
    mutationFn: async (): Promise<{ energy: number; watched_today: number }> =>
      unwrapAction(await runAction({ data: { action: "ad" } })) as {
        energy: number;
        watched_today: number;
      },
    onSuccess: () => invalidate(queryClient),
  });
}

export function useClaimBadgeEnergy() {
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useMutation({
    mutationFn: async (badgeId: string): Promise<{ energy: number }> =>
      unwrapAction(await runAction({ data: { action: "badge", id: badgeId } })) as { energy: number },
    onSuccess: () => invalidate(queryClient),
  });
}

export function useClaimMilestone() {
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useMutation({
    mutationFn: async (id: string): Promise<{ energy: number }> =>
      unwrapAction(await runAction({ data: { action: "milestone", id } })) as { energy: number },
    onSuccess: () => invalidate(queryClient),
  });
}

export function useApplyReferral() {
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useMutation({
    mutationFn: async (code: string) => {
      unwrapAction(await runAction({ data: { action: "referral-apply", code } }));
    },
    onSuccess: () => invalidate(queryClient),
  });
}

/** Ders tamamlandıktan sonra davet ödülünü kontrol eder. */
export function useReferralCheck() {
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useMutation({
    mutationFn: async (): Promise<{ rewarded: boolean; energy?: number }> =>
      unwrapAction(await runAction({ data: { action: "referral-check" } })) as {
        rewarded: boolean;
        energy?: number;
      },
    onSuccess: () => invalidate(queryClient),
  });
}

export function useStartProTrial() {
  const queryClient = useQueryClient();
  const runAction = useServerFn(runGameAction);
  return useMutation({
    mutationFn: async (): Promise<Profile | null> => {
      const data = unwrapAction(await runAction({ data: { action: "trial" } }));
      return (Array.isArray(data) ? data[0] : data) as Profile | null;
    },
    onSuccess: () => invalidate(queryClient),
  });
}

export type EnergyTransaction = {
  id: string;
  type: string;
  amount: number;
  before_energy: number;
  after_energy: number;
  created_at: string;
};

export function useEnergyHistory(limit = 20) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["energy-history", user?.id, limit],
    enabled: !!user,
    queryFn: async (): Promise<EnergyTransaction[]> => {
      const { data, error } = await supabase
        .from("energy_transactions")
        .select("id, type, amount, before_energy, after_energy, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as EnergyTransaction[];
    },
  });
}

export const ENERGY_TYPE_LABEL: Record<string, string> = {
  challenge_fail: "Yanlış cevap",
  skip_level: "Seviye atlama",
  daily_login: "Günlük giriş",
  daily_reset: "Günlük dolum",
  time_refill: "Zaman dolumu",
  spin_wheel: "Şans çarkı",
  video_ad: "Reklam ödülü",
  badge_reward: "Rozet ödülü",
  milestone: "Kilometre taşı",
  referral_bonus: "Davet ödülü",
  referral_milestone: "Davet bonusu",
};
