export async function celebrate() {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;
  const colors = ["#6366F1", "#EC4899", "#10B981", "#FACC15"];
  confetti({ particleCount: 120, spread: 75, origin: { y: 0.7 }, colors });
  window.setTimeout(
    () => confetti({ particleCount: 70, spread: 100, origin: { x: 0.2, y: 0.6 }, colors }),
    180,
  );
  window.setTimeout(
    () => confetti({ particleCount: 70, spread: 100, origin: { x: 0.8, y: 0.6 }, colors }),
    320,
  );
}
