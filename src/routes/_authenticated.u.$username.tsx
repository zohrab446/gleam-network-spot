import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Award, BookOpen, Flame, Github, Star } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useUserProjects } from "@/hooks/useProjects";

type PublicProfile = { id: string; username: string; avatar_shape: string; avatar_color: string; level: number; xp: number; streak: number; longest_streak: number; favorite_language: string | null; is_pro: boolean; created_at: string; badges: string[]; lessons: number };

export const Route = createFileRoute("/_authenticated/u/$username")({
  head: ({ params }) => ({ meta: [
    { title: `${params.username} — CodeQuest Profili` },
    { name: "description", content: `${params.username} kullanıcısının CodeQuest seviyesi, rozetleri ve projeleri.` },
    { property: "og:title", content: `${params.username} — CodeQuest Profili` },
    { property: "og:description", content: "Seviye, rozetler ve projeler." },
    { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: PublicProfilePage,
});

function PublicProfilePage() {
  const { username } = Route.useParams();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["public-profile", username.toLowerCase()],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_public_profile", { p_username: username });
      if (error) throw error;
      return data as unknown as PublicProfile | null;
    },
  });
  const { data: projects = [] } = useUserProjects(profile?.id);

  if (isLoading) return <AppShell dashboard><p className="py-12 text-center text-sm text-muted-foreground">Yükleniyor…</p></AppShell>;
  if (!profile) return <AppShell dashboard><div className="py-12 text-center"><h1 className="text-2xl">Kullanıcı bulunamadı</h1><Button asChild variant="link"><Link to="/leaderboard">Sıralamaya dön</Link></Button></div></AppShell>;

  const stats = [
    { icon: Star, label: "Seviye", value: profile.level },
    { icon: Award, label: "Toplam XP", value: profile.xp.toLocaleString("tr-TR") },
    { icon: BookOpen, label: "Tamamlanan ders", value: profile.lessons },
    { icon: Flame, label: "En uzun seri", value: `${profile.longest_streak} gün` },
  ];
  return <AppShell dashboard><div className="mx-auto max-w-5xl space-y-5">
    <section className="cq-hero flex flex-wrap items-center gap-4 rounded-2xl p-6">
      <PlayerAvatar shape={profile.avatar_shape} color={profile.avatar_color} size="lg" />
      <div className="min-w-0"><h1 className="break-words text-2xl font-extrabold">{profile.username}{profile.is_pro && " 👑"}</h1>
        <p className="mt-1 text-xs opacity-85">{new Date(profile.created_at).toLocaleDateString("tr-TR", { month: "long", year: "numeric" })} tarihinden beri üye{profile.favorite_language ? ` · Favori dil: ${profile.favorite_language}` : ""}</p></div>
    </section>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{stats.map(({ icon: Icon, label, value }) => <div key={label} className="card-surface flex items-center gap-3 p-4"><Icon className="size-5 shrink-0 text-primary" /><div className="min-w-0"><p className="truncate text-base font-extrabold">{value}</p><p className="text-[10px] text-muted-foreground">{label}</p></div></div>)}</div>
    {profile.badges.length > 0 && <section className="card-surface p-4"><h2 className="text-sm">Rozetler ({profile.badges.length})</h2><div className="mt-3 flex flex-wrap gap-2">{profile.badges.map((b) => <span key={b} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">{b}</span>)}</div></section>}
    <section className="space-y-3"><h2 className="text-lg">Projeler ({projects.length})</h2>
      {projects.length === 0 ? <p className="card-surface p-8 text-center text-xs text-muted-foreground">Bu kullanıcı henüz proje eklemedi.</p> :
      <div className="grid gap-4 md:grid-cols-2">{projects.map((p) => <article key={p.id} className="card-surface p-4">
        {p.cover && <img src={p.cover} alt={p.title} className="mb-3 h-36 w-full rounded-xl object-cover" loading="lazy" />}
        <div className="flex items-start justify-between gap-2"><h3 className="break-words text-sm font-extrabold">{p.featured && "★ "}{p.title}</h3><span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold">{p.status}</span></div>
        <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-muted-foreground">{p.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">{p.tech.map((t) => <span key={t} className="rounded-md bg-primary-soft px-2 py-0.5 text-[9px] font-bold text-primary">{t}</span>)}</div>
        <div className="mt-3 flex gap-2">{p.github && <Button asChild variant="outline" size="sm" className="h-7 flex-1 text-[10px]"><a href={p.github} target="_blank" rel="noopener noreferrer nofollow"><Github className="size-3" />GitHub</a></Button>}{p.demo && <Button asChild size="sm" className="h-7 flex-1 text-[10px]"><a href={p.demo} target="_blank" rel="noopener noreferrer nofollow">Canlı Demo<ArrowRight className="size-3" /></a></Button>}</div>
      </article>)}</div>}
    </section>
  </div></AppShell>;
}
