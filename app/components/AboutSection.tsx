import Link from "next/link";
import SectionHeading from "./SectionHeading";
import StickerPill from "./StickerPill";

const valueCards = [
  {
    title: "Secondhand first",
    body: "Curated thrift and upcycled pieces keep good clothes in rotation instead of feeding overproduction.",
    tone: "bg-[rgba(255,255,255,0.82)]",
    tilt: "-2.5deg",
  },
  {
    title: "DIY forever",
    body: "Custom embroidery, small-batch rework, and made-by-hand details keep every piece personal.",
    tone: "bg-[rgba(246,215,231,0.58)]",
    tilt: "2deg",
  },
  {
    title: "Workshop energy",
    body: "Patch parties, rework hangs, and creative workshops turn the shop into a little chaos studio instead of a static storefront.",
    tone: "bg-[rgba(207,231,245,0.62)]",
    tilt: "-1deg",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="page-section">
      <div className="site-shell">
        <div className="paper-panel px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="relative z-10">
              <SectionHeading
                eyebrow="Welcome to my little chaos studio"
                title="Imperfect by Design"
                description="Gutter Fairy exists to combat textile waste by reworking outdated styles, rescuing good pieces, and stitching personality back into getting dressed."
                note="Personal, sustainable, handmade, and made for people rebuilding their style on their own terms."
              />

              <div className="mt-7 space-y-4">
                <p className="body-copy">
                  This is a studio and a secondhand shop. I hunt down pieces with good bones, clean them up, and get them back into rotation.
                </p>
                <p className="body-copy">
                  When you want something more personal, I stitch it. And when it is time to make stuff side by side, the plan is patch parties, rework hangs, and creative workshops.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/about" className="cta-primary w-full sm:w-auto">
                  Meet the fairy
                  <span aria-hidden="true">-&gt;</span>
                </Link>
                <StickerPill tone="white" className="rotate-[-2deg]">
                  Curated Chaos, Sustainably Sourced
                </StickerPill>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {valueCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`scrap-card ${card.tone} px-5 py-6`}
                  style={{
                    transform: `rotate(${card.tilt})`,
                    marginLeft: index === 1 ? "0.75rem" : "0",
                  }}
                >
                  <p className="section-kicker">{card.title}</p>
                  <p className="mt-4 text-[1rem] leading-7 text-[rgba(31,26,29,0.84)]">
                    {card.body}
                  </p>
                  <div className="mt-5 dashed-divider" />
                  <p className="annotation mt-4">
                    {index === 0
                      ? "rescue the good stuff"
                      : index === 1
                        ? "make it weird on purpose"
                        : "creative hang > generic commerce"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
