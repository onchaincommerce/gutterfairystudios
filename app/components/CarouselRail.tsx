"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

type CarouselRailProps = {
  ariaLabel: string;
  slideClassName: string;
  slides: ReactNode[];
  className?: string;
};

export default function CarouselRail({
  ariaLabel,
  slideClassName,
  slides,
  className = "",
}: CarouselRailProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);

  const scrollByViewport = (direction: number) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    track.scrollBy({
      left: track.clientWidth * 0.88 * direction,
      behavior: "smooth",
    });
  };

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByViewport(-1)}
          className="carousel-control"
          aria-label={`Scroll ${ariaLabel} backward`}
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          type="button"
          onClick={() => scrollByViewport(1)}
          className="carousel-control"
          aria-label={`Scroll ${ariaLabel} forward`}
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <ul
        ref={trackRef}
        aria-label={ariaLabel}
        className="carousel-viewport flex gap-4 overflow-x-auto pb-2"
      >
        {slides.map((slide, index) => (
          <li
            key={index}
            className={`snap-start shrink-0 ${slideClassName}`.trim()}
          >
            {slide}
          </li>
        ))}
      </ul>
    </div>
  );
}
