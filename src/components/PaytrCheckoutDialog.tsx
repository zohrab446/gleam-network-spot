import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createPaytrCheckout } from "@/lib/paytr.functions";
import type { StoreProduct } from "@/lib/store";

export function PaytrCheckoutDialog({ product }: { product: StoreProduct }) {
  const checkout = useServerFn(createPaytrCheckout);
  const [token, setToken] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function startCheckout() {
    // Ödemeler geçici olarak kapalı
    toast.info("Kart ödemeleri şimdilik aktif değil. Çok yakında açılacak!");
  }

  void checkout; void setToken; void setLoading; // ödemeler açıldığında tekrar kullanılacak

  return (
    <>
      <Button size="sm" className="mt-3 w-full font-bold" onClick={() => void startCheckout()}>
        <CreditCard className="mr-1 h-4 w-4" /> Satın al
      </Button>
      <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) setToken(null); }}>
        <DialogContent className="max-w-2xl p-0" aria-describedby={undefined}>
          <DialogHeader className="border-b border-border p-4">
            <DialogTitle>{product.name} · {product.price}</DialogTitle>
          </DialogHeader>
          {loading && <div className="flex h-[32rem] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
          {token && (
            <iframe
              title="PayTR güvenli ödeme"
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