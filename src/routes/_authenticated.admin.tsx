import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ShieldCheck, Trash2, Trophy } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createCompetition, deleteCompetition, getMyRoles, listCompetitions } from "@/lib/competitions.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [
    { title: "Admin Paneli — CodeQuest" }, { name: "description", content: "CodeQuest yönetim paneli: yarışmaları yönet." },
    { property: "og:title", content: "Admin Paneli — CodeQuest" }, { property: "og:description", content: "CodeQuest yönetim paneli." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
  ] }),
  component: AdminPage,
});

const EMPTY = { title: "", description: "", date_label: "", participation: "Bireysel / Takım", categories: "", icon: "🏆", status: "active" as "active" | "soon" | "past", featured: false, prize: "" };
const STATUS_LABEL = { active: "Aktif", soon: "Yakında", past: "Geçmiş" } as const;

function AdminPage() {
  const qc = useQueryClient();
  const rolesFn = useServerFn(getMyRoles);
  const listFn = useServerFn(listCompetitions);
  const createFn = useServerFn(createCompetition);
  const deleteFn = useServerFn(deleteCompetition);
  const roles = useQuery({ queryKey: ["my-roles"], queryFn: () => rolesFn() });
  const isAdmin = roles.data?.includes("admin") ?? false;
  const comps = useQuery({ queryKey: ["competitions"], queryFn: () => listFn(), enabled: isAdmin });
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);

  if (roles.isLoading) return <AppShell dashboard><p className="p-8 text-center text-sm text-muted-foreground">Yükleniyor…</p></AppShell>;
  if (!isAdmin) return <AppShell dashboard><section className="card-surface mx-auto max-w-md p-8 text-center"><ShieldCheck className="mx-auto size-8 text-muted-foreground" /><h1 className="mt-3 text-lg font-extrabold">Erişim yok</h1><p className="mt-1 text-xs text-muted-foreground">Bu sayfa yalnızca adminlere açıktır.</p></section></AppShell>;

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    try {
      await createFn({ data: { ...form, categories: form.categories.split(",").map((c) => c.trim()).filter(Boolean) } });
      toast.success("Yarışma eklendi."); setForm(EMPTY);
      qc.invalidateQueries({ queryKey: ["competitions"] });
    } catch (err) { toast.error(err instanceof Error ? err.message : "Kaydedilemedi."); } finally { setBusy(false); }
  }
  async function remove(id: string) {
    if (!confirm("Bu yarışma silinsin mi?")) return;
    try { await deleteFn({ data: { id } }); toast.success("Silindi."); qc.invalidateQueries({ queryKey: ["competitions"] }); } catch (err) { toast.error(err instanceof Error ? err.message : "Silinemedi."); }
  }

  return <AppShell dashboard><div className="space-y-5">
    <section className="cq-dashboard-hero cq-hero"><div className="relative z-10"><span className="rounded-full bg-hero-foreground/20 px-3 py-1 text-[10px] font-bold">Admin Paneli</span><h1 className="mt-3 text-3xl font-extrabold">Yarışma Yönetimi</h1><p className="mt-2 text-xs text-hero-foreground/85">Yarışmalar sayfasında yalnızca buradan eklediklerin görünür.</p></div></section>
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <form onSubmit={submit} className="card-surface space-y-3 p-5"><h2 className="flex items-center gap-2 text-sm"><Trophy className="size-4 text-coin" />Yeni Yarışma</h2>
        <div><Label htmlFor="c-title">Başlık</Label><Input id="c-title" required minLength={3} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div><Label htmlFor="c-desc">Açıklama</Label><Textarea id="c-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div><Label htmlFor="c-date">Tarih</Label><Input id="c-date" placeholder="12 - 14 Aralık 2026" value={form.date_label} onChange={(e) => setForm({ ...form, date_label: e.target.value })} /></div>
          <div><Label htmlFor="c-prize">Ödül</Label><Input id="c-prize" placeholder="10.000 TL" value={form.prize} onChange={(e) => setForm({ ...form, prize: e.target.value })} /></div>
          <div><Label>Katılım</Label><Select value={form.participation} onValueChange={(v) => setForm({ ...form, participation: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Bireysel / Takım">Bireysel / Takım</SelectItem><SelectItem value="Bireysel">Bireysel</SelectItem><SelectItem value="Takım">Takım</SelectItem></SelectContent></Select></div>
          <div><Label>Durum</Label><Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as typeof form.status })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Aktif</SelectItem><SelectItem value="soon">Yakında</SelectItem><SelectItem value="past">Geçmiş</SelectItem></SelectContent></Select></div>
          <div><Label htmlFor="c-cat">Kategoriler (virgülle)</Label><Input id="c-cat" placeholder="Hackathon, Proje Yarışması" value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })} /></div>
          <div><Label htmlFor="c-icon">Simge</Label><Input id="c-icon" maxLength={8} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></div>
        </div>
        <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />Öne çıkan yarışma yap</label>
        <Button type="submit" disabled={busy} className="w-full">{busy ? "Kaydediliyor…" : "Yarışmayı Ekle"}</Button>
      </form>
      <section className="card-surface p-5"><h2 className="text-sm">Yarışmalar ({comps.data?.length ?? 0})</h2>
        <ul className="mt-3 space-y-2">{(comps.data ?? []).map((c) => <li key={c.id} className="flex items-center gap-3 rounded-xl border border-border p-3"><span className="text-2xl">{c.icon}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{c.title}{c.featured ? " ★" : ""}</p><p className="text-[10px] text-muted-foreground">{STATUS_LABEL[c.status as keyof typeof STATUS_LABEL] ?? c.status} · {c.date_label || "Tarih yok"}</p></div><Button size="icon" variant="ghost" aria-label={`${c.title} sil`} onClick={() => remove(c.id)}><Trash2 className="size-4 text-destructive" /></Button></li>)}</ul>
        {!comps.data?.length && !comps.isLoading && <p className="py-6 text-center text-xs text-muted-foreground">Henüz yarışma eklenmedi.</p>}
      </section>
    </div>
  </div></AppShell>;
}
