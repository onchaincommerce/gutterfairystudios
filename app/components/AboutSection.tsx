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
            ABOUT
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
              Gutter Fairy started because I love thrifting. At first I wanted to combat textile waste, but reselling didn't feel like enough. The reality is there are just so many outdated styles sitting in the gutter.
            </p>
            <p className="text-base leading-relaxed">
              Now it's thrifted gems, reworked ideas, and patches stitched to order — turning overlooked pieces into something modern again.
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
