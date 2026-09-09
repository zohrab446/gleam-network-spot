import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Share2, Trophy } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useLeaderboard, useProfile } from "@/hooks/useGameData";
import { AppShell } from "@/components/AppShell";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/leaderboard")({
  head: () => ({
    meta: [
      { title: "Liderlik Tablosu — CodeQuest" },
      { name: "description", content: "Haftalık ve tüm zamanların en iyi 50 CodeQuest oyuncusunu gör." },
      { property: "og:title", content: "Liderlik Tablosu — CodeQuest" },
      { property: "og:description", content: "Sıralamada nerede olduğunu gör ve arkadaşlarını geç." },
    ],
  }),
  component: Leaderboard,
});

function Leaderboard() {
  const [scope, setScope] = useState<"weekly" | "all">("all");
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: rows = [], isLoading } = useLeaderboard(scope);

  const myRow = rows.find((row) => row.user_id === user?.id);

  async function share() {
    const text = `CodeQuest'te ${profile?.level ?? 1}. seviyedeyim ve ${profile?.xp ?? 0} XP topladım! 🚀`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "CodeQuest", text });
        return;
      }
      await navigator.clipboard.writeText(text);
      toast.success("Skorun kopyalandı, paylaşabilirsin!");
    } catch {
      toast.error("Paylaşım şu an mümkün değil.");
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-5">
        <header className="flex flex-wrap items-center gap-3">
          <h1 className="flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-accent" /> Liderlik Tablosu
          </h1>
          <Button variant="ghost" className="ml-auto font-bold" onClick={() => void share()}>
            <Share2 className="mr-1 h-4 w-4" /> Skorumu paylaş
          </Button>
        </header>

        <div className="inline-flex rounded-xl bg-secondary p-1" role="tablist" aria-label="Zaman aralığı">
          {(
            [
              { id: "weekly", label: "Bu hafta" },
              { id: "all", label: "Tüm zamanlar" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={scope === tab.id}
              onClick={() => setScope(tab.id)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-bold transition-colors",
                scope === tab.id ? "bg-card text-primary shadow-card" : "text-muted-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {myRow && (
          <div className="card-surface flex items-center gap-3 border-primary p-4">
            <span className="font-display text-xl font-extrabold text-primary">#{myRow.rank_position}</span>
            <PlayerAvatar shape={myRow.avatar_shape} color={myRow.avatar_color} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{myRow.username} (sen)</p>
              <p className="text-sm text-muted-foreground">Seviye {myRow.level}</p>
            </div>
            <span className="font-display font-extrabold text-primary">
              {scope === "weekly" ? myRow.weekly_xp : myRow.xp} XP
            </span>
          </div>
        )}

        <ol className="space-y-2">
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-16 rounded-2xl" />)}
          {!isLoading &&
            rows.map((row) => (
              <li
                key={row.user_id}
                className={cn(
                  "card-surface flex items-center gap-3 p-4",
                  row.user_id === user?.id && "bg-primary-soft",
                )}
              >
                <span className="w-10 text-center font-display text-lg font-extrabold text-muted-foreground">
                  {row.rank_position <= 3 ? ["🥇", "🥈", "🥉"][row.rank_position - 1] : row.rank_position}
                </span>
                <PlayerAvatar shape={row.avatar_shape} color={row.avatar_color} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{row.username}</p>
                  <p className="text-sm text-muted-foreground">
                    Seviye {row.level} · 🔥 {row.streak} gün
                  </p>
                </div>
                <span className="font-display font-extrabold text-primary">
                  {scope === "weekly" ? row.weekly_xp : row.xp} XP
                </span>
              </li>
            ))}
          {!isLoading && rows.length === 0 && (
            <li className="card-surface p-6 text-center text-muted-foreground">
              Henüz sıralama yok. İlk dersi bitirip zirveye çık!
            </li>
          )}
        </ol>
      </div>
    </AppShell>
  );
}
