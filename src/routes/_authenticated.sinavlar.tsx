import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, BarChart3, Check, Clock, Code2, FileText, Github, ListChecks, Trophy, Upload } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import mascot from "@/assets/mascot.png";

export const Route = createFileRoute("/_authenticated/sinavlar")({
  head: () => ({ meta: [
    { title: "Sınavlar — CodeQuest" }, { name: "description", content: "Bilgini test et, yeteneklerini göster! Klasik testlerle teorik bilgini ölç, uygulamalı sınavlarla gerçek proje becerilerini kanıtla." },
    { property: "og:title", content: "Sınavlar — CodeQuest" }, { property: "og:description", content: "Bilgini test et, yeteneklerini göster ve kariyerine güç kat." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: ExamsPage,
});

const QUIZ = [
  { q: "Python'da bir listenin uzunluğunu hangi fonksiyon verir?", options: ["count()", "length()", "len()", "size()"], answer: 2 },
  { q: "Hangisi Python'da değiştirilemez (immutable) bir veri tipidir?", options: ["list", "dict", "set", "tuple"], answer: 3 },
  { q: "Bir sözlükteki tüm anahtarları almak için hangi metot kullanılır?", options: ["keys()", "values()", "items()", "get()"], answer: 0 },
  { q: "'for' döngüsünde 0'dan 4'e kadar sayılar için hangisi doğrudur?", options: ["range(1, 5)", "range(5)", "range(0, 4)", "range(4)"], answer: 1 },
  { q: "Hata yakalamak için hangi blok kullanılır?", options: ["if / else", "try / except", "for / in", "def / return"], answer: 1 },
  { q: "Hangisi Python'da doğru bir fonksiyon tanımıdır?", options: ["function topla():", "def topla():", "func topla():", "define topla():"], answer: 1 },
  { q: "'5 // 2' işleminin sonucu nedir?", options: ["2.5", "3", "2", "2.0"], answer: 2 },
  { q: "Bir listeye eleman eklemek için hangi metot kullanılır?", options: ["add()", "push()", "insert()", "append()"], answer: 3 },
];

const RESULTS = [
  { icon: "🌐", title: "HTML ve CSS Temelleri", date: "12 Mayıs 2024", score: "92/100", badge: "Başarılı", tone: "bg-success-soft text-success" },
  { icon: "🐍", title: "Python Temel Bilgiler", date: "28 Nisan 2024", score: "78/100", badge: "Başarılı", tone: "bg-success-soft text-success" },
  { icon: "JS", title: "JavaScript Orta Seviye", date: "15 Nisan 2024", score: "64/100", badge: "Geçti", tone: "bg-accent-soft text-accent" },
  { icon: "⚛️", title: "React Temelleri", date: "3 Nisan 2024", score: "48/100", badge: "Başarısız", tone: "bg-destructive-soft text-destructive" },
  { icon: "🗄️", title: "Veritabanı Temelleri", date: "20 Mart 2024", score: "85/100", badge: "Başarılı", tone: "bg-success-soft text-success" },
];

const APPLIED = [
  { title: "Kişisel Blog Uygulaması", description: "React kullanarak modern ve responsive bir kişisel blog uygulaması geliştirin. Yazı ekleme, düzenleme ve listeleme özellikleri olmalı.", status: "5 gün kaldı", tone: "bg-secondary text-warning", duration: "10 gün", tech: ["React", "JavaScript", "CSS"], action: "Detayları Gör" },
  { title: "REST API Geliştirme", description: "Node.js ve Express kullanarak bir görev yönetim sistemi (Todo App) için RESTful API geliştirin. CRUD işlemleri ve doğrulama mekanizmaları ekleyin.", status: "Devam Ediyor", tone: "bg-success-soft text-success", duration: "5 gün", tech: ["Node.js", "Express", "MongoDB"], action: "Devam Et" },
  { title: "E-ticaret Veri Analizi", description: "Verilen e-ticaret veri setini Python ile analiz edin. Satış trendlerini görselleştirin ve öneriler içeren bir rapor hazırlayın.", status: "Teslim Edildi", tone: "bg-primary-soft text-primary", duration: "Teslim: 10 Mayıs 2024", tech: ["Python", "Pandas", "Matplotlib"], action: "Sonucu Bekleniyor" },
];

type Phase = { name: "list" } | { name: "quiz"; current: number; answers: (number | null)[]; secondsLeft: number } | { name: "result"; score: number; correct: number };

function ExamsPage() {
  const [tab, setTab] = useState<"tests" | "applied" | "results">("tests");
  const [phase, setPhase] = useState<Phase>({ name: "list" });
  const [level, setLevel] = useState("all");
  const [tech, setTech] = useState("all");

  if (phase.name === "quiz") return <AppShell dashboard><QuizScreen phase={phase} setPhase={setPhase} /></AppShell>;
  if (phase.name === "result") return <AppShell dashboard><ResultScreen phase={phase} onBack={() => setPhase({ name: "list" })} /></AppShell>;

  return <AppShell dashboard><div className="cq-dashboard-grid"><div className="min-w-0 space-y-5">
    <section className="cq-dashboard-hero cq-hero"><img src={mascot} className="cq-dashboard-mascot" alt="CodeQuest maskotu" /><div className="relative z-10 max-w-[62%] max-sm:max-w-full"><h1 className="text-3xl font-extrabold">Sınavlar</h1><p className="mt-2 max-w-lg text-xs leading-6 text-hero-foreground/85">Bilgini test et, yeteneklerini göster!<br className="hidden sm:block" /> Klasik testlerle teorik bilgini ölç, uygulamalı sınavlarla gerçek proje becerilerini kanıtla.</p><div className="mt-3 inline-flex flex-col gap-1 rounded-2xl bg-hero-foreground/15 p-3 backdrop-blur">{["Öğren", "Sınava gir", "Kendini kanıtla", "Daha ileri git!"].map((item) => <span key={item} className="flex items-center gap-2 text-[10px] font-bold"><Check className="size-3" />{item}</span>)}</div></div></section>

    <div className="flex flex-wrap items-center gap-2">
      {([{ value: "tests", label: "Testler", icon: FileText }, { value: "applied", label: "Uygulamalı Sınavlar", icon: Code2 }, { value: "results", label: "Sonuçlar", icon: BarChart3 }] as const).map(({ value, label, icon: Icon }) => <Button key={value} size="sm" variant={tab === value ? "default" : "outline"} className={tab === value ? "" : "bg-card"} onClick={() => setTab(value)}><Icon />{label}</Button>)}
      <div className="ml-auto flex flex-wrap gap-2">
        <Select value={level} onValueChange={setLevel}><SelectTrigger className="w-32 bg-card text-xs"><span className="text-muted-foreground">Seviye:</span><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tümü</SelectItem><SelectItem value="beginner">Başlangıç</SelectItem><SelectItem value="mid">Orta</SelectItem><SelectItem value="advanced">İleri</SelectItem></SelectContent></Select>
        <Select value={tech} onValueChange={setTech}><SelectTrigger className="w-32 bg-card text-xs"><span className="text-muted-foreground">Teknoloji:</span><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tümü</SelectItem><SelectItem value="python">Python</SelectItem><SelectItem value="js">JavaScript</SelectItem><SelectItem value="react">React</SelectItem></SelectContent></Select>
      </div>
    </div>

    {tab === "tests" && <>
      <section><div className="mb-3 flex items-center justify-between"><h2 className="flex items-center gap-2 text-base"><ListChecks className="size-5 text-primary" />Yaklaşan Sınav</h2><Button variant="link" size="sm" onClick={() => toast.info("Tüm sınavlar yakında listelenecek.")}>Tüm sınavları gör<ArrowRight /></Button></div>
        <div className="card-surface flex flex-wrap gap-4 p-4">
          <div className="cq-hero relative flex w-44 shrink-0 items-center justify-center rounded-xl text-5xl max-sm:w-full max-sm:py-8"><span className="absolute left-2 top-2 rounded-full bg-coin px-2 py-0.5 text-[9px] font-bold text-foreground">YAKLAŞIYOR</span>🐍</div>
          <div className="min-w-0 flex-1">
            <span className="rounded-md bg-primary-soft px-2 py-1 text-[9px] font-bold text-primary">TEST</span>
            <h3 className="mt-2 text-lg font-extrabold">Python Temel Bilgiler Sınavı</h3>
            <p className="mt-1 max-w-xl text-[11px] leading-5 text-muted-foreground">Python dilinin temel kavramları, veri tipleri, döngüler, fonksiyonlar ve hata yönetimi konularını kapsayan çoktan seçmeli sınav.</p>
            <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-muted-foreground"><span className="flex items-center gap-1"><Clock className="size-3" />60 dakika</span><span className="flex items-center gap-1"><FileText className="size-3" />50 soru</span><span className="flex items-center gap-1"><BarChart3 className="size-3" />Orta Seviye</span><span className="flex items-center gap-1">🐍 Python</span></div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-44"><div className="rounded-xl border border-border p-3 text-center"><p className="text-[9px] text-muted-foreground">Başlangıç Tarihi</p><p className="mt-1 text-xs font-extrabold">20 Mayıs 2024<br />14:00</p></div><Button onClick={() => setPhase({ name: "quiz", current: 0, answers: Array(QUIZ.length).fill(null), secondsLeft: 60 * 60 })}>Sınava Başla<ArrowRight /></Button></div>
        </div></section>

      <section><div className="mb-3 flex items-center justify-between"><div><h2 className="flex items-center gap-2 text-base"><Code2 className="size-5 text-primary" />Uygulamalı Sınavlar</h2><p className="mt-1 text-[11px] text-muted-foreground">Gerçek dünya senaryolarına dayalı proje ve kodlama görevleriyle yeteneklerini göster.</p></div><Button variant="link" size="sm" onClick={() => setTab("applied")}>Tüm uygulamalı sınavlar<ArrowRight /></Button></div>
        <div className="grid gap-4 lg:grid-cols-3">{APPLIED.map((exam) => <article key={exam.title} className="card-surface flex flex-col p-4">
          <div className="flex items-center justify-between"><span className="rounded-md bg-primary-soft px-2 py-1 text-[9px] font-bold text-primary">UYGULAMALI</span><span className={`rounded-full px-2 py-1 text-[9px] font-bold ${exam.tone}`}>{exam.status}</span></div>
          <h3 className="mt-3 text-sm font-extrabold">{exam.title}</h3>
          <p className="mt-1 line-clamp-3 flex-1 text-[10px] leading-4 text-muted-foreground">{exam.description}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-[9px] text-muted-foreground"><span className="flex items-center gap-1"><Clock className="size-3" />{exam.duration}</span><span className="flex items-center gap-1"><Github className="size-3" />GitHub Teslimi</span></div>
          <div className="mt-2 flex flex-wrap gap-1">{exam.tech.map((t) => <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[9px] font-bold text-secondary-foreground">{t}</span>)}</div>
          <Button size="sm" className="mt-3 w-full" variant={exam.action === "Sonucu Bekleniyor" ? "outline" : "default"} onClick={() => toast.info("Uygulamalı sınav detayları yakında eklenecek.")}>{exam.action}<ArrowRight /></Button>
        </article>)}</div></section>
    </>}

    {tab === "applied" && <section><div className="grid gap-4 lg:grid-cols-3">{APPLIED.map((exam) => <article key={exam.title} className="card-surface flex flex-col p-4">
      <div className="flex items-center justify-between"><span className="rounded-md bg-primary-soft px-2 py-1 text-[9px] font-bold text-primary">UYGULAMALI</span><span className={`rounded-full px-2 py-1 text-[9px] font-bold ${exam.tone}`}>{exam.status}</span></div>
      <h3 className="mt-3 text-sm font-extrabold">{exam.title}</h3>
      <p className="mt-1 flex-1 text-[10px] leading-4 text-muted-foreground">{exam.description}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-[9px] text-muted-foreground"><span className="flex items-center gap-1"><Clock className="size-3" />{exam.duration}</span><span className="flex items-center gap-1"><Upload className="size-3" />Proje Teslimi</span></div>
      <div className="mt-2 flex flex-wrap gap-1">{exam.tech.map((t) => <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[9px] font-bold text-secondary-foreground">{t}</span>)}</div>
      <Button size="sm" className="mt-3 w-full" onClick={() => toast.info("Uygulamalı sınav detayları yakında eklenecek.")}>{exam.action}<ArrowRight /></Button>
    </article>)}</div></section>}

    {tab === "results" && <section className="card-surface p-4"><h2 className="flex items-center gap-2 text-sm"><BarChart3 className="size-4 text-primary" />Tüm Sınav Sonuçlarım</h2>
      <ul className="mt-3 space-y-2">{RESULTS.map((r) => <li key={r.title} className="flex items-center gap-3 rounded-xl border border-border p-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg">{r.icon}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{r.title}</p><p className="text-[10px] text-muted-foreground">{r.date}</p></div><span className="text-xs font-extrabold">{r.score}</span><span className={`rounded-full px-2 py-1 text-[9px] font-bold ${r.tone}`}>{r.badge}</span></li>)}</ul></section>}
  </div>

  <aside className="min-w-0 space-y-4">
    <section className="card-surface p-4"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm"><Trophy className="size-4 text-coin" />Sınav Performansım</h2><Button variant="link" size="sm" onClick={() => setTab("results")}>Tüm sonuçlarım<ArrowRight /></Button></div>
      <div className="mt-4 flex items-center gap-4"><div className="relative flex size-24 shrink-0 items-center justify-center"><svg viewBox="0 0 64 64" className="absolute inset-0 size-24 -rotate-90" aria-label="Genel başarı puanı 78 üzerinden 100"><circle cx="32" cy="32" r="28" fill="none" strokeWidth="6" className="text-primary-soft" stroke="currentColor" /><circle cx="32" cy="32" r="28" fill="none" strokeWidth="6" strokeLinecap="round" className="text-primary" stroke="currentColor" strokeDasharray={`${78 * 1.759} 175.9`} /></svg><span className="text-center"><span className="block text-xl font-extrabold">78</span><span className="block text-[9px] text-muted-foreground">100</span></span></div>
        <div className="min-w-0"><p className="text-xs font-bold">Genel Başarı Puanım <span className="ml-1 rounded-full bg-success-soft px-2 py-0.5 text-[9px] text-success">▲ +%12</span></p><p className="mt-1 text-[10px] leading-4 text-muted-foreground">Son 5 sınav ortalamanız bir önceki döneme göre arttı.</p></div></div>
      <div className="mt-4 grid grid-cols-3 gap-2">{[{ icon: Check, tone: "text-success", value: "12", label: "Tamamlanan Sınav" }, { icon: Trophy, tone: "text-coin", value: "9", label: "Başarılı Sınav" }, { icon: BarChart3, tone: "text-primary", value: "%75", label: "Başarı Oranı" }].map(({ icon: Icon, tone, value, label }) => <div key={label} className="rounded-xl border border-border p-3 text-center"><Icon className={`mx-auto size-5 ${tone}`} /><p className="mt-2 text-lg font-extrabold">{value}</p><p className="text-[9px] text-muted-foreground">{label}</p></div>)}</div></section>

    <section className="card-surface p-4"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm"><FileText className="size-4 text-primary" />Son Sınav Sonuçlarım</h2><Button variant="link" size="sm" onClick={() => setTab("results")}>Tüm sonuçlar<ArrowRight /></Button></div>
      <ul className="mt-3 space-y-2">{RESULTS.map((r) => <li key={r.title} className="flex items-center gap-3 rounded-xl border border-border p-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm">{r.icon}</span><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold">{r.title}</p><p className="text-[9px] text-muted-foreground">{r.date}</p></div><div className="text-right"><p className="text-[11px] font-extrabold">{r.score}</p><span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${r.tone}`}>{r.badge}</span></div></li>)}</ul></section>
  </aside></div></AppShell>;
}

function QuizScreen({ phase, setPhase }: { phase: Extract<Phase, { name: "quiz" }>; setPhase: (p: Phase) => void }) {
  const { current, answers, secondsLeft } = phase;
  const question = QUIZ[current];

  useEffect(() => {
    if (secondsLeft <= 0) { finish(); return; }
    const id = setTimeout(() => setPhase({ ...phase, secondsLeft: secondsLeft - 1 }), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  function select(option: number) { const next = [...answers]; next[current] = option; setPhase({ ...phase, answers: next }); }
  function finish() {
    const correct = QUIZ.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0);
    setPhase({ name: "result", score: Math.round((correct / QUIZ.length) * 100), correct });
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const answered = answers.filter((a) => a !== null).length;

  return <div className="mx-auto max-w-3xl space-y-4">
    <div className="card-surface flex flex-wrap items-center justify-between gap-3 p-4">
      <div><h1 className="text-sm font-extrabold">Python Temel Bilgiler Sınavı</h1><p className="text-[10px] text-muted-foreground">{answered}/{QUIZ.length} soru yanıtlandı</p></div>
      <span className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold ${secondsLeft < 300 ? "bg-destructive-soft text-destructive" : "bg-primary-soft text-primary"}`}><Clock className="size-4" />{minutes}:{seconds}</span>
    </div>

    <div className="card-surface flex flex-wrap gap-2 p-4">{QUIZ.map((_, i) => <button key={i} onClick={() => setPhase({ ...phase, current: i })} aria-label={`Soru ${i + 1}`} className={`size-9 rounded-lg text-xs font-bold transition-colors ${i === current ? "bg-primary text-primary-foreground" : answers[i] !== null ? "bg-success-soft text-success" : "bg-secondary text-secondary-foreground"}`}>{i + 1}</button>)}</div>

    <div className="card-surface p-5">
      <p className="text-[10px] font-bold text-primary">Soru {current + 1} / {QUIZ.length}</p>
      <h2 className="mt-2 text-base font-extrabold leading-6">{question.q}</h2>
      <div className="mt-4 space-y-2">{question.options.map((option, i) => <button key={i} onClick={() => select(i)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-xs transition-colors ${answers[current] === i ? "border-primary bg-primary-soft font-bold text-primary" : "border-border hover:bg-secondary"}`}><span className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${answers[current] === i ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div>
      <div className="mt-5 flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setPhase({ ...phase, current: current - 1 })}><ArrowLeft />Önceki</Button>
        {current < QUIZ.length - 1 ? <Button size="sm" onClick={() => setPhase({ ...phase, current: current + 1 })}>Sonraki<ArrowRight /></Button> : <Button size="sm" onClick={finish}>Sınavı Bitir<Check /></Button>}
      </div>
    </div>
  </div>;
}

function ResultScreen({ phase, onBack }: { phase: Extract<Phase, { name: "result" }>; onBack: () => void }) {
  const passed = phase.score >= 60;
  const ring = useMemo(() => `${phase.score * 1.759} 175.9`, [phase.score]);
  return <div className="mx-auto max-w-lg"><div className="card-surface p-8 text-center">
    <div className="relative mx-auto flex size-32 items-center justify-center"><svg viewBox="0 0 64 64" className="absolute inset-0 size-32 -rotate-90" aria-label={`Sınav sonucu yüzde ${phase.score}`}><circle cx="32" cy="32" r="28" fill="none" strokeWidth="5" className="text-primary-soft" stroke="currentColor" /><circle cx="32" cy="32" r="28" fill="none" strokeWidth="5" strokeLinecap="round" className={passed ? "text-success" : "text-destructive"} stroke="currentColor" strokeDasharray={ring} /></svg><span className="text-3xl font-extrabold">{phase.score}</span></div>
    <h1 className="mt-4 text-xl font-extrabold">{passed ? "Tebrikler, sınavı geçtin! 🎉" : "Bu sefer olmadı 💪"}</h1>
    <p className="mt-2 text-xs leading-5 text-muted-foreground">{QUIZ.length} sorudan {phase.correct} tanesini doğru yanıtladın.{passed ? " Sonucun profiline eklendi." : " Dersleri tekrar edip yeniden deneyebilirsin."}</p>
    <span className={`mt-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold ${passed ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive"}`}>{passed ? "Başarılı" : "Başarısız"}</span>
    <Button className="mt-6 w-full" onClick={onBack}><ArrowLeft />Sınavlara Dön</Button>
  </div></div>;
}
