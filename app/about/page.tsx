import Navigation from "../components/Navigation";
import FairyCursor from "../components/FairyCursor";
import BlastEffect from "../components/BlastEffect";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      {/* Interactive effects */}
      <FairyCursor />
      <BlastEffect />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* About Content Section */}
        <section className="min-h-screen flex items-center relative py-24 px-6">
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto bg-black/45 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
            {/* Main text - full version */}
            <div className="space-y-8">
              {/* Mission Section */}
              <div className="pb-8">
                <div className="mb-6">
                  <span className="font-body text-sm font-semibold tracking-wider text-[#ff3366] uppercase">
                    MISSION
                  </span>
                  <div className="w-20 h-1 bg-[#ff3366] mt-3" />
                </div>
                <p className="font-body text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0e6d3] leading-relaxed">
                  Keep textiles in rotation and make dressing up about self expression again.
                </p>
              </div>

              {/* Section label */}
              <div className="mb-12">
                <span className="font-body text-sm font-semibold tracking-wider text-[#ff3366] uppercase">
                  ABOUT
                </span>
                <div className="w-20 h-1 bg-[#ff3366] mt-3" />
              </div>

              <h1 className="font-body text-5xl sm:text-6xl md:text-7xl font-bold text-[#f0e6d3] leading-tight uppercase">
                RECLAIM YOUR MAGIC
              </h1>

              <div className="text-[#f0e6d3] font-body space-y-6">
                <p className="text-base leading-relaxed">
                  This is a studio and a secondhand shop.
                </p>

                <p className="text-base leading-relaxed">
                  I hunt down pieces with good bones, clean them up, and get them back into rotation. And when you want something more personal, I stitch it.
                </p>

                <p className="text-base leading-relaxed">
                  My goal is to bring creatives together by hosting rework parties, collabs, and making stuff side by side.
                </p>

                <p className="text-base leading-relaxed">
                  It's time to show off what makes you special. So if you're weird, loud, shy, chaotic, rebuilding your style, or still figuring it out… welcome to the Gutter.
                </p>
              </div>

              {/* Decorative element */}
              <div className="pt-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-[#ff3366] to-transparent" />
                <span className="font-body text-3xl text-[#ff3366]">*</span>
                <div className="flex-1 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* The Gutter Values Section */}
        <section className="min-h-screen flex items-center relative py-24 px-6">
          <div className="relative z-10 max-w-6xl mx-auto bg-black/45 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
            {/* Section label */}
            <div className="mb-12">
              <span className="font-body text-sm font-semibold tracking-wider text-[#ff3366] uppercase">
                VALUES
              </span>
              <div className="w-20 h-1 bg-[#ff3366] mt-3" />
            </div>

            {/* Main title */}
            <h1 className="font-body text-4xl sm:text-5xl md:text-6xl font-bold text-[#f0e6d3] leading-tight uppercase mb-12">
              The Gutter Values
            </h1>

            {/* Three value blocks */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Block 1: Come as you are */}
              <div className="bg-black/30 border border-white/5 p-6 rounded">
                <h3 className="font-body text-xl sm:text-2xl font-bold text-[#f0e6d3] mb-4 uppercase">
                  NO OVERPRODUCTION 
                </h3>
                <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
                I don’t stockpile inventory. I drop what I find and keep it small on purpose. 
                </p>
                {/* Decorative element */}
                <div className="pt-6 flex items-center gap-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-[#ff3366] to-transparent" />
                  <span className="font-body text-xl text-[#ff3366]">*</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
                </div>
              </div>

              {/* Block 2: Trash to Treasure */}
              <div className="bg-black/30 border border-white/5 p-6 rounded">
                <h3 className="font-body text-xl sm:text-2xl font-bold text-[#f0e6d3] mb-4 uppercase">
                REWEAR AND REUSE
                </h3>
                <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
                Refuse to feed the machine and buy rescued pieces, re-worn on purpose.
                </p>
                {/* Decorative element */}
                <div className="pt-6 flex items-center gap-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-[#ff3366] to-transparent" />
                  <span className="font-body text-xl text-[#ff3366]">*</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
                </div>
              </div>

              {/* Block 3: Create Stuff */}
              <div className="bg-black/30 border border-white/5 p-6 rounded">
                <h3 className="font-body text-xl sm:text-2xl font-bold text-[#f0e6d3] mb-4 uppercase">
                COMMUNITY FIRST
                </h3>
                <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
                No mindless consumption. Events, collabs, and creative hangouts. Shopping is just a bonus.

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
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
