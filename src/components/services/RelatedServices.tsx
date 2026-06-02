import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/services";
import { getSubcategories } from "@/lib/firestore/services";
import { getServiceCoverImage } from "@/lib/localServiceImages";

interface RelatedServicesProps {
  currentSlug: string;
  categorySlug: string;
}

const CATEGORY_BG: Record<string, string> = {
  "prefabrik-yapilar":
    "radial-gradient(ellipse at 25% 35%, #253348 0%, #192030 55%, #0d1420 100%)",
  "hafif-celik-yapilar":
    "radial-gradient(ellipse at 75% 25%, #1e2d26 0%, #131d18 55%, #0b1410 100%)",
  "konteyner-sistemleri":
    "radial-gradient(ellipse at 50% 40%, #342215 0%, #201408 55%, #130c04 100%)",
  "endustriyel-celik-yapilar":
    "radial-gradient(ellipse at 30% 70%, #1e1e2e 0%, #131320 55%, #0a0a14 100%)",
  "yapisal-bilesenler":
    "radial-gradient(ellipse at 65% 40%, #2a251a 0%, #1c1810 55%, #131108 100%)",
};

export default async function RelatedServices({ currentSlug, categorySlug }: RelatedServicesProps) {
  // Firestore'dan al; boş gelirse hardcoded veriye dön
  const fsSubs      = await getSubcategories(categorySlug);
  const fallbackCat = CATEGORIES.find((c) => c.slug === categorySlug);
  const allSubs     = fsSubs.length > 0 ? fsSubs : (fallbackCat?.subcategories ?? []);

  const siblings = allSubs.filter((s) => s.slug !== currentSlug).slice(0, 4);
  if (siblings.length === 0) return null;

  const bg           = CATEGORY_BG[categorySlug] ?? CATEGORY_BG["prefabrik-yapilar"];
  const categoryName = fallbackCat?.header ?? categorySlug;

  return (
    <div className="bg-[#F5F5F3] border-t border-[#EAEAE6]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-7 flex items-baseline justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9D7C64] mb-1">
              {categoryName}
            </p>
            <h2 className="text-base font-bold text-[#1C1C1C]">
              Bu Kategorideki Diğer Hizmetler
            </h2>
          </div>
          <Link
            href={`/hizmetler/${categorySlug}`}
            className="flex-shrink-0 text-[12px] text-[#8A8680] hover:text-[#1C1C1C] transition-colors"
          >
            Tümünü gör →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {siblings.map((s) => {
            const imgSrc =
              (s as { imageUrl?: string }).imageUrl?.startsWith("http")
                ? (s as { imageUrl?: string }).imageUrl!
                : getServiceCoverImage(s.slug);

            return (
              <Link
                key={s.slug}
                href={`/hizmetler/${categorySlug}/${s.slug}`}
                className="group relative flex flex-col overflow-hidden border border-[#DDDBD6] bg-white hover:border-[#9D7C64]/50 transition-colors duration-150 focus:outline-2 focus:outline-[#9D7C64]"
                style={{ background: bg, minHeight: "140px" }}
              >
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={s.label}
                    fill
                    className="object-cover opacity-40"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative mt-auto p-4">
                  <h3 className="text-[13px] font-bold text-white leading-snug">{s.label}</h3>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
