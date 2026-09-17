import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Battery, Check, Copy, Crown, Gift, Lightbulb, Share2, Trophy, Users, Video } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { EnergyCard } from "@/components/EnergyMeter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBadges, useProfile, useProgress } from "@/hooks/useGameData";
import {
  ENERGY_TYPE_LABEL,
  useApplyReferral,
  useClaimBadgeEnergy,
  useClaimDailyLogin,
  useClaimMilestone,
  useEnergyHistory,
  useEnergySync,
  useSpinWheel,
  useWatchAd,
} from "@/hooks/useEnergy";
import {
  AD_DAILY_LIMIT,
  DAILY_LOGIN_REWARDS,
  MILESTONES,
  SPIN_SLICES,
  badgeEnergyReward,
  energyErrorMessage,
  isProActive,
} from "@/lib/energy";
import { badgeTitle } from "@/lib/gamification";
import { celebrate } from "@/lib/celebrate";
import { useT } from "@/lib/i18n";
import { playSound } from "@/store/settings";
import { cn } from "@/lib/utils";
import { PaytrCheckoutDialog } from "@/components/PaytrCheckoutDialog";
import { ENERGY_PRODUCTS, HINT_PRODUCTS } from "@/lib/store";

export const Route = createFileRoute("/_authenticated/rewards")({
  head: () => ({
    meta: [
      { title: "Enerji & Ödüller — CodeQuest" },
      {
        name: "description",
        content: "Günlük giriş, şans çarkı, reklam, rozet ve davet ödülleriyle enerji kazan.",
      },
      { property: "og:title", content: "Enerji & Ödüller — CodeQuest" },
      { property: "og:description", content: "CodeQuest'te enerji kazanmanın tüm yolları." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  const t = useT();
  useEnergySync();
  const { data: profile, isLoading } = useProfile();
  const { data: badges = [] } = useBadges();
  const { data: progress = [] } = useProgress();
  const { data: history = [] } = useEnergyHistory(15);

  const dailyLogin = useClaimDailyLogin();
  const spin = useSpinWheel();
  const watchAd = useWatchAd();
  const claimBadge = useClaimBadgeEnergy();
  const claimMilestone = useClaimMilestone();
  const applyReferral = useApplyReferral();

  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [spinAngle, setSpinAngle] = useState(0);
  const [adSeconds, setAdSeconds] = useState<number | null>(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (adSeconds === null) return;
    if (adSeconds <= 0) {
      setAdSeconds(null);
      watchAd.mutate(undefined, {
        onSuccess: () => {
          playSound("success");
          toast.success(t("Reklam tamamlandı: +1 enerji ⚡", "Ad completed: +1 energy ⚡"));
        },
        onError: (error) => toast.error(energyErrorMessage(error)),
      });
      return;
    }
    const id = window.setTimeout(() => setAdSeconds((s) => (s === null ? null : s - 1)), 1000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adSeconds]);

  if (isLoading || !profile) {
    return (
      <AppShell>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </AppShell>
    );
  }

  const pro = isProActive(profile);
  const today = new Date().toISOString().slice(0, 10);
  const loginClaimed = profile.last_login_reward_date === today;
  const loginDay = loginClaimed ? profile.daily_login_streak : Math.min(7, (profile.daily_login_streak % 7) + 1);
  const spinReady =
    !profile.last_spin_at || new Date(profile.last_spin_at).getTime() < Date.now() - 24 * 3600_000;
  const adsToday = profile.ads_day === today ? profile.ads_watched_today : 0;
  const referralLink =
    typeof window !== "undefined" && profile.referral_code
      ? `${window.location.origin}/auth?ref=${profile.referral_code}`
      : "";
  const completedLevels = new Set(progress.map((p) => p.level));

  function handleSpin() {
    if (spin.isPending) return;
    setSpinResult(null);
    setSpinAngle((a) => a + 1080 + Math.floor(Math.random() * 360));
    spin.mutate(undefined, {
      onSuccess: (result) => {
        setSpinResult(result.energy);
        if (result.energy > 0) {
          playSound("success");
          void celebrate();
          toast.success(t(`Çarktan +${result.energy} enerji! ⚡`, `+${result.energy} energy from the wheel! ⚡`));
        } else {
          playSound("error");
          toast(t("Bu sefer boş çıktı, yarın tekrar dene 🍎", "No luck this time, try again tomorrow 🍎"));
        }
      },
      onError: (error) => toast.error(energyErrorMessage(error)),
    });
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl">{t("Enerji & Ödüller", "Energy & Rewards")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("Enerjini doldur, seriyi koru, arkadaşlarını davet et.", "Refill your energy, keep your streak, invite your friends.")}
          </p>
        </header>

        <EnergyCard profile={profile} />

        {/* Günlük giriş */}
        <section className="card-surface p-5" aria-labelledby="daily-heading">
          <h2 id="daily-heading" className="flex items-center gap-2 text-lg">
            <Gift className="h-5 w-5 text-accent" /> {t("Günlük giriş ödülü", "Daily login reward")}
          </h2>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {DAILY_LOGIN_REWARDS.map((amount, index) => {
              const day = index + 1;
              const done = loginClaimed ? day <= loginDay : day < loginDay;
              const current = day === loginDay && !loginClaimed;
              return (
                <div
                  key={day}
                  className={cn(
                    "rounded-xl border p-2 text-center",
                    done && "border-success bg-success-soft",
                    current && "border-primary bg-primary-soft",
                    !done && !current && "border-border",
                  )}
                >
                  <p className="text-xs font-bold text-muted-foreground">{t(`${day}. gün`, `Day ${day}`)}</p>
                  <p className="font-display text-sm font-extrabold">+{amount}</p>
                  {done && <Check className="mx-auto h-3.5 w-3.5 text-success" />}
                </div>
              );
            })}
          </div>
          <Button
            className="mt-4 font-bold"
            disabled={loginClaimed || dailyLogin.isPending}
            onClick={() => {
              if (dailyLogin.isPending) return;
              dailyLogin.mutate(undefined, {
                onSuccess: (result) => {
                  playSound("success");
                  void celebrate();
                  toast.success(t(`${result.day}. gün: +${result.energy} enerji, +${result.coins} coin!`, `Day ${result.day}: +${result.energy} energy, +${result.coins} coins!`));
                },
                onError: (error) => toast.error(energyErrorMessage(error)),
              });
            }}
          >
            {loginClaimed ? t("Bugünün ödülü alındı ✅", "Today's reward claimed ✅") : t("Günlük ödülü al", "Claim daily reward")}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            {t("Günlük bonus coin", "Daily bonus coins")}: {pro ? "+150 (Pro)" : "+50"}
          </p>
        </section>

        {/* Şans çarkı */}
        <section className="card-surface p-5" aria-labelledby="spin-heading">
          <h2 id="spin-heading" className="flex items-center gap-2 text-lg">
            🎡 {t("Şans çarkı", "Lucky wheel")}
          </h2>
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="relative h-40 w-40 shrink-0">
              <div
                className="h-full w-full rounded-full border-4 border-primary transition-transform duration-[2500ms] ease-out"
                style={{
                  transform: `rotate(${spinAngle}deg)`,
                  background:
                    "conic-gradient(var(--color-primary-soft) 0deg 72deg, var(--color-secondary) 72deg 144deg, var(--color-success-soft) 144deg 216deg, var(--color-secondary) 216deg 288deg, var(--color-primary-soft) 288deg 360deg)",
                }}
              >
                {SPIN_SLICES.map((slice, index) => (
                  <span
                    key={slice.amount}
                    className="absolute left-1/2 top-2 -translate-x-1/2 text-sm font-bold"
                    style={{
                      transform: `rotate(${index * 72}deg) translateY(6px)`,
                      transformOrigin: "center 74px",
                    }}
                  >
                    {slice.emoji}
                    {slice.amount > 0 ? `+${slice.amount}` : ""}
                  </span>
                ))}
              </div>
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xl">🔻</span>
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                {t("Günde bir kez çevir, 0 ile 5 arasında enerji kazan. %10 şansla +5 enerji!", "Spin once a day to win 0 to 5 energy. 10% chance for +5 energy!")}
              </p>
              {spinResult !== null && (
                <p className="mt-2 font-display text-xl font-extrabold text-primary">
                  {spinResult > 0 ? t(`+${spinResult} enerji 🎉`, `+${spinResult} energy 🎉`) : t("Boş 🍎", "Empty 🍎")}
                </p>
              )}
              <Button
                className="mt-3 font-bold"
                disabled={!spinReady || spin.isPending}
                onClick={handleSpin}
              >
                {spinReady ? t("Çarkı döndür 🎲", "Spin the wheel 🎲") : t("Yarın tekrar dene", "Try again tomorrow")}
              </Button>
            </div>
          </div>
        </section>

        {/* Reklam */}
        <section id="reklam" className="card-surface p-5" aria-labelledby="ad-heading">
          <h2 id="ad-heading" className="flex items-center gap-2 text-lg">
            <Video className="h-5 w-5 text-primary" /> {t("Reklam izle", "Watch ad")}
          </h2>
          {pro ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {t("Pro üyeliğin reklamsız ve enerjin sınırsız — buna ihtiyacın yok 👑", "Your Pro membership is ad-free with unlimited energy — you don't need this 👑")}
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                30 saniyelik video izle, +1 enerji kazan. Günde {AD_DAILY_LIMIT} kez ({adsToday}/
                {AD_DAILY_LIMIT} kullanıldı).
              </p>
              {adSeconds !== null ? (
                <div className="mt-4 rounded-2xl bg-foreground p-6 text-center">
                  <p className="font-display text-4xl font-extrabold text-primary-foreground">{adSeconds}</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">Reklam oynuyor… ekranda kal</p>
                </div>
              ) : (
                <Button
                  className="mt-4 font-bold"
                  disabled={adsToday >= AD_DAILY_LIMIT || watchAd.isPending}
                  onClick={() => setAdSeconds(30)}
                >
                  🎬 30 saniyelik reklamı başlat
                </Button>
              )}
            </>
          )}
        </section>

        {/* Davet */}
        <section id="davet" className="card-surface p-5" aria-labelledby="ref-heading">
          <h2 id="ref-heading" className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-success" /> Arkadaşını davet et
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Arkadaşın kaydolup 5 ders bitirdiğinde ikinize de +5 enerji. 3 davette +10, 5 davette +20 ek bonus.
          </p>
          <div className="mt-4 rounded-2xl bg-secondary p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Davet kodun</p>
            <p className="font-display text-2xl font-extrabold tracking-widest">{profile.referral_code}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="font-bold"
                onClick={() => {
                  void navigator.clipboard.writeText(referralLink);
                  toast.success("Davet linki kopyalandı");
                }}
              >
                <Copy className="mr-1 h-4 w-4" /> Linki kopyala
              </Button>
              <Button asChild size="sm" variant="secondary" className="font-bold">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`CodeQuest'te birlikte kod öğrenelim! ${referralLink}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Share2 className="mr-1 h-4 w-4" /> WhatsApp'ta paylaş
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-border p-3">
              <p className="text-muted-foreground">Başarılı davet</p>
              <p className="font-display text-xl font-extrabold">{profile.completed_referrals}</p>
            </div>
            <div className="rounded-xl border border-border p-3">
              <p className="text-muted-foreground">Davetten enerji</p>
              <p className="font-display text-xl font-extrabold">+{profile.referral_energy_earned}</p>
            </div>
          </div>

          {!profile.referred_by && (
            <div className="mt-4">
              <label htmlFor="ref-code" className="text-sm font-bold">
                Bir davet kodun mu var?
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="ref-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value.toUpperCase())}
                  placeholder="ÖRN: Z7K9M2"
                  className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 font-mono text-sm font-bold"
                />
                <Button
                  className="font-bold"
                  disabled={code.trim().length < 4 || applyReferral.isPending}
                  onClick={() => {
                    if (applyReferral.isPending) return;
                    applyReferral.mutate(code.trim(), {
                      onSuccess: () => {
                        setCode("");
                        toast.success("Davet kodu uygulandı! 5 ders bitince ödül gelecek.");
                      },
                      onError: (error) => toast.error(energyErrorMessage(error)),
                    });
                  }}
                >
                  Uygula
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* Rozet ödülleri */}
        <section className="card-surface p-5" aria-labelledby="badge-heading">
          <h2 id="badge-heading" className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-accent" /> Rozet enerji ödülleri
          </h2>
          {badges.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Henüz rozetin yok. Ders bitirdikçe rozetler ve enerji ödülleri açılır.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {badges.map((badge) => {
                const def = BADGES.find((b) => b.id === badge.badge_id);
                const claimed = profile.energy_badges_claimed.includes(badge.badge_id);
                return (
                  <li key={badge.badge_id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                    <span className="text-xl">{def?.emoji ?? "🏅"}</span>
                    <span className="min-w-0 flex-1 text-sm font-bold">{def?.title ?? badge.badge_id}</span>
                    <span className="text-sm font-bold text-success">
                      +{badgeEnergyReward(badge.badge_id)} ⚡
                    </span>
                    <Button
                      size="sm"
                      variant={claimed ? "ghost" : "default"}
                      className="font-bold"
                      disabled={claimed || claimBadge.isPending}
                      onClick={() => {
                        if (claimBadge.isPending) return;
                        claimBadge.mutate(badge.badge_id, {
                          onSuccess: (result) => toast.success(`Rozet ödülü: +${result.energy} enerji!`),
                          onError: (error) => toast.error(energyErrorMessage(error)),
                        });
                      }}
                    >
                      {claimed ? "Alındı" : "Al"}
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Kilometre taşları */}
        <section className="card-surface p-5" aria-labelledby="ms-heading">
          <h2 id="ms-heading" className="flex items-center gap-2 text-lg">
            <Battery className="h-5 w-5 text-success" /> Kilometre taşları
          </h2>
          <ul className="mt-4 space-y-2">
            {MILESTONES.map((milestone) => {
              const claimed = profile.milestones_claimed.includes(milestone.id);
              const eligible =
                milestone.id === "levels-50"
                  ? completedLevels.size >= 50
                  : milestone.id === "levels-100"
                    ? completedLevels.size >= 100
                    : milestone.id === "xp-500000"
                      ? profile.xp >= 500000
                      : profile.longest_streak >= 30;
              return (
                <li key={milestone.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{milestone.title}</p>
                    <p className="text-xs text-muted-foreground">{milestone.description}</p>
                  </div>
                  <span className="text-sm font-bold text-success">+{milestone.energy} ⚡</span>
                  <Button
                    size="sm"
                    variant={claimed ? "ghost" : "default"}
                    className="font-bold"
                    disabled={claimed || !eligible || claimMilestone.isPending}
                    onClick={() => {
                      if (claimMilestone.isPending) return;
                      claimMilestone.mutate(milestone.id, {
                        onSuccess: (result) => toast.success(`+${result.energy} enerji kazandın!`),
                        onError: (error) => toast.error(energyErrorMessage(error)),
                      });
                    }}
                  >
                    {claimed ? "Alındı" : eligible ? "Al" : "Kilitli"}
                  </Button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Enerji paketleri */}
        <section className="card-surface p-5" aria-labelledby="pack-heading">
          <h2 id="pack-heading" className="flex items-center gap-2 text-lg">
            <Crown className="h-5 w-5 text-coin" /> Enerji paketleri
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Kartla güvenli ödeme PayTR üzerinden yapılır.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {ENERGY_PRODUCTS.map((pack) => (
              <div key={pack.id} className="rounded-2xl border border-border p-4 text-center">
                <p className="font-display text-2xl font-extrabold">{pack.quantity} ⚡</p>
                <p className="text-sm font-bold">{pack.price}</p>
                <p className="text-xs text-muted-foreground">{pack.note}</p>
                <PaytrCheckoutDialog product={pack} />
              </div>
            ))}
          </div>
          <Button asChild className="mt-4 font-bold">
            <Link to="/pro">
              <Crown className="mr-1 h-4 w-4" /> Pro'yu 7 gün ücretsiz dene
            </Link>
          </Button>
        </section>

        <section className="card-surface p-5" aria-labelledby="hint-pack-heading">
          <h2 id="hint-pack-heading" className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-coin" /> İpucu paketleri
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Bakiyen: <strong>{profile.hint_credits} ipucu</strong>. Her ipucunun ilk açılışı bir hak kullanır; Pro'da sınırsızdır.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {HINT_PRODUCTS.map((pack) => (
              <div key={pack.id} className="rounded-2xl border border-border p-4 text-center">
                <p className="font-display text-2xl font-extrabold">{pack.quantity} 💡</p>
                <p className="text-sm font-bold">{pack.price}</p>
                <p className="text-xs text-muted-foreground">{pack.note}</p>
                <PaytrCheckoutDialog product={pack} />
              </div>
            ))}
          </div>
        </section>

        {/* Geçmiş */}
        <section className="card-surface p-5" aria-labelledby="hist-heading">
          <h2 id="hist-heading" className="text-lg">
            Enerji geçmişi
          </h2>
          {history.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Henüz hareket yok.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {history.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-2 text-sm">
                  <span className="min-w-0 flex-1 truncate font-semibold">
                    {ENERGY_TYPE_LABEL[item.type] ?? item.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleString("tr-TR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span
                    className={cn(
                      "w-12 text-right font-bold",
                      item.amount > 0 ? "text-success" : item.amount < 0 ? "text-destructive" : "text-muted-foreground",
                    )}
                  >
                    {item.amount > 0 ? `+${item.amount}` : item.amount}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
