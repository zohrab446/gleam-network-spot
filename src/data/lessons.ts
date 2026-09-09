import { HTML_LESSONS } from "./tracks/html";
import { CSS_A } from "./tracks/css-a";
import { CSS_B } from "./tracks/css-b";
import { JS_A } from "./tracks/js-a";
import { JS_B } from "./tracks/js-b";
import { REACT_A } from "./tracks/react-a";
import { REACT_B } from "./tracks/react-b";
import { PYTHON_A } from "./tracks/python-a";
import { PYTHON_B } from "./tracks/python-b";
import { CPP_A } from "./tracks/cpp-a";
import { CPP_B } from "./tracks/cpp-b";
import { JAVA_A } from "./tracks/java-a";
import { JAVA_B } from "./tracks/java-b";
import { TRACKS, MAX_LEVEL, type Lesson, type TrackId, type TrackMeta } from "./types";

export * from "./types";
export type LessonLanguage = TrackId;

export const LESSONS: Lesson[] = [
  ...HTML_LESSONS,
  ...CSS_A,
  ...CSS_B,
  ...JS_A,
  ...JS_B,
  ...REACT_A,
  ...REACT_B,
  ...PYTHON_A,
  ...PYTHON_B,
  ...CPP_A,
  ...CPP_B,
  ...JAVA_A,
  ...JAVA_B,
].sort((a, b) => a.level - b.level);

const BY_LEVEL = new Map(LESSONS.map((l) => [l.level, l]));

/** Geriye dönük uyumluluk: dil etiketleri */
export const LANGUAGE_META: Record<TrackId, TrackMeta> = Object.fromEntries(
  TRACKS.map((t) => [t.id, t]),
) as Record<TrackId, TrackMeta>;

/** Geriye dönük uyumluluk: kategori listesi = track listesi */
export const CATEGORIES = TRACKS.map((t) => ({
  title: t.label,
  from: t.from,
  to: t.to,
  language: t.id,
}));

export function getLesson(level: number): Lesson | undefined {
  return BY_LEVEL.get(level);
}

export function trackOf(level: number): TrackMeta | undefined {
  return TRACKS.find((t) => level >= t.from && level <= t.to);
}

export function trackById(id: string): TrackMeta | undefined {
  return TRACKS.find((t) => t.id === id);
}

export function lessonsOfTrack(id: TrackId): Lesson[] {
  return LESSONS.filter((l) => l.language === id);
}

/** Geriye dönük uyumluluk */
export const categoryOf = trackOf;

/**
 * Her track bağımsız başlar: track'in ilk dersi her zaman açık,
 * sonraki ders aynı track'te bir önceki tamamlandıysa açılır.
 */
export function isLessonUnlocked(level: number, completed: Set<number> | number[]): boolean {
  const done = completed instanceof Set ? completed : new Set(completed);
  if (done.has(level)) return true;
  const track = trackOf(level);
  if (!track || level <= track.from) return true;
  return done.has(level - 1);
}

/** Track içinde sıradaki açık ders (yoksa son ders). */
export function nextLevelInTrack(track: TrackMeta, completed: Set<number>): number {
  for (let l = track.from; l <= track.to; l++) if (!completed.has(l)) return l;
  return track.to;
}

export function trackProgress(track: TrackMeta, completed: Set<number>) {
  let done = 0;
  for (let l = track.from; l <= track.to; l++) if (completed.has(l)) done++;
  const total = track.to - track.from + 1;
  return { done, total, pct: Math.round((done / total) * 100) };
}

/** Düzenlenebilir ana dosya */
export function editableFile(lesson: Lesson) {
  return lesson.files.find((f) => !f.readonly) ?? lesson.files[0]!;
}

export { MAX_LEVEL };
