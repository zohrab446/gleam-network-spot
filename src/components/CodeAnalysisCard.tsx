import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Code2, LockKeyhole, Pencil, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { analyzeCode, type CodeAnalysis } from "@/lib/code-analysis.functions";

const SAMPLE = `def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n    return []`;
const SAMPLE_RESULT: CodeAnalysis = {
  score: 78, summary: "Örnek analiz", issueLines: [3],
  suggestions: [
    { kind: "Önemli", text: "3. satırda j de 0'dan başlıyor; aynı elemanı iki kez toplayabilirsin. range(i + 1, len(nums)) kullan." },
    { kind: "İpucu", text: "İç içe döngü O(n²) çalışır. Sözlük (hash map) ile O(n) çözüm yazabilirsin." },
    { kind: "İyileştirme", text: "Fonksiyona kısa bir açıklama ve tip ipuçları ekle." },
  ],
  improvements: ["Değişken adlarını açıklayıcı seç.", "Boş liste ve tekrarlanan sayılar için test ekle."],
  tasks: ["Aynı problemi sözlükle çöz ve iki yaklaşımın süresini karşılaştır."],
};
const LANGS = [["python", "Python"], ["javascript", "JavaScript"], ["java", "Java"], ["cpp", "C++"], ["react", "React"], ["html", "HTML"], ["css", "CSS"]] as const;
type Lang = (typeof LANGS)[number][0];
const badge: Record<CodeAnalysis["suggestions"][number]["kind"], string> = { Önemli: "bg-destructive-soft text-destructive", İpucu: "bg-primary-soft text-primary", İyileştirme: "bg-success-soft text-success" };

export function CodeAnalysisCard({ pro, onUpgrade }: { pro: boolean; onUpgrade: () => void }) {
  const run = useServerFn(analyzeCode);
  const [code, setCode] = useState(SAMPLE);
  const [lang, setLang] = useState<Lang>("python");
  const [editing, setEditing] = useState(false);
  const [result, setResult] = useState<CodeAnalysis>(SAMPLE_RESULT);
  const [isSample, setIsSample] = useState(true);
  const [prev, setPrev] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"Öneriler" | "İyileştirmeler" | "Görev Önerileri">("Öneriler");

  async function analyze() {
    setBusy(true); setError(null);
    try {
      const res = await run({ data: { language: lang, code } });
      if (!res.ok) { setError(res.error); return; }
      setPrev(isSample ? null : result.score); setResult(res.result); setIsSample(false); setEditing(false);
    } catch { setError("Analiz yapılamadı. Doğrulamayı tamamlayıp tekrar dene."); }
    finally { setBusy(false); }
  }

  const lines = code.split("\n");
  const delta = prev === null ? null : result.score - prev;
  const ring = `${result.score * 2.513} 251.3`;
  return <section className="space-y-3" aria-labelledby="analysis-heading">
    <div className="flex flex-wrap items-center justify-between gap-2"><h2 id="analysis-heading" className="flex items-center gap-2 text-lg"><Code2 className="text-primary" />AI Kod Analizi</h2><span className="text-xs text-muted-foreground">{isSample ? "Örnek analiz · Kendi kodunu analiz et" : "AI analizi · Kodun çalıştırılmaz, yalnızca okunur"}</span></div>
    <div className="relative rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className={cn(!pro && "pointer-events-none select-none blur-sm")}>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select aria-label="Dil" value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="rounded-md border border-border bg-card px-2 py-1">{LANGS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          <Button size="sm" variant="outline" onClick={() => setEditing(!editing)}><Pencil />{editing ? "Önizle" : "Kodu düzenle"}</Button>
          <Button size="sm" className="ml-auto" disabled={busy || !code.trim()} onClick={analyze}><Sparkles />{busy ? "Analiz ediliyor…" : "Analiz Et"}</Button>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-[minmax(0,1fr)_110px]">
          {editing ? <Textarea aria-label="Analiz edilecek kod" value={code} maxLength={8000} onChange={(e) => setCode(e.target.value)} className="min-h-48 font-mono text-xs" /> :
          <pre className="min-w-0 overflow-x-auto rounded-lg bg-secondary py-3 font-mono text-xs leading-6">{lines.map((l, i) => <div key={i} className={cn("flex px-3", result.issueLines.includes(i + 1) && "bg-destructive-soft text-destructive")}><span className="w-8 shrink-0 select-none pr-3 text-right text-muted-foreground">{i + 1}</span><span className="whitespace-pre">{l || " "}</span></div>)}</pre>}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex size-24 items-center justify-center"><svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90"><circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" stroke="currentColor" className="text-primary-soft" /><circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" strokeLinecap="round" stroke="currentColor" strokeDasharray={ring} className="text-success" /></svg><strong className="text-3xl">{result.score}</strong></div>
            <span className="mt-2 text-xs font-bold">Kod Skoru</span>
            {delta !== null ? <span className={cn("text-xs font-bold", delta >= 0 ? "text-success" : "text-destructive")}>{delta >= 0 ? "+" : ""}{delta}</span> : isSample && <span className="text-xs font-bold text-success">+12 örnek</span>}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist">{(["Öneriler", "İyileştirmeler", "Görev Önerileri"] as const).map((t) => <Button key={t} role="tab" aria-selected={tab === t} size="sm" variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)}>{t}</Button>)}</div>
        <ul className="mt-3 space-y-2">{tab === "Öneriler" ? result.suggestions.map((s, i) => <li key={i} className="flex items-start gap-2 text-sm leading-6"><span className={cn("mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold", badge[s.kind])}>{s.kind}</span>{s.text}</li>) : (tab === "İyileştirmeler" ? result.improvements : result.tasks).map((t, i) => <li key={i} className="text-sm leading-6 text-muted-foreground">• {t}</li>)}</ul>
        {error && <p role="alert" className="mt-3 text-xs text-destructive">{error}</p>}
      </div>
      {!pro && <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-card/60 p-4 text-center"><LockKeyhole className="text-primary" /><p className="text-sm font-bold">AI Kod Analizi Pro üyelere özel</p><Button onClick={onUpgrade}>Pro'ya Geç</Button></div>}
    </div>
  </section>;
}
