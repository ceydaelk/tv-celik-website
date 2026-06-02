import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { getServiceCoverImage, getCategoryCoverImage } from "@/lib/localServiceImages";

interface ServiceCardProps {
  slug: string;
  categorySlug: string;
  label: string;
  description: string;
  imagePlaceholder: string;
  variant: "homepage" | "listing";
  isFoldable?: boolean;
}


const CATEGORY_BG: Record<string, string> = {
  "prefabrik-yapilar":
    "radial-gradient(ellipse at 25% 35%, #253348 0%, #192030 50%, #0d1420 100%)",
  "hafif-celik-yapilar":
    "radial-gradient(ellipse at 75% 25%, #1e2d26 0%, #131d18 50%, #0b1410 100%)",
  "konteyner-sistemleri":
    "radial-gradient(ellipse at 50% 40%, #342215 0%, #201408 50%, #130c04 100%)",
  "endustriyel-celik-yapilar":
    "radial-gradient(ellipse at 30% 70%, #1e1e2e 0%, #131320 50%, #0a0a14 100%)",
  "yapisal-bilesenler":
    "radial-gradient(ellipse at 65% 40%, #2a251a 0%, #1c1810 50%, #131108 100%)",
};

const DEFAULT_BG = "radial-gradient(ellipse at 50% 50%, #252525 0%, #1C1C1C 50%, #111111 100%)";

export default function ServiceCard({
  slug,
  categorySlug,
  label,
  description,
  imagePlaceholder,
  variant,
  isFoldable,
}: ServiceCardProps) {
  const bg = CATEGORY_BG[categorySlug] ?? DEFAULT_BG;
  // Priority: Firestore URL → service cover → (category cover only for homepage) → Unsplash
  const imgSrc = imagePlaceholder?.startsWith("http")
    ? imagePlaceholder
    : (getServiceCoverImage(slug) ?? getCategoryCoverImage(categorySlug));

  if (variant === "homepage") {
    return (
      <a
        href={`/hizmetler/${slug}`}
        className="group relative block h-[260px] sm:h-[310px] lg:h-[360px] overflow-hidden rounded-xl border border-white/5 shadow-md shadow-black/30 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50 focus:outline-2 focus:outline-[#9D7C64]"
      >
        {/* Gradient base */}
        <div className="absolute inset-0" style={{ background: bg }} />

        {/* Real photo */}
        {imgSrc && (
          <Image
            src={imgSrc}
            alt=""
            fill
            className="object-cover opacity-55 scale-[1.08] transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
          />
        )}

        {/* Bottom-up gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />

        {/* Copper top reveal line */}
        <div className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 bg-[#9D7C64] transition-transform duration-500 ease-out group-hover:scale-x-100" />

        {/* Top-right arrow — appears on hover */}
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight size={14} className="text-[#9D7C64]" />
        </div>

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white">
            {label}
          </h3>
          <p className="text-sm font-normal leading-relaxed text-white/55 line-clamp-2">
            {description}
          </p>
        </div>
      </a>
    );
  }

  // Listing variant (used on /hizmetler category pages)
  return (
    <a
      href={`/hizmetler/${categorySlug}/${slug}`}
      className="group block overflow-hidden rounded-xl border border-[#E0DDD8] bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#9D7C64]/60 hover:shadow-lg hover:shadow-black/10 focus:outline-2 focus:outline-[#9D7C64]"
    >
      {/* Image area */}
      <div className="relative h-44 overflow-hidden" style={{ background: bg }}>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt=""
            fill
            className="object-cover opacity-55 scale-[1.08] transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top-right arrow */}
        <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 ease-out group-hover:opacity-100">
          <ArrowUpRight size={12} className="text-[#9D7C64]" />
        </div>

        {/* Category pill */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-sm bg-black/50 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white/80 backdrop-blur-sm">
            {label}
          </span>
        </div>
      </div>

      {/* Text area */}
      <div className="p-4">
        <h3 className="mb-1.5 text-base font-bold text-[#1C1C1C] transition-colors duration-200 group-hover:text-[#9D7C64]">
          {label}
        </h3>
        <p className="text-sm font-normal leading-relaxed text-[#8A8680] line-clamp-2">
          {description}
        </p>
        {isFoldable && (
          <span className="mt-3 inline-flex items-center gap-1 rounded bg-[#9D7C64] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
            <Star size={9} />
            Öne Çıkan
          </span>
        )}
      </div>
    </a>
  );
}
