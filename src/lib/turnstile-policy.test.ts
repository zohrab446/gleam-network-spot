import { describe, expect, test } from "bun:test";
import { acceptsTurnstile } from "./turnstile-policy";

describe("per-action bot verification", () => {
  test("requires a successful verification", () => {
    expect(acceptsTurnstile({ success: false, action: "complete_lesson", hostname: "code-quest.io" }, "complete_lesson", "code-quest.io")).toBe(false);
  });
  test("a login verification cannot authorize a lesson", () => {
    expect(acceptsTurnstile({ success: true, action: "login_check", hostname: "code-quest.io" }, "complete_lesson", "code-quest.io")).toBe(false);
  });
  test("a verification from another site cannot authorize rewards", () => {
    expect(acceptsTurnstile({ success: true, action: "game_action", hostname: "other.example" }, "game_action", "code-quest.io")).toBe(false);
  });
  test("accepts successful verification for the exact action and site", () => {
    expect(acceptsTurnstile({ success: true, action: "complete_lesson", hostname: "code-quest.io" }, "complete_lesson", "code-quest.io")).toBe(true);
  });
});