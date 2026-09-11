import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { Gift, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redeemPromoCode } from "@/lib/promo.functions";
import { celebrate } from "@/lib/celebrate";

const ERRORS: Record<string, string> = {
  invalid: "Böyle bir promosyon kodu yok.",
  inactive: "Bu kod artık geçerli değil.",
  exhausted: "Bu kodun kullanım hakkı doldu.",
  already_used: "Bu kodu daha önce kullandın.",
  no_profile: "Profilin bulunamadı, sayfayı yenile.",
};

const PLAN_LABELS: Record<string, string> = {
  monthly: "1 aylık Pro",
  quarterly: "3 aylık Pro",
  yearly: "1 yıllık Pro",
};

export function PromoCodeCard() {
  const redeem = useServerFn(redeemPromoCode);
  const queryClient = useQueryClient();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    const value = code.trim();
    if (!value) return;
    setLoading(true);
    try {
      const result = await redeem({ data: { code: value } });
      if (!result.ok) {
        toast.error(ERRORS[result.error ?? ""] ?? "Kod kullanılamadı.");
        return;
      }
      setCode("");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      void celebrate();
      toast.success(`${PLAN_LABELS[result.pro_plan ?? ""] ?? "Pro"} hesabına eklendi 👑`);
    } catch {
      toast.error("Kod kontrol edilemedi, tekrar dener misin?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card-surface p-5" aria-labelledby="promo-heading">
      <h2 id="promo-heading" className="flex items-center gap-2 text-lg">
        <Gift className="h-5 w-5 text-primary" /> Promosyon kodu
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Elindeki kodu gir, Pro üyeliğin anında aktifleşsin.
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
          placeholder="KODUNUZ"
          aria-label="Promosyon kodu"
          maxLength={40}
          className="font-bold tracking-wider"
        />
        <Button type="submit" className="font-bold" disabled={loading || !code.trim()}>
          {loading ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
          Kodu kullan
        </Button>
      </form>
    </section>
  );
}
