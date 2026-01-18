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
        <section className="min-h-screen flex items-center relative py-24 px-6">
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto bg-black/45 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
            {/* Section label */}
            <div className="mb-12">
              <span className="font-body text-sm font-semibold tracking-wider text-[#ff3366] uppercase">
                ABOUT
              </span>
              <div className="w-20 h-1 bg-[#ff3366] mt-3" />
            </div>

            {/* Main text - full version */}
            <div className="space-y-8">
              <h1 className="font-body text-5xl sm:text-6xl md:text-7xl font-bold text-[#f0e6d3] leading-tight uppercase">
                IMPERFECT BY DESIGN
              </h1>

              <div className="grid md:grid-cols-2 gap-8 text-[#f0e6d3] font-body">
                <div className="space-y-4">
                  <p className="text-base leading-relaxed">
                    Born from late nights and loud music. Gutter Fairy is handmade 
                    embroidery for those who color outside the lines.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Every stitch tells a story. Every piece is one-of-a-kind. 
                    We embrace the raw, the rough, and the beautifully flawed.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Based in basements and bedrooms. Made with intention. 
                    Worn by those who give a damn.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    No mass production. No algorithms. Just needle, thread, 
                    and a whole lot of stubborn creativity.
                  </p>
                  <p className="text-sm leading-relaxed">
                    We believe in the power of handcrafted work. Each design 
                    is sketched, stitched, and finished by hand. No two pieces 
                    are ever exactly the same.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Gutter Fairy is for the rebels, the makers, and the ones 
                    who refuse to blend in.
                  </p>
                </div>
              </div>

              {/* Decorative element */}
              <div className="pt-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-[#ff3366] to-transparent" />
                <span className="font-body text-3xl text-[#ff3366]">*</span>
                <div className="flex-1 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
              </div>

              {/* Values */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {["HANDMADE", "ONE OF ONE", "DIY FOREVER"].map((value) => (
                  <div key={value} className="text-center">
                    <span className="font-body text-xs sm:text-sm font-semibold text-[#f0e6d3] uppercase tracking-wide">
                      {value}
                    </span>
                  </div>
                ))}
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
