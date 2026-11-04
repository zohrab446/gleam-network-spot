import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/AuthExperience";
export const Route = createFileRoute("/auth")({ ssr: false,
  head: () => ({ meta: [
    { title: "Giriş yap — CodeQuest" },
    { name: "description", content: "CodeQuest hesabına e-posta veya Google ile giriş yap ve kod öğrenmeye devam et." },
    { property: "og:title", content: "Giriş yap — CodeQuest" },
    { property: "og:description", content: "CodeQuest hesabına giriş yap veya yeni bir hesap oluştur." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: AuthPage,
});
