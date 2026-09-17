import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";
import { checkLoginGuard, clearLoginAttempts, recordLoginFailure } from "@/lib/authguard.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useThemeSync } from "@/components/AppShell";
import { useT } from "@/lib/i18n";

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
  const t = useT();
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [humanCheck, setHumanCheck] = useState("");
  const checkGuard = useServerFn(checkLoginGuard);
  const recordFailure = useServerFn(recordLoginFailure);
  const clearAttempts = useServerFn(clearLoginAttempts);

  function lockMessage(seconds: number) {
    const minutes = Math.max(1, Math.ceil(seconds / 60));
    return t(
      `Çok fazla hatalı giriş denemesi. Güvenlik için bu hesap ${minutes} dakika boyunca kilitli.`,
      `Too many failed login attempts. For security, this account is locked for ${minutes} minutes.`,
    );
  }

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
        toast.error(t("Google ile giriş yapılamadı. Tekrar dener misin?", "Couldn't sign in with Google. Want to try again?"));
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/dashboard", replace: true });
    } catch {
      toast.error(t("Google ile giriş şu an çalışmıyor.", "Signing in with Google isn't working right now."));
    } finally {
      setBusy(false);
    }
  }

  async function withEmail(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
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
          toast.success(t("Hesabın oluşturuldu! Girişi tamamlamak için e-postandaki bağlantıya tıkla.", "Your account was created! Click the link in your email to complete sign-in."));
          return;
        }
        navigate({ to: "/dashboard", replace: true });
        return;
      }

      if (needsVerification && humanCheck.trim() !== "7") {
        toast.error(t("Güvenlik sorusunu doğru yanıtla.", "Please answer the security question correctly."));
        return;
      }

      const guard = await checkGuard({ data: { email } });
      if (guard.locked) {
        setNeedsVerification(true);
        toast.error(lockMessage(guard.retryAfter));
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const state = await recordFailure({ data: { email } });
        setNeedsVerification(state.requireVerification);
        setHumanCheck("");
        toast.error(
          state.locked ? lockMessage(state.retryAfter) : t("E-posta veya şifre hatalı.", "Incorrect email or password."),
        );
        return;
      }

      void clearAttempts({ data: { email } }).catch(() => undefined);
      navigate({ to: "/dashboard", replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : t("Bir şeyler ters gitti.", "Something went wrong.");
      toast.error(
        message.includes("Invalid login credentials") ? t("E-posta veya şifre hatalı.", "Incorrect email or password.") : message,
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
          <h1 className="text-2xl">{mode === "signin" ? t("Tekrar hoş geldin!", "Welcome back!") : t("Hemen başla", "Get started")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? t("Serini bozmadan kaldığın yerden devam et.", "Pick up where you left off without breaking your streak.")
              : t("Hesap oluştur, ilk seviyeni 5 dakikada bitir.", "Create an account and finish your first level in 5 minutes.")}
          </p>

          <Button
            type="button"
            variant="secondary"
            className="mt-6 w-full font-bold"
            disabled={busy}
            onClick={() => void withGoogle()}
          >
            <span className="mr-2 text-lg">G</span> {t("Google ile devam et", "Continue with Google")}
          </Button>

          <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> {t("veya", "or")} <span className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-4" onSubmit={withEmail}>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t("E-posta", "Email")}</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("sen@ornek.com", "you@example.com")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{t("Şifre", "Password")}</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t("En az 6 karakter", "At least 6 characters")}
              />
            </div>
            {mode === "signin" && needsVerification ? (
              <div className="space-y-1.5 rounded-xl border border-border bg-secondary/50 p-3">
                <Label htmlFor="human-check">{t("Güvenlik kontrolü: 3 + 4 kaçtır?", "Security check: what is 3 + 4?")}</Label>
                <Input
                  id="human-check"
                  inputMode="numeric"
                  required
                  value={humanCheck}
                  onChange={(event) => setHumanCheck(event.target.value)}
                  placeholder={t("Yanıt", "Answer")}
                />
              </div>
            ) : null}
            <Button type="submit" className="w-full font-bold" disabled={busy}>
              {busy ? t("Bekle...", "Please wait...") : mode === "signin" ? t("Giriş yap", "Sign in") : t("Hesap oluştur", "Create account")}
            </Button>
          </form>

          {mode === "signin" ? (
            <Link
              to="/sifre-sifirla"
              className="mt-4 block text-center text-sm font-bold text-primary hover:underline"
            >
              {t("Şifremi unuttum", "Forgot my password")}
            </Link>
          ) : null}

          <button
            type="button"
            className="mt-3 w-full text-sm font-bold text-primary hover:underline"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? t("Hesabın yok mu? Kayıt ol", "Don't have an account? Sign up") : t("Zaten hesabın var mı? Giriş yap", "Already have an account? Sign in")}
          </button>
        </div>
      </div>
    </div>
  );
}
