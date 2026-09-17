import { Link } from "@tanstack/react-router";
import { Clock, Crown, Gift, Users, Video } from "lucide-react";
import type { Profile } from "@/hooks/useGameData";
import { formatCountdown, nextRefillAt } from "@/lib/energy";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

/** Enerji bittiğinde açılan yönlendirme penceresi. */
export function EnergyEmptyModal({
  profile,
  requirement,
  onClose,
}: {
  profile: Profile;
  requirement?: number;
  onClose: () => void;
}) {
  const t = useT();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="energy-empty-title"
    >
      <div className="card-surface pop-in max-h-[90vh] w-full max-w-md overflow-y-auto p-6">
        <p className="text-center text-5xl">😴</p>
        <h2 id="energy-empty-title" className="mt-3 text-center text-2xl">
          {t("Enerji tükendi!", "Energy is out!")}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {requirement
            ? t(
                `Bu ders için en az ${requirement} enerji gerekiyor. Şu an ${profile.energy} enerjin var.`,
                `This lesson requires at least ${requirement} energy. You currently have ${profile.energy} energy.`,
              )
            : t("Devam etmek için enerji lazım. Doldurma yolları:", "You need energy to continue. Ways to refill:")}
        </p>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-secondary p-4">
            <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0 text-sm">
              <p className="font-bold">{t("Bekle ve dolsun", "Wait and refill")}</p>
              <p className="text-muted-foreground">
                {t("Sonraki +1 enerji", "Next +1 energy")}: {formatCountdown(nextRefillAt(profile))}
              </p>
            </div>
          </div>

          <OptionRow
            icon={<Video className="h-5 w-5 text-primary" />}
            title={t("Reklam izle", "Watch an ad")}
            desc={t("30 saniye izle, +1 enerji (günde 2)", "Watch for 30 seconds, +1 energy (2 per day)")}
            to="/rewards"
            hash="reklam"
            cta={t("İzle", "Watch")}
          />
          <OptionRow
            icon={<Gift className="h-5 w-5 text-accent" />}
            title={t("Şans çarkı & günlük giriş", "Lucky wheel & daily login")}
            desc={t("Günde bir kez çevir, 5 enerjiye kadar kazan", "Spin once a day, earn up to 5 energy")}
            to="/rewards"
            cta={t("Aç", "Open")}
          />
          <OptionRow
            icon={<Users className="h-5 w-5 text-success" />}
            title={t("Arkadaş davet et", "Invite a friend")}
            desc={t("Her başarılı davet +5 enerji", "Every successful invite gives +5 energy")}
            to="/rewards"
            hash="davet"
            cta={t("Davet et", "Invite")}
          />
          <OptionRow
            icon={<Crown className="h-5 w-5 text-coin" />}
            title={t("Pro'ya yükselt", "Upgrade to Pro")}
            desc={t("Sınırsız enerji · 7 gün ücretsiz dene", "Unlimited energy · try 7 days free")}
            to="/pro"
            cta={t("Dene", "Try")}
            primary
          />
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button variant="ghost" className="font-bold" onClick={onClose}>
            {t("Kapat", "Close")}
          </Button>
          <Button asChild variant="secondary" className="font-bold">
            <Link to="/dashboard">{t("Panoya dön", "Back to dashboard")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function OptionRow({
  icon,
  title,
  desc,
  to,
  hash,
  cta,
  primary = false,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  to: "/rewards" | "/pro";
  hash?: string;
  cta: string;
  primary?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
      <span className="shrink-0">{icon}</span>
      <div className="min-w-0 flex-1 text-sm">
        <p className="font-bold">{title}</p>
        <p className="text-muted-foreground">{desc}</p>
      </div>
      <Button asChild size="sm" variant={primary ? "default" : "secondary"} className="font-bold">
        <Link to={to} {...(hash ? { hash } : {})}>
          {cta}
        </Link>
      </Button>
    </div>
  );
}
