import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#f0e6d3]/15 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/fairy.png"
              alt="Gutter Fairy"
              width={32}
              height={32}
              className="opacity-70"
            />
            <span className="font-body text-xl font-bold text-[#f0e6d3]/80 uppercase tracking-wide">
              GUTTER FAIRY
            </span>
          </div>

          {/* Made with love */}
          <p className="text-sm text-[#f0e6d3]/50 font-body">
            Made with love by a 🐷
          </p>
        </div>
      </div>
    </footer>
  );
}
