import type { Metadata } from "next";
import { CATEGORIES } from "@/data/services";
import { getCategories, getSubcategories } from "@/lib/firestore/services";
import ServiceCard from "@/components/home/ServiceCard";
import BreadcrumbNav from "@/components/common/BreadcrumbNav";

export const metadata: Metadata = {
  title: "Hizmetlerimiz — TV Çelik A.Ş.",
  description: "Prefabrik yapılar, hafif çelik sistemler, konteyner çözümleri ve daha fazlası.",
};

const FOLDABLE_SLUGS = ["katlanir-tasinabilir", "katlanir-konteyner"] as const;

export default async function HizmetlerPage() {
  // Firestore'dan kategorileri oku; boş gelirse hardcoded veriye dön
  const firestoreCats = await getCategories();
  const useFirestore  = firestoreCats.length > 0;

  // Her kategori için alt hizmetleri al
  const displayCategories = await Promise.all(
    (useFirestore ? firestoreCats : CATEGORIES.map((c) => ({ id: c.slug, header: c.header, slug: c.slug, order: 0 }))).map(
      async (cat) => {
        const fsSubs = useFirestore ? await getSubcategories(cat.slug) : [];
        const fallbackSubs = CATEGORIES.find((c) => c.slug === cat.slug)?.subcategories ?? [];
        const rawSubs = fsSubs.length > 0 ? fsSubs : fallbackSubs;
        // isActive === false olanları gizle (hardcoded data'da isActive yok = hepsi gösterilir)
        const subs = rawSubs.filter((s) => (s as { isActive?: boolean }).isActive !== false);
        return { cat, subs };
      }
    )
  );

  return (
    <div className="bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-6">
        <BreadcrumbNav
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Hizmetler" },
          ]}
        />
        <h1 className="text-2xl sm:text-4xl font-bold text-[#1C1C1C] mb-2 mt-4">Hizmetlerimiz</h1>
        <p className="text-base font-normal text-[#8A8680] mb-8 sm:mb-12">
          Prefabrik yapılar, hafif çelik sistemler, konteyner çözümleri ve daha fazlası.
        </p>
      </div>

      {displayCategories.map(({ cat, subs }) => (
        <section
          key={cat.slug}
          id={cat.slug}
          className="py-10 sm:py-16 border-t border-[#DDDBD6] first:border-t-0"
        >
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-bold text-[#9D7C64] mb-2">{cat.header}</h2>
            <p className="text-base font-normal text-[#8A8680] mb-8">
              {(cat as { description?: string }).description
                ?? CATEGORIES.find((c) => c.slug === cat.slug)?.description
                ?? ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subs.map((sub) => {
                const imageUrl = (sub as { imageUrl?: string; imagePlaceholder?: string }).imageUrl
                  ?? (sub as { imagePlaceholder?: string }).imagePlaceholder
                  ?? "";
                return (
                  <ServiceCard
                    key={sub.slug}
                    slug={sub.slug}
                    categorySlug={sub.categorySlug}
                    label={sub.label}
                    description={(sub as { shortDescription?: string }).shortDescription || sub.description}
                    imagePlaceholder={imageUrl}
                    variant="listing"
                    isFoldable={FOLDABLE_SLUGS.includes(sub.slug as typeof FOLDABLE_SLUGS[number])}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
