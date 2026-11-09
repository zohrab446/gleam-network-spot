import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile, useProgress } from "@/hooks/useGameData";
import { ProWorkspace } from "@/components/ProWorkspace";
import { useEnergySync, useStartProTrial } from "@/hooks/useEnergy";
import { PRO_PERKS, PRO_PLANS, energyErrorMessage, isProActive } from "@/lib/energy";
import { celebrate } from "@/lib/celebrate";
import { cn } from "@/lib/utils";
import { PaytrCheckoutDialog } from "@/components/PaytrCheckoutDialog";
import { PRO_PRODUCTS } from "@/lib/store";
import { PromoCodeCard } from "@/components/PromoCodeCard";
import { useT, useLanguage, localeCode } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/pro")({
  head: () => ({
    meta: [
      { title: "CodeQuest Pro — Sınırsız enerji" },
      {
        name: "description",
        content: "Sınırsız enerji, yanlış cevapta can kaybı yok, reklamsız deneyim ve 2x coin ile 7 gün ücretsiz dene.",
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
  const t = useT();
  const lang = useLanguage();
  const { data: profile, isLoading } = useProfile();
  const { data: progress } = useProgress();
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
    <AppShell dashboard>
      <div className="space-y-6">
        <ProWorkspace profile={profile} pro={pro} completed={progress?.length ?? 0} />
        <section>
            {pro ? (
              <div className="rounded-2xl bg-success-soft p-4">
                <p className="font-bold text-success">{t("Pro üyeliğin aktif 👑", "Your Pro membership is active 👑")}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("Plan", "Plan")}: {profile.pro_plan === "trial" ? t("7 gün ücretsiz deneme", "7-day free trial") : (profile.pro_plan ?? "Pro")}
                  {profile.pro_expires_at
                    ? ` · ${t("Bitiş", "Ends")}: ${new Date(profile.pro_expires_at).toLocaleDateString(localeCode(lang))}`
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
                      toast.success(t("7 gün Pro deneme başladı! Enerjin sınırsız 👑", "7-day Pro trial started! Your energy is unlimited 👑"));
                    },
                    onError: (error) => toast.error(energyErrorMessage(error)),
                  })
                }
              >
                <Sparkles className="mr-1 h-4 w-4" />
                {profile.pro_trial_used ? t("Deneme kullanıldı", "Trial used") : t("7 gün ücretsiz dene", "Try 7 days free")}
              </Button>
            )}
        </section>

        <section className="card-surface p-5" aria-labelledby="plans-heading">
          <h2 id="plans-heading" className="text-lg">
            {t("Planlar", "Plans")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("Ücretli planlarda kart ödemen PayTR güvencesiyle alınır.", "Card payments on paid plans are secured by PayTR.")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PRO_PLANS.map((plan) => {
              const product = PRO_PRODUCTS.find((item) => item.id === `pro-${plan.id}`);
              return (
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
                          toast.success(t("7 gün Pro deneme başladı 👑", "7-day Pro trial started 👑"));
                        },
                        onError: (error) => toast.error(energyErrorMessage(error)),
                      })
                    }
                  >
                    {pro ? t("Aktif", "Active") : profile.pro_trial_used ? t("Kullanıldı", "Used") : t("Başlat", "Start")}
                  </Button>
                ) : product ? <PaytrCheckoutDialog product={product} /> : null}
              </div>
            ); })}
          </div>
        </section>

        <PromoCodeCard />

        <section className="card-surface p-5" aria-labelledby="perks-heading">
          <h2 id="perks-heading" className="text-lg">
            {t("Normal vs Pro", "Free vs Pro")}
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <th className="py-2">{t("Özellik", "Feature")}</th>
                  <th className="py-2">{t("Normal", "Free")}</th>
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
            {[
              t("Premium dersler", "Premium lessons"),
              t("Asistan yanıt önceliği", "Priority assistant replies"),
              t("Reklamsız arayüz", "Ad-free interface"),
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <Button asChild variant="ghost" className="font-bold">
          <Link to="/rewards">{t("Enerji kazanma yollarına bak", "See ways to earn energy")}</Link>
        </Button>
      </div>
    </AppShell>
  );
}
