import Link from "next/link";
import DesignCard from "./DesignCard";

const designs = [
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
            DESIGNS
          </span>
          <div className="w-20 h-1 bg-[#ff3366] mt-3" />
        </div>

        {/* How it works */}
        <div className="mb-8">
          <h3 className="font-body text-2xl sm:text-3xl font-bold text-[#f0e6d3] mb-6">
            How it works
          </h3>
          <ol className="font-body text-base text-[#f0e6d3] space-y-2 list-decimal list-inside mb-6">
            <li>Pick a design (or bring your own idea)</li>
            <li>Choose your colors and the size </li>
            <li>I stich it to order</li>
          </ol>
          <a
            href="#"
            className="inline-block font-body text-sm font-semibold tracking-wide px-8 py-4 bg-[#ff3366] text-[#f0e6d3] hover:bg-[#ff3366]/80 transition-all duration-300 uppercase"
          >
            Order a patch
          </a>
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

        {/* More Designs button */}
        <div className="text-center">
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
