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

export default function FairyCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sparkleIdRef = useRef(0);
  const lastSparkleTime = useRef(0);

  const colors = ["#ff3366", "#f0e6d3", "#ffd1e1"];

  useEffect(() => {
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
          color: colors[Math.floor(Math.random() * colors.length)],
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
  }, []);

  // Clean up old sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => prev.slice(-10));
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
          className="drop-shadow-[0_0_8px_rgba(212,169,35,0.6)]"
          priority
          draggable={false}
        />
      </div>
    </>
  );
}
