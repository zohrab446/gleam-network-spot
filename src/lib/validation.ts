/**
 * Ortak girdi doğrulama kuralları (istemci + sunucu).
 * Sunucu tarafında da aynı kurallar uygulanır; istemci kontrolü sadece kullanıcı deneyimi içindir.
 */

/** Yalnızca harf, rakam, alt çizgi ve nokta; 3–20 karakter. */
export const USERNAME_REGEX = /^[A-Za-z0-9._]{3,20}$/;

/** HTML etiketi / olay yöneticisi / script denemeleri. */
const UNSAFE_PATTERN = /(<|>|"|'|`|script|iframe|img|svg|onerror|onload|onclick|javascript:|data:text\/html)/i;

export function isUnsafeText(value: string): boolean {
  return UNSAFE_PATTERN.test(value);
}

export type UsernameCheck = { ok: true; value: string } | { ok: false; message: string };

export function validateUsername(input: string): UsernameCheck {
  const value = input.trim();
  if (isUnsafeText(value)) {
    return { ok: false, message: "Kullanıcı adında özel karakter veya etiket kullanılamaz." };
  }
  if (!USERNAME_REGEX.test(value)) {
    return {
      ok: false,
      message: "Kullanıcı adı 3–20 karakter olmalı; yalnızca harf, rakam, nokta ve alt çizgi kullanılabilir.",
    };
  }
  return { ok: true, value };
}

/** Sunucu tarafı kullanıcı adı şeması. */
export function parseUsername(input: unknown): string {
  if (typeof input !== "string") throw new Error("Geçersiz istek");
  const result = validateUsername(input);
  if (!result.ok) throw new Error("Geçersiz istek");
  return result.value;
}
