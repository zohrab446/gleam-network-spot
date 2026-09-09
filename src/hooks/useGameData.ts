import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { LESSONS, MAX_LEVEL, type Lesson } from "@/data/lessons";
import {
  BADGES,
  coinRewardFor,
  currentWeekStart,
  earnedBadgeIds,
  nextStreak,
  streakMultiplier,
  xpRewardFor,
} from "@/lib/gamification";

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
  streak: number;
  rank_position: number;
};

export function useLeaderboard(scope: "all" | "weekly") {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["leaderboard", scope, user?.id],
    enabled: !!user,
    queryFn: async (): Promise<LeaderboardRow[]> => {
      const { data, error } = await supabase.rpc("get_leaderboard", { p_scope: scope, p_limit: 50 });
      if (error) throw error;
      return (data ?? []) as LeaderboardRow[];
    },
  });
}

export function useUpdateProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patch: Partial<Profile>) => {
      const { error } = await supabase.from("profiles").update(patch).eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
}

/** Günlük seriyi kontrol eder ve gerekiyorsa günceller. */
export function useTouchStreak(profile: Profile | null | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!profile) return;
      const today = new Date().toISOString().slice(0, 10);
      if (profile.last_active_date === today) return;
      const { streak } = nextStreak(profile.last_active_date, profile.streak);
      const week = currentWeekStart();
      const { error } = await supabase
        .from("profiles")
        .update({
          streak,
          longest_streak: Math.max(profile.longest_streak, streak),
          last_active_date: today,
          last_login_at: new Date().toISOString(),
          ...(profile.week_start !== week ? { week_start: week, weekly_xp: 0 } : {}),
        })
        .eq("id", profile.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
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
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lesson,
      code,
      seconds,
      profile,
      progress,
    }: {
      lesson: Lesson;
      code: string;
      seconds: number;
      profile: Profile;
      progress: Progress[];
    }): Promise<CompletionReward> => {
      const alreadyCompleted = progress.some((p) => p.lesson_id === lesson.id);
      const multiplier = streakMultiplier(profile.streak);
      const xp = alreadyCompleted ? 0 : xpRewardFor(lesson.level) * multiplier;
      const coins = alreadyCompleted ? 0 : coinRewardFor(lesson.level);

      if (!alreadyCompleted) {
        const { error } = await supabase.from("lesson_progress").insert({
          user_id: user!.id,
          lesson_id: lesson.id,
          level: lesson.level,
          language: lesson.language,
          xp_earned: xp,
          coins_earned: coins,
          duration_seconds: seconds,
          code,
        });
        if (error) throw error;
      }

      const completedLevels = [...new Set([...progress.map((p) => p.level), lesson.level])];
      const newLevel = Math.min(MAX_LEVEL, Math.max(profile.level, completedLevels.length + 1));
      const week = currentWeekStart();
      const weeklyBase = profile.week_start === week ? profile.weekly_xp : 0;

      const languageCounts = new Map<string, number>();
      [...progress.map((p) => p.language), lesson.language].forEach((lang) =>
        languageCounts.set(lang, (languageCounts.get(lang) ?? 0) + 1),
      );
      const favorite = [...languageCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? lesson.language;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          xp: profile.xp + xp,
          coins: profile.coins + coins,
          weekly_xp: weeklyBase + xp,
          week_start: week,
          level: newLevel,
          favorite_language: favorite,
          last_active_date: new Date().toISOString().slice(0, 10),
        })
        .eq("id", profile.id);
      if (profileError) throw profileError;

      const durations = [...progress.map((p) => p.duration_seconds ?? 99999), seconds];
      const owned = (await supabase.from("user_badges").select("badge_id")).data ?? [];
      const earned = earnedBadgeIds({
        xp: profile.xp + xp,
        level: newLevel,
        streak: profile.streak,
        completedLevels,
        languagesCompleted: [...languageCounts.keys()],
        fastestSeconds: Math.min(...durations),
      });
      const newBadges = earned.filter((id) => !owned.some((o) => o.badge_id === id));
      if (newBadges.length > 0) {
        await supabase
          .from("user_badges")
          .insert(newBadges.map((badge_id) => ({ user_id: user!.id, badge_id })));
      }

      return { xp, coins, multiplier, newLevel, newBadges, alreadyCompleted };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["badges"] });
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
