import { translate } from "@/lib/i18n";

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
  beginner: translate("⭐ Kolay", "⭐ Easy"),
  intermediate: translate("⭐⭐ Orta", "⭐⭐ Medium"),
  advanced: translate("⭐⭐⭐ Zor", "⭐⭐⭐ Hard"),
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
  if (target === null) return translate("dolu", "full");
  const ms = target - Date.now();
  if (ms <= 0) return translate("birazdan", "soon");
  const totalMinutes = Math.ceil(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return translate(`${minutes} dk`, `${minutes} min`);
  return translate(`${hours} saat ${minutes} dk`, `${hours}h ${minutes}m`);
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
  { id: "levels-50", title: translate("50 ders", "50 lessons"), description: translate("50 dersi tamamla", "Complete 50 lessons"), energy: 10 },
  { id: "levels-100", title: translate("100 ders", "100 lessons"), description: translate("100 dersi tamamla", "Complete 100 lessons"), energy: 15 },
  { id: "xp-500000", title: translate("500.000 XP", "500,000 XP"), description: translate("Toplam 500.000 XP topla", "Earn a total of 500,000 XP"), energy: 20 },
  { id: "streak-30", title: translate("30 gün seri", "30-day streak"), description: translate("30 gün üst üste çalış", "Study 30 days in a row"), energy: 25 },
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
  { id: "trial", label: translate("7 gün deneme", "7-day trial"), price: translate("Ücretsiz", "Free"), note: translate("Kart gerekmez", "No card needed"), highlight: true },
  { id: "monthly", label: translate("1 ay", "1 month"), price: "₺149", note: "$4.99" },
  { id: "quarterly", label: translate("3 ay", "3 months"), price: "₺399", note: translate("%25 indirim", "25% off") },
  { id: "yearly", label: translate("1 yıl", "1 year"), price: "₺1.099", note: translate("%40 indirim", "40% off") },
];

export const PRO_PERKS: { feature: string; free: string; pro: string }[] = [
  { feature: translate("Enerji kapasitesi", "Energy capacity"), free: translate("Maksimum 5", "Max 5"), pro: translate("Sınırsız", "Unlimited") },
  { feature: translate("Enerji dolum hızı", "Energy refill speed"), free: translate("90 dk'da +1", "+1 every 90 min"), pro: translate("Bekleme yok", "No wait") },
  { feature: translate("Tam dolum süresi", "Full refill time"), free: translate("7,5 saat", "7.5 hours"), pro: translate("Anında sınırsız", "Instantly unlimited") },
  { feature: translate("Yanlış cevap bedeli", "Wrong answer cost"), free: translate("-1 enerji", "-1 energy"), pro: translate("0 (can gitmez)", "0 (no loss)") },
  { feature: translate("Seviye atlama", "Skipping a level"), free: translate("-2 enerji", "-2 energy"), pro: translate("Sınırsız", "Unlimited") },
  { feature: translate("Reklamsız deneyim", "Ad-free experience"), free: "❌", pro: "✅" },
  { feature: translate("Günlük bonus coin", "Daily bonus coins"), free: "+50", pro: "+150" },
  { feature: translate("XP çarpanı", "XP multiplier"), free: "1x", pro: translate("1x (eşit)", "1x (same)") },
  { feature: translate("Coin çarpanı", "Coin multiplier"), free: "1x", pro: "2x" },
  { feature: translate("Seri çarpanı", "Streak multiplier"), free: translate("7 günde 2x", "2x every 7 days"), pro: translate("7 günde 2x (eşit)", "2x every 7 days (same)") },
  { feature: translate("Asistan önceliği", "Assistant priority"), free: "❌", pro: "✅" },
];

/** Enerji hata kodlarını Türkçe mesaja çevirir. */
export function energyErrorMessage(error: unknown): string {
  const raw = (error as { message?: string } | null)?.message ?? "";
  if (raw.includes("SPIN_COOLDOWN")) return translate("Çarkı bugün çevirdin. 24 saat sonra tekrar dene.", "You already spun the wheel today. Try again in 24 hours.");
  if (raw.includes("AD_LIMIT")) return translate("Bugünün reklam hakkını doldurdun (2/2).", "You've used today's ad limit (2/2).");
  if (raw.includes("AD_COOLDOWN")) return translate("Yeni reklam için biraz beklemen gerekiyor.", "You need to wait a bit before watching another ad.");
  if (raw.includes("ALREADY_CLAIMED")) return translate("Bu ödülü zaten aldın.", "You've already claimed this reward.");
  if (raw.includes("BADGE_NOT_EARNED")) return translate("Bu rozeti henüz kazanmadın.", "You haven't earned this badge yet.");
  if (raw.includes("NOT_ELIGIBLE")) return translate("Bu ödül için koşulu henüz tamamlamadın.", "You haven't met the requirement for this reward yet.");
  if (raw.includes("ALREADY_REFERRED")) return translate("Zaten bir davet kodu kullandın.", "You've already used a referral code.");
  if (raw.includes("SELF_REFERRAL")) return translate("Kendi kodunu kullanamazsın 🙂", "You can't use your own code 🙂");
  if (raw.includes("INVALID_CODE")) return translate("Bu davet kodu bulunamadı.", "This referral code was not found.");
  if (raw.includes("TRIAL_USED")) return translate("Ücretsiz denemeyi daha önce kullandın.", "You've already used the free trial.");
  if (raw.includes("ALREADY_PRO")) return translate("Pro üyeliğin şu an aktif.", "Your Pro membership is currently active.");
  return translate("İşlem tamamlanamadı, tekrar dener misin?", "The action couldn't be completed, want to try again?");
}
