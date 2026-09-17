import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

export function PublicHeader() {
  const t = useT();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
          <span className="bg-brand-gradient flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground">
            ⌘
          </span>
          Code<span className="text-gradient-brand">Quest</span>
        </Link>
        <Button asChild variant="ghost" size="sm">
          <Link to="/auth">{t("Giriş yap", "Sign in")}</Link>
        </Button>
      </div>
    </header>
  );
}
