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

        {/* Description text - wrap on mobile, no scrollbar */}
        <div className="mb-8">
          <p className="font-body text-xs sm:text-sm text-[#f0e6d3]/90 leading-relaxed">
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
