import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/payment/failed")({
  head: () => ({ meta: [
    { title: "Ödeme Tamamlanamadı — CodeQuest" },
    { name: "description", content: "CodeQuest ödeme sonucu." },
    { property: "og:title", content: "Ödeme Tamamlanamadı — CodeQuest" },
    { property: "og:description", content: "CodeQuest ödeme sonucu." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: PaymentFailed,
});

function PaymentFailed() {
  const t = useT();
  return <AppShell><section className="card-surface mx-auto max-w-lg p-8 text-center"><XCircle className="mx-auto h-14 w-14 text-destructive" /><h1 className="mt-4 text-2xl">{t("Ödeme tamamlanamadı", "Payment could not be completed")}</h1><p className="mt-2 text-muted-foreground">{t("Kartından başarılı bir tahsilat yapılmadı. Paketi yeniden deneyebilirsin.", "No successful charge was made to your card. You can try the package again.")}</p><Button asChild className="mt-6"><Link to="/rewards">{t("Paketlere dön", "Back to packages")}</Link></Button></section></AppShell>;
}
