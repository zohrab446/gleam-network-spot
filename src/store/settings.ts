import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UiLanguage = "tr" | "en";

type SettingsState = {
  sound: boolean;
  theme: "light" | "dark";
  language: UiLanguage;
  editorTheme: "light" | "dark";
  fontSize: number;
  setSound: (value: boolean) => void;
  setTheme: (value: "light" | "dark") => void;
  setLanguage: (value: UiLanguage) => void;
  setEditorTheme: (value: "light" | "dark") => void;
  setFontSize: (value: number) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      sound: true,
      theme: "light",
      language: "tr",
      editorTheme: "light",
      fontSize: 14,
      setSound: (sound) => set({ sound }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setEditorTheme: (editorTheme) => set({ editorTheme }),
      setFontSize: (fontSize) => set({ fontSize: Math.min(24, Math.max(10, fontSize)) }),
    }),
    { name: "codequest-settings" },
  ),
);

/** Kısa oyun sesleri — Web Audio ile üretilir, dosya gerekmez. */
export function playSound(kind: "success" | "error" | "click") {
  if (typeof window === "undefined") return;
  if (!useSettings.getState().sound) return;
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const notes = kind === "success" ? [523, 659, 784] : kind === "error" ? [330, 247] : [660];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.value = 0.08;
      osc.connect(gain).connect(ctx.destination);
      const start = ctx.currentTime + i * 0.12;
      osc.start(start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);
      osc.stop(start + 0.18);
    });
    window.setTimeout(() => void ctx.close(), 800);
  } catch {
    /* ses desteklenmiyorsa sessizce geç */
  }
}
