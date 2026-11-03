import { test } from "node:test";
import { strict as assert } from "node:assert";
import { leaderboardPeriod } from "./leaderboard-period";

test("the first does not reset the fifteenth-to-fifteenth period", () => {
  assert.deepEqual(leaderboardPeriod(new Date("2026-11-01T00:00:00+03:00")), { start: "2026-10-15", end: "2026-11-15" });
});
test("points remain in the old period until Istanbul midnight on the fifteenth", () => {
  assert.deepEqual(leaderboardPeriod(new Date("2026-11-14T23:59:59+03:00")), { start: "2026-10-15", end: "2026-11-15" });
});
test("the fifteenth starts a new period at Istanbul midnight", () => {
  assert.deepEqual(leaderboardPeriod(new Date("2026-11-14T21:00:00Z")), { start: "2026-11-15", end: "2026-12-15" });
});
test("January first retains the December fifteenth period", () => {
  assert.deepEqual(leaderboardPeriod(new Date("2027-01-01T00:00:00+03:00")), { start: "2026-12-15", end: "2027-01-15" });
});