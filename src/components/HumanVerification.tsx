import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { loadTurnstile, subscribeVerification, widgetAPI, type VerificationRequest } from "@/lib/turnstile-browser";
import { useT } from "@/lib/i18n";

export function HumanVerification() {
  const [request, setRequest] = useState<VerificationRequest | null>(null);
  const target = useRef<HTMLDivElement>(null);
  const t = useT();
  useEffect(() => subscribeVerification(setRequest), []);
  useEffect(() => {
    if (!request) return;
    let cancelled = false;
    let widget: string | undefined;
    // The dialog portal mounts after this effect; wait one frame.
    const frame = window.requestAnimationFrame(() => {
      void loadTurnstile().then((siteKey) => {
        const api = widgetAPI();
        if (cancelled) return;
        if (!api || !target.current) throw new Error("BOT_BLOCKED:unavailable");
        widget = api.render(target.current, {
          sitekey: siteKey, action: request.action, theme: "auto", size: "flexible",
          callback: request.resolve,
          "error-callback": () => request.reject(new Error("BOT_BLOCKED:verification")),
          "expired-callback": () => request.reject(new Error("BOT_BLOCKED:expired")),
          "timeout-callback": () => request.reject(new Error("BOT_BLOCKED:timeout")),
        });
      }).catch(() => { if (!cancelled) request.reject(new Error("BOT_BLOCKED:unavailable")); });
    });
    return () => { cancelled = true; window.cancelAnimationFrame(frame); if (widget) widgetAPI()?.remove(widget); };
  }, [request]);
  return <Dialog open={request !== null} onOpenChange={(open) => { if (!open) request?.reject(new Error("BOT_BLOCKED:cancelled")); }}>
    <DialogContent className="max-w-sm">
      <DialogTitle>{t("Güvenlik doğrulaması", "Security verification")}</DialogTitle>
      <DialogDescription>{t("İşlemin için doğrulama bekleniyor.", "Verification is pending for your action.")}</DialogDescription>
      <div ref={target} className="min-h-20 w-full" />
    </DialogContent>
  </Dialog>;
}