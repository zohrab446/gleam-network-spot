import type { Lesson } from "../types";

/**
 * Bir dersin İngilizce karşılığı.
 * `checks` dizisi, dersin `checks` dizisiyle AYNI sırada etiketleri içerir.
 * `files` yalnızca içinde Türkçe metin (TODO yorumu, metin içeriği) olan dosyalar için verilir;
 * anahtar dosya adı, değer dosyanın İngilizce tam içeriğidir.
 */
export type LessonTranslation = {
  title: string;
  description: string;
  explanation: string;
  example?: string;
  hints: [string, string, string];
  challenge: string;
  checks?: string[];
  files?: Record<string, string>;
};

export type TrackTranslations = Record<string, LessonTranslation>;

export function applyTranslation(lesson: Lesson, tr: LessonTranslation): Lesson {
  const checks = tr.checks
    ? lesson.checks.map((c, i) => (tr.checks![i] ? { ...c, label: tr.checks![i]! } : c))
    : lesson.checks;
  const files = tr.files
    ? lesson.files.map((f) => (tr.files![f.name] ? { ...f, content: tr.files![f.name]! } : f))
    : lesson.files;
  return {
    ...lesson,
    title: tr.title,
    description: tr.description,
    explanation: tr.explanation,
    example: tr.example ?? lesson.example,
    hints: tr.hints,
    challenge: tr.challenge,
    checks,
    files,
  };
}
