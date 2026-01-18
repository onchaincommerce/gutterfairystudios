"use client";

import { useEffect } from "react";

export default function ScrollRainbow() {
  useEffect(() => {
    const root = document.documentElement;

    const updateScrollbar = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const percent = Math.min(100, Math.max(0, progress * 100));
      const hue = (330 + progress * 360) % 360;

      root.style.setProperty("--scrollbar-gradient-position", `${percent}%`);
      root.style.setProperty("--scrollbar-thumb-color", `hsl(${hue}, 90%, 60%)`);
    };

    updateScrollbar();
    window.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar);

    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
    };
  }, []);

  return null;
}
