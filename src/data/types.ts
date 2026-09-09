/**
 * CodeQuest ders veri modeli.
 * 320 seviye, 7 track. Her track'in dosyaları `src/data/tracks/*.ts` içinde tutulur.
 */

export type TrackId = "html" | "css" | "javascript" | "react" | "python" | "cpp" | "java";

/** Editörde açılan bir dosya. `readonly` dosyalar sekmede kilitli görünür. */
export type LessonFile = {
  name: string;
  content: string;
  readonly?: boolean;
};

export type LessonCheck =
  /** Belirtilen dosya (varsayılan: düzenlenebilir dosya) metni içeriyor mu (büyük/küçük harf duyarsız) */
  | { type: "includes"; value: string; label: string; file?: string }
  /** Belirtilen dosyada regex eşleşiyor mu (flag: i, s) */
  | { type: "regex"; value: string; label: string; file?: string }
  /** Belirtilen dosya metni İÇERMİYOR olmalı */
  | { type: "not-includes"; value: string; label: string; file?: string }
  /** Çalıştırma çıktısı (console / stdout) bu metni içeriyor mu */
  | { type: "output"; value: string; label: string }
  /** Çıktı satırları tam olarak buna eşit mi (satır sonu boşlukları kırpılır) */
  | { type: "output-exact"; value: string; label: string }
  /**
   * Önizleme DOM'unda selector eşleşmesi.
   * text: textContent bu metni içermeli · count: en az bu kadar eleman · attr/attrValue: özellik kontrolü
   */
  | {
      type: "dom";
      selector: string;
      label: string;
      text?: string;
      count?: number;
      attr?: string;
      attrValue?: string;
    }
  /** Önizleme DOM'unda getComputedStyle sonucu (value ile karşılaştırılır, renkler rgb'ye normalize edilir) */
  | { type: "style"; selector: string; property: string; value: string; label: string };

export type Lesson = {
  /** "html-1", "css-21" gibi */
  id: string;
  /** 1–320 arası küresel seviye numarası */
  level: number;
  language: TrackId;
  title: string;
  /** Tek cümlelik özet (kartlarda görünür) */
  description: string;
  /** Türkçe konu anlatımı (2–5 cümle, \n ile paragraf) */
  explanation: string;
  /** Kısa kod örneği */
  example: string;
  /** 3 ipucu, kolaydan zora */
  hints: [string, string, string];
  /** Kullanıcının yapması gereken görev */
  challenge: string;
  /** Editörde açılacak dosyalar. En az bir dosya readonly olmamalı. */
  files: LessonFile[];
  /** Geçmek için tüm kontroller sağlanmalı */
  checks: LessonCheck[];
  /** Python / C++ / Java: input()/cin/Scanner için satır satır girdi */
  stdin?: string[];
};

export type TrackMeta = {
  id: TrackId;
  label: string;
  from: number;
  to: number;
  monaco: string;
  colorVar: string;
  /** Konsol mu, canlı önizleme mi */
  output: "preview" | "console";
  /** Çalıştırma motoru */
  runner: "web" | "react" | "pyodide" | "piston";
  emoji: string;
  tagline: string;
};

export const TRACKS: TrackMeta[] = [
  { id: "html", label: "HTML", from: 1, to: 20, monaco: "html", colorVar: "lang-html", output: "preview", runner: "web", emoji: "🧱", tagline: "Web sayfasının iskeleti" },
  { id: "css", label: "CSS", from: 21, to: 70, monaco: "css", colorVar: "lang-css", output: "preview", runner: "web", emoji: "🎨", tagline: "Renk, düzen ve animasyon" },
  { id: "javascript", label: "JavaScript", from: 71, to: 120, monaco: "javascript", colorVar: "lang-js", output: "preview", runner: "web", emoji: "⚡", tagline: "Sayfaya hayat ver" },
  { id: "react", label: "React", from: 121, to: 170, monaco: "javascript", colorVar: "lang-react", output: "preview", runner: "react", emoji: "⚛️", tagline: "Bileşenlerle arayüz kur" },
  { id: "python", label: "Python", from: 171, to: 220, monaco: "python", colorVar: "lang-python", output: "console", runner: "pyodide", emoji: "🐍", tagline: "Okunabilir ve güçlü" },
  { id: "cpp", label: "C++", from: 221, to: 270, monaco: "cpp", colorVar: "lang-cpp", output: "console", runner: "piston", emoji: "⚙️", tagline: "Bellek ve performans" },
  { id: "java", label: "Java", from: 271, to: 320, monaco: "java", colorVar: "lang-java", output: "console", runner: "piston", emoji: "☕", tagline: "Nesne yönelimli programlama" },
];

export const MAX_LEVEL = 320;

/** Monaco dili: dosya adına göre */
export function monacoLanguageFor(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    html: "html",
    css: "css",
    js: "javascript",
    jsx: "javascript",
    json: "json",
    py: "python",
    cpp: "cpp",
    h: "cpp",
    java: "java",
  };
  return map[ext] ?? "plaintext";
}
