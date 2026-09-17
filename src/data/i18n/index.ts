import type { Lesson, TrackId } from "../types";
import { applyTranslation, type TrackTranslations } from "./types";
import type { UiLanguage } from "@/store/settings";

import { HTML_EN } from "./tracks/html";
import { CSS_A_EN } from "./tracks/css-a";
import { CSS_B_EN } from "./tracks/css-b";
import { JS_A_EN } from "./tracks/js-a";
import { JS_B_EN } from "./tracks/js-b";
import { REACT_A_EN } from "./tracks/react-a";
import { REACT_B_EN } from "./tracks/react-b";
import { PYTHON_A_EN } from "./tracks/python-a";
import { PYTHON_B_EN } from "./tracks/python-b";
import { CPP_A_EN } from "./tracks/cpp-a";
import { CPP_B_EN } from "./tracks/cpp-b";
import { JAVA_A_EN } from "./tracks/java-a";
import { JAVA_B_EN } from "./tracks/java-b";

export const LESSONS_EN: TrackTranslations = {
  ...HTML_EN,
  ...CSS_A_EN,
  ...CSS_B_EN,
  ...JS_A_EN,
  ...JS_B_EN,
  ...REACT_A_EN,
  ...REACT_B_EN,
  ...PYTHON_A_EN,
  ...PYTHON_B_EN,
  ...CPP_A_EN,
  ...CPP_B_EN,
  ...JAVA_A_EN,
  ...JAVA_B_EN,
};

/** Dile göre dersin metinlerini çevirir. Çeviri yoksa Türkçe içerik döner. */
export function localizeLesson(lesson: Lesson, lang: UiLanguage): Lesson {
  if (lang !== "en") return lesson;
  const tr = LESSONS_EN[lesson.id];
  return tr ? applyTranslation(lesson, tr) : lesson;
}

const TRACK_TAGLINES_EN: Record<TrackId, string> = {
  html: "The skeleton of a web page",
  css: "Color, layout and animation",
  javascript: "Bring the page to life",
  react: "Build UIs with components",
  python: "Readable and powerful",
  cpp: "Memory and performance",
  java: "Object-oriented programming",
};

export function trackTagline(id: TrackId, lang: UiLanguage, fallback: string): string {
  return lang === "en" ? (TRACK_TAGLINES_EN[id] ?? fallback) : fallback;
}
