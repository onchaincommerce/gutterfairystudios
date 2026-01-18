"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomeSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "GUTTER FAIRY";
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    setShowCursor(true);

    let currentIndex = 0;
    let blinkInterval: NodeJS.Timeout | null = null;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        // Blink cursor after typing is done - keep it visible
        setTimeout(() => {
          blinkInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
          }, 530);
        }, 500);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
      if (blinkInterval) {
        clearInterval(blinkInterval);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle color washes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#f0e6d3]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ff3366]/5 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="mx-auto w-full max-w-3xl bg-black/50 backdrop-blur-sm border border-white/15 px-6 py-10 sm:px-10">
          {/* Logo */}
          <div className="mb-8 inline-block">
            <Image
              src="/fairy.png"
              alt="Gutter Fairy"
              width={200}
              height={200}
              className="drop-shadow-[0_0_40px_rgba(255,51,102,0.3)] animate-[float_4s_ease-in-out_infinite]"
              priority
            />
          </div>

          {/* Title with typewriter effect - fixed positioning to prevent glitch */}
          <h1
            className="font-body text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#f0e6d3] mb-6 drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] tracking-tight leading-none sm:whitespace-nowrap"
            aria-label={fullText}
          >
            <span className="relative inline-block">
              <span className="invisible pr-[0.2em]" aria-hidden="true">
                {fullText}
              </span>
              <span className="absolute inset-0">
                {displayedText}
                <span 
                  className={`inline-block w-[0.1em] h-[1em] bg-[#ff3366] ml-[0.08em] align-middle ${
                    !isTyping ? "animate-[blink_1s_infinite]" : ""
                  }`}
                  style={{ verticalAlign: "baseline" }}
                ></span>
              </span>
            </span>
          </h1>

          {/* Tagline */}
          <p className="font-body text-xl sm:text-2xl font-semibold tracking-wider text-[#ff3366] mb-12 uppercase">
            HANDMADE CHAOS
          </p>

          {/* CTA - Shop button */}
        <a
          href="https://www.depop.com/gutterfairystudios/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-body text-sm font-semibold tracking-wide px-8 py-4 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase"
        >
          SHOP
        </a>
        </div>
      </div>
    </section>
  );
}
