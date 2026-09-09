import { MAX_LEVEL, TRACKS } from "@/data/types";

export const AVATAR_SHAPES = ["star", "circle", "square", "triangle"] as const;
export type AvatarShape = (typeof AVATAR_SHAPES)[number];

export const AVATAR_COLORS = [
  { id: "indigo", label: "İndigo", hex: "#6366F1" },
  { id: "pink", label: "Pembe", hex: "#EC4899" },
  { id: "blue", label: "Mavi", hex: "#3B82F6" },
  { id: "orange", label: "Turuncu", hex: "#F97316" },
  { id: "green", label: "Yeşil", hex: "#10B981" },
  { id: "purple", label: "Mor", hex: "#8B5CF6" },
  { id: "red", label: "Kırmızı", hex: "#EF4444" },
  { id: "yellow", label: "Sarı", hex: "#FACC15" },
] as const;

export type AvatarColor = (typeof AVATAR_COLORS)[number]["id"];

export function avatarHex(color: string): string {
  return AVATAR_COLORS.find((c) => c.id === color)?.hex ?? "#6366F1";
}

export const SHAPE_GLYPH: Record<string, string> = {
  star: "★",
  circle: "●",
  square: "■",
  triangle: "▲",
};

/** Bir seviyeyi tamamlayınca kazanılan XP — seviye arttıkça artar. */
export function xpRewardFor(level: number): number {
  return 100 + (level - 1) * 10;
}

export function coinRewardFor(level: number): number {
  return 50 + Math.floor((level - 1) / 5) * 10;
}

/** 7 günlük seriden sonra 2x XP çarpanı. */
export function streakMultiplier(streak: number): number {
  return streak >= 7 ? 2 : 1;
}

/** Bir seviyeye ulaşmak için gereken toplam XP. */
export function xpThreshold(level: number): number {
  let total = 0;
  for (let l = 1; l < level; l++) total += xpRewardFor(l);
  return total;
}

export function levelProgress(level: number, xp: number): number {
  if (level >= MAX_LEVEL) return 100;
  const start = xpThreshold(level);
  const end = xpThreshold(level + 1);
  const pct = ((xp - start) / Math.max(end - start, 1)) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

export type BadgeDef = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

export const BADGES: BadgeDef[] = [
  { id: "first-step", emoji: "🌱", title: "İlk Adım", description: "İlk dersini tamamla" },
  { id: "week-warrior", emoji: "🔥", title: "Hafta Savaşçısı", description: "7 gün üst üste çalış" },
  { id: "century", emoji: "💯", title: "Yüzlük", description: "100 XP topla" },
  { id: "speedrunner", emoji: "🚀", title: "Hız Ustası", description: "Bir dersi 2 dakikada bitir" },
  { id: "level-10", emoji: "⭐", title: "Seviye 10", description: "10 ders tamamla" },
  { id: "level-50", emoji: "🌟", title: "Seviye 50", description: "50 ders tamamla" },
  { id: "level-100", emoji: "💫", title: "Seviye 100", description: "100 ders tamamla" },
  { id: "consistent-coder", emoji: "💪", title: "İstikrarlı Kodcu", description: "30 gün seri yap" },
  { id: "polyglot", emoji: "🌍", title: "Çok Dilli", description: "4 farklı track'te ders bitir" },
  { id: "html-master", emoji: "🧱", title: "HTML Ustası", description: "Tüm HTML derslerini bitir" },
  { id: "css-master", emoji: "🎨", title: "CSS Sanatçısı", description: "Tüm CSS derslerini bitir" },
  { id: "javascript-master", emoji: "⚡", title: "JavaScript Büyücüsü", description: "Tüm JavaScript derslerini bitir" },
  { id: "react-master", emoji: "⚛️", title: "React Mimarı", description: "Tüm React derslerini bitir" },
  { id: "python-master", emoji: "🐍", title: "Python Terbiyecisi", description: "Tüm Python derslerini bitir" },
  { id: "cpp-master", emoji: "⚙️", title: "C++ Mühendisi", description: "Tüm C++ derslerini bitir" },
  { id: "java-master", emoji: "☕", title: "Java Baristası", description: "Tüm Java derslerini bitir" },
  { id: "grandmaster", emoji: "👑", title: "Büyük Usta", description: "320 seviyenin tamamını bitir" },
];

export type BadgeContext = {
  xp: number;
  level: number;
  streak: number;
  completedLevels: number[];
  languagesCompleted: string[];
  fastestSeconds: number | null;
};

export function earnedBadgeIds(ctx: BadgeContext): string[] {
  const done = new Set(ctx.completedLevels);
  const has = (from: number, to: number) => {
    for (let l = from; l <= to; l++) if (!done.has(l)) return false;
    return true;
  };
  const ids: string[] = [];
  if (done.size >= 1) ids.push("first-step");
  if (ctx.streak >= 7) ids.push("week-warrior");
  if (ctx.xp >= 100) ids.push("century");
  if (ctx.fastestSeconds !== null && ctx.fastestSeconds <= 120) ids.push("speedrunner");
  if (done.size >= 10) ids.push("level-10");
  if (done.size >= 50) ids.push("level-50");
  if (done.size >= 100) ids.push("level-100");
  if (ctx.streak >= 30) ids.push("consistent-coder");
  if (new Set(ctx.languagesCompleted).size >= 4) ids.push("polyglot");
  for (const track of TRACKS) if (has(track.from, track.to)) ids.push(`${track.id}-master`);
  if (done.size >= MAX_LEVEL) ids.push("grandmaster");
  return ids;
}

/** Seri hesabı: dün çalıştıysa +1, bugün çalıştıysa aynı, yoksa sıfırlanır. */
export function nextStreak(lastActiveDate: string | null, streak: number): { streak: number; today: string } {
  const today = new Date().toISOString().slice(0, 10);
  if (!lastActiveDate) return { streak: 1, today };
  if (lastActiveDate === today) return { streak: Math.max(streak, 1), today };
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return { streak: lastActiveDate === yesterday ? streak + 1 : 1, today };
}

export function currentWeekStart(): string {
  const now = new Date();
  const day = (now.getUTCDay() + 6) % 7; // Pazartesi = 0
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - day));
  return monday.toISOString().slice(0, 10);
}
