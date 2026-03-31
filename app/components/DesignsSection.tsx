import Link from "next/link";
import DesignCard from "./DesignCard";
import OrderPatchButton from "./OrderPatchButton";
import SectionHeading from "./SectionHeading";
import StickerPill from "./StickerPill";

const steps = [
  {
    title: "Browse designs",
    body: "Choose from the menu or bring your own idea. Everything can start as a patch, a thrift flip, or a custom stitch on something you already love.",
    tone: "bg-[rgba(255,255,255,0.84)]",
  },
  {
    title: "Made to order",
    body: "Pick your thread colors, tweak the vibe, and customize the size so the final piece still feels like yours.",
    tone: "bg-[rgba(246,215,231,0.58)]",
  },
  {
    title: "We deliver magic",
    body: "Each order is stitched with intention, then shipped out ready to wear, patch, or add back into the rotation.",
    tone: "bg-[rgba(217,208,255,0.56)]",
  },
];

const designs = [
  {
    title: "Curb Kisser",
    image: "/Curb Kisser.jpg",
    description: "Embroidery design",
  },
  {
    title: "Food Kitty",
    image: "/Food Kitty.jpg",
    description: "Embroidery design",
  },
  {
    title: "Love to Death",
    image: "/Love to Death.jpg",
    description: "Embroidery design",
  },
];

export default function DesignsSection() {
  return (
    <section id="designs" className="page-section">
      <div className="site-shell">
        <div className="paper-panel px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Embroidery anything"
                title="Patch ideas, custom stitches, and workshop chaos"
                description="Choose from the menu or bring your own idea. Every design can live on a patch, a thrift flip, or something already in your closet."
                note="Custom embroidery stays personal here. Nothing is trying to look mass-made."
              />

              <div className="scrap-card max-w-sm rotate-[3deg] bg-[rgba(207,231,245,0.62)] px-5 py-5">
                <StickerPill tone="lime" className="rotate-[-4deg]">
                  Creative workshops
                </StickerPill>
                <p className="font-display mt-4 text-[1.5rem] leading-tight text-[var(--color-ink)]">
                  patch parties live here too
                </p>
                <p className="mt-3 text-sm leading-6 text-[rgba(31,26,29,0.82)]">
                  Thrift flips, embroidery hangs, and future workshop drops sit right next to the custom work instead of feeling like a separate universe.
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={`scrap-card ${step.tone} px-5 py-6`}
                  style={{ transform: `rotate(${index === 1 ? "1.8deg" : index === 2 ? "-1.4deg" : "-2deg"})` }}
                >
                  <p className="section-kicker">{step.title}</p>
                  <p className="mt-4 text-[1rem] leading-7 text-[rgba(31,26,29,0.82)]">
                    {step.body}
                  </p>
                  <div className="mt-5 dashed-divider" />
                  <p className="annotation mt-4">
                    {index === 0 ? "pick your favorite weird little thing" : index === 1 ? "messy but intentional" : "mailed with fairy dust"}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {designs.map((design) => (
                <DesignCard
                  key={design.title}
                  title={design.title}
                  image={design.image}
                  description={design.description}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <OrderPatchButton className="w-full sm:w-auto" />
              <Link href="/designs" className="cta-secondary w-full sm:w-auto">
                More designs
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
