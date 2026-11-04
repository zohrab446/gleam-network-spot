import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Code2 } from "lucide-react";
export function FeaturePreview({ title, onClose }: { title: string | null; onClose: () => void }) {
  return <Dialog open={Boolean(title)} onOpenChange={(open) => { if (!open) onClose(); }}><DialogContent><DialogHeader><div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary"><Code2 /></div><DialogTitle>{title}</DialogTitle><DialogDescription>Bu bölüm henüz kullanıma açılmadı. Öğrenme yollarında kod yazmaya ve puan kazanmaya devam edebilirsin.</DialogDescription></DialogHeader></DialogContent></Dialog>;
}