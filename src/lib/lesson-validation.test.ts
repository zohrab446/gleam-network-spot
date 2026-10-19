import { describe, expect, test } from "bun:test";
import { canonicalLesson, validateLessonSource } from "./lesson-validation";
import { LESSONS } from "@/data/lessons";

describe("canonical lesson protection", () => {
  test("invented IDs cannot generate repeated lesson rewards", () => {
    expect(() => canonicalLesson("invented-320", 320, "java")).toThrow();
  });
  test("a low level lesson cannot claim high level rewards", () => {
    expect(() => canonicalLesson("html-1", 320, "java")).toThrow();
  });
  test("all 320 canonical lessons resolve exactly", () => {
    expect(LESSONS).toHaveLength(320);
    for (const lesson of LESSONS) expect(canonicalLesson(lesson.id, lesson.level, lesson.language).id).toBe(lesson.id);
  });
  test("missing editable files fail validation", () => {
    expect(validateLessonSource(canonicalLesson("html-1", 1, "html"), {})).toBe(false);
  });
});