import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/payment/success")({
  head: () => ({ meta: [
    { title: "Ödeme Alındı — CodeQuest" },
    { name: "description", content: "CodeQuest ödeme sonucu." },
    { property: "og:title", content: "Ödeme Alındı — CodeQuest" },
    { property: "og:description", content: "CodeQuest ödeme sonucu." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: PaymentSuccess,
});

function PaymentSuccess() {
  const queryClient = useQueryClient();
  useEffect(() => { void queryClient.invalidateQueries({ queryKey: ["profile"] }); }, [queryClient]);
  return <AppShell><section className="card-surface mx-auto max-w-lg p-8 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-success" /><h1 className="mt-4 text-2xl">Ödemen alındı</h1><p className="mt-2 text-muted-foreground">PayTR onayından sonra enerji veya ipuçların hesabına otomatik eklenir.</p><Button asChild className="mt-6"><Link to="/rewards">Ödüllere dön</Link></Button></section></AppShell>;
}