/** Date-only boundaries in Istanbul; the next period's start is exclusive. */
export function leaderboardPeriod(at = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul", year: "numeric", month: "numeric", day: "numeric",
  }).formatToParts(at);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  const start = new Date(Date.UTC(value("year"), value("month") - 1 - (value("day") < 15 ? 1 : 0), 15));
  const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 15));
  return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
}