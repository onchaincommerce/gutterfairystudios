"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Blast {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

export default function BlastEffect() {
  const [blasts, setBlasts] = useState<Blast[]>([]);
  const blastIdRef = useRef(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create multiple blast particles shooting in different directions
      const numBlasts = 3 + Math.floor(Math.random() * 3); // 3-5 blasts
      const newBlasts: Blast[] = [];

      for (let i = 0; i < numBlasts; i++) {
        newBlasts.push({
          id: blastIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          angle: Math.random() * 360,
          distance: 150 + Math.random() * 200,
        });
      }

      setBlasts((prev) => [...prev, ...newBlasts]);

      // Clean up after animation
      setTimeout(() => {
        setBlasts((prev) => prev.filter((b) => !newBlasts.includes(b)));
      }, 800);
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      {blasts.map((blast) => {
        const radians = (blast.angle * Math.PI) / 180;
        const shootX = Math.cos(radians) * blast.distance;
        const shootY = Math.sin(radians) * blast.distance;

        return (
          <div
            key={blast.id}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: blast.x,
              top: blast.y,
              transform: "translate(-50%, -50%)",
              ["--shoot-x" as string]: `${shootX}px`,
              ["--shoot-y" as string]: `${shootY}px`,
              animation: "blastShoot 0.7s ease-out forwards",
            }}
          >
            <Image
              src="/fairyblast.png"
              alt=""
              width={40}
              height={40}
              className="drop-shadow-[0_0_12px_rgba(155,48,255,0.8)]"
            />
          </div>
        );
      })}
    </>
  );
}

