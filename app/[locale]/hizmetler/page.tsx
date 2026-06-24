import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CATEGORIES } from "@/data/services";
import { getCategories, getSubcategories } from "@/lib/firestore/services";
import ServiceCard from "@/components/home/ServiceCard";
import BreadcrumbNav from "@/components/common/BreadcrumbNav";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tvcelik.com";

const FOLDABLE_SLUGS = ["katlanir-tasinabilir", "katlanir-konteyner"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Hizmetlerimiz — TV Çelik A.Ş." : "Our Services — TV Çelik A.Ş.",
    description: isTr
      ? "Prefabrik yapılar, hafif çelik sistemler, konteyner çözümleri ve daha fazlası."
      : "Prefabricated buildings, light steel systems, container solutions and more.",
    alternates: {
      canonical: isTr ? "/hizmetler" : "/en/hizmetler",
      languages: {
        tr: `${siteUrl}/hizmetler`,
        en: `${siteUrl}/en/hizmetler`,
      },
    },
  };
}

export default async function HizmetlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const firestoreCats = await getCategories();
  const useFirestore  = firestoreCats.length > 0;

  const displayCategories = await Promise.all(
    (useFirestore ? firestoreCats : CATEGORIES.map((c) => ({ id: c.slug, header: c.header, slug: c.slug, order: 0 }))).map(
      async (cat) => {
        const fsSubs = useFirestore ? await getSubcategories(cat.slug) : [];
        const fallbackSubs = CATEGORIES.find((c) => c.slug === cat.slug)?.subcategories ?? [];
        const rawSubs = fsSubs.length > 0 ? fsSubs : fallbackSubs;
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
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbServices") },
          ]}
        />
        <h1 className="text-2xl sm:text-4xl font-bold text-[#1C1C1C] mb-2 mt-4">{t("title")}</h1>
        <p className="text-base font-normal text-[#8A8680] mb-8 sm:mb-12">{t("subtitle")}</p>
      </div>

      {displayCategories.map(({ cat, subs }) => {
        const catHeader = t(`categories.${cat.slug}.header`, { fallback: cat.header });
        const catDesc   = t(`categories.${cat.slug}.description`, {
          fallback: (cat as { description?: string }).description
            ?? CATEGORIES.find((c) => c.slug === cat.slug)?.description ?? "",
        });

        return (
          <section
            key={cat.slug}
            id={cat.slug}
            className="py-10 sm:py-16 border-t border-[#DDDBD6] first:border-t-0"
          >
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-xl font-bold text-[#9D7C64] mb-2">{catHeader}</h2>
              <p className="text-base font-normal text-[#8A8680] mb-8">{catDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subs.map((sub) => {
                  const imageUrl = (sub as { imageUrl?: string; imagePlaceholder?: string }).imageUrl
                    ?? (sub as { imagePlaceholder?: string }).imagePlaceholder ?? "";
                  const subLabel = t(`categories.${cat.slug}.subcategories.${sub.slug}`, { fallback: sub.label });
                  return (
                    <ServiceCard
                      key={sub.slug}
                      slug={sub.slug}
                      categorySlug={sub.categorySlug}
                      label={subLabel}
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
        );
      })}
    </div>
  );
}
