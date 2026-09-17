import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Coins, Flame, Lock, Play, Trophy, Zap } from "lucide-react";
import { CATEGORIES, LANGUAGE_META, LESSONS, MAX_LEVEL, isLessonUnlocked, nextLevelInTrack, trackProgress } from "@/data/lessons";
import { TRACKS } from "@/data/types";
import {
  nextLessonLevel,
  useLeaderboard,
  useProfile,
  useProgress,
  useTouchStreak,
} from "@/hooks/useGameData";
import { levelProgress, streakMultiplier, xpRewardFor } from "@/lib/gamification";
import { AppShell } from "@/components/AppShell";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { EnergyCard } from "@/components/EnergyMeter";
import { useClaimDailyLogin, useEnergySync } from "@/hooks/useEnergy";
import { energyErrorMessage, isProActive } from "@/lib/energy";
import { toast } from "sonner";
import { Gift } from "lucide-react";
import { useLanguage, useT } from "@/lib/i18n";
import { trackTagline } from "@/data/i18n";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Panom — CodeQuest" },
      {
        name: "description",
        content: "Seviyeni, XP'ni, coinlerini ve serini takip et; kaldığın dersten devam et.",
      },
      { property: "og:title", content: "Panom — CodeQuest" },
      { property: "og:description", content: "CodeQuest ilerlemenin tamamı tek ekranda." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const t = useT();
  const lang = useLanguage();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();
  const { data: progress = [], isLoading: progressLoading } = useProgress();
  const { data: leaders = [] } = useLeaderboard("all");
  const touchStreak = useTouchStreak(profile);
  const dailyLogin = useClaimDailyLogin();
  useEnergySync();

  useEffect(() => {
    if (profile && !profile.onboarded) navigate({ to: "/onboarding", replace: true });
  }, [profile, navigate]);

  useEffect(() => {
    if (!profile) return;
    const today = new Date().toISOString().slice(0, 10);
    if (profile.last_active_date !== today) touchStreak.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id, profile?.last_active_date]);

  if (isLoading || progressLoading || !profile) {
    return (
      <AppShell>
        <div className="space-y-4">
          <Skeleton className="h-36 w-full rounded-2xl" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </AppShell>
    );
  }

  const completed = new Set(progress.map((p) => p.level));
  const continueLevel = nextLessonLevel(progress);
  const multiplier = streakMultiplier(profile.streak);
  const pct = levelProgress(profile.level, profile.xp);
  const dailyClaimed = profile.last_login_reward_date === new Date().toISOString().slice(0, 10);

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <section className="card-surface pop-in overflow-hidden">
            <div className="bg-brand-gradient flex flex-wrap items-center gap-4 p-6 text-primary-foreground">
              <PlayerAvatar shape={profile.avatar_shape} color={profile.avatar_color} size="lg" />
              <div className="min-w-0">
                <h1 className="truncate text-2xl">{t("Merhaba", "Hello")}, {profile.username ?? t("Kodcu", "Coder")}!</h1>
                <p className="text-sm opacity-90">
                  {completed.size} {t("ders tamamlandı", "lessons completed")} · {MAX_LEVEL - completed.size} {t("ders kaldı", "lessons left")}
                </p>
              </div>
              <Button asChild size="lg" variant="secondary" className="ml-auto font-bold">
                <Link to="/lesson/$level" params={{ level: String(continueLevel) }}>
                  <Play className="mr-1 h-4 w-4" /> {t("Devam et", "Continue")}
                </Link>
              </Button>
            </div>

            <div className="p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    {t("Şu anki seviye", "Current level")}
                  </p>
                  <p className="font-display text-5xl font-extrabold text-gradient-brand">{profile.level}</p>
                </div>
                <p className="text-sm font-semibold text-muted-foreground">
                  {t("Sonraki seviyeye", "To next level")} {Math.max(0, xpRewardFor(profile.level) - Math.round((pct / 100) * xpRewardFor(profile.level)))} XP
                </p>
              </div>
              <Progress value={pct} className="mt-3 h-3" aria-label={t("Seviye ilerlemesi", "Level progress")} />
              {multiplier > 1 && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-sm font-bold text-success">
                  t("🔥 7+ gün seri: XP'ler 2 katı!", "🔥 7+ day streak: XP is 2x!")
                </p>
              )}
            </div>
          </section>

          <EnergyCard profile={profile} />

          {!dailyClaimed && (
            <section className="card-surface flex flex-wrap items-center gap-3 p-5">
              <Gift className="h-6 w-6 text-accent" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-extrabold">{t("Günlük ödülün hazır!", "Your daily reward is ready!")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("Enerji +", "Energy +")} {isProActive(profile) ? "150" : "50"} {t("coin seni bekliyor.", "coins are waiting for you.")}
                </p>
              </div>
              <Button
                className="font-bold"
                disabled={dailyLogin.isPending}
                onClick={() =>
                  dailyLogin.mutate(undefined, {
                    onSuccess: (result) =>
                      toast.success(t(`${result.day}. gün: +${result.energy} enerji, +${result.coins} coin!`, `Day ${result.day}: +${result.energy} energy, +${result.coins} coins!`)),
                    onError: (error) => toast.error(energyErrorMessage(error)),
                  })
                }
              >
                {t("Ödülü al", "Claim reward")}
              </Button>
            </section>
          )}

          <section className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={<Flame className="h-5 w-5 text-streak" />} label={t("Günlük seri", "Daily streak")} value={`${profile.streak} ${t("gün", "days")}`} />
            <StatCard icon={<Coins className="h-5 w-5 text-coin" />} label={t("Coin", "Coins")} value={profile.coins} />
            <StatCard icon={<Zap className="h-5 w-5 text-primary" />} label={t("Toplam XP", "Total XP")} value={profile.xp} />
          </section>

          <section aria-labelledby="lessons-heading" className="space-y-4">
            <h2 id="lessons-heading" className="text-xl">
              {t("Teknoloji yolları", "Tech tracks")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {TRACKS.map((track) => {
                const tp = trackProgress(track, completed);
                const target = nextLevelInTrack(track, completed);
                return (
                  <Link
                    key={track.id}
                    to="/lesson/$level"
                    params={{ level: String(target) }}
                    className="card-surface flex flex-col gap-3 p-5 transition-transform hover:-translate-y-0.5"
                    aria-label={t(`${track.label} yoluna devam et`, `Continue ${track.label} track`)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                        style={{ backgroundColor: `var(--color-${track.colorVar})` }}
                      >
                        {track.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-base font-extrabold">{track.label}</p>
                        <p className="truncate text-xs text-muted-foreground">{trackTagline(track.id, lang, track.tagline)}</p>
                      </div>
                      <span className="ml-auto font-display text-lg font-extrabold text-primary">%{tp.pct}</span>
                    </div>
                    <Progress value={tp.pct} className="h-2" aria-label={t(`${track.label} ilerlemesi`, `${track.label} progress`)} />
                    <p className="text-xs font-semibold text-muted-foreground">
                      {tp.done}/{tp.total} {t("ders", "lessons")} · {t("Seviye", "Level")} {track.from}–{track.to}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="card-surface p-5">
            <h2 className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-accent" /> {t("İlk 3", "Top 3")}
            </h2>
            <ol className="mt-4 space-y-3">
              {leaders.slice(0, 3).map((row, index) => (
                <li key={row.user_id} className="flex items-center gap-3">
                  <span className="w-6 text-center font-display text-lg font-extrabold text-muted-foreground">
                    {["🥇", "🥈", "🥉"][index]}
                  </span>
                  <PlayerAvatar size="sm" shape={row.avatar_shape} color={row.avatar_color} />
                  <span className="min-w-0 flex-1 truncate text-sm font-bold">{row.username}</span>
                  <span className="text-sm font-bold text-primary">{row.xp} XP</span>
                </li>
              ))}
              {leaders.length === 0 && (
                <li className="text-sm text-muted-foreground">{t("Henüz kimse XP kazanmadı. İlk sen ol!", "No one has earned XP yet. Be the first!")}</li>
              )}
            </ol>
            <Button asChild variant="ghost" className="mt-4 w-full font-bold">
              <Link to="/leaderboard">{t("Tüm tabloyu gör", "See full leaderboard")}</Link>
            </Button>
          </section>

          <section className="card-surface p-5">
            <h2 className="text-lg">{t("Günün ipucu 💡", "Tip of the day 💡")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Takıldığında sağ alttaki asistanı aç. Sana cevabı vermez ama doğru soruyu sormanı sağlar.",
                "When you get stuck, open the assistant in the bottom right. It won't give you the answer, but helps you ask the right question.",
              )}
            </p>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="card-surface flex items-center gap-3 p-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">{icon}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="font-display text-xl font-extrabold">{value}</p>
      </div>
    </div>
  );
}

function LessonCard({
  level,
  title,
  description,
  done,
  locked,
}: {
  level: number;
  title: string;
  description: string;
  done: boolean;
  locked: boolean;
}) {
  const t = useT();
  const content = (
    <div
      className={cn(
        "card-surface flex h-full items-start gap-3 p-4 transition-transform",
        !locked && "hover:-translate-y-0.5",
        locked && "opacity-60",
        done && "border-success",
      )}
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-extrabold",
          done
            ? "bg-success text-success-foreground"
            : locked
              ? "bg-locked text-muted-foreground"
              : "bg-primary-soft text-primary",
        )}
      >
        {done ? <Check className="h-5 w-5" /> : locked ? <Lock className="h-4 w-4" /> : level}
      </span>
      <div className="min-w-0">
        <p className="font-display text-sm font-bold">
          {level}. {title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{locked ? t("Önceki dersi bitir 🔒", "Finish previous lesson 🔒") : description}</p>
      </div>
    </div>
  );

  if (locked) return <div aria-disabled="true">{content}</div>;
  return (
    <Link to="/lesson/$level" params={{ level: String(level) }} aria-label={t(`Seviye ${level}: ${title}`, `Level ${level}: ${title}`)}>
      {content}
    </Link>
  );
}
