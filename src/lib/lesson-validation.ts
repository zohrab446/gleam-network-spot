import { editableFile, getLesson, type Lesson } from "@/data/lessons";

export function canonicalLesson(id: string, level: number, language: string): Lesson {
  const lesson = getLesson(level);
  if (!lesson || lesson.id !== id || lesson.language !== language) throw new Error("BOT_BLOCKED:lesson");
  return lesson;
}

function fold(source: string) {
  return source.replace(/[Çç]/g, "c").replace(/[Ğğ]/g, "g").replace(/[İIı]/g, "i")
    .replace(/[Şş]/g, "s").replace(/[Öö]/g, "o").replace(/[Üü]/g, "u").toLowerCase();
}

// Text checks are authoritative here. Runtime, DOM and computed-style checks
// remain in the isolated browser runner; do not execute user code in this worker.
export function validateLessonSource(lesson: Lesson, submission: Record<string, string>) {
  const files = Object.fromEntries(lesson.files.map((file) => [file.name, file.readonly ? file.content : submission[file.name]]));
  if (lesson.files.some((file) => !file.readonly && typeof files[file.name] !== "string")) return false;
  const main = editableFile(lesson).name;
  return lesson.checks.every((check) => {
    if (!["includes", "not-includes", "regex"].includes(check.type)) return true;
    if (!("value" in check)) return false;
    const source = files[("file" in check ? check.file : undefined) ?? main];
    if (typeof source !== "string") return false;
    if (check.type === "includes") return fold(source).includes(fold(check.value));
    if (check.type === "not-includes") return !fold(source).includes(fold(check.value));
    try { return new RegExp(check.value, "is").test(source); } catch { return false; }
  });
}