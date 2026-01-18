import Image from "next/image";

interface DesignCardProps {
  title: string;
  image?: string;
  description?: string;
}

export default function DesignCard({ title, image, description }: DesignCardProps) {
  return (
    <div className="design-card overflow-hidden group">
      {/* Image */}
      <div className="aspect-square bg-[#f0e6d3] relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto text-[#ff3366]/30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <p className="text-[#f0e6d3]/40 text-xs mt-2 font-body font-semibold uppercase">
                COMING SOON
              </p>
            </div>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="p-4 bg-[#121212]">
        <h3 className="font-body text-lg font-bold text-[#f0e6d3] group-hover:text-[#ff3366] transition-colors uppercase tracking-wide">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[#f0e6d3]/60 mt-1 font-body">{description}</p>
        )}
      </div>
    </div>
  );
}
