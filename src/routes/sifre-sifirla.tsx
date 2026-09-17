import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useThemeSync } from "@/components/AppShell";

export const Route = createFileRoute("/sifre-sifirla")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Şifre sıfırlama — CodeQuest" },
      {
        name: "description",
        content: "CodeQuest şifreni unuttuysan e-posta adresine sıfırlama bağlantısı gönder ve yeni şifre belirle.",
      },
      { property: "og:title", content: "Şifre sıfırlama — CodeQuest" },
      { property: "og:description", content: "E-postana gelen bağlantıyla yeni CodeQuest şifreni belirle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  useThemeSync();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  /** Kurtarma bağlantısıyla gelindiyse doğrudan yeni şifre formu gösterilir. */
  const [recovery, setRecovery] = useState(false);

  useEffect(() => {
    let mounted = true;

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (!mounted) return;
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });

    const hash = window.location.hash;
    if (hash.includes("type=recovery") || hash.includes("access_token")) {
      setRecovery(true);
    }

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function sendLink(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/sifre-sifirla`,
      });
      if (error) throw error;
      setSent(true);
      toast.success("Sıfırlama bağlantısı e-postana gönderildi.");
    } catch {
      toast.error("Bağlantı gönderilemedi, birkaç dakika sonra tekrar dener misin?");
    } finally {
      setBusy(false);
    }
  }

  async function savePassword(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalı.");
      return;
    }
    if (password !== confirm) {
      toast.error("Şifreler aynı değil.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Şifren güncellendi!");
      navigate({ to: "/dashboard", replace: true });
    } catch {
      toast.error("Şifre güncellenemedi. Bağlantının süresi geçmiş olabilir, yeni bağlantı isteyebilirsin.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2 font-display text-2xl font-extrabold">
          <span className="bg-brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground">
            ⌘
          </span>
          Code<span className="text-gradient-brand">Quest</span>
        </Link>

        <div className="card-surface pop-in p-6">
          {recovery ? (
            <>
              <h1 className="text-2xl">Yeni şifre belirle 🔐</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                En az 6 karakterli yeni bir şifre seç ve kaldığın yerden devam et.
              </p>
              <form className="mt-6 space-y-4" onSubmit={savePassword}>
                <div className="space-y-1.5">
                  <Label htmlFor="new-password">Yeni şifre</Label>
                  <Input
                    id="new-password"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="En az 6 karakter"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password">Yeni şifre (tekrar)</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    placeholder="Şifreyi tekrar yaz"
                  />
                </div>
                <Button type="submit" className="w-full font-bold" disabled={busy}>
                  {busy ? "Kaydediliyor..." : "Şifremi güncelle"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl">Şifremi unuttum</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Hesabının e-posta adresini yaz; sıfırlama bağlantısını sana gönderelim.
              </p>
              <form className="mt-6 space-y-4" onSubmit={sendLink}>
                <div className="space-y-1.5">
                  <Label htmlFor="reset-email">E-posta</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="sen@ornek.com"
                  />
                </div>
                <Button type="submit" className="w-full font-bold" disabled={busy}>
                  {busy ? "Gönderiliyor..." : "Sıfırlama bağlantısı gönder"}
                </Button>
              </form>
              {sent ? (
                <p className="mt-4 rounded-xl border border-border bg-secondary/50 p-3 text-sm text-muted-foreground">
                  E-postandaki bağlantıya tıkladığında bu sayfa yeni şifre formuna dönecek. Bağlantı gelmediyse spam
                  klasörüne de bak.
                </p>
              ) : null}
            </>
          )}

          <Link to="/auth" className="mt-5 block text-center text-sm font-bold text-primary hover:underline">
            Giriş ekranına dön
          </Link>
        </div>
      </div>
    </div>
  );
}
