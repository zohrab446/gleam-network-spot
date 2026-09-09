import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useThemeSync } from "@/components/AppShell";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Giriş yap — CodeQuest" },
      {
        name: "description",
        content: "Google hesabınla veya e-postayla CodeQuest'e giriş yap ve kod öğrenmeye kaldığın yerden devam et.",
      },
      { property: "og:title", content: "Giriş yap — CodeQuest" },
      { property: "og:description", content: "CodeQuest hesabına giriş yap, serini bozmadan devam et." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  useThemeSync();
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/dashboard", replace: true });
  }, [loading, session, navigate]);

  async function withGoogle() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("Google ile giriş yapılamadı. Tekrar dener misin?");
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/dashboard", replace: true });
    } catch {
      toast.error("Google ile giriş şu an çalışmıyor.");
    } finally {
      setBusy(false);
    }
  }

  async function withEmail(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Hesabın oluşturuldu! Girişi tamamlamak için e-postandaki bağlantıya tıkla.");
          return;
        }
        navigate({ to: "/dashboard", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard", replace: true });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Bir şeyler ters gitti.";
      toast.error(
        message.includes("Invalid login credentials") ? "E-posta veya şifre hatalı." : message,
      );
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
          <h1 className="text-2xl">{mode === "signin" ? "Tekrar hoş geldin!" : "Hemen başla"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Serini bozmadan kaldığın yerden devam et."
              : "Hesap oluştur, ilk seviyeni 5 dakikada bitir."}
          </p>

          <Button
            type="button"
            variant="secondary"
            className="mt-6 w-full font-bold"
            disabled={busy}
            onClick={() => void withGoogle()}
          >
            <span className="mr-2 text-lg">G</span> Google ile devam et
          </Button>

          <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> veya <span className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-4" onSubmit={withEmail}>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="sen@ornek.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="En az 6 karakter"
              />
            </div>
            <Button type="submit" className="w-full font-bold" disabled={busy}>
              {busy ? "Bekle..." : mode === "signin" ? "Giriş yap" : "Hesap oluştur"}
            </Button>
          </form>

          <button
            type="button"
            className="mt-5 w-full text-sm font-bold text-primary hover:underline"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "Hesabın yok mu? Kayıt ol" : "Zaten hesabın var mı? Giriş yap"}
          </button>
        </div>
      </div>
    </div>
  );
}
