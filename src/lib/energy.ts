/**
 * CodeQuest enerji sistemi kuralları (istemci tarafı yardımcıları).
 * Gerçek enerji hesapları veritabanındaki güvenli fonksiyonlarda yapılır;
 * buradaki değerler yalnızca arayüzde göstermek/önizlemek için kullanılır.
 */

export const MAX_ENERGY = 5;
export const REFILL_MINUTES = 90;
export const REFILL_HOURS = REFILL_MINUTES / 60;
export const SKIP_COST = 2;
export const AD_DAILY_LIMIT = 2;
export const AD_COOLDOWN_HOURS = 4;

export type Difficulty = "beginner" | "intermediate" | "advanced";

/** Seviye numarasından zorluk: HTML kolay, ileri track'ler daha pahalı. */
export function difficultyOf(level: number): Difficulty {
  if (level <= 20) return "beginner";
  if (level <= 170) return "intermediate";
  return "advanced";
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: "⭐ Kolay",
  intermediate: "⭐⭐ Orta",
  advanced: "⭐⭐⭐ Zor",
};

const BASE_PENALTY: Record<Difficulty, number> = {
  beginner: 1,
  intermediate: 1,
  advanced: 1,
};

/** Yanlış cevabın enerji bedeli. Pro hesapta 0; uzun seri bedeli düşürür. */
export function energyPenalty(level: number, opts: { isPro: boolean; streak: number }): number {
  if (opts.isPro) return 0;
  return BASE_PENALTY[difficultyOf(level)];
}

/** Derse başlamak için gereken minimum enerji. */
export function energyRequirement(level: number, opts: { isPro: boolean; streak: number }): number {
  return Math.min(MAX_ENERGY, energyPenalty(level, opts));
}

export function isProActive(profile: { is_pro?: boolean; pro_expires_at?: string | null } | null | undefined): boolean {
  if (!profile?.is_pro) return false;
  if (!profile.pro_expires_at) return true;
  return new Date(profile.pro_expires_at).getTime() > Date.now();
}

/** Sonraki +1 enerjinin geleceği zaman (ms). Dolu ise null. */
export function nextRefillAt(profile: {
  energy: number;
  max_energy: number;
  energy_updated_at: string;
}): number | null {
  if (profile.energy >= profile.max_energy) return null;
  return new Date(profile.energy_updated_at).getTime() + REFILL_HOURS * 3600_000;
}

/** Enerjinin tamamen dolacağı zaman (ms). */
export function fullRefillAt(profile: {
  energy: number;
  max_energy: number;
  energy_updated_at: string;
}): number | null {
  if (profile.energy >= profile.max_energy) return null;
  const missing = profile.max_energy - profile.energy;
  return new Date(profile.energy_updated_at).getTime() + missing * REFILL_HOURS * 3600_000;
}

export function formatCountdown(target: number | null): string {
  if (target === null) return "dolu";
  const ms = target - Date.now();
  if (ms <= 0) return "birazdan";
  const totalMinutes = Math.ceil(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} dk`;
  return `${hours} saat ${minutes} dk`;
}

export const DAILY_LOGIN_REWARDS = [2, 2, 2, 3, 3, 3, 5];

export const SPIN_SLICES = [
  { amount: 0, emoji: "🍎", chance: 20 },
  { amount: 1, emoji: "🍊", chance: 30 },
  { amount: 2, emoji: "🍋", chance: 25 },
  { amount: 3, emoji: "🍇", chance: 15 },
  { amount: 5, emoji: "🌟", chance: 10 },
] as const;

export type MilestoneDef = {
  id: string;
  title: string;
  description: string;
  energy: number;
};

export const MILESTONES: MilestoneDef[] = [
  { id: "levels-50", title: "50 ders", description: "50 dersi tamamla", energy: 10 },
  { id: "levels-100", title: "100 ders", description: "100 dersi tamamla", energy: 15 },
  { id: "xp-500000", title: "500.000 XP", description: "Toplam 500.000 XP topla", energy: 20 },
  { id: "streak-30", title: "30 gün seri", description: "30 gün üst üste çalış", energy: 25 },
];

export function badgeEnergyReward(badgeId: string): number {
  if (badgeId === "grandmaster" || badgeId === "level-100") return 10;
  if (badgeId === "level-50" || badgeId === "week-warrior" || badgeId === "consistent-coder" || badgeId === "polyglot")
    return 5;
  if (badgeId.endsWith("-master")) return 5;
  if (badgeId === "level-10") return 3;
  return 2;
}

export type ProPlan = {
  id: string;
  label: string;
  price: string;
  note?: string;
  highlight?: boolean;
};

export const PRO_PLANS: ProPlan[] = [
  { id: "trial", label: "7 gün deneme", price: "Ücretsiz", note: "Kart gerekmez", highlight: true },
  { id: "monthly", label: "1 ay", price: "₺149", note: "$4.99" },
  { id: "quarterly", label: "3 ay", price: "₺399", note: "%25 indirim" },
  { id: "yearly", label: "1 yıl", price: "₺1.099", note: "%40 indirim" },
];

export const PRO_PERKS: { feature: string; free: string; pro: string }[] = [
  { feature: "Enerji kapasitesi", free: "Maksimum 5", pro: "Sınırsız" },
  { feature: "Enerji dolum hızı", free: "90 dk'da +1", pro: "Bekleme yok" },
  { feature: "Tam dolum süresi", free: "7,5 saat", pro: "Anında sınırsız" },
  { feature: "Yanlış cevap bedeli", free: "-1 enerji", pro: "0 (can gitmez)" },
  { feature: "Seviye atlama", free: "-2 enerji", pro: "Sınırsız" },
  { feature: "Reklamsız deneyim", free: "❌", pro: "✅" },
  { feature: "Günlük bonus coin", free: "+50", pro: "+150" },
  { feature: "XP çarpanı", free: "1x", pro: "1x (eşit)" },
  { feature: "Coin çarpanı", free: "1x", pro: "2x" },
  { feature: "Seri çarpanı", free: "7 günde 2x", pro: "7 günde 2x (eşit)" },
  { feature: "Asistan önceliği", free: "❌", pro: "✅" },
];

/** Enerji hata kodlarını Türkçe mesaja çevirir. */
export function energyErrorMessage(error: unknown): string {
  const raw = (error as { message?: string } | null)?.message ?? "";
  if (raw.includes("SPIN_COOLDOWN")) return "Çarkı bugün çevirdin. 24 saat sonra tekrar dene.";
  if (raw.includes("AD_LIMIT")) return "Bugünün reklam hakkını doldurdun (2/2).";
  if (raw.includes("AD_COOLDOWN")) return "Yeni reklam için biraz beklemen gerekiyor.";
  if (raw.includes("ALREADY_CLAIMED")) return "Bu ödülü zaten aldın.";
  if (raw.includes("BADGE_NOT_EARNED")) return "Bu rozeti henüz kazanmadın.";
  if (raw.includes("NOT_ELIGIBLE")) return "Bu ödül için koşulu henüz tamamlamadın.";
  if (raw.includes("ALREADY_REFERRED")) return "Zaten bir davet kodu kullandın.";
  if (raw.includes("SELF_REFERRAL")) return "Kendi kodunu kullanamazsın 🙂";
  if (raw.includes("INVALID_CODE")) return "Bu davet kodu bulunamadı.";
  if (raw.includes("TRIAL_USED")) return "Ücretsiz denemeyi daha önce kullandın.";
  if (raw.includes("ALREADY_PRO")) return "Pro üyeliğin şu an aktif.";
  return "İşlem tamamlanamadı, tekrar dener misin?";
}
