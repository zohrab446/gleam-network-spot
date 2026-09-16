export type ActionResultShape = { ok: boolean; code?: string; data?: unknown };

/**
 * Sunucu, iç mantık durumlarını (SPIN_COOLDOWN gibi) temiz bir durum yanıtı olarak döner.
 * Arayüzde mevcut hata mesajı akışını korumak için burada Error'a çeviriyoruz.
 */
export function unwrapAction<T = unknown>(result: unknown): T {
  const value = result as ActionResultShape | null | undefined;
  if (!value || typeof value.ok !== "boolean") throw new Error("ACTION_FAILED");
  if (!value.ok) throw new Error(value.code ?? "ACTION_FAILED");
  return value.data as T;
}
