import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { LESSONS, MAX_LEVEL, type Lesson } from "@/data/lessons";
import { BADGES } from "@/lib/gamification";
import { useServerFn } from "@tanstack/react-start";
import {
  completeLesson,
  getLeaderboard,
  saveUsername,
  skipLevel,
  touchStreak,
} from "@/lib/game.functions";
import { unwrapAction } from "@/lib/action-result";
import { validateUsername } from "@/lib/validation";
import { reportBotIncident } from "@/lib/antibot.functions";
import { BOT_PREFIX, verifyHumanActivity } from "@/lib/antibot";

export type Profile = {
  id: string;
  email: string | null;
  username: string | null;
  avatar_shape: string;
  avatar_color: string;
  level: number;
  xp: number;
  weekly_xp: number;
  week_start: string;
  monthly_xp: number;
  month_start: string;
  coins: number;
  streak: number;
  longest_streak: number;
  last_active_date: string | null;
  favorite_language: string | null;
  sound_enabled: boolean;
  theme: string;
  language: string;
  onboarded: boolean;
  created_at: string;
  // Enerji
  energy: number;
  max_energy: number;
  energy_updated_at: string;
  energy_day: string;
  total_energy_spent: number;
  total_energy_gained: number;
  // Pro
  is_pro: boolean;
  pro_plan: string | null;
  pro_started_at: string | null;
  pro_expires_at: string | null;
  pro_trial_used: boolean;
  // Davet
  referral_code: string | null;
  referred_by: string | null;
  referral_rewarded: boolean;
  completed_referrals: number;
  referral_energy_earned: number;
  // Ödüller
  daily_login_streak: number;
  last_login_reward_date: string | null;
  last_spin_at: string | null;
  ads_watched_today: number;
  ads_day: string | null;
  last_ad_at: string | null;
  energy_badges_claimed: string[];
  milestones_claimed: string[];
  // İpuçları
  hint_credits: number;
  total_hints_used: number;
};

export type Progress = {
  id: string;
  lesson_id: string;
  level: number;
  language: string;
  xp_earned: number;
  coins_earned: number;
  duration_seconds: number | null;
  completed_at: string;
};

export function useProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      if (error) throw error;
      if (data) return data as Profile;
      // Profil tetikleyici gecikirse burada oluştur.
      const fallbackName =
        (user!.user_metadata?.["full_name"] as string | undefined) ?? user!.email?.split("@")[0] ?? "Kodcu";
      const { data: created, error: insertError } = await supabase
        .from("profiles")
        .insert({ id: user!.id, email: user!.email ?? null, username: fallbackName })
        .select("*")
        .single();
      if (insertError) throw insertError;
      return created as Profile;
    },
  });
}

export function useProgress() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["progress", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Progress[]> => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("*")
        .order("completed_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Progress[];
    },
  });
}

export function useBadges() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["badges", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<{ badge_id: string; earned_at: string }[]> => {
      const { data, error } = await supabase.from("user_badges").select("badge_id, earned_at");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export type LeaderboardRow = {
  user_id: string;
  username: string;
  avatar_shape: string;
  avatar_color: string;
  level: number;
  xp: number;
  weekly_xp: number;
  monthly_xp: number;
  coins: number;
  streak: number;
  longest_streak: number;
  is_pro: boolean;
  rank_position: number;
};

export function useLeaderboard(scope: "all" | "weekly" | "monthly") {
  const { user } = useAuth();
  const loadLeaderboard = useServerFn(getLeaderboard);
  return useQuery({
    queryKey: ["leaderboard", scope, user?.id],
    enabled: !!user,
    // Herkesin XP / coin / seri değerleri canlı kalsın.
    refetchInterval: 20_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 10_000,
    queryFn: async (): Promise<LeaderboardRow[]> => {
      const data = await loadLeaderboard({ data: { scope } });
      return (data ?? []) as LeaderboardRow[];
    },
  });
}

/** Yalnızca serbest profil alanları istemciden güncellenebilir (mass assignment koruması). */
const EDITABLE_PROFILE_FIELDS = [
  "avatar_shape",
  "avatar_color",
  "sound_enabled",
  "theme",
  "language",
  "onboarded",
] as const;

export type EditableProfile = Partial<Pick<Profile, (typeof EDITABLE_PROFILE_FIELDS)[number]>>;

export function useUpdateProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patch: EditableProfile) => {
      const safe: Record<string, unknown> = {};
      for (const field of EDITABLE_PROFILE_FIELDS) {
        if (field in patch) safe[field] = (patch as Record<string, unknown>)[field];
      }
      if (Object.keys(safe).length === 0) return;
      const { error } = await supabase.from("profiles").update(safe).eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

/** Kullanıcı adı sunucuda katı regex ile doğrulanır. */
export function useSaveUsername() {
  const queryClient = useQueryClient();
  const save = useServerFn(saveUsername);
  return useMutation({
    mutationFn: async ({ username, onboarded }: { username: string; onboarded?: boolean }) => {
      const check = validateUsername(username);
      if (!check.ok) throw new Error(check.message);
      return unwrapAction(await save({ data: { username: check.value, onboarded: onboarded ?? false } }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

/** Günlük seriyi kontrol eder ve gerekiyorsa günceller (sunucu tarafında). */
export function useTouchStreak(profile: Profile | null | undefined) {
  const queryClient = useQueryClient();
  const touch = useServerFn(touchStreak);
  return useMutation({
    mutationFn: async () => {
      if (!profile) return;
      const today = new Date().toISOString().slice(0, 10);
      if (profile.last_active_date === today) return;
      unwrapAction(await touch({}));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export type CompletionReward = {
  xp: number;
  coins: number;
  multiplier: number;
  newLevel: number;
  newBadges: string[];
  alreadyCompleted: boolean;
};

export function useCompleteLesson() {
  const queryClient = useQueryClient();
  const reportBot = useServerFn(reportBotIncident);
  const complete = useServerFn(completeLesson);

  return useMutation({
    mutationFn: async ({
      lesson,
      code,
      seconds,
    }: {
      lesson: Lesson;
      code: string;
      seconds: number;
      profile?: Profile;
      progress?: Progress[];
    }): Promise<CompletionReward> => {
      const verdict = verifyHumanActivity(seconds);
      if (!verdict.ok) {
        void reportBot({ data: { kind: verdict.reason, detail: { lesson_id: lesson.id, seconds } } }).catch(
          () => undefined,
        );
        throw new Error(`${BOT_PREFIX}${verdict.reason}`);
      }

      // XP, coin, seviye ve rozetler tamamen sunucuda hesaplanır.
      const result = unwrapAction(
        await complete({
          data: {
            lessonId: lesson.id,
            level: lesson.level,
            language: lesson.language,
            code: code.slice(0, 20000),
            seconds,
          },
        }),
      );

      return {
        xp: result.xp,
        coins: result.coins,
        multiplier: result.multiplier,
        newLevel: result.new_level,
        newBadges: result.new_badges ?? [],
        alreadyCompleted: result.already_completed,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["badges"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

/** Seviye atlama: XP/coin vermeden dersi tamamlanmış sayar, böylece sonraki ders açılır. */
export function useSkipLevel() {
  const queryClient = useQueryClient();
  const skip = useServerFn(skipLevel);

  return useMutation({
    mutationFn: async ({ lesson }: { lesson: Lesson; profile?: Profile }) => {
      unwrapAction(
        await skip({ data: { lessonId: lesson.id, level: lesson.level, language: lesson.language } }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export function badgeById(id: string) {
  return BADGES.find((b) => b.id === id);
}

export function nextLessonLevel(progress: Progress[]): number {
  const done = new Set(progress.map((p) => p.level));
  for (const lesson of LESSONS) if (!done.has(lesson.level)) return lesson.level;
  return MAX_LEVEL;
}
