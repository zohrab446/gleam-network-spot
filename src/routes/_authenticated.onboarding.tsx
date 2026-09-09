import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AVATAR_COLORS, AVATAR_SHAPES, SHAPE_GLYPH, avatarHex } from "@/lib/gamification";
import { useProfile, useUpdateProfile } from "@/hooks/useGameData";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useThemeSync } from "@/components/AppShell";
import { playSound } from "@/store/settings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Avatarını seç — CodeQuest" },
      { name: "description", content: "Kendine bir şekil, renk ve kullanıcı adı seç; sonra ilk seviyene başla." },
      { property: "og:title", content: "Avatarını seç — CodeQuest" },
      { property: "og:description", content: "CodeQuest yolculuğuna kendi avatarınla başla." },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  useThemeSync();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [shape, setShape] = useState<string>("star");
  const [color, setColor] = useState<string>("indigo");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!profile) return;
    setShape(profile.avatar_shape);
    setColor(profile.avatar_color);
    setUsername((profile.username ?? "").slice(0, 20));
  }, [profile]);

  async function save() {
    const name = username.trim();
    if (name.length < 2) {
      toast.error("Kullanıcı adı en az 2 karakter olmalı.");
      return;
    }
    try {
      await updateProfile.mutateAsync({
        username: name.slice(0, 20),
        avatar_shape: shape,
        avatar_color: color,
        onboarded: true,
      });
      playSound("success");
      navigate({ to: "/dashboard", replace: true });
    } catch {
      toast.error("Kaydedilemedi, tekrar dener misin?");
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary-soft border-t-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="card-surface pop-in w-full max-w-xl p-6 sm:p-8">
        <h1 className="text-2xl">Kendine bir avatar seç ⚡</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Liderlik tablosunda ve profilinde bu avatar görünecek.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <PlayerAvatar shape={shape} color={color} size="lg" />
          <div>
            <p className="font-display text-lg font-bold">{username.trim() || "Kodcu"}</p>
            <p className="text-sm text-muted-foreground">Seviye 1 · 0 XP</p>
          </div>
        </div>

        <fieldset className="mt-8">
          <legend className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Şekil</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {AVATAR_SHAPES.map((option) => (
              <button
                key={option}
                type="button"
                aria-label={`Şekil: ${option}`}
                aria-pressed={shape === option}
                onClick={() => {
                  setShape(option);
                  playSound("click");
                }}
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-2xl transition-transform hover:scale-105",
                  shape === option ? "border-primary bg-primary-soft" : "border-border bg-card",
                )}
              >
                {SHAPE_GLYPH[option]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Renk</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {AVATAR_COLORS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-label={`Renk: ${option.label}`}
                aria-pressed={color === option.id}
                onClick={() => {
                  setColor(option.id);
                  playSound("click");
                }}
                className={cn(
                  "h-12 w-12 rounded-full border-2 transition-transform hover:scale-110",
                  color === option.id ? "border-foreground" : "border-transparent",
                )}
                style={{ backgroundColor: avatarHex(option.id) }}
              />
            ))}
          </div>
        </fieldset>

        <div className="mt-6 space-y-1.5">
          <Label htmlFor="username">Kullanıcı adı (en fazla 20 karakter)</Label>
          <Input
            id="username"
            value={username}
            maxLength={20}
            onChange={(event) => setUsername(event.target.value.slice(0, 20))}
            placeholder="kodcu_ada"
          />
          <p className="text-xs text-muted-foreground">{username.length}/20</p>
        </div>

        <Button
          className="mt-8 w-full font-bold"
          size="lg"
          disabled={updateProfile.isPending}
          onClick={() => void save()}
        >
          {updateProfile.isPending ? "Kaydediliyor..." : "Yolculuğa başla 🚀"}
        </Button>
      </div>
    </div>
  );
}
