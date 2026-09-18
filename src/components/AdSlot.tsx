import { useEffect, useRef } from "react";

/** Google AdSense yayıncı kimliği. */
export const ADSENSE_CLIENT = "ca-pub-5872673391651434";

/**
 * Reklam birimi. Slot kimliği verilmezse (henüz AdSense panelinden alınmadıysa)
 * sade bir yer tutucu gösterilir; sayfa hiçbir zaman bozulmaz.
 */
export function AdSlot({
  slot,
  className,
  placeholder,
}: {
  slot?: string;
  className?: string;
  placeholder?: React.ReactNode;
}) {
  const ref = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!slot || !ref.current) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // Reklam yüklenemezse sessizce geç.
    }
  }, [slot]);

  if (!slot) return <>{placeholder ?? null}</>;

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
