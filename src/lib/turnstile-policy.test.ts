import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { acceptsTurnstile } from "./turnstile-policy";

describe("per-action bot verification", () => {
  test("requires a successful verification", () => {
    assert.equal(acceptsTurnstile({ success: false, action: "complete_lesson", hostname: "code-quest.io" }, "complete_lesson", "code-quest.io"), false);
  });
  test("a login verification cannot authorize a lesson", () => {
    assert.equal(acceptsTurnstile({ success: true, action: "login_check", hostname: "code-quest.io" }, "complete_lesson", "code-quest.io"), false);
  });
  test("a verification from another site cannot authorize rewards", () => {
    assert.equal(acceptsTurnstile({ success: true, action: "game_action", hostname: "other.example" }, "game_action", "code-quest.io"), false);
  });
  test("accepts successful verification for the exact action and site", () => {
    assert.equal(acceptsTurnstile({ success: true, action: "complete_lesson", hostname: "code-quest.io" }, "complete_lesson", "code-quest.io"), true);
  });
});