import Link from "next/link";
import DesignCard from "./DesignCard";
import OrderPatchButton from "./OrderPatchButton";

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
    <section
      id="designs"
      className="min-h-screen relative py-24 px-6"
    >
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto bg-black/45 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
        {/* Section label */}
        <div className="mb-12">
          <span className="font-body text-sm font-semibold tracking-wider text-[#ff3366] uppercase">
            Embroidery Anything
          </span>
          <div className="w-20 h-1 bg-[#ff3366] mt-3" />
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="font-body text-4xl sm:text-5xl md:text-6xl font-bold text-[#f0e6d3] leading-tight uppercase mb-12">
            How it works
          </h2>

          {/* Three step blocks */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Block 1: Pick a design */}
            <div className="bg-black/30 border border-white/5 p-6 rounded">
              <h3 className="font-body text-xl sm:text-2xl font-bold text-[#f0e6d3] mb-4 uppercase">
              BROWSE DESIGNS
              </h3>
              <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
              Choose from the menu (or bring your own idea). I can turn it into a patch or embroider it onto anything you want.
              </p>
              {/* Decorative element */}
              <div className="pt-6 flex items-center gap-2">
                <div className="flex-1 h-px bg-gradient-to-r from-[#ff3366] to-transparent" />
                <span className="font-body text-xl text-[#ff3366]">*</span>
                <div className="flex-1 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
              </div>
            </div>

            {/* Block 2: Customize */}
            <div className="bg-black/30 border border-white/5 p-6 rounded">
              <h3 className="font-body text-xl sm:text-2xl font-bold text-[#f0e6d3] mb-4 uppercase">
                MADE TO ORDER
              </h3>
              <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
              All designs can be customized to fit your vibe so pick the colors and any size up to 4x4 inches.
              </p>
              {/* Decorative element */}
              <div className="pt-6 flex items-center gap-2">
                <div className="flex-1 h-px bg-gradient-to-r from-[#ff3366] to-transparent" />
                <span className="font-body text-xl text-[#ff3366]">*</span>
                <div className="flex-1 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
              </div>
            </div>

            {/* Block 3: Fairy Magic */}
            <div className="bg-black/30 border border-white/5 p-6 rounded">
              <h3 className="font-body text-xl sm:text-2xl font-bold text-[#f0e6d3] mb-4 uppercase">
                WE DELIVER MAGIC
              </h3>
              <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
              I make each piece with you in mind so it's shipped as a patch or stitched onto a piece you already love.
              </p>
              {/* Decorative element */}
              <div className="pt-6 flex items-center gap-2">
                <div className="flex-1 h-px bg-gradient-to-r from-[#ff3366] to-transparent" />
                <span className="font-body text-xl text-[#ff3366]">*</span>
                <div className="flex-1 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid - show only 3 designs on home */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {designs.map((design) => (
            <DesignCard
              key={design.title}
              title={design.title}
              image={design.image}
              description={design.description}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <OrderPatchButton />
          <Link
            href="/designs"
            className="inline-block font-body text-sm font-semibold tracking-wide px-8 py-4 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase"
          >
            MORE DESIGNS
          </Link>
        </div>
      </div>
    </section>
  );
}
