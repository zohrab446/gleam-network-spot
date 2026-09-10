import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Battery, Crown, Gift, Infinity as InfinityIcon, Users } from "lucide-react";
import type { Profile } from "@/hooks/useGameData";
import { MAX_ENERGY, formatCountdown, fullRefillAt, isProActive, nextRefillAt } from "@/lib/energy";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Saniyede bir yenilenen sayaç metni. */
function useTicker(intervalMs = 30_000) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
}

export function EnergyPips({ profile, size = "md" }: { profile: Profile; size?: "sm" | "md" }) {
  const pro = isProActive(profile);
  const max = profile.max_energy ?? MAX_ENERGY;
  if (pro) {
    return (
      <span className="inline-flex items-center gap-1 font-bold text-primary">
        <Battery className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
        <InfinityIcon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${profile.energy} / ${max} enerji`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "rounded-sm",
            size === "sm" ? "h-3 w-2" : "h-4 w-2.5",
            i < profile.energy ? "bg-success" : "bg-locked",
          )}
        />
      ))}
      <span className={cn("ml-1 font-bold", size === "sm" ? "text-xs" : "text-sm")}>
        {profile.energy}/{max}
      </span>
    </span>
  );
}

/** Üst çubuktaki küçük enerji göstergesi. */
export function EnergyChip({ profile }: { profile: Profile | null | undefined }) {
  useTicker();
  if (!profile) return null;
  const pro = isProActive(profile);
  return (
    <Link
      to="/rewards"
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold",
        pro ? "bg-primary-soft text-primary" : profile.energy === 0 ? "bg-destructive/10 text-destructive" : "bg-secondary",
      )}
      title={pro ? "Pro: sınırsız enerji" : `Sonraki enerji: ${formatCountdown(nextRefillAt(profile))}`}
      aria-label="Enerji durumu ve ödüller"
    >
      <EnergyPips profile={profile} size="sm" />
    </Link>
  );
}

/** Panodaki büyük enerji kartı. */
export function EnergyCard({ profile }: { profile: Profile }) {
  useTicker();
  const pro = isProActive(profile);
  const max = profile.max_energy ?? MAX_ENERGY;
  const pct = pro ? 100 : Math.round((profile.energy / max) * 100);

  return (
    <section className="card-surface p-5" aria-labelledby="energy-heading">
      <div className="flex items-center gap-2">
        <Battery className="h-5 w-5 text-success" />
        <h2 id="energy-heading" className="text-lg">
          Enerji durumu
        </h2>
        {pro && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
            <Crown className="h-3.5 w-3.5" /> Pro
          </span>
        )}
      </div>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-locked">
        <div
          className={cn("h-full rounded-full transition-all", pro ? "bg-brand-gradient" : "bg-success")}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <EnergyPips profile={profile} />
        {!pro && profile.energy === 0 && (
          <span className="text-sm font-bold text-destructive">Enerji bitti 😴</span>
        )}
        {!pro && profile.energy === 1 && (
          <span className="text-sm font-bold text-destructive">Dikkat! Sadece 1 yanlış hakkın var</span>
        )}
      </div>

      {!pro && (
        <p className="mt-3 text-sm text-muted-foreground">
          Sonraki enerji: <strong>{formatCountdown(nextRefillAt(profile))}</strong> · Tam dolum:{" "}
          <strong>{formatCountdown(fullRefillAt(profile))}</strong>
        </p>
      )}
      {pro && <p className="mt-3 text-sm text-muted-foreground">Pro üyeliğinde enerji tükenmez, sınırsız dene.</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild variant="secondary" size="sm" className="font-bold">
          <Link to="/rewards">
            <Gift className="mr-1 h-4 w-4" /> Enerji kazan
          </Link>
        </Button>
        <Button asChild variant="secondary" size="sm" className="font-bold">
          <Link to="/rewards" hash="davet">
            <Users className="mr-1 h-4 w-4" /> Arkadaş davet
          </Link>
        </Button>
        {!pro && (
          <Button asChild size="sm" className="font-bold">
            <Link to="/pro">
              <Crown className="mr-1 h-4 w-4" /> Pro'ya yükselt
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
