import { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, Mail, LockKeyhole, ShieldCheck, BookOpen, Star } from "lucide-react";
import { QuestNavigation } from "@/components/QuestNavigation";
import { AuthStory } from "@/components/AuthStory";
import { Brand } from "@/components/Brand";
import { Link, useNavigate } from "@tanstack/react-router";
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
import { verifyAuthAction } from "@/lib/auth-verification.functions";

export function AuthPage() {
  useThemeSync();
  const t = useT();
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [humanCheck, setHumanCheck] = useState("");
  const checkGuard = useServerFn(checkLoginGuard);
  const recordFailure = useServerFn(recordLoginFailure);
  const clearAttempts = useServerFn(clearLoginAttempts);
  const verifyAuth = useServerFn(verifyAuthAction);

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
      await verifyAuth();
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
        await verifyAuth();
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
    <div className="min-h-screen bg-background">
      <QuestNavigation onAuthMode={setMode} />
      <main className="cq-auth-grid mx-auto max-w-[1480px] px-4 py-5 sm:px-6">
        <AuthStory />
        <section className="card-surface flex flex-col justify-center rounded-3xl px-6 py-9 sm:px-9">
          <Brand />
          <h2 className="mt-7 text-3xl font-extrabold">{mode === "signin" ? "Tekrar hoş geldin! 👋" : "Aramıza hoş geldin! 🚀"}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{mode === "signin" ? "Hesabına giriş yaparak öğrenmeye, üretmeye ve gelişmeye devam et." : "Hesabını oluştur, kodlama yolculuğuna bugün başla."}</p>
          <form className="mt-7 space-y-5" onSubmit={withEmail}>
            <div className="space-y-2"><Label htmlFor="email">E-posta</Label><div className="relative"><Mail className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ornek@email.com" className="h-11 rounded-xl pl-10" /></div></div>
            <div className="space-y-2"><Label htmlFor="password">Şifre</Label><div className="relative"><LockKeyhole className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input id="password" type={showPassword ? "text" : "password"} required minLength={6} autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Şifrenizi girin" className="h-11 rounded-xl pl-10 pr-11" /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}>{showPassword ? <EyeOff /> : <Eye />}</Button></div></div>
            {mode === "signin" && <div className="flex items-center justify-between gap-2 text-xs"><span className="flex items-center gap-1.5 text-muted-foreground"><ShieldCheck className="size-4 text-primary" />Güvenli oturum</span><Link to="/sifre-sifirla" className="font-semibold text-primary">Şifremi unuttum?</Link></div>}
            {mode === "signin" && needsVerification && <div className="space-y-2 rounded-xl bg-secondary p-3"><Label htmlFor="human-check">Güvenlik kontrolü: 3 + 4 kaçtır?</Label><Input id="human-check" inputMode="numeric" required value={humanCheck} onChange={(event) => setHumanCheck(event.target.value)} placeholder="Yanıt" /></div>}
            <Button type="submit" className="h-12 w-full" disabled={busy}>{busy ? "Bekle..." : mode === "signin" ? "Giriş Yap" : "Hesap Oluştur"}<ArrowRight /></Button>
          </form>
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />veya<span className="h-px flex-1 bg-border" /></div>
          <Button type="button" variant="outline" className="h-11 w-full bg-card" disabled={busy} onClick={() => void withGoogle()}><span className="text-lg font-extrabold">G</span>Google ile devam et</Button>
          <div className="mt-4 text-center text-xs text-muted-foreground">{mode === "signin" ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}<Button variant="link" size="sm" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>{mode === "signin" ? "Kayıt ol" : "Giriş yap"}</Button></div>
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-muted p-4">{[{ icon: ShieldCheck, title: "Güvenli giriş", text: "Verilerin güvende" }, { icon: BookOpen, title: "320 ders", text: "Adım adım öğren" }, { icon: Star, title: "7 öğrenme yolu", text: "Kendi yolunu seç" }].map(({ icon: Icon, title, text }) => <div key={title} className="min-w-0 border-r border-border text-center last:border-0"><Icon className="mx-auto mb-2 size-5 text-primary" /><p className="text-[10px] font-bold">{title}</p><p className="mt-1 text-[9px] text-muted-foreground">{text}</p></div>)}</div>
        </section>
      </main>
      <footer className="flex justify-center gap-5 px-4 pb-5 text-xs text-muted-foreground"><Link to="/iletisim">İletişim</Link><Link to="/mesafeli-satis">Mesafeli satış sözleşmesi</Link><span>© {new Date().getFullYear()} CodeQuest</span></footer>
    </div>
  );
}
