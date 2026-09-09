import { avatarHex, SHAPE_GLYPH } from "@/lib/gamification";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-9 w-9 text-base",
  md: "h-12 w-12 text-xl",
  lg: "h-20 w-20 text-4xl",
} as const;

export function PlayerAvatar({
  shape,
  color,
  size = "md",
  className,
  ring = true,
}: {
  shape: string;
  color: string;
  size?: keyof typeof SIZES;
  className?: string;
  ring?: boolean;
}) {
  const hex = avatarHex(color);
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold leading-none",
        ring && "ring-2 ring-card",
        SIZES[size],
        className,
      )}
      style={{ backgroundColor: `${hex}22`, color: hex, boxShadow: `inset 0 0 0 2px ${hex}55` }}
    >
      {SHAPE_GLYPH[shape] ?? "★"}
    </span>
  );
}
