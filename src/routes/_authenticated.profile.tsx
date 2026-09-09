import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { BADGES, AVATAR_COLORS, AVATAR_SHAPES, SHAPE_GLYPH, avatarHex } from "@/lib/gamification";
import { LANGUAGE_META, MAX_LEVEL, type LessonLanguage } from "@/data/lessons";
import { useBadges, useProfile, useProgress, useUpdateProfile } from "@/hooks/useGameData";
import { AppShell } from "@/components/AppShell";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/store/settings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profilim — CodeQuest" },
      { name: "description", content: "Avatarın, rozetlerin, XP'n, coinlerin ve uygulama ayarların tek yerde." },
      { property: "og:title", content: "Profilim — CodeQuest" },
      { property: "og:description", content: "CodeQuest rozetlerini ve istatistiklerini görüntüle." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const { data: progress = [] } = useProgress();
  const { data: badges = [] } = useBadges();
  const updateProfile = useUpdateProfile();
  const settings = useSettings();

  if (isLoading || !profile) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl space-y-4">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-56 rounded-2xl" />
        </div>
      </AppShell>
    );
  }

  const owned = new Set(badges.map((b) => b.badge_id));
  const favorite = (profile.favorite_language ?? "html") as LessonLanguage;

  async function saveAvatar(patch: { avatar_shape?: string; avatar_color?: string }) {
    try {
      await updateProfile.mutateAsync(patch);
      toast.success("Avatarın güncellendi!");
    } catch {
      toast.error("Güncellenemedi.");
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="card-surface p-6">
          <div className="flex flex-wrap items-center gap-4">
            <PlayerAvatar shape={profile.avatar_shape} color={profile.avatar_color} size="lg" />
            <div className="min-w-0">
              <h1 className="truncate text-2xl">{profile.username ?? "Kodcu"}</h1>
              <p className="truncate text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat label="Seviye" value={`${profile.level} / ${MAX_LEVEL}`} />
            <Stat label="Toplam XP" value={profile.xp} />
            <Stat label="Coin" value={profile.coins} />
            <Stat label="Seri" value={`${profile.streak} gün`} />
            <Stat label="En uzun seri" value={`${profile.longest_streak} gün`} />
            <Stat label="Bitirilen ders" value={progress.length} />
            <Stat label="Favori dil" value={LANGUAGE_META[favorite]?.label ?? "—"} />
            <Stat label="Rozet" value={`${owned.size} / ${BADGES.length}`} />
          </dl>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-xl">Rozetler</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {BADGES.map((badge) => {
              const has = owned.has(badge.id);
              return (
                <div
                  key={badge.id}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border p-4",
                    has ? "border-success bg-success-soft" : "border-border opacity-70",
                  )}
                >
                  <span className="text-2xl">{has ? badge.emoji : "🔒"}</span>
                  <div>
                    <p className="font-display font-bold">{badge.title}</p>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-xl">Avatarını değiştir</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Coinlerinle ileride yeni temalar da açacaksın. Şimdilik şekil ve renk senin elinde.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {AVATAR_SHAPES.map((shape) => (
              <button
                key={shape}
                type="button"
                aria-label={`Şekil: ${shape}`}
                aria-pressed={profile.avatar_shape === shape}
                onClick={() => void saveAvatar({ avatar_shape: shape })}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border-2 text-xl",
                  profile.avatar_shape === shape ? "border-primary bg-primary-soft" : "border-border",
                )}
              >
                {SHAPE_GLYPH[shape]}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {AVATAR_COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                aria-label={`Renk: ${color.label}`}
                aria-pressed={profile.avatar_color === color.id}
                onClick={() => void saveAvatar({ avatar_color: color.id })}
                className={cn(
                  "h-10 w-10 rounded-full border-2",
                  profile.avatar_color === color.id ? "border-foreground" : "border-transparent",
                )}
                style={{ backgroundColor: avatarHex(color.id) }}
              />
            ))}
          </div>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-xl">Ayarlar</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="sound">Ses efektleri</Label>
              <Switch
                id="sound"
                checked={settings.sound}
                onCheckedChange={(value) => {
                  settings.setSound(value);
                  void updateProfile.mutateAsync({ sound_enabled: value });
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="theme">Karanlık tema</Label>
              <Switch
                id="theme"
                checked={settings.theme === "dark"}
                onCheckedChange={(value) => {
                  const theme = value ? "dark" : "light";
                  settings.setTheme(theme);
                  settings.setEditorTheme(theme);
                  void updateProfile.mutateAsync({ theme });
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold">Arayüz dili</span>
              <div className="inline-flex rounded-xl bg-secondary p-1">
                {(["tr", "en"] as const).map((lang) => (
                  <Button
                    key={lang}
                    size="sm"
                    variant={settings.language === lang ? "default" : "ghost"}
                    className="font-bold"
                    onClick={() => {
                      settings.setLanguage(lang);
                      void updateProfile.mutateAsync({ language: lang });
                    }}
                  >
                    {lang === "tr" ? "Türkçe" : "English"}
                  </Button>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Ders içerikleri şimdilik Türkçe; İngilizce seçimi arayüz tercihi olarak kaydedilir.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-secondary p-4">
      <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="font-display text-xl font-extrabold">{value}</dd>
    </div>
  );
}
