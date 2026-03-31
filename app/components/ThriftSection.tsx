import Image from "next/image";
import SectionHeading from "./SectionHeading";
import StickerPill from "./StickerPill";

export default function ThriftSection() {
  return (
    <section id="thrift" className="page-section pt-0">
      <div className="site-shell">
        <div className="ripped-strip mb-8" />

        <div className="paper-panel px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow="Secondhand chaos studio"
                title="Shop the Gutter"
                description="Forgotten treasures, cleaned up, rehomed, and styled with just enough fairy trash energy to make secondhand shopping feel alive."
                note="Good bones only, rehomed on purpose, and never made to feel sterile."
              />

              <div className="space-y-4">
                <p className="body-copy">
                  We find forgotten treasures, clean each piece, and get them back into the world so they can be worn again.
                </p>
                <p className="body-copy">
                  Because saving the planet should not feel dirty. It should feel like finding the best thing at the thrift and wearing it until it becomes part of your lore.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="https://www.depop.com/gutterfairystudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary w-full rotate-[-1.5deg] sm:w-auto"
                >
                  Thrift the drop
                  <span aria-hidden="true">-&gt;</span>
                </a>
                <StickerPill tone="blue" className="rotate-[3deg]">
                  one-off thrift finds
                </StickerPill>
              </div>
            </div>

            <div className="relative min-h-[25rem] sm:min-h-[30rem]">
              <div className="photo-frame absolute left-0 top-5 w-[62%] rotate-[-6deg] p-3 sm:p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[rgba(246,215,231,0.45)]">
                  <Image
                    src="/u6625829487_A_collage-inspired_group_portrait_of_stylish_wome_23986d2e-3c84-4d2e-885a-f6ac85797628_1.PNG"
                    alt="Gutter Fairy thrift collage"
                    fill
                    sizes="(max-width: 1024px) 54vw, 26vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 section-kicker">shop the gutter</p>
              </div>

              <div className="scrap-card absolute right-0 top-0 w-[40%] rotate-[7deg] bg-[rgba(246,215,231,0.7)] px-4 py-5">
                <p className="section-kicker">drop notes</p>
                <p className="font-display mt-3 text-[1.45rem] leading-tight text-[var(--color-ink)]">
                  good bones only
                </p>
                <p className="mt-3 text-sm leading-6 text-[rgba(31,26,29,0.82)]">
                  Curated secondhand, rescued denim, soft washed tees, and weird little reworked pieces.
                </p>
              </div>

              <div className="photo-frame absolute bottom-0 right-5 w-[46%] rotate-[-4deg] p-3">
                <div className="relative aspect-square overflow-hidden rounded-[16px] bg-[rgba(207,231,245,0.5)]">
                  <Image
                    src="/hero.png"
                    alt="Gutter Fairy editorial collage"
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StickerPill tone="lime" className="rotate-[-4deg]">
                    sustainably sourced
                  </StickerPill>
                </div>
              </div>

              <div className="scrap-card absolute bottom-[28%] left-[24%] w-[38%] rotate-[6deg] bg-[rgba(255,255,255,0.84)] px-4 py-4">
                <p className="section-kicker">closet lore</p>
                <p className="mt-3 text-sm leading-6 text-[rgba(31,26,29,0.82)]">
                  Each piece looks like a thrift-score story, not a polished showroom sample.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
