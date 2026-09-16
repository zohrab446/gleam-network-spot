import { Link, useLocation } from "@tanstack/react-router";
import { Gift, Sparkle } from "lucide-react";

/**
 * Site-genel duyuru bandı.
 * Oyunların/derslerin oynandığı (lesson) sayfalarda gösterilmez,
 * böylece oynarken dikkat dağıtmaz.
 */
export function PromoBanner() {
  const { pathname } = useLocation();

  // Ders/oyun ekranında bandı gizle.
  if (pathname.startsWith("/lesson")) return null;

  return (
    <Link to="/auth" className="block">
      <div className="bg-brand-gradient px-4 py-2.5 text-center text-sm font-bold text-primary-foreground">
        <span className="inline-flex items-center gap-2">
          <Gift className="h-4 w-4" />
          Her ayın 15'inde liderlik tablosunun 1. sırasındaki oyuncuya 5 aylık Claude Pro hediye!
          <Sparkle className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
