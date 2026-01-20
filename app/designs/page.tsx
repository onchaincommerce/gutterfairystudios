import Navigation from "../components/Navigation";
import FairyCursor from "../components/FairyCursor";
import BlastEffect from "../components/BlastEffect";
import DesignCard from "../components/DesignCard";
import OrderPatchButton from "../components/OrderPatchButton";
import Footer from "../components/Footer";

const allDesigns = [
  {
    title: "MILF",
    image: "/milf.png",
    description: "Embroidery design",
  },
  {
    title: "Design 002",
    description: "Coming soon",
  },
  {
    title: "Design 003",
    description: "Coming soon",
  },
  {
    title: "Design 004",
    description: "Coming soon",
  },
  {
    title: "Design 005",
    description: "Coming soon",
  },
  {
    title: "Design 006",
    description: "Coming soon",
  },
  {
    title: "Design 007",
    description: "Coming soon",
  },
  {
    title: "Design 008",
    description: "Coming soon",
  },
  {
    title: "Design 009",
    description: "Coming soon",
  },
];

export default function DesignsPage() {
  return (
    <>
      {/* Interactive effects */}
      <FairyCursor />
      <BlastEffect />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <section className="min-h-screen relative py-24 px-6">
          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto bg-black/45 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
            {/* Section label */}
            <div className="mb-12">
              <span className="font-body text-sm font-semibold tracking-wider text-[#ff3366] uppercase">
                PATCHES
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
                {/* Block 1: Find a patch */}
                <div className="bg-black/30 border border-white/5 p-6 rounded">
                  <h3 className="font-body text-xl sm:text-2xl font-bold text-[#f0e6d3] mb-4 uppercase">
                    FIND A PATCH
                  </h3>
                  <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
                    Pick a design (or bring your own) to rework what you already own.
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
                    CUSTOMIZE
                  </h3>
                  <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
                    Choose your colors and the size so the patch fits like a glove.
                  </p>
                  {/* Decorative element */}
                  <div className="pt-6 flex items-center gap-2">
                    <img 
                      src="/fairy.png" 
                      alt="Fairy" 
                      className="w-8 h-8 object-contain"
                    />
                    <div className="flex-1 h-px bg-gradient-to-r from-[#ff3366] to-transparent" />
                    <span className="font-body text-xl text-[#ff3366]">*</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
                  </div>
                </div>

                {/* Block 3: Fairy Magic */}
                <div className="bg-black/30 border border-white/5 p-6 rounded">
                  <h3 className="font-body text-xl sm:text-2xl font-bold text-[#f0e6d3] mb-4 uppercase">
                    FAIRY MAGIC
                  </h3>
                  <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed">
                    We stich to order or deliver iron on patches if you're out of town.
                  </p>
                  {/* Decorative element */}
                  <div className="pt-6 flex items-center gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-[#ff3366] to-transparent" />
                    <span className="font-body text-xl text-[#ff3366]">*</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
                  </div>
                </div>
              </div>

              {/* Order a patch button */}
              <div className="text-center mb-16">
                <OrderPatchButton />
              </div>
            </div>

            {/* Grid - all designs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allDesigns.map((design) => (
                <DesignCard
                  key={design.title}
                  title={design.title}
                  image={design.image}
                  description={design.description}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
