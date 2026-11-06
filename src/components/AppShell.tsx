import { useEffect, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Gift, Trophy, User as UserIcon, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useGameData";
import { useEnergySync } from "@/hooks/useEnergy";
import { ChatWidget } from "@/components/ChatWidget";
import { ParticipantsRail } from "@/components/ParticipantsRail";
import { useSettings } from "@/store/settings";
import { useT } from "@/lib/i18n";
import { QuestNavigation } from "@/components/QuestNavigation";

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
  dashboard = false,
}: {
  children: ReactNode;
  lessonTitle?: string;
  wide?: boolean;
  dashboard?: boolean;
}) {
  useThemeSync();
  useEnergySync();
  const t = useT();
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
      <QuestNavigation profile={profile ?? undefined} onSignOut={() => void signOut()} />

      <div
        className={`mx-auto flex w-full flex-1 items-start gap-6 px-4 py-6 ${dashboard ? "max-w-[1480px]" : wide ? "max-w-[120rem]" : "max-w-[85rem]"}`}
      >
        <main className="min-w-0 flex-1">{children}</main>
        {!dashboard && <ParticipantsRail />}
      </div>

      <nav
        className="sticky bottom-0 z-30 flex justify-around border-t border-border bg-card/95 py-2 backdrop-blur sm:hidden"
        aria-label={t("Mobil menü", "Mobile menu")}
      >
        <NavItem to="/dashboard" icon={<Zap className="h-5 w-5" />} label={t("Panom", "Dashboard")} stacked />
        <NavItem to="/rewards" icon={<Gift className="h-5 w-5" />} label={t("Ödüller", "Rewards")} stacked />
        <NavItem to="/leaderboard" icon={<Trophy className="h-5 w-5" />} label={t("Liderlik", "Leaderboard")} stacked />
        <NavItem to="/profile" icon={<UserIcon className="h-5 w-5" />} label={t("Profil", "Profile")} stacked />
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
  to: "/dashboard" | "/leaderboard" | "/profile" | "/rewards" | "/pro";
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
