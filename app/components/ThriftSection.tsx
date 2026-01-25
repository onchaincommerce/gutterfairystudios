export default function ThriftSection() {
  return (
    <section
      id="thrift"
      className="min-h-screen flex items-center relative py-24 px-6"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto bg-black/45 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
        {/* Section label */}
        <div className="mb-12">
          <span className="font-body text-sm font-semibold tracking-wider text-[#ff3366] uppercase">
            SECONDHAND CHAOS STUDIO
          </span>
          <div className="w-20 h-1 bg-[#ff3366] mt-3" />
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <h2 className="font-body text-4xl sm:text-5xl md:text-6xl font-bold text-[#f0e6d3] leading-tight">
            Shop the Gutter
          </h2>

          <div className="text-[#f0e6d3] font-body space-y-4">
            <p className="text-base leading-relaxed">
              We find forgotten treasures, clean each piece, and rehome them so they get worn again.
            </p>
            <p className="text-base leading-relaxed">
              Because saving the planet shouldn't feel dirty.
            </p>
          </div>

          {/* CTA button */}
          <div className="pt-4">
            <a
              href="https://www.depop.com/gutterfairystudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-body text-sm font-semibold tracking-wide px-8 py-4 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase"
            >
              THRIFT
              <span className="ml-2 text-xs">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
