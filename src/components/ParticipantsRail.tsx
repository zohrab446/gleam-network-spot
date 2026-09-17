import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Trophy, Users } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLeaderboard } from "@/hooks/useGameData";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export function ParticipantsRail() {
  const [scope, setScope] = useState<"monthly" | "all">("monthly");
  const t = useT();
  const { user } = useAuth();
  const { data: rows = [], isLoading } = useLeaderboard(scope);

  const myIndex = rows.findIndex((row) => row.user_id === user?.id);
  const me = myIndex >= 0 ? rows[myIndex] : undefined;
  const ahead = myIndex > 0 ? rows[myIndex - 1] : undefined;
  const xpOf = (row: { xp: number; monthly_xp: number }) => (scope === "monthly" ? row.monthly_xp : row.xp);
  const gap = me && ahead ? Math.max(xpOf(ahead) - xpOf(me), 0) : null;

  return (
    <aside
      className="sticky top-20 hidden h-[calc(100vh-6rem)] w-72 shrink-0 flex-col gap-3 xl:flex"
      aria-label={t("Katılımcılar", "Participants")}
    >
      <div className="card-surface flex min-h-0 flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-base">{t("Katılımcılar", "Participants")}</h2>
          <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-muted-foreground">
            {rows.length}
          </span>
        </div>

        <div className="mt-3 inline-flex rounded-xl bg-secondary p-1" role="tablist" aria-label={t("Yarışma aralığı", "Ranking range")}>
          {(
            [
              { id: "monthly", label: t("Bu ay", "This month") },
              { id: "all", label: t("Tüm zaman", "All time") },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={scope === tab.id}
              onClick={() => setScope(tab.id)}
              className={cn(
                "flex-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                scope === tab.id ? "bg-card text-primary shadow-card" : "text-muted-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {gap !== null && (
          <p className="mt-3 rounded-xl bg-primary-soft px-3 py-2 text-xs font-bold text-primary">
            {gap === 0
              ? t(`${ahead?.username} ile başabaşsın! 🔥`, `You are tied with ${ahead?.username}! 🔥`)
              : t(`${ahead?.username}'i geçmek için ${gap} XP kaldı 🚀`, `${gap} XP left to pass ${ahead?.username} 🚀`)}
          </p>
        )}

        <ol className="mt-3 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-11 rounded-xl" />)}

          {!isLoading &&
            rows.map((row) => (
              <li
                key={row.user_id}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-2 py-1.5",
                  row.user_id === user?.id ? "bg-primary-soft" : "hover:bg-secondary",
                )}
              >
                <span className="w-5 text-center font-display text-xs font-extrabold text-muted-foreground">
                  {row.rank_position <= 3 ? ["🥇", "🥈", "🥉"][row.rank_position - 1] : row.rank_position}
                </span>
                <PlayerAvatar size="sm" shape={row.avatar_shape} color={row.avatar_color} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-bold">
                    {row.username}
                    {row.is_pro && " 👑"}
                    {row.user_id === user?.id && t(" (sen)", " (you)")}
                  </span>
                  <span className="block truncate text-[11px] font-semibold text-muted-foreground">
                    🪙 {row.coins} · 🔥 {row.streak}
                  </span>
                </span>
                <span className="text-xs font-extrabold text-primary">{xpOf(row)} XP</span>
              </li>
            ))}

          {!isLoading && rows.length === 0 && (
            <li className="text-xs text-muted-foreground">{t("Henüz katılımcı yok. İlk sen ol!", "No participants yet. Be the first!")}</li>
          )}
        </ol>

        <Link
          to="/leaderboard"
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-secondary py-2 text-xs font-bold text-secondary-foreground transition-colors hover:bg-primary-soft hover:text-primary"
        >
          <Trophy className="h-4 w-4" /> {t("Tüm tabloyu gör", "View full leaderboard")}
        </Link>
      </div>
    </aside>
  );
}
