import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { canonicalLesson, validateLessonSource } from "./lesson-validation";
import { LESSONS } from "@/data/lessons";

describe("canonical lesson protection", () => {
  test("invented IDs cannot generate repeated lesson rewards", () => {
    assert.throws(() => canonicalLesson("invented-320", 320, "java"));
  });
  test("a low level lesson cannot claim high level rewards", () => {
    assert.throws(() => canonicalLesson("html-1", 320, "java"));
  });
  test("all 320 canonical lessons resolve exactly", () => {
    assert.equal(LESSONS.length, 320);
    for (const lesson of LESSONS) assert.equal(canonicalLesson(lesson.id, lesson.level, lesson.language).id, lesson.id);
  });
  test("missing editable files fail validation", () => {
    assert.equal(validateLessonSource(canonicalLesson("html-1", 1, "html"), {}), false);
  });
});