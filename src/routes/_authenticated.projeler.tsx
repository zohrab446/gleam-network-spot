import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Eye, Folder, Github, Heart, Lightbulb, MoreHorizontal, Plus, Search, Star, Trophy } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import mascot from "@/assets/mascot.png";
import { useAuth } from "@/lib/auth";
import { useProjectMutations, useUserProjects } from "@/hooks/useProjects";

export const Route = createFileRoute("/_authenticated/projeler")({
  head: () => ({ meta: [
    { title: "Projelerim — CodeQuest" }, { name: "description", content: "Yaptığın projeleri sergile, GitHub bağlantılarını ekle ve topluluğla paylaş. Portföyün, öğrenme yolculuğunun en güçlü kanıtıdır." },
    { property: "og:title", content: "Projelerim — CodeQuest" }, { property: "og:description", content: "Projelerini sergile, GitHub bağlantılarını ekle ve topluluğla paylaş." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: ProjectsPage,
});

type ProjectStatus = "Yayında" | "Tamamlandı" | "Geliştirme Aşamasında" | "Takım Projesi";
type Project = { id: string; title: string; description: string; tech: string[]; status: ProjectStatus; category: "Web" | "Mobil" | "AI" | "Takım Projesi"; views: string; likes: number; updated: string; github: string; demo: string; icon: string; cover?: string; coverPath: string; featured?: boolean };


const STATUS_TONE: Record<ProjectStatus, string> = {
  "Yayında": "bg-success-soft text-success",
  "Tamamlandı": "bg-primary-soft text-primary",
  "Geliştirme Aşamasında": "bg-secondary text-warning",
  "Takım Projesi": "bg-accent-soft text-accent",
};
const FILTERS = ["Tümü", "Web", "Mobil", "AI", "Takım Projesi"] as const;

function ProjectsPage() {
  const { user } = useAuth();
  const { data: rows = [] } = useUserProjects(user?.id);
  const { save, remove, feature } = useProjectMutations(user?.id);
  const projects: Project[] = useMemo(() => rows.map((r) => ({ id: r.id, title: r.title, description: r.description, tech: r.tech, status: r.status as ProjectStatus, category: r.category as Project["category"], views: "0", likes: 0, updated: new Date(r.updated_at).toLocaleDateString("tr-TR"), github: r.github, demo: r.demo, cover: r.cover, coverPath: r.coverPath ?? r.cover, icon: "🚀", featured: r.featured })), [rows]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Tümü");
  const [sort, setSort] = useState("newest");
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", tech: "", github: "", demo: "", category: "Web" as Project["category"], status: "Geliştirme Aşamasında" as ProjectStatus });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [removeCover, setRemoveCover] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    let list = projects.filter((p) => (filter === "Tümü" || p.category === filter) && (!q || `${p.title} ${p.description} ${p.tech.join(" ")}`.toLocaleLowerCase("tr").includes(q)));
    if (sort === "likes") list = [...list].sort((a, b) => b.likes - a.likes);
    if (sort === "views") list = [...list].sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
    return list;
  }, [projects, query, filter, sort]);

  function editProject(project: Project) {
    setEditing(project.id);
    setForm({ title: project.title, description: project.description, tech: project.tech.join(", "), github: project.github, demo: project.demo, category: project.category, status: project.status });
    setCoverFile(null);
    setCoverPreview(project.cover ?? "");
    setRemoveCover(false);
    setAddOpen(true);
  }
  function addProject() {
    if (!form.title.trim() || !form.description.trim()) { toast.error("Proje adı ve açıklaması gerekli."); return; }
    for (const value of [form.github, form.demo]) {
      if (value && !/^https?:\/\//i.test(value)) { toast.error("Bağlantılar http:// veya https:// ile başlamalı."); return; }
    }
    const previousCover = editing ? projects.find((project) => project.id === editing)?.coverPath ?? "" : "";
    const input = { title: form.title.trim(), description: form.description.trim(), tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean), status: form.status, category: form.category, github: form.github.trim(), demo: form.demo.trim(), cover: removeCover ? "" : previousCover };
    save.mutate({ id: editing, input, coverFile }, {
      onSuccess: () => { setAddOpen(false); setEditing(null); setForm({ title: "", description: "", tech: "", github: "", demo: "", category: "Web", status: "Geliştirme Aşamasında" }); setCoverFile(null); setCoverPreview(""); setRemoveCover(false); toast.success("Proje kaydedildi."); },
      onError: (error) => toast.error(error instanceof Error && error.message === "Kapak görseli yüklenemedi. Tekrar dene." ? error.message : "Proje kaydedilemedi."),
    });
  }

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const checklist: [string, boolean][] = [["İlk projeni ekle", projects.length > 0], ["GitHub bağlantısı ekle", projects.some((p) => p.github)], ["En az 3 proje ekle", projects.length >= 3], ["Öne çıkan proje belirle", projects.some((p) => p.featured)]];
  const completion = Math.round((checklist.filter(([, d]) => d).length / checklist.length) * 100);
  const totalLikes = projects.reduce((sum, p) => sum + p.likes, 0);

  return <AppShell dashboard><div className="cq-dashboard-grid"><div className="min-w-0 space-y-5">
    <section className="cq-dashboard-hero cq-hero"><img src={mascot} className="cq-dashboard-mascot" alt="CodeQuest maskotu" /><div className="relative z-10 max-w-[62%] max-sm:max-w-full"><h1 className="text-3xl font-extrabold">Projelerim</h1><p className="mt-2 max-w-lg text-xs leading-6 text-hero-foreground/85">Yaptığın projeleri sergile, GitHub bağlantılarını ekle ve topluluğla paylaş.<br className="hidden sm:block" /> Portföyün, öğrenme yolculuğunun en güçlü kanıtıdır. 🚀</p></div></section>

    <div className="flex flex-wrap items-center gap-2">
      <label className="flex min-w-52 flex-1 items-center gap-2 rounded-full bg-card px-4 py-2.5 shadow-card"><Search className="size-4 shrink-0 text-muted-foreground" /><input aria-label="Projelerde ara" placeholder="Projelerde ara..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-xs outline-none" /></label>
      {FILTERS.map((f) => <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} className={filter === f ? "" : "bg-card"} onClick={() => setFilter(f)}>{f}</Button>)}
      <Select value={sort} onValueChange={setSort}><SelectTrigger className="w-36 bg-card text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="newest">En Yeniler</SelectItem><SelectItem value="likes">En Beğenilen</SelectItem><SelectItem value="views">En Çok Görüntülenen</SelectItem></SelectContent></Select>
      <Button size="sm" onClick={() => { setEditing(null); setForm({ title: "", description: "", tech: "", github: "", demo: "", category: "Web", status: "Geliştirme Aşamasında" }); setCoverFile(null); setCoverPreview(""); setRemoveCover(false); setAddOpen(true); }}><Plus />Yeni Proje Ekle</Button>
    </div>

    <div className="grid gap-4 lg:grid-cols-2">{visible.map((p) => <article key={p.id} className="card-surface p-4">
      <div className="flex gap-3">
        <div className="cq-hero relative flex w-40 shrink-0 items-center justify-center rounded-xl text-4xl max-sm:w-28"><span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold ${STATUS_TONE[p.status]}`}>{p.status}</span>{p.cover ? <img src={p.cover} alt={p.title} className="h-full min-h-32 w-full rounded-xl object-cover" /> : p.icon}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2"><h2 className="truncate text-sm font-extrabold">{p.title}</h2>
            <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-7 shrink-0" aria-label="Proje menüsü"><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => editProject(p)}>Düzenle</DropdownMenuItem><DropdownMenuItem onClick={() => feature.mutate(p.id, { onError: () => toast.error("Güncellenemedi.") })}>Öne çıkar</DropdownMenuItem><DropdownMenuItem className="text-destructive" onClick={() => { if (window.confirm("Projeyi silmek istiyor musun?")) remove.mutate(p.id, { onSuccess: () => toast.success("Proje silindi."), onError: () => toast.error("Silinemedi.") }); }}>Sil</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
          <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground">{p.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">{p.tech.slice(0, 3).map((t) => <span key={t} className="rounded-md bg-primary-soft px-2 py-0.5 text-[9px] font-bold text-primary">{t}</span>)}{p.tech.length > 3 && <span className="rounded-md bg-secondary px-2 py-0.5 text-[9px] font-bold text-muted-foreground">+{p.tech.length - 3}</span>}</div>
          <div className="mt-2 flex gap-2"><Button asChild variant="outline" size="sm" className="h-7 flex-1 text-[10px]" disabled={!p.github}><a href={p.github} target="_blank" rel="noreferrer"><Github className="size-3" />GitHub</a></Button><Button asChild size="sm" className="h-7 flex-1 text-[10px]" disabled={!p.demo}><a href={p.demo} target="_blank" rel="noreferrer">Canlı Demo<ArrowRight className="size-3" /></a></Button></div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[10px] text-muted-foreground"><span className="flex items-center gap-3"><span className="flex items-center gap-1"><Eye className="size-3" />{p.views}</span><span className="flex items-center gap-1"><Heart className="size-3 text-destructive" />{p.likes}</span></span><span>{p.updated}</span></div>
    </article>)}</div>
    {!visible.length && <p className="card-surface p-8 text-center text-xs text-muted-foreground">{projects.length ? "Bu filtreye uyan proje bulunamadı." : "Henüz proje eklemedin. \"Yeni Proje Ekle\" ile ilk projeni ekle."}</p>}
  </div>

  <aside className="min-w-0 space-y-4">
    <section className="card-surface p-4"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm"><Folder className="size-4 text-primary" />Portföy İstatistikleri</h2><Button asChild variant="link" size="sm"><Link to="/profile">Profilimi Gör<ArrowRight /></Link></Button></div>
      <div className="mt-3 grid grid-cols-2 gap-2">{[{ icon: Folder, tone: "text-primary", value: String(projects.length), label: "Proje Sayısı" }, { icon: Eye, tone: "text-accent", value: "0", label: "Profil Görüntüleme" }, { icon: Github, tone: "text-foreground", value: projects.some((p) => p.github) ? "Eklendi" : "Yok", label: "GitHub Bağlantısı" }, { icon: Heart, tone: "text-destructive", value: totalLikes.toLocaleString("tr-TR"), label: "Toplam Beğeni" }].map(({ icon: Icon, tone, value, label }) => <div key={label} className="flex items-center gap-3 rounded-xl border border-border p-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary"><Icon className={`size-4 ${tone}`} /></span><div className="min-w-0"><p className="truncate text-sm font-extrabold">{value}</p><p className="text-[9px] text-muted-foreground">{label}</p></div></div>)}</div></section>

    {featured && <section className="card-surface p-4"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm"><Trophy className="size-4 text-coin" />Öne Çıkan Projem</h2><Button variant="link" size="sm" onClick={() => editProject(featured)}>Düzenle</Button></div>
      <div className="mt-3 flex gap-3"><div className="cq-hero relative flex w-24 shrink-0 items-center justify-center rounded-xl text-3xl"><span className="absolute left-1.5 top-1.5 rounded-full bg-coin px-1.5 py-0.5 text-[8px] font-bold text-foreground">★ Öne Çıkan</span>{featured.icon}</div><div className="min-w-0"><h3 className="text-sm font-extrabold">{featured.title}</h3><p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground">{featured.description}</p><div className="mt-2 flex flex-wrap gap-1">{featured.tech.slice(0, 3).map((t) => <span key={t} className="rounded-md bg-primary-soft px-2 py-0.5 text-[9px] font-bold text-primary">{t}</span>)}</div><div className="mt-2 flex items-center gap-3 text-[9px] text-muted-foreground"><span className="flex items-center gap-1"><Eye className="size-3" />{featured.views}</span><span className="flex items-center gap-1"><Heart className="size-3 text-destructive" />{featured.likes}</span><Button asChild size="sm" className="ml-auto h-6 text-[9px]"><a href={featured.demo} target="_blank" rel="noreferrer">Canlı Demo</a></Button></div></div></div></section>}

    <section className="card-surface p-4"><h2 className="flex items-center gap-2 text-sm"><Star className="size-4 text-primary" />Portföy Tamamlama Durumu</h2>
      <div className="mt-4 flex items-center gap-4"><div className="relative flex size-24 shrink-0 items-center justify-center"><svg viewBox="0 0 64 64" className="absolute inset-0 size-24 -rotate-90" aria-label={`Portföy tamamlama yüzde ${completion}`}><circle cx="32" cy="32" r="28" fill="none" strokeWidth="6" className="text-primary-soft" stroke="currentColor" /><circle cx="32" cy="32" r="28" fill="none" strokeWidth="6" strokeLinecap="round" className="text-primary" stroke="currentColor" strokeDasharray={`${completion * 1.759} 175.9`} /></svg><span className="text-xl font-extrabold">{completion}%</span></div>
        <div className="min-w-0"><ul className="space-y-1 text-[10px]">{checklist.map(([item, done]) => <li key={item} className={`flex items-center gap-1.5 ${done ? "text-success" : "text-muted-foreground"}`}>{done ? <Check className="size-3" /> : <span className="size-3 rounded-full border border-border" />}{item}</li>)}</ul></div></div></section>

    <section className="card-surface flex gap-3 p-4"><Lightbulb className="size-6 shrink-0 text-coin" /><div><h2 className="text-sm">İpucu</h2><p className="mt-1 text-[10px] leading-4 text-muted-foreground">Projelerini detaylı açıklamalarla zenginleştir, kullandığın teknolojileri belirt ve mümkünse canlı demo linki ekle. Bu, portföyünün daha fazla görünmesini sağlar.</p></div></section>
  </aside></div>

  <Dialog open={addOpen} onOpenChange={setAddOpen}><DialogContent className="max-w-lg"><DialogHeader><DialogTitle>{editing ? "Projeyi Düzenle" : "Yeni Proje Ekle"}</DialogTitle></DialogHeader>
    <div className="space-y-3">
      <div><Label htmlFor="p-title">Proje adı</Label><Input id="p-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Örn. Learnify" /></div>
      <div><Label htmlFor="p-desc">Açıklama</Label><Textarea id="p-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Projen ne yapıyor, hangi problemi çözüyor?" rows={3} /></div>
      <div><Label htmlFor="p-tech">Teknolojiler (virgülle ayır)</Label><Input id="p-tech" value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} placeholder="React, Node.js, PostgreSQL" /></div>
      <div className="grid gap-3 sm:grid-cols-2"><div><Label htmlFor="p-github">GitHub URL</Label><Input id="p-github" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." /></div><div><Label htmlFor="p-demo">Canlı demo URL</Label><Input id="p-demo" value={form.demo} onChange={(e) => setForm({ ...form, demo: e.target.value })} placeholder="https://..." /></div></div>
      <div><Label htmlFor="p-cover">Kapak görseli</Label><Input id="p-cover" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { toast.error("JPG, PNG veya WebP görsel seç."); e.currentTarget.value = ""; return; } if (file.size > 5 * 1024 * 1024) { toast.error("Görsel en fazla 5 MB olabilir."); e.currentTarget.value = ""; return; } setCoverFile(file); setRemoveCover(false); const reader = new FileReader(); reader.onload = () => { if (typeof reader.result === "string") setCoverPreview(reader.result); }; reader.readAsDataURL(file); }} /><p className="mt-1 text-[10px] text-muted-foreground">JPG, PNG veya WebP · En fazla 5 MB. Bağlantı eklemene gerek yok.</p>{coverPreview && !removeCover && <div className="relative mt-2"><img src={coverPreview} alt="Seçilen kapak önizlemesi" className="h-32 w-full rounded-xl object-cover" /><Button type="button" variant="secondary" size="sm" className="absolute right-2 top-2" onClick={() => { setCoverFile(null); setCoverPreview(""); setRemoveCover(true); const input = document.getElementById("p-cover"); if (input instanceof HTMLInputElement) input.value = ""; }}>Kapağı kaldır</Button></div>}</div>
      <div><Label>Kategori</Label><Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Project["category"] })}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{FILTERS.filter((f) => f !== "Tümü").map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select></div>
      <div><Label>Durum</Label><Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as ProjectStatus })}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent>{(["Yayında", "Tamamlandı", "Geliştirme Aşamasında", "Takım Projesi"] as const).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
      <Button className="w-full" disabled={save.isPending} onClick={addProject}><Plus />{save.isPending ? "Kaydediliyor…" : editing ? "Değişiklikleri Kaydet" : "Projeyi Ekle"}</Button>
    </div></DialogContent></Dialog>
  </AppShell>;
}
