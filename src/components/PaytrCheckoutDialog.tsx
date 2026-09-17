import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createPaytrCheckout } from "@/lib/paytr.functions";
import type { StoreProduct } from "@/lib/store";
import { useT } from "@/lib/i18n";

export function PaytrCheckoutDialog({ product }: { product: StoreProduct }) {
  const checkout = useServerFn(createPaytrCheckout);
  const [token, setToken] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useT();

  async function startCheckout() {
    setOpen(true);
    setLoading(true);
    setToken(null);
    try {
      const result = await checkout({ data: { productId: product.id } });
      setToken(result.token);
    } catch (error) {
      setOpen(false);
      const message = error instanceof Error && error.message.includes("PAYTR_NOT_CONFIGURED")
        ? t("Ödeme altyapısı henüz hazır değil, lütfen daha sonra tekrar dene.", "Payment infrastructure isn't ready yet, please try again later.")
        : t("Ödeme ekranı açılamadı. Lütfen tekrar dene.", "The payment screen could not be opened. Please try again.");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <Button size="sm" className="mt-3 w-full font-bold" onClick={startCheckout}>
        <CreditCard className="mr-1 h-4 w-4" /> {t("Satın al", "Buy")}
      </Button>
      <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) setToken(null); }}>
        <DialogContent className="max-w-2xl p-0" aria-describedby={undefined}>
          <DialogHeader className="border-b border-border p-4">
            <DialogTitle>{product.name} · {product.price}</DialogTitle>
          </DialogHeader>
          {loading && <div className="flex h-[32rem] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
          {token && (
            <iframe
              title={t("PayTR güvenli ödeme", "PayTR secure payment")}
              src={`https://www.paytr.com/odeme/guvenli/${encodeURIComponent(token)}`}
              className="h-[36rem] w-full border-0"
              allow="payment"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
