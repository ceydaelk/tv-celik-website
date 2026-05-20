import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/services";
import { getSubcategories } from "@/lib/firestore/services";
import ServiceCard from "@/components/home/ServiceCard";
import BreadcrumbNav from "@/components/common/BreadcrumbNav";

const FOLDABLE_SLUGS = ["katlanir-tasinabilir", "katlanir-konteyner"] as const;

// generateStaticParams hardcoded veriden çalışır — mevcut 5 kategori her zaman statik derlenir
// Firestore'da yeni eklenecek kategoriler dinamik olarak render edilir (Next.js default)
export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ kategori: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string }>;
}): Promise<Metadata> {
  const { kategori } = await params;
  const cat = CATEGORIES.find((c) => c.slug === kategori);
  if (!cat) return { title: "Hizmetler — TV Çelik A.Ş." };
  return {
    title: `${cat.header} — TV Çelik A.Ş.`,
    description: `TV Çelik ${cat.header} hizmetleri: ${cat.subcategories.map((s) => s.label).join(", ")}.`,
  };
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;

  // Hardcoded fallback
  const hardcodedCat = CATEGORIES.find((c) => c.slug === kategori);

  // Firestore'dan alt hizmetleri oku
  const firestoreSubs = await getSubcategories(kategori);
  const rawSubs = firestoreSubs.length > 0
    ? firestoreSubs
    : (hardcodedCat?.subcategories ?? []);
  // isActive === false olanları gizle
  const subs = rawSubs.filter((s) => (s as { isActive?: boolean }).isActive !== false);

  // Kategori başlığı için hardcoded veriden yararlan (nadiren değişir)
  const categoryHeader = hardcodedCat?.header ?? kategori;

  if (subs.length === 0 && !hardcodedCat) notFound();

  return (
    <div className="bg-[#FAFAF9]">
      {/* Page header */}
      <div className="bg-[#1C1C1C] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <BreadcrumbNav
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Hizmetler", href: "/hizmetler" },
              { label: categoryHeader },
            ]}
          />
          <h1 className="text-4xl font-bold text-white leading-tight mt-4">
            {categoryHeader}
          </h1>
          <p className="mt-3 text-base font-normal text-white/60 max-w-xl">
            {hardcodedCat?.description ?? ""}
          </p>
        </div>
      </div>

      {/* Subcategory cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

        <div className="mt-12 pt-8 border-t border-[#DDDBD6]">
          <a href="/hizmetler" className="text-sm font-bold text-[#9D7C64] transition-colors hover:text-[#866A56]">
            ← Tüm hizmetlere dön
          </a>
        </div>
      </div>
    </div>
  );
}
