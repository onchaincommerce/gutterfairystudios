"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const sparkleColors = ["#f6d7e7", "#d9d0ff", "#c7ff4d", "#cfe7f5"];

export default function FairyCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const sparkleIdRef = useRef(0);
  const lastSparkleTime = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      setIsEnabled(mediaQuery.matches && !reducedMotionQuery.matches);
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);
    reducedMotionQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
      reducedMotionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Throttle sparkle creation
      const now = Date.now();
      if (now - lastSparkleTime.current > 30) {
        lastSparkleTime.current = now;

        const newSparkle: Sparkle = {
          id: sparkleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 8 + 4,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        };

        setSparkles((prev) => [...prev.slice(-15), newSparkle]);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isEnabled]);

  // Clean up old sparkles
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const interval = setInterval(() => {
      setSparkles((prev) => prev.slice(-10));
    }, 100);

    return () => clearInterval(interval);
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* Sparkle trail */}
      {sparkles.map((sparkle, index) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: "translate(-50%, -50%)",
            animation: "sparkle 0.5s ease-out forwards",
            animationDelay: `${index * 0.02}s`,
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill={sparkle.color}
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}

      {/* Fairy cursor */}
      <div
        className="fixed pointer-events-none z-[10000] transition-opacity duration-150"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      >
        <Image
          src="/fairy.png"
          alt=""
          width={48}
          height={48}
          className="drop-shadow-[0_0_8px_rgba(246,215,231,0.9)]"
          priority
          draggable={false}
        />
      </div>
    </>
  );
}
