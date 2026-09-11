export type StoreProduct = {
  id: string;
  name: string;
  type: "energy" | "hints" | "pro";
  quantity: number;
  amountKurus: number;
  price: string;
  note?: string;
};

export const ENERGY_PRODUCTS: StoreProduct[] = [
  { id: "energy5", name: "5 Enerji", type: "energy", quantity: 5, amountKurus: 2900, price: "₺29" },
  { id: "energy15", name: "15 Enerji", type: "energy", quantity: 15, amountKurus: 8900, price: "₺89", note: "%20 indirim" },
  { id: "energy30", name: "30 Enerji", type: "energy", quantity: 30, amountKurus: 14900, price: "₺149", note: "%30 indirim" },
];

export const HINT_PRODUCTS: StoreProduct[] = [
  { id: "hints10", name: "10 İpucu", type: "hints", quantity: 10, amountKurus: 4900, price: "₺49" },
  { id: "hints25", name: "25 İpucu", type: "hints", quantity: 25, amountKurus: 9900, price: "₺99", note: "%19 indirim" },
  { id: "hints50", name: "50 İpucu", type: "hints", quantity: 50, amountKurus: 16900, price: "₺169", note: "%31 indirim" },
];

export const PRO_PRODUCTS: StoreProduct[] = [
  { id: "pro-monthly", name: "CodeQuest Pro · 1 ay", type: "pro", quantity: 30, amountKurus: 14900, price: "₺149" },
  { id: "pro-quarterly", name: "CodeQuest Pro · 3 ay", type: "pro", quantity: 90, amountKurus: 39900, price: "₺399", note: "%25 indirim" },
  { id: "pro-yearly", name: "CodeQuest Pro · 1 yıl", type: "pro", quantity: 365, amountKurus: 109900, price: "₺1.099", note: "%40 indirim" },
];

export const STORE_PRODUCTS = [...ENERGY_PRODUCTS, ...HINT_PRODUCTS, ...PRO_PRODUCTS];

export function getStoreProduct(id: string): StoreProduct | undefined {
  return STORE_PRODUCTS.find((product) => product.id === id);
}