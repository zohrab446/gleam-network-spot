import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/useGameData";
import { useEnergySync, useStartProTrial } from "@/hooks/useEnergy";
import { PRO_PERKS, PRO_PLANS, energyErrorMessage, isProActive } from "@/lib/energy";
import { celebrate } from "@/lib/celebrate";
import { cn } from "@/lib/utils";
import { PaytrCheckoutDialog } from "@/components/PaytrCheckoutDialog";
import { PRO_PRODUCTS } from "@/lib/store";

export const Route = createFileRoute("/_authenticated/pro")({
  head: () => ({
    meta: [
      { title: "CodeQuest Pro — Sınırsız enerji" },
      {
        name: "description",
        content: "Sınırsız enerji, reklamsız deneyim, 1.5x XP ve 2x coin ile 7 gün ücretsiz dene.",
      },
      { property: "og:title", content: "CodeQuest Pro — Sınırsız enerji" },
      { property: "og:description", content: "Enerji derdi olmadan kod öğren: CodeQuest Pro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProPage,
});

function ProPage() {
  useEnergySync();
  const { data: profile, isLoading } = useProfile();
  const startTrial = useStartProTrial();

  if (isLoading || !profile) {
    return (
      <AppShell>
        <Skeleton className="h-[60vh] w-full rounded-2xl" />
      </AppShell>
    );
  }

  const pro = isProActive(profile);

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="bg-brand-gradient p-6 text-primary-foreground">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
              <Crown className="h-3.5 w-3.5" /> CodeQuest Pro
            </p>
            <h1 className="mt-3 text-3xl">Enerji derdi olmadan öğren</h1>
            <p className="mt-2 max-w-xl text-sm opacity-90">
              Sınırsız enerji, yanlış cevapta kayıp yok, reklamsız deneyim, 1.5x XP ve 2x coin.
            </p>
          </div>
          <div className="p-6">
            {pro ? (
              <div className="rounded-2xl bg-success-soft p-4">
                <p className="font-bold text-success">Pro üyeliğin aktif 👑</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Plan: {profile.pro_plan === "trial" ? "7 gün ücretsiz deneme" : (profile.pro_plan ?? "Pro")}
                  {profile.pro_expires_at
                    ? ` · Bitiş: ${new Date(profile.pro_expires_at).toLocaleDateString("tr-TR")}`
                    : ""}
                </p>
              </div>
            ) : (
              <Button
                size="lg"
                className="font-bold"
                disabled={profile.pro_trial_used || startTrial.isPending}
                onClick={() =>
                  startTrial.mutate(undefined, {
                    onSuccess: () => {
                      void celebrate();
                      toast.success("7 gün Pro deneme başladı! Enerjin sınırsız 👑");
                    },
                    onError: (error) => toast.error(energyErrorMessage(error)),
                  })
                }
              >
                <Sparkles className="mr-1 h-4 w-4" />
                {profile.pro_trial_used ? "Deneme kullanıldı" : "7 gün ücretsiz dene"}
              </Button>
            )}
          </div>
        </section>

        <section className="card-surface p-5" aria-labelledby="plans-heading">
          <h2 id="plans-heading" className="text-lg">
            Planlar
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Ücretli planlarda kart ödemen PayTR güvencesiyle alınır.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PRO_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "rounded-2xl border p-4 text-center",
                  plan.highlight ? "border-primary bg-primary-soft" : "border-border",
                )}
              >
                <p className="text-sm font-bold">{plan.label}</p>
                <p className="mt-1 font-display text-2xl font-extrabold">{plan.price}</p>
                {plan.note && <p className="text-xs text-muted-foreground">{plan.note}</p>}
                {plan.id === "trial" ? (
                  <Button
                    size="sm"
                    className="mt-3 w-full font-bold"
                    disabled={pro || profile.pro_trial_used || startTrial.isPending}
                    onClick={() =>
                      startTrial.mutate(undefined, {
                        onSuccess: () => {
                          void celebrate();
                          toast.success("7 gün Pro deneme başladı 👑");
                        },
                        onError: (error) => toast.error(energyErrorMessage(error)),
                      })
                    }
                  >
                    {pro ? "Aktif" : profile.pro_trial_used ? "Kullanıldı" : "Başlat"}
                  </Button>
                ) : <PaytrCheckoutDialog product={PRO_PRODUCTS.find((item) => item.id === `pro-${plan.id}`)!} />}
              </div>
            ))}
          </div>
        </section>

        <section className="card-surface p-5" aria-labelledby="perks-heading">
          <h2 id="perks-heading" className="text-lg">
            Normal vs Pro
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <th className="py-2">Özellik</th>
                  <th className="py-2">Normal</th>
                  <th className="py-2">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PRO_PERKS.map((perk) => (
                  <tr key={perk.feature}>
                    <td className="py-2 font-semibold">{perk.feature}</td>
                    <td className="py-2 text-muted-foreground">{perk.free}</td>
                    <td className="py-2 font-bold text-primary">{perk.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 space-y-1.5 text-sm">
            {["Premium dersler", "Asistan yanıt önceliği", "Reklamsız arayüz"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <Button asChild variant="ghost" className="font-bold">
          <Link to="/rewards">Enerji kazanma yollarına bak</Link>
        </Button>
      </div>
    </AppShell>
  );
}
