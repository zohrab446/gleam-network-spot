import type { ActionResult } from "@/lib/game.functions";

/**
 * Sunucu, iç mantık durumlarını (SPIN_COOLDOWN gibi) temiz bir durum yanıtı olarak döner.
 * Arayüzde mevcut hata mesajı akışını korumak için burada Error'a çeviriyoruz.
 */
export function unwrapAction<T>(result: ActionResult<T> | null | undefined): T {
  if (!result || !("ok" in result)) throw new Error("ACTION_FAILED");
  if (!result.ok) throw new Error(result.code);
  return result.data;
}
