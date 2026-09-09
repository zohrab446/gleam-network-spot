import { useEffect, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Coins, Flame, LogOut, Trophy, User as UserIcon, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useGameData";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { ChatWidget } from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/store/settings";

export function useThemeSync() {
  const theme = useSettings((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);
}

export function AppShell({
  children,
  lessonTitle,
  wide = false,
}: {
  children: ReactNode;
  lessonTitle?: string;
  wide?: boolean;
}) {
  useThemeSync();
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2" aria-label="CodeQuest panosu">
            <span className="bg-brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-lg text-primary-foreground">
              ⌘
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              Code<span className="text-gradient-brand">Quest</span>
            </span>
          </Link>

          <nav className="ml-2 hidden items-center gap-1 sm:flex" aria-label="Ana menü">
            <NavItem to="/dashboard" icon={<Zap className="h-4 w-4" />} label="Panom" />
            <NavItem to="/leaderboard" icon={<Trophy className="h-4 w-4" />} label="Liderlik" />
            <NavItem to="/profile" icon={<UserIcon className="h-4 w-4" />} label="Profil" />
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Chip icon={<Flame className="h-4 w-4 text-streak" />} value={profile?.streak ?? 0} label="gün seri" />
            <Chip icon={<Coins className="h-4 w-4 text-coin" />} value={profile?.coins ?? 0} label="coin" />
            <Chip icon={<Zap className="h-4 w-4 text-primary" />} value={profile?.xp ?? 0} label="XP" />
            <Link to="/profile" aria-label="Profilim">
              <PlayerAvatar
                size="sm"
                shape={profile?.avatar_shape ?? "star"}
                color={profile?.avatar_color ?? "indigo"}
              />
            </Link>
            <Button variant="ghost" size="icon" onClick={() => void signOut()} aria-label="Çıkış yap">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className={`mx-auto w-full flex-1 px-4 py-6 ${wide ? "max-w-[110rem]" : "max-w-7xl"}`}>
        {children}
      </main>

      <nav
        className="sticky bottom-0 z-30 flex justify-around border-t border-border bg-card/95 py-2 backdrop-blur sm:hidden"
        aria-label="Mobil menü"
      >
        <NavItem to="/dashboard" icon={<Zap className="h-5 w-5" />} label="Panom" stacked />
        <NavItem to="/leaderboard" icon={<Trophy className="h-5 w-5" />} label="Liderlik" stacked />
        <NavItem to="/profile" icon={<UserIcon className="h-5 w-5" />} label="Profil" stacked />
      </nav>

      <ChatWidget {...(lessonTitle ? { lessonTitle } : {})} />
    </div>
  );
}

function NavItem({
  to,
  icon,
  label,
  stacked = false,
}: {
  to: "/dashboard" | "/leaderboard" | "/profile";
  icon: ReactNode;
  label: string;
  stacked?: boolean;
}) {
  return (
    <Link
      to={to}
      className={
        stacked
          ? "flex min-w-20 flex-col items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold text-muted-foreground"
          : "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary"
      }
      activeProps={{ className: "text-primary bg-primary-soft" }}
    >
      {icon}
      {label}
    </Link>
  );
}

function Chip({ icon, value, label }: { icon: ReactNode; value: number; label: string }) {
  return (
    <span
      className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-bold text-secondary-foreground md:inline-flex"
      title={label}
    >
      {icon}
      {value}
    </span>
  );
}
