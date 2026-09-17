import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { Gift, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redeemPromoCode } from "@/lib/promo.functions";
import { celebrate } from "@/lib/celebrate";
import { translate, useT } from "@/lib/i18n";

const ERRORS: Record<string, string> = {
  invalid: translate("Böyle bir promosyon kodu yok.", "No such promo code exists."),
  inactive: translate("Bu kod artık geçerli değil.", "This code is no longer valid."),
  exhausted: translate("Bu kodun kullanım hakkı doldu.", "This code has run out of uses."),
  already_used: translate("Bu kodu daha önce kullandın.", "You've already used this code."),
  no_profile: translate("Profilin bulunamadı, sayfayı yenile.", "Your profile could not be found, please refresh the page."),
};

const PLAN_LABELS: Record<string, string> = {
  monthly: translate("1 aylık Pro", "1-month Pro"),
  quarterly: translate("3 aylık Pro", "3-month Pro"),
  yearly: translate("1 yıllık Pro", "1-year Pro"),
};

export function PromoCodeCard() {
  const redeem = useServerFn(redeemPromoCode);
  const queryClient = useQueryClient();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useT();

  async function submit() {
    const value = code.trim();
    if (!value) return;
    setLoading(true);
    try {
      const result = await redeem({ data: { code: value } });
      if (!result.ok) {
        toast.error(ERRORS[result.error ?? ""] ?? t("Kod kullanılamadı.", "This code could not be used."));
        return;
      }
      setCode("");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      void celebrate();
      toast.success(`${PLAN_LABELS[result.pro_plan ?? ""] ?? "Pro"} ${t("hesabına eklendi 👑", "added to your account 👑")}`);
    } catch {
      toast.error(t("Kod kontrol edilemedi, tekrar dener misin?", "The code could not be verified, would you try again?"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card-surface p-5" aria-labelledby="promo-heading">
      <h2 id="promo-heading" className="flex items-center gap-2 text-lg">
        <Gift className="h-5 w-5 text-primary" /> {t("Promosyon kodu", "Promo code")}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("Elindeki kodu gir, Pro üyeliğin anında aktifleşsin.", "Enter your code and your Pro membership activates instantly.")}
      </p>
      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <Input
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          placeholder={t("KODUNUZ", "YOUR CODE")}
          aria-label={t("Promosyon kodu", "Promo code")}
          maxLength={40}
          className="font-bold tracking-wider"
        />
        <Button type="submit" className="font-bold" disabled={loading || !code.trim()}>
          {loading ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
          {t("Kodu kullan", "Use code")}
        </Button>
      </form>
    </section>
  );
}
