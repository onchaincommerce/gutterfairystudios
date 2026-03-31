import StickerPill from "./StickerPill";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  note?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  note,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`${isCentered ? "text-center items-center" : "items-start"} flex flex-col gap-5 ${className}`.trim()}
    >
      <StickerPill tone="pink">{eyebrow}</StickerPill>
      <div className={`max-w-2xl ${isCentered ? "mx-auto" : ""}`}>
        <h2 className="section-title offset-heading text-[var(--color-ink)]">{title}</h2>
      </div>
      {description ? (
        <p
          className={`body-copy max-w-2xl ${
            isCentered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
      {note ? (
        <p className={`annotation max-w-md ${isCentered ? "mx-auto" : ""}`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}
