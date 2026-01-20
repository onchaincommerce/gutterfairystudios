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
                  Keep textiles in rotation and make secondhand feel like self-expression again.
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
                  Gutter Fairy exists because I want people to dress up again (not to fit in).
                </p>

                <p className="text-base leading-relaxed">
                  Most designs start as a sketch, and each piece is something someone else gave up on.
                </p>
                
                <p className="text-base leading-relaxed">
                  It's time to show off what makes you special. So if you're weird, loud, shy, chaotic, rebuilding your style, or still figuring it out… welcome.
                </p>

                <p className="text-base leading-relaxed font-semibold">
                  Around here you'll find:
                </p>

                <ul className="space-y-2 text-base leading-relaxed list-disc list-inside pl-4">
                  <li>Curated secondhand pieces with good bones (aka they still have a lot of life left)</li>
                  <li>Made-to-order patches to make your "old" stuff feel new again</li>
                  <li>Reworked experiments because I hate throwing out something that still works</li>
                  <li>Rework parties so you can pull up, make stuff together, and keep clothes in rotation</li>
                </ul>

                <p className="text-base leading-relaxed pt-2">
                  It's less trend-chasing, & more wear it like you mean it.
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
                  Come as you are
                </h3>
                <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
                Wear (and patch) what feels like you. 
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
                  Trash to Treasure
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
                Create Stuff
                </h3>
                <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
                Next up: rework parties, collabs, and making stuff together.
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
