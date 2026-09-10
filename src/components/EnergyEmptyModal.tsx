import { Link } from "@tanstack/react-router";
import { Clock, Crown, Gift, Users, Video } from "lucide-react";
import type { Profile } from "@/hooks/useGameData";
import { formatCountdown, nextRefillAt } from "@/lib/energy";
import { Button } from "@/components/ui/button";

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
          Enerji tükendi!
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {requirement
            ? `Bu ders için en az ${requirement} enerji gerekiyor. Şu an ${profile.energy} enerjin var.`
            : "Devam etmek için enerji lazım. Doldurma yolları:"}
        </p>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-secondary p-4">
            <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0 text-sm">
              <p className="font-bold">Bekle ve dolsun</p>
              <p className="text-muted-foreground">
                Sonraki +1 enerji: {formatCountdown(nextRefillAt(profile))}
              </p>
            </div>
          </div>

          <OptionRow
            icon={<Video className="h-5 w-5 text-primary" />}
            title="Reklam izle"
            desc="30 saniye izle, +1 enerji (günde 2)"
            to="/rewards"
            hash="reklam"
            cta="İzle"
          />
          <OptionRow
            icon={<Gift className="h-5 w-5 text-accent" />}
            title="Şans çarkı & günlük giriş"
            desc="Günde bir kez çevir, 5 enerjiye kadar kazan"
            to="/rewards"
            cta="Aç"
          />
          <OptionRow
            icon={<Users className="h-5 w-5 text-success" />}
            title="Arkadaş davet et"
            desc="Her başarılı davet +5 enerji"
            to="/rewards"
            hash="davet"
            cta="Davet et"
          />
          <OptionRow
            icon={<Crown className="h-5 w-5 text-coin" />}
            title="Pro'ya yükselt"
            desc="Sınırsız enerji · 7 gün ücretsiz dene"
            to="/pro"
            cta="Dene"
            primary
          />
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button variant="ghost" className="font-bold" onClick={onClose}>
            Kapat
          </Button>
          <Button asChild variant="secondary" className="font-bold">
            <Link to="/dashboard">Panoya dön</Link>
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
