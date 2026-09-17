/**
 * Basit iki dilli çeviri yardımcısı.
 *
 * Kullanım (bileşen içinde):
 *   const t = useT();
 *   <h1>{t("Merhaba", "Hello")}</h1>
 *
 * Kullanım (bileşen dışı / hook / lib):
 *   translate("Merhaba", "Hello")
 */
import { useCallback } from "react";
import { useSettings, type UiLanguage } from "@/store/settings";

export type { UiLanguage };

export function currentLanguage(): UiLanguage {
  return useSettings.getState().language;
}

/** Bileşen dışı kullanım için. Reaktif değildir. */
export function translate(tr: string, en: string): string {
  return currentLanguage() === "en" ? en : tr;
}

export function useLanguage(): UiLanguage {
  return useSettings((s) => s.language);
}

/** Dile göre iki metinden birini seçer, dil değişince yeniden render olur. */
export function useT() {
  const lang = useSettings((s) => s.language);
  return useCallback((tr: string, en: string) => (lang === "en" ? en : tr), [lang]);
}

/** Tarih/sayı biçimlendirmede kullanılacak locale kodu. */
export function localeCode(lang: UiLanguage): string {
  return lang === "en" ? "en-US" : "tr-TR";
}
