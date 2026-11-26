import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { TRACKS } from "@/data/types";
import { nextLevelInTrack, trackProgress } from "@/data/lessons";
import { useProgress } from "@/hooks/useGameData";
import { AppShell } from "@/components/AppShell";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/ogren")({
  head: () => ({ meta: [
    { title: "Öğren — CodeQuest Öğrenme Yolları" }, { name: "description", content: "Tüm CodeQuest öğrenme yollarını gör, ilerlemeni takip et ve kaldığın dersten devam et." },
    { property: "og:title", content: "Öğren — CodeQuest" }, { property: "og:description", content: "HTML, CSS, JavaScript, React ve daha fazlasını adım adım öğren." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: Learn,
});

function Learn() {
  const { data: progress = [], isLoading } = useProgress();
  const completed = new Set(progress.map((p) => p.level));
  return <AppShell dashboard><section className="space-y-4">
    <div><h1 className="flex items-center gap-2 text-2xl font-extrabold"><BookOpen className="size-6 text-primary" />Öğrenme Yolları</h1><p className="mt-1 text-xs text-muted-foreground">Bir yol seç, kaldığın dersten devam et.</p></div>
    {isLoading ? <div className="cq-track-grid">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44" />)}</div> :
    <div className="cq-track-grid">{TRACKS.map((track) => { const tp = trackProgress(track, completed); const target = nextLevelInTrack(track, completed); return <Link key={track.id} to="/lesson/$level" params={{ level: String(target) }} className="card-surface relative p-4 transition-transform hover:-translate-y-1"><span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full border border-border bg-primary-soft text-primary"><ArrowRight className="size-3" /></span><span className="flex h-11 items-center text-3xl font-extrabold text-primary">{track.emoji}</span><h3 className="mt-2 text-sm">{track.label}</h3><p className="mt-1 min-h-8 text-[10px] leading-4 text-muted-foreground">{track.tagline}</p><p className="mt-3 text-right text-[10px] font-bold text-primary">%{tp.pct}</p><Progress value={tp.pct} className="mt-1 h-1.5" /><p className="mt-2 text-[10px] text-muted-foreground">{tp.done}/{tp.total} ders</p></Link>; })}</div>}
  </section></AppShell>;
}
