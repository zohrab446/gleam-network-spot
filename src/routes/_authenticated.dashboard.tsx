import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Coins, Flame, Lock, Play, Trophy, Zap } from "lucide-react";
import { CATEGORIES, LANGUAGE_META, LESSONS, MAX_LEVEL, isLessonUnlocked } from "@/data/lessons";
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
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();
  const { data: progress = [], isLoading: progressLoading } = useProgress();
  const { data: leaders = [] } = useLeaderboard("all");
  const touchStreak = useTouchStreak(profile);

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

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <section className="card-surface pop-in overflow-hidden">
            <div className="bg-brand-gradient flex flex-wrap items-center gap-4 p-6 text-primary-foreground">
              <PlayerAvatar shape={profile.avatar_shape} color={profile.avatar_color} size="lg" />
              <div className="min-w-0">
                <h1 className="truncate text-2xl">Merhaba, {profile.username ?? "Kodcu"}!</h1>
                <p className="text-sm opacity-90">
                  {completed.size} ders tamamlandı · {MAX_LEVEL - completed.size} ders kaldı
                </p>
              </div>
              <Button asChild size="lg" variant="secondary" className="ml-auto font-bold">
                <Link to="/lesson/$level" params={{ level: String(continueLevel) }}>
                  <Play className="mr-1 h-4 w-4" /> Devam et
                </Link>
              </Button>
            </div>

            <div className="p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    Şu anki seviye
                  </p>
                  <p className="font-display text-5xl font-extrabold text-gradient-brand">{profile.level}</p>
                </div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Sonraki seviyeye {Math.max(0, xpRewardFor(profile.level) - Math.round((pct / 100) * xpRewardFor(profile.level)))} XP
                </p>
              </div>
              <Progress value={pct} className="mt-3 h-3" aria-label="Seviye ilerlemesi" />
              {multiplier > 1 && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-sm font-bold text-success">
                  🔥 7+ gün seri: XP'ler 2 katı!
                </p>
              )}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={<Flame className="h-5 w-5 text-streak" />} label="Günlük seri" value={`${profile.streak} gün`} />
            <StatCard icon={<Coins className="h-5 w-5 text-coin" />} label="Coin" value={profile.coins} />
            <StatCard icon={<Zap className="h-5 w-5 text-primary" />} label="Toplam XP" value={profile.xp} />
          </section>

          <section aria-labelledby="lessons-heading" className="space-y-4">
            <h2 id="lessons-heading" className="text-xl">
              Teknoloji yolları
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
                    aria-label={`${track.label} yoluna devam et`}
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
                        <p className="truncate text-xs text-muted-foreground">{track.tagline}</p>
                      </div>
                      <span className="ml-auto font-display text-lg font-extrabold text-primary">%{tp.pct}</span>
                    </div>
                    <Progress value={tp.pct} className="h-2" aria-label={`${track.label} ilerlemesi`} />
                    <p className="text-xs font-semibold text-muted-foreground">
                      {tp.done}/{tp.total} ders · Seviye {track.from}–{track.to}
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
              <Trophy className="h-5 w-5 text-accent" /> İlk 3
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
                <li className="text-sm text-muted-foreground">Henüz kimse XP kazanmadı. İlk sen ol!</li>
              )}
            </ol>
            <Button asChild variant="ghost" className="mt-4 w-full font-bold">
              <Link to="/leaderboard">Tüm tabloyu gör</Link>
            </Button>
          </section>

          <section className="card-surface p-5">
            <h2 className="text-lg">Günün ipucu 💡</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Takıldığında sağ alttaki asistanı aç. Sana cevabı vermez ama doğru soruyu sormanı sağlar.
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
        <p className="mt-0.5 text-xs text-muted-foreground">{locked ? "Önceki dersi bitir 🔒" : description}</p>
      </div>
    </div>
  );

  if (locked) return <div aria-disabled="true">{content}</div>;
  return (
    <Link to="/lesson/$level" params={{ level: String(level) }} aria-label={`Seviye ${level}: ${title}`}>
      {content}
    </Link>
  );
}
