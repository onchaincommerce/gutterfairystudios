import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center relative py-24 px-6"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto bg-black/45 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
        {/* Section label */}
        <div className="mb-12">
          <span className="font-body text-sm font-semibold tracking-wider text-[#ff3366] uppercase">
            Curated Chaos, Sustainably Sourced
          </span>
          <div className="w-20 h-1 bg-[#ff3366] mt-3" />
        </div>

        {/* Main text - brief version */}
        <div className="space-y-8">
          <h2 className="font-body text-4xl sm:text-5xl md:text-6xl font-bold text-[#f0e6d3] leading-tight uppercase">
            IMPERFECT BY DESIGN
          </h2>

          <div className="text-[#f0e6d3] font-body space-y-4">
            <p className="text-base leading-relaxed">
              Gutter Fairy exists to combat textile waste by reworking outdated styles and embroidering the basics — bringing personality back to getting dressed.
            </p>
            
            <p className="text-base leading-relaxed">
              Welcome to my little secondhand chaos studio.
            </p>
          </div>

          {/* Learn More button */}
          <div className="pt-4">
            <Link
              href="/about"
              className="inline-block font-body text-sm font-semibold tracking-wide px-8 py-4 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase"
            >
              MEET THE FAIRY
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
