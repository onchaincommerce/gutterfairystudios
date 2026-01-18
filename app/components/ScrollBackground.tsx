"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const backgroundImages = ["/background_fairy.png", "/gutterfairy_bg.png"];

export default function ScrollBackground() {
  const pathname = usePathname();
  const showCollage = false;
  const [transitionsEnabled, setTransitionsEnabled] = useState(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg-layer-1", "1");
    root.style.setProperty("--bg-layer-2", "0");
    root.style.setProperty("--collage-opacity", "0");
    setTransitionsEnabled(false);
  }, [showCollage]);

  useEffect(() => {
    const root = document.documentElement;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const getTransitionProgress = (scrollY: number) => {
      const viewportHeight = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      if (maxScroll <= 0) {
        return 0;
      }

      if (pathname === "/") {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          const aboutTop = aboutSection.offsetTop;
          const start = Math.max(0, aboutTop - viewportHeight * 0.9);
          const end = Math.max(start + 1, aboutTop - viewportHeight * 0.2);
          return clamp((scrollY - start) / (end - start));
        }
      }

      if (pathname === "/designs") {
        const start = viewportHeight * 0.2;
        const end = viewportHeight * 0.9;
        return clamp((scrollY - start) / (end - start));
      }

      const start = viewportHeight * 0.4;
      const end = viewportHeight * 1.1;
      return clamp((scrollY - start) / (end - start));
    };

    const updateLayers = () => {
      const scrollY = window.scrollY;
      if (scrollY <= 1) {
        root.style.setProperty("--bg-layer-1", "1");
        root.style.setProperty("--bg-layer-2", "0");
        root.style.setProperty("--collage-opacity", "0");
        return;
      }

      const progress = getTransitionProgress(scrollY);
      const startOpacity = (1 - progress).toFixed(3);
      const endOpacity = progress.toFixed(3);

      root.style.setProperty("--bg-layer-1", startOpacity);
      root.style.setProperty("--bg-layer-2", endOpacity);
      root.style.setProperty("--collage-opacity", "0");
    };

    updateLayers();
    const rafId = requestAnimationFrame(() => setTransitionsEnabled(true));
    window.addEventListener("scroll", updateLayers, { passive: true });
    window.addEventListener("resize", updateLayers);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateLayers);
      window.removeEventListener("resize", updateLayers);
    };
  }, [pathname, showCollage]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {backgroundImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 ${transitionsEnabled ? "transition-opacity duration-500" : ""}`}
          style={{ opacity: `var(--bg-layer-${index + 1})` }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
