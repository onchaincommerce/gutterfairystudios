import type { ReactNode } from "react";

type StickerTone = "cream" | "pink" | "blue" | "lilac" | "lime" | "white";

const toneClasses: Record<StickerTone, string> = {
  cream: "bg-[var(--color-paper)]",
  pink: "bg-[var(--color-blush)]",
  blue: "bg-[var(--color-blue)]",
  lilac: "bg-[var(--color-lilac)]",
  lime: "bg-[var(--color-lime)]",
  white: "bg-[rgba(255,255,255,0.9)]",
};

type StickerPillProps = {
  children: ReactNode;
  tone?: StickerTone;
  className?: string;
};

export default function StickerPill({
  children,
  tone = "cream",
  className = "",
}: StickerPillProps) {
  return (
    <span className={`sticker ${toneClasses[tone]} ${className}`.trim()}>
      {children}
    </span>
  );
}
