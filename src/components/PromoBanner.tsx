import { Link, useLocation } from "@tanstack/react-router";
import { Gift, Sparkle } from "lucide-react";
import { useT } from "@/lib/i18n";

/**
 * Site-genel duyuru bandı.
 * Oyunların/derslerin oynandığı (lesson) sayfalarda gösterilmez,
 * böylece oynarken dikkat dağıtmaz.
 */
export function PromoBanner() {
  const { pathname } = useLocation();
  const t = useT();

  // Ders/oyun ekranında bandı gizle.
  if (pathname.startsWith("/lesson")) return null;

  return (
    <Link to="/auth" className="block">
      <div className="bg-brand-gradient px-4 py-2.5 text-center text-sm font-bold text-primary-foreground">
        <span className="inline-flex items-center gap-2">
          <Gift className="h-4 w-4" />
          {t(
            "Her ayın 15'inde liderlik tablosunun 1. sırasındaki oyuncuya 5 aylık Claude Pro hediye!",
            "On the 15th of every month, the #1 player on the leaderboard wins 5 months of Claude Pro!",
          )}
          <Sparkle className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
