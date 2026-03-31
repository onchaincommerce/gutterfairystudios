"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CarouselRail from "./CarouselRail";
import OrderPatchButton from "./OrderPatchButton";
import WindowPanel from "./WindowPanel";

const patchItems = [
  { title: "MILF", image: "/MILF.jpg" },
  { title: "Curb Kisser", image: "/Curb Kisser.jpg" },
  { title: "Food Kitty", image: "/Food Kitty.jpg" },
  { title: "Love to Death", image: "/Love to Death.jpg" },
  { title: "DJ A", image: "/DJ A.jpg" },
  { title: "Y2K Heart", image: "/Y2K Heart.jpg" },
];

const workshopLink =
  "https://partiful.com/e/aKkRd9JI82mygBcxJh9A?c=EDVEI04n";

export default function HomeSection() {
  const fullTitle = "Gutter Fairy";
  const [displayTitle, setDisplayTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      const revealTitle = window.setTimeout(() => {
        setDisplayTitle(fullTitle);
        setIsTyping(false);
      }, 0);

      return () => window.clearTimeout(revealTitle);
    }

    let titleIndex = 0;

    const typingInterval = window.setInterval(() => {
      titleIndex += 1;
      setDisplayTitle(fullTitle.slice(0, titleIndex));

      if (titleIndex >= fullTitle.length) {
        window.clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 110);

    return () => {
      window.clearInterval(typingInterval);
    };
  }, []);

  const patchSlides = patchItems.slice(0, 4).map((item) => (
    <article
      key={item.title}
      className="patch-card rounded-[24px] border-2 border-[rgba(31,26,29,0.14)] bg-[rgba(255,255,255,0.82)] p-3 text-center shadow-[0_14px_24px_rgba(31,26,29,0.08)]"
    >
      <div className="relative aspect-square overflow-hidden rounded-[18px] border-2 border-[rgba(31,26,29,0.12)] bg-[rgba(255,255,255,0.78)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1279px) 30vw, 16vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-3 text-center text-sm font-semibold text-[var(--color-ink)]">
        {item.title}
      </h3>
    </article>
  ));

  return (
    <section className="page-section pt-0 sm:pt-1 lg:pt-2">
      <div className="site-shell">
        <div className="flex flex-col gap-5">
          <div className="px-5 pb-1 pt-0 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col items-center justify-center gap-4 py-0 text-center sm:gap-5">
              <div className="mx-auto flex w-full max-w-[20rem] flex-col items-center justify-center">
                <div className="relative flex min-h-[12rem] w-full items-center justify-center sm:min-h-[14rem]">
                  <div className="absolute inset-x-8 top-8 h-40 rounded-full bg-[radial-gradient(circle,rgba(217,208,255,0.72),transparent_70%)] blur-3xl" />
                  <Image
                    src="/fairy.png"
                    alt="Gutter Fairy fairy logo"
                    width={420}
                    height={420}
                    priority
                    className="relative z-10 h-auto w-full max-w-[12.5rem] drop-shadow-[0_26px_40px_rgba(31,26,29,0.2)] motion-safe:animate-[heroFloat_6.5s_ease-in-out_infinite] sm:max-w-[14.5rem]"
                  />
                </div>
              </div>

              <div className="flex max-w-4xl flex-col items-center gap-4">
                <h1
                  className="min-h-[1.02em] text-[clamp(3rem,8vw,5.8rem)] font-semibold leading-[0.92] text-[var(--color-ink)]"
                  aria-label={fullTitle}
                >
                  <span className="relative inline-flex items-end">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[0.045em] top-[0.045em] whitespace-nowrap text-[rgba(246,215,231,0.96)]"
                    >
                      {displayTitle}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[0.09em] top-[0.09em] whitespace-nowrap text-[rgba(246,215,231,0.54)]"
                    >
                      {displayTitle}
                    </span>
                    <span className="relative">{displayTitle}</span>
                    <span
                      aria-hidden="true"
                      className={`ml-[0.08em] inline-block w-[0.08em] rounded-full bg-[var(--color-ink)] ${
                        isTyping ? "opacity-100" : "animate-[blink_1s_steps(1,end)_infinite]"
                      }`}
                      style={{ height: "0.78em", transform: "translateY(-0.02em)" }}
                    />
                  </span>
                </h1>
                <p className="max-w-2xl text-[1.15rem] leading-8 text-[rgba(31,26,29,0.86)]">
                  Secondhand, upcycled goods, custom patches, and local workshops.
                </p>

                <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                  <Link href="/about" className="utility-button w-full justify-center sm:w-auto">
                    Meet the Fairy
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-start">
            <div className="flex flex-col gap-6">
              <WindowPanel chromeLabel="Customize your clothes" tone="lilac">
                <div className="flex flex-col gap-5">
                  <div>
                    <h2 className="offset-heading mt-2 text-[1.8rem] font-semibold leading-tight text-[var(--color-ink)]">
                      Custom Made Patches
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[rgba(31,26,29,0.74)] sm:text-base">
                      Choose a design or bring your own idea, and I&apos;ll make it into a custom patch or stitched piece. Each order is made to fit your vibe, then delivered as a patch or embroidered onto something you already love.
                    </p>
                  </div>

                  <CarouselRail
                    ariaLabel="Featured patch designs"
                    slideClassName="w-[76%] sm:w-[47%]"
                    slides={patchSlides}
                  />

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
                    <Link href="/designs" className="postit-link">
                      View all designs
                    </Link>
                    <OrderPatchButton
                      buttonLabel="Order now"
                      className="w-full justify-center sm:w-auto"
                    />
                  </div>
                </div>
              </WindowPanel>

              <WindowPanel chromeLabel="Curated Chaos, Sustainably Sourced" tone="blue">
                <div className="flex flex-col items-center gap-5 text-center">
                  <div className="flex max-w-2xl flex-col items-center gap-4">
                    <div>
                      <h2 className="offset-heading mt-2 text-[2rem] font-semibold leading-tight text-[var(--color-ink)]">
                        Thrift the Gutter
                      </h2>
                    </div>
                    <p className="text-sm leading-7 text-[rgba(31,26,29,0.74)] sm:text-base">
                      We use secondhand materials, refresh pieces that still have life in them, and rework older finds so our workshops can stay accessible.
                    </p>
                  </div>

                  <a
                    href="https://www.depop.com/gutterfairystudio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="utility-button w-full justify-center sm:w-auto"
                  >
                    Shop on Depop
                  </a>
                </div>
              </WindowPanel>
            </div>

            <WindowPanel
              className="h-full"
              bodyClassName="px-4 py-5 sm:px-5 sm:py-6"
              chromeLabel="RENO MADE"
              tone="cream"
            >
              <div id="workshops" className="flex h-full flex-col gap-5">
                <div>
                  <h2 className="offset-heading mt-2 text-[1.8rem] font-semibold leading-tight text-[var(--color-ink)]">
                    Make Fairy Magic
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[rgba(31,26,29,0.74)] sm:text-base">
                    Monthly workshop series for the Biggest Little City ♡. Gutter Fairy Studio hosts monthly community events focused on upcycling, reworking, and personalizing clothing instead of tossing it.
                  </p>
                </div>

                <div
                  className="poster-card mx-auto w-full max-w-none"
                  style={{ padding: "0.35rem" }}
                >
                  <div className="relative aspect-[572/804] overflow-hidden rounded-[18px] border-2 border-[rgba(31,26,29,0.14)] bg-white">
                    <Image
                      src="/patch-bar-poster.png"
                      alt="Gutter Fairy Patch Bar workshop poster"
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1279px) 44vw, 30vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                <a
                  href={workshopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glossy-button mt-auto w-full justify-center"
                >
                  RSVP
                </a>
              </div>
            </WindowPanel>
          </div>

        </div>
      </div>
    </section>
  );
}
