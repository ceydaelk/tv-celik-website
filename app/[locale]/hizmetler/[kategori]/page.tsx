import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/data/services";
import { getSubcategories } from "@/lib/firestore/services";
import ServiceCard from "@/components/home/ServiceCard";
import BreadcrumbNav from "@/components/common/BreadcrumbNav";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tvcelik.com";
const FOLDABLE_SLUGS = ["katlanir-tasinabilir", "katlanir-konteyner"] as const;

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ kategori: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; kategori: string }>;
}): Promise<Metadata> {
  const { locale, kategori } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const isTr = locale === "tr";

  const cat = CATEGORIES.find((c) => c.slug === kategori);
  const catHeader = cat ? t(`categories.${kategori}.header`, { fallback: cat.header }) : kategori;

  return {
    title: `${catHeader} — TV Çelik A.Ş.`,
    description: cat
      ? `TV Çelik ${catHeader}: ${cat.subcategories.map((s) => t(`categories.${kategori}.subcategories.${s.slug}`, { fallback: s.label })).join(", ")}.`
      : `${catHeader} — TV Çelik A.Ş.`,
    alternates: {
      canonical: isTr ? `/hizmetler/${kategori}` : `/en/hizmetler/${kategori}`,
      languages: {
        tr: `${siteUrl}/hizmetler/${kategori}`,
        en: `${siteUrl}/en/hizmetler/${kategori}`,
      },
    },
  };
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ locale: string; kategori: string }>;
}) {
  const { locale, kategori } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const hardcodedCat = CATEGORIES.find((c) => c.slug === kategori);
  const firestoreSubs = await getSubcategories(kategori);
  const rawSubs = firestoreSubs.length > 0
    ? firestoreSubs
    : (hardcodedCat?.subcategories ?? []);
  const subs = rawSubs.filter((s) => (s as { isActive?: boolean }).isActive !== false);

  if (subs.length === 0 && !hardcodedCat) notFound();

  const categoryHeader = hardcodedCat
    ? t(`categories.${kategori}.header`, { fallback: hardcodedCat.header })
    : kategori;
  const categoryDesc = hardcodedCat
    ? t(`categories.${kategori}.description`, { fallback: hardcodedCat.description })
    : "";

  return (
    <div className="bg-[#FAFAF9]">
      <div className="bg-[#1C1C1C] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <BreadcrumbNav
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbServices"), href: "/hizmetler" },
              { label: categoryHeader },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mt-4">
            {categoryHeader}
          </h1>
          <p className="mt-3 text-base font-normal text-white/60 max-w-xl">{categoryDesc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subs.map((sub) => {
            const imageUrl = (sub as { imageUrl?: string; imagePlaceholder?: string }).imageUrl
              ?? (sub as { imagePlaceholder?: string }).imagePlaceholder ?? "";
            const subLabel = t(`categories.${kategori}.subcategories.${sub.slug}`, { fallback: sub.label });
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

        <div className="mt-12 pt-8 border-t border-[#DDDBD6]">
          <Link href="/hizmetler" className="text-sm font-bold text-[#9D7C64] transition-colors hover:text-[#866A56]">
            {t("backToServices")}
          </Link>
        </div>
      </div>
    </div>
  );
}
