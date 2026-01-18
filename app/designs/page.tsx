import Navigation from "../components/Navigation";
import FairyCursor from "../components/FairyCursor";
import BlastEffect from "../components/BlastEffect";
import DesignCard from "../components/DesignCard";
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
                DESIGNS
              </span>
              <div className="w-20 h-1 bg-[#ff3366] mt-3" />
            </div>

            {/* Description text */}
            <div className="mb-16">
              <p className="font-body text-sm text-[#f0e6d3]/90 leading-relaxed max-w-2xl">
                Email{" "}
                <a
                  href="mailto:gutterfairystudios@gmail.com"
                  className="text-[#ff3366] hover:text-[#f0e6d3] underline"
                >
                  gutterfairystudios@gmail.com
                </a>{" "}
                to get a design embroidered on your item you purchase from me
              </p>
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
