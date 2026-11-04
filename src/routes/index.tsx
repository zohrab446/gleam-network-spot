import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/AuthExperience";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "CodeQuest — Türkçe kodlama öğren" },
    { name: "description", content: "CodeQuest ile 320 ders ve 7 öğrenme yolunda kod yaz. HTML, CSS, JavaScript, React, Python, C++ ve Java öğrenmeye başla." },
    { property: "og:title", content: "CodeQuest — Türkçe kodlama öğren" },
    { property: "og:description", content: "Kodlamayı öğren, gerçek görevleri çöz ve öğrenme yolculuğunda ilerle." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AuthPage,
});
