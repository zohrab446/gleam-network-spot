import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

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
  return <AppShell><section className="card-surface mx-auto max-w-lg p-8 text-center"><XCircle className="mx-auto h-14 w-14 text-destructive" /><h1 className="mt-4 text-2xl">Ödeme tamamlanamadı</h1><p className="mt-2 text-muted-foreground">Kartından başarılı bir tahsilat yapılmadı. Paketi yeniden deneyebilirsin.</p><Button asChild className="mt-6"><Link to="/rewards">Paketlere dön</Link></Button></section></AppShell>;
}