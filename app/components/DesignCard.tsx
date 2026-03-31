import type { CSSProperties } from "react";
import Image from "next/image";

interface DesignCardProps {
  title: string;
  image?: string;
  description?: string;
}

function getTilt(title: string) {
  const total = title.split("").reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
  return ((total % 7) - 3) * 0.9;
}

export default function DesignCard({ title, image, description }: DesignCardProps) {
  const tilt = getTilt(title);
  const cardStyle = {
    "--card-tilt": `${tilt}deg`,
  } as CSSProperties;

  return (
    <article className="design-card group" style={cardStyle}>
      <div className="design-card__image aspect-square">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover transition-transform duration-200 group-hover:scale-[1.03]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(217,208,255,0.5)]">
            <div className="text-center text-[var(--color-ink)]">
              <div className="font-display text-3xl">new</div>
              <p className="section-kicker mt-2">coming soon</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-2 pb-2 pt-4">
        <p className="section-kicker">embroidered favorite</p>
        <h3 className="mt-2 text-[1.45rem] font-semibold leading-tight text-[var(--color-ink)]">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-[rgba(31,26,29,0.7)]">{description}</p>
        ) : null}
      </div>
    </article>
  );
}
