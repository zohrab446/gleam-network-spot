import { createFileRoute, Link } from "@tanstack/react-router";
import { Coins, Flame, MessageCircle, Sparkle, Trophy, Zap } from "lucide-react";
import { CATEGORIES, LANGUAGE_META, MAX_LEVEL } from "@/data/lessons";
import { Button } from "@/components/ui/button";
import { useThemeSync } from "@/components/AppShell";
import { PublicFooter } from "@/components/PublicFooter";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeQuest — Kod öğrenmenin oyunlaştırılmış hâli" },
      {
        name: "description",
        content:
          "35 seviye, canlı kod editörü, XP ve coin ödülleri, günlük seriler ve seni düşündüren bir yapay zekâ asistanı. HTML'den C++'a kadar Türkçe kodlama dersleri.",
      },
      { property: "og:title", content: "CodeQuest — Kod öğrenmenin oyunlaştırılmış hâli" },
      {
        property: "og:description",
        content: "HTML, CSS, JavaScript, Java, Python ve C++ öğren. Oyun gibi, seviye seviye.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  useThemeSync();
  const t = useT();
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <span className="flex items-center gap-2 font-display text-xl font-extrabold">
          <span className="bg-brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground">
            ⌘
          </span>
          Code<span className="text-gradient-brand">Quest</span>
        </span>
        <Button asChild variant="ghost">
          <Link to="/auth">{t("Giriş yap", "Sign in")}</Link>
        </Button>
      </header>

      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:py-20">
        <div className="pop-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-accent">
            <Sparkle className="h-4 w-4" /> {t(`${MAX_LEVEL} seviye · 6 programlama dili`, `${MAX_LEVEL} levels · 6 programming languages`)}
          </span>
          <h1 className="mt-5 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {t("Kod öğrenmek", "Learning to code")} <span className="text-gradient-brand">{t("oyun gibi", "should feel like a game")}</span> {t("olsun.", "")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {t(
              "Her seviyede kısa bir açıklama, canlı bir kod editörü ve gerçek bir görev var. Doğru çözünce XP ve coin kazan, serini büyüt, arkadaşlarını liderlik tablosunda geç.",
              "Every level has a short explanation, a live code editor, and a real task. Solve it correctly to earn XP and coins, grow your streak, and pass your friends on the leaderboard.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="font-bold">
              <Link to="/auth">{t("Ücretsiz başla", "Start for free")}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link to="/auth">{t("Google ile devam et", "Continue with Google")}</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-primary" /> {t("XP ve seviye", "XP and levels")}
            </span>
            <span className="flex items-center gap-1.5">
              <Coins className="h-4 w-4 text-coin" /> {t("Coin ödülleri", "Coin rewards")}
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-streak" /> {t("Günlük seri", "Daily streak")}
            </span>
            <span className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-accent" /> {t("Liderlik tablosu", "Leaderboard")}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-success" /> {t("Yapay zekâ asistanı", "AI assistant")}
            </span>
          </div>
        </div>

        <div className="card-surface float-soft p-5">
          <div className="flex items-center gap-2 border-b border-border pb-3 text-sm font-bold text-muted-foreground">
            <span className="h-3 w-3 rounded-full bg-destructive" />
            <span className="h-3 w-3 rounded-full bg-coin" />
            <span className="h-3 w-3 rounded-full bg-success" />
            <span className="ml-2">{t("seviye-1.html", "level-1.html")}</span>
          </div>
          <pre className="overflow-x-auto pt-4 font-mono text-sm leading-relaxed text-foreground">
            {t(
              `<!DOCTYPE html>
<html lang="tr">
  <head>
    <title>Benim İlk Sayfam</title>
  </head>
  <body>
    <h1>Merhaba Dünya!</h1>
  </body>
</html>`,
              `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>`,
            )}
          </pre>
          <div className="mt-4 rounded-xl bg-success-soft px-4 py-3 text-sm font-bold text-success">
            {t("✅ Tüm testler geçti · +100 XP · +50 coin", "✅ All tests passed · +100 XP · +50 coin")}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="text-2xl">{t("Öğrenme yolun", "Your learning path")}</h2>
        <p className="mt-2 text-muted-foreground">{t("HTML'den C++'a, seviye seviye ilerle.", "From HTML to C++, level by level.")}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <article key={category.title} className="card-surface p-5">
              <span
                className="inline-flex rounded-lg px-2 py-1 text-xs font-bold"
                style={{
                  backgroundColor: `var(--color-${LANGUAGE_META[category.language].colorVar})`,
                  color: "var(--color-primary-foreground)",
                }}
              >
                {LANGUAGE_META[category.language].label}
              </span>
              <h3 className="mt-3 text-lg">{category.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(`Seviye ${category.from}–${category.to}`, `Level ${category.from}–${category.to}`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
