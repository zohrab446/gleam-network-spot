import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, GraduationCap, Play, Plus, Search, Trophy, Users, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLeaderboard, useProfile } from "@/hooks/useGameData";
import { toast } from "sonner";
import mascot from "@/assets/mascot.png";

export const Route = createFileRoute("/_authenticated/yarismalar")({
  head: () => ({ meta: [
    { title: "Yarışmalar — CodeQuest" }, { name: "description", content: "Gerçek problemler, gerçek fırsatlar. CodeQuest yarışmalarında kendini göster, ödüller kazan, geleceğini inşa et." },
    { property: "og:title", content: "Yarışmalar — CodeQuest" }, { property: "og:description", content: "Kendini göster, ödüller kazan, geleceğini inşa et." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: CompetitionsPage,
});

type Competition = { id: string; title: string; description: string; date: string; participation: string; categories: string[]; badges: { label: string; tone: string }[]; icon: string; status: "active" | "soon" | "past" };

const COMPETITIONS: Competition[] = [
  { id: "hackathon", title: "Sürdürülebilir Yarınlar Hackathonu", description: "Daha yeşil bir gelecek için teknoloji çözümleri geliştir. İklim, enerji, eğitim veya sosyal fayda odaklı projelerle geleceği şekillendir!", date: "12 - 14 Nisan 2025", participation: "Bireysel / Takım", categories: ["Hackathon", "Jüri Değerlendirmesi"], badges: [{ label: "Öne Çıkan", tone: "bg-secondary text-warning" }, { label: "Açık", tone: "bg-success-soft text-success" }], icon: "🌱", status: "active" },
  { id: "ai-for-good", title: "AI for Good Challenge", description: "Yapay zeka ile toplumsal fayda sağlayan prototipler geliştir.", date: "5 - 20 Mart 2025", participation: "Bireysel / Takım", categories: ["Proje Yarışması", "Jüri Değerlendirmesi"], badges: [{ label: "Sponsorlu", tone: "bg-primary-soft text-primary" }, { label: "Açık", tone: "bg-success-soft text-success" }], icon: "🤖", status: "active" },
  { id: "oyunla-ogren", title: "Oyunla Öğren Proje Yarışması", description: "Eğitimi daha eğlenceli hale getiren oyun projeleri geliştir.", date: "1 - 30 Nisan 2025", participation: "Bireysel / Takım", categories: ["Proje Yarışması", "Sponsorlu"], badges: [{ label: "Açık", tone: "bg-success-soft text-success" }], icon: "🎮", status: "active" },
  { id: "fintech", title: "Geleceğin Fintech Çözümleri", description: "Finansal kapsayıcılık için yenilikçi teknoloji çözümleri üret.", date: "10 Mart - 10 Nisan 2025", participation: "Bireysel / Takım", categories: ["Proje Yarışması", "Ödüllü"], badges: [{ label: "Sponsorlu", tone: "bg-primary-soft text-primary" }, { label: "Açık", tone: "bg-success-soft text-success" }], icon: "💳", status: "active" },
  { id: "uzay", title: "Uzay ve Yaşam Teknolojileri", description: "Daha iyi bir yaşam için uzay teknolojilerinden ilham alan çözümler.", date: "1 - 30 Mayıs 2025", participation: "Bireysel / Takım", categories: ["Proje Yarışması"], badges: [{ label: "Yakında", tone: "bg-secondary text-muted-foreground" }], icon: "🚀", status: "soon" },
  { id: "akilli-sehir", title: "Akıllı Şehirler Ideathonu", description: "Daha yaşanabilir şehirler için yaratıcı fikirler geliştir.", date: "15 Mayıs - 15 Haziran 2025", participation: "Bireysel / Takım", categories: ["Ideathon", "Jüri Değerlendirmesi"], badges: [{ label: "Yakında", tone: "bg-secondary text-muted-foreground" }], icon: "🏙️", status: "soon" },
  { id: "web-maraton", title: "Web Geliştirme Maratonu", description: "48 saatte sıfırdan tam işlevsel bir web uygulaması geliştir.", date: "1 - 3 Şubat 2025", participation: "Bireysel", categories: ["Hackathon"], badges: [{ label: "Geçmiş", tone: "bg-secondary text-muted-foreground" }], icon: "💻", status: "past" },
  { id: "veri-bilimi", title: "Veri Bilimi Kış Kampı", description: "Gerçek veri setleriyle analiz ve görselleştirme yarışması.", date: "10 - 20 Ocak 2025", participation: "Takım", categories: ["Proje Yarışması"], badges: [{ label: "Geçmiş", tone: "bg-secondary text-muted-foreground" }], icon: "📊", status: "past" },
];

const APPLICATIONS = [
  { icon: "🌱", title: "Sürdürülebilir Yarınlar Hackathonu", detail: "Takım: GreenBits", date: "12 - 14 Nisan 2025", status: "Başvuru Tamamlandı", tone: "bg-success-soft text-success" },
  { icon: "🤖", title: "AI for Good Challenge", detail: "Bireysel katılım", date: "5 - 20 Mart 2025", status: "Değerlendiriliyor", tone: "bg-primary-soft text-primary" },
  { icon: "🎮", title: "Oyunla Öğren Proje Yarışması", detail: "Takım: PixelMind", date: "1 - 30 Nisan 2025", status: "Taslak", tone: "bg-secondary text-warning" },
];

function CompetitionsPage() {
  const [tab, setTab] = useState<"active" | "soon" | "past">("active");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [participation, setParticipation] = useState("all");
  const [boardScope, setBoardScope] = useState<"monthly" | "all">("monthly");
  const { data: profile } = useProfile();
  const { data: leaders = [] } = useLeaderboard(boardScope);

  const counts = useMemo(() => ({ active: COMPETITIONS.filter((c) => c.status === "active").length, soon: COMPETITIONS.filter((c) => c.status === "soon").length, past: COMPETITIONS.filter((c) => c.status === "past").length }), []);
  const visible = COMPETITIONS.filter((c) => {
    if (c.status !== tab) return false;
    const q = query.trim().toLocaleLowerCase("tr");
    if (q && !`${c.title} ${c.description}`.toLocaleLowerCase("tr").includes(q)) return false;
    if (category !== "all" && !c.categories.some((cat) => cat === category)) return false;
    if (participation !== "all" && !c.participation.includes(participation)) return false;
    return true;
  });

  const featured = COMPETITIONS[0];
  const ranked = leaders.slice(0, 5);

  return <AppShell dashboard><div className="cq-dashboard-grid"><div className="min-w-0 space-y-5">
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="flex min-w-0 items-center gap-3"><span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft"><Trophy className="size-6 text-primary" /></span><div className="min-w-0"><h1 className="truncate text-2xl font-extrabold">Yarışmalar</h1><p className="text-[11px] text-muted-foreground">Gerçek problemler, gerçek fırsatlar. Kendini göster, ödüller kazan, geleceğini inşa et.</p></div></div>
      <div className="flex shrink-0 gap-2"><Button variant="outline" size="sm" className="bg-card" onClick={() => toast.info("Yarışma rehberi yakında eklenecek.")}><Play />Yarışma Nasıl Çalışır?</Button><Button size="sm" onClick={() => toast.info("Yarışma önerisi yakında eklenecek.")}><Plus />Yarışma Öner</Button></div>
    </div>

    <div className="flex gap-2 border-b border-border">{([{ value: "active", label: "Aktif", icon: Zap }, { value: "soon", label: "Yakında", icon: Calendar }, { value: "past", label: "Geçmiş", icon: Clock_ }] as const).map(({ value, label, icon: Icon }) => <button key={value} onClick={() => setTab(value)} className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-colors ${tab === value ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}><Icon className="size-4" />{label}<span className="rounded-full bg-secondary px-2 py-0.5 text-[9px]">{counts[value]}</span></button>)}</div>

    {tab === "active" && <section className="cq-dashboard-hero cq-hero"><img src={mascot} className="cq-dashboard-mascot" alt="CodeQuest maskotu" /><div className="relative z-10 max-w-[62%] max-sm:max-w-full"><span className="rounded-full bg-hero-foreground/20 px-3 py-1 text-[9px] font-bold">★ Öne Çıkan Yarışma</span><h2 className="mt-3 text-2xl font-extrabold">{featured.title}</h2><p className="mt-2 max-w-md text-[11px] leading-5 text-hero-foreground/85">{featured.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px]"><span className="flex items-center gap-1.5"><Calendar className="size-3.5" />{featured.date}<span className="block text-hero-foreground/70">3 gün sürecek</span></span><span className="flex items-center gap-1.5"><Users className="size-3.5" />Bireysel veya Takım<span className="block text-hero-foreground/70">1-4 kişi</span></span><span className="flex items-center gap-1.5"><Trophy className="size-3.5 text-coin" />Toplam Ödül<span className="block font-extrabold">150.000 TL</span></span><Button variant="secondary" size="sm" className="bg-hero-foreground text-primary" onClick={() => toast.success("Başvurun alındı! Başvurularım bölümünden takip edebilirsin.")}>Hemen Katıl<ArrowRight /></Button></div></div></section>}

    <section><h2 className="mb-3 text-base font-extrabold">Tüm Yarışmalar</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="flex min-w-52 flex-1 items-center gap-2 rounded-xl bg-card px-4 py-2.5 shadow-card"><Search className="size-4 shrink-0 text-muted-foreground" /><input aria-label="Yarışma ara" placeholder="Yarışma ara..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-xs outline-none" /></label>
        <Select value={category} onValueChange={setCategory}><SelectTrigger className="w-40 bg-card text-xs"><SelectValue placeholder="Tüm Kategoriler" /></SelectTrigger><SelectContent><SelectItem value="all">Tüm Kategoriler</SelectItem><SelectItem value="Hackathon">Hackathon</SelectItem><SelectItem value="Proje Yarışması">Proje Yarışması</SelectItem><SelectItem value="Ideathon">Ideathon</SelectItem></SelectContent></Select>
        <Select value={participation} onValueChange={setParticipation}><SelectTrigger className="w-40 bg-card text-xs"><SelectValue placeholder="Tüm Katılım Türleri" /></SelectTrigger><SelectContent><SelectItem value="all">Tüm Katılım Türleri</SelectItem><SelectItem value="Bireysel">Bireysel</SelectItem><SelectItem value="Takım">Takım</SelectItem></SelectContent></Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((c) => <article key={c.id} className="card-surface overflow-hidden">
        <div className="cq-hero relative flex h-28 items-center justify-center text-5xl">{c.badges.map((b, i) => <span key={b.label} className={`absolute top-2 rounded-full px-2 py-0.5 text-[9px] font-bold ${b.tone} ${i === 0 ? "left-2" : "right-2"}`}>{b.label}</span>)}{c.icon}</div>
        <div className="p-4"><h3 className="text-sm font-extrabold">{c.title}</h3><p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground">{c.description}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-[9px] text-muted-foreground"><span className="flex items-center gap-1"><Calendar className="size-3" />{c.date}</span><span className="flex items-center gap-1"><Users className="size-3" />{c.participation}</span></div>
          <div className="mt-2 flex items-center justify-between gap-2"><div className="flex flex-wrap gap-1">{c.categories.map((cat) => <span key={cat} className="rounded-md bg-primary-soft px-2 py-0.5 text-[9px] font-bold text-primary">{cat}</span>)}</div><Button size="icon" variant="outline" className="size-8 shrink-0 bg-card" aria-label={`${c.title} detayları`} onClick={() => toast.info("Yarışma detayları yakında eklenecek.")}><ArrowRight className="size-4" /></Button></div></div>
      </article>)}</div>
      {!visible.length && <p className="card-surface p-8 text-center text-xs text-muted-foreground">Bu filtreye uyan yarışma bulunamadı.</p>}
    </section>
  </div>

  <aside className="min-w-0 space-y-4">
    <section className="card-surface p-4"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm"><Zap className="size-4 text-coin" />Benim Başvurularım</h2><Button variant="link" size="sm" onClick={() => toast.info("Tüm başvurular yakında listelenecek.")}>Tümünü gör<ArrowRight /></Button></div>
      <ul className="mt-3 space-y-2">{APPLICATIONS.map((a) => <li key={a.title} className="flex items-center gap-3 rounded-xl border border-border p-3"><span className="cq-hero flex size-11 shrink-0 items-center justify-center rounded-xl text-xl">{a.icon}</span><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold">{a.title}</p><p className="text-[9px] text-muted-foreground">{a.detail}</p><p className="mt-0.5 flex items-center gap-1 text-[9px] text-muted-foreground"><Clock_ className="size-3" />{a.date}</p></div><span className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-bold ${a.tone}`}>{a.status}</span></li>)}</ul></section>

    <section className="card-surface p-4"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm"><Trophy className="size-4 text-coin" />Liderlik Tablosu</h2><Button variant="link" size="sm" onClick={() => toast.info("Tüm yarışma sıralamaları yakında eklenecek.")}>Tüm yarışmalar<ArrowRight /></Button></div>
      <div className="mt-3 grid grid-cols-2 gap-1 rounded-lg bg-secondary p-1">{([{ value: "monthly", label: "Bu Dönem" }, { value: "all", label: "Tüm Zamanlar" }] as const).map((t) => <Button key={t.value} size="sm" variant="ghost" onClick={() => setBoardScope(t.value)} className={boardScope === t.value ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}>{t.label}</Button>)}</div>
      <ol className="mt-3 space-y-1">{ranked.map((row, index) => <li key={row.user_id} className={`flex items-center gap-2 rounded-xl p-2 ${row.user_id === profile?.id ? "bg-primary-soft" : ""}`}><span className="w-5 text-center text-xs font-bold text-muted-foreground">{index < 3 ? ["🥇", "🥈", "🥉"][index] : row.rank_position}</span><PlayerAvatar size="sm" shape={row.avatar_shape} color={row.avatar_color} /><span className="min-w-0 flex-1 truncate text-[11px] font-bold">{row.username}{row.user_id === profile?.id ? " (sen)" : ""}</span><span className="text-[10px] font-bold text-primary">{(boardScope === "monthly" ? row.monthly_xp : row.xp).toLocaleString("tr-TR")} XP</span></li>)}</ol>
      {!ranked.length && <p className="py-6 text-center text-xs text-muted-foreground">Bu dönemin ilk puanını sen kazan!</p>}</section>

    <section className="card-surface p-4"><div className="flex items-start justify-between"><h2 className="flex items-center gap-2 text-sm"><GraduationCap className="size-5 text-primary" />Okulunla Katıl</h2><span className="rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold text-warning">Yeni</span></div>
      <p className="mt-2 text-[10px] leading-4 text-muted-foreground">Okul takımını kur, birlikte daha büyük başarılara ulaş! Kurumlara özel yarışmalar ve ödüller seni bekliyor.</p>
      <Button variant="outline" className="mt-3 w-full bg-card" onClick={() => toast.info("Okul kaydı yakında eklenecek.")}>Okulunu Ekle<ArrowRight /></Button></section>
  </aside></div></AppShell>;
}

function Clock_(props: { className?: string }) { return <Calendar {...props} />; }
