import Navigation from "../components/Navigation";
import FairyCursor from "../components/FairyCursor";
import StickerPill from "../components/StickerPill";
import WindowPanel from "../components/WindowPanel";

const valueCards = [
  {
    title: "No overproduction",
    body: "I do not stockpile inventory. I drop what I find and keep it small on purpose.",
    note: "less waste, better weird stuff",
    tone: "bg-[rgba(255,255,255,0.84)]",
  },
  {
    title: "Rewear and reuse",
    body: "Refuse to feed the machine and buy rescued pieces, re-worn on purpose.",
    note: "good clothes deserve another life",
    tone: "bg-[rgba(246,215,231,0.62)]",
  },
  {
    title: "Community first",
    body: "Events, collabs, and creative hangouts matter more than mindless consumption.",
    note: "shopping is only part of the story",
    tone: "bg-[rgba(207,231,245,0.66)]",
  },
];

const studioTags = [
  "Curated secondhand",
  "Upcycled goods",
  "Custom patches",
  "Local workshops",
];

export default function AboutPage() {
  return (
    <>
      <FairyCursor />
      <Navigation />

      <main className="pb-20 pt-6 sm:pt-8">
        <section className="site-shell">
          <div className="flex flex-col gap-6">
            <div className="px-5 py-3 sm:px-8 lg:px-12 xl:px-16">
              <div className="flex flex-col items-center gap-6 text-center sm:gap-7">
                <div className="flex max-w-4xl flex-col items-center gap-5">
                  <h1 className="offset-heading text-[clamp(2.9rem,8vw,5.7rem)] font-semibold leading-[0.92] text-[var(--color-ink)]">
                    Reclaim Your Magic
                  </h1>
                  <p className="max-w-3xl text-base leading-8 text-[rgba(31,26,29,0.74)] sm:text-[1.02rem]">
                    Gutter Fairy is a studio and a secondhand shop built around rescued clothes, custom stitching, and community events that make getting dressed feel personal again.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:items-start">
              <div className="flex flex-col gap-6">
                <WindowPanel chromeLabel="welcome to my little chaos studio" tone="pink">
                  <div className="flex flex-col gap-5">
                    <div>
                      <p className="section-kicker">Studio story</p>
                      <h2 className="offset-heading mt-2 text-[1.95rem] font-semibold leading-tight text-[var(--color-ink)] sm:text-[2.25rem]">
                        Personal, handmade, and built from good bones
                      </h2>
                    </div>

                    <div className="space-y-4 text-sm leading-7 text-[rgba(31,26,29,0.76)] sm:text-base">
                      <p>
                        I hunt down pieces with good bones, clean them up, and get them back into rotation. And when you want something more personal, I stitch it.
                      </p>
                      <p>
                        My goal is to bring creatives together by hosting rework parties, collabs, and making stuff side by side instead of treating fashion like a one-way transaction.
                      </p>
                      <p>
                        If you&apos;re weird, loud, shy, chaotic, rebuilding your style, or still figuring it out, welcome to the Gutter.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <StickerPill tone="white" className="rotate-[-2deg]">
                        Imperfect by Design
                      </StickerPill>
                    </div>
                  </div>
                </WindowPanel>

                <WindowPanel chromeLabel="what lives here" tone="blue">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
                    <div className="flex flex-col gap-4">
                      <h2 className="offset-heading mt-2 text-[1.7rem] font-semibold leading-tight text-[var(--color-ink)]">
                        A chaotic little secondhand shop
                      </h2>

                      <p className="text-sm leading-7 text-[rgba(31,26,29,0.74)] sm:text-base">
                        Nothing here is meant to feel mass-made or polished flat. The point is to rescue the good stuff, make it yours, and keep the energy personal.
                      </p>
                    </div>

                    <div className="flex flex-wrap content-start gap-3 lg:justify-end">
                      {studioTags.map((tag, index) => (
                        <StickerPill
                          key={tag}
                          tone={index % 2 === 0 ? "cream" : "white"}
                          className={index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[1.5deg]"}
                        >
                          {tag}
                        </StickerPill>
                      ))}
                    </div>
                  </div>
                </WindowPanel>
              </div>

              <WindowPanel chromeLabel="community first" tone="lilac">
                <div className="flex flex-col gap-6">
                  <div className="max-w-3xl">
                    <h2 className="offset-heading mt-2 text-[1.95rem] font-semibold leading-tight text-[var(--color-ink)] sm:text-[2.25rem]">
                      Built around rescued clothes, slower making, and community.
                    </h2>
                  </div>

                  <div className="grid gap-4">
                    {valueCards.map((card, index) => (
                      <article
                        key={card.title}
                        className={`scrap-card ${card.tone} px-5 py-6`}
                        style={{ transform: `rotate(${index === 1 ? "1.4deg" : index === 2 ? "-1.4deg" : "-2deg"})` }}
                      >
                        <p className="section-kicker">{card.title}</p>
                        <p className="mt-4 text-sm leading-7 text-[rgba(31,26,29,0.82)] sm:text-base">
                          {card.body}
                        </p>
                        <div className="mt-5 dashed-divider" />
                        <p className="annotation mt-4">{card.note}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </WindowPanel>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
