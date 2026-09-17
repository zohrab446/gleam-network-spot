import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export function PublicFooter() {
  const t = useT();
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          <p className="font-bold text-foreground">NHR Yazılım · CodeQuest</p>
          <p className="mt-1">{t("Kodlamayı oyunlaştırarak öğren.", "Learn coding, gamified.")}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">
          <Link to="/iletisim" className="transition-colors hover:text-primary">
            {t("İletişim", "Contact")}
          </Link>
          <Link to="/mesafeli-satis" className="transition-colors hover:text-primary">
            {t("Mesafeli Satış Sözleşmesi", "Distance Sales Agreement")}
          </Link>
          <Link to="/auth" className="transition-colors hover:text-primary">
            {t("Giriş yap", "Sign in")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
