import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CATEGORIES, SERVICES_MAP, CATEGORY_FEATURES, GENERIC_FEATURES } from "@/data/services";
import { CATEGORY_USE_CASES, GENERIC_USE_CASES, type UseCases } from "@/data/serviceUseCases";
import { getSubcategoryBySlug } from "@/lib/firestore/services";
import { mergeSubcategory } from "@/lib/content/mergeSubcategory";
import { getCompanyData } from "@/lib/firestore/company";
import { getLocalServiceImages } from "@/lib/localServiceImages";
import BreadcrumbNav from "@/components/common/BreadcrumbNav";
import FoldableBadge from "@/components/common/FoldableBadge";
import ServiceGallery, { type GalleryImage } from "@/components/services/ServiceGallery";
import PlanSection from "@/components/services/PlanSection";
import RelatedServices from "@/components/services/RelatedServices";

export const revalidate = 0;

const FOLDABLE_SLUGS = ["katlanir-tasinabilir", "katlanir-konteyner"] as const;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tvcelik.com";

export function generateStaticParams() {
  return CATEGORIES.flatMap((cat) =>
    cat.subcategories.map((sub) => ({ kategori: cat.slug, hizmet: sub.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; kategori: string; hizmet: string }>;
}): Promise<Metadata> {
  const { locale, kategori, hizmet } = await params;
  const isTr = locale === "tr";
  const ts = await getTranslations({ locale, namespace: "services" });
  const fsSub   = await getSubcategoryBySlug(hizmet);
  const service = fsSub ?? SERVICES_MAP[hizmet];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tsAny = ts as any;
  const translatedLabel = tsAny(`categories.${kategori}.subcategories.${hizmet}`) as string
    ?? service?.label
    ?? hizmet;

  let translatedDescription: string = service?.description ?? "";
  try {
    const descs = tsAny.raw(`categories.${kategori}.subcategoryDescriptions`) as Record<string, string> | undefined;
    if (descs?.[hizmet]) translatedDescription = descs[hizmet];
  } catch { /* use fallback */ }

  return {
    title:       fsSub?.seoTitle       || `${translatedLabel} — TV Çelik A.Ş.`,
    description: fsSub?.seoDescription || translatedDescription,
    alternates: {
      canonical: isTr ? `/hizmetler/${kategori}/${hizmet}` : `/en/hizmetler/${kategori}/${hizmet}`,
      languages: {
        tr: `${siteUrl}/hizmetler/${kategori}/${hizmet}`,
        en: `${siteUrl}/en/hizmetler/${kategori}/${hizmet}`,
      },
    },
  };
}

export default async function HizmetDetayPage({
  params,
}: {
  params: Promise<{ locale: string; kategori: string; hizmet: string }>;
}) {
  const { locale, kategori, hizmet } = await params;
  const t = await getTranslations({ locale, namespace: "serviceDetail" });
  const ts = await getTranslations({ locale, namespace: "services" });

  const [fsSub, company] = await Promise.all([
    getSubcategoryBySlug(hizmet),
    getCompanyData(),
  ]);
  const hcSvc = SERVICES_MAP[hizmet]?.categorySlug === kategori ? SERVICES_MAP[hizmet] : null;
  if (!fsSub && !hcSvc) notFound();

  const whatsappPhone = company.whatsapp ?? "905467343030";

  const category   = CATEGORIES.find((c) => c.slug === kategori) ?? { header: kategori, slug: kategori, subcategories: [], description: "" };
  const isFoldable = FOLDABLE_SLUGS.includes(hizmet as typeof FOLDABLE_SLUGS[number]);

  // Resolve locale-aware category header before building merged
  const categoryHeader = ts(`categories.${kategori}.header`, { fallback: category.header }) as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tsAny = ts as any;

  // Translated subcategory label (e.g. "Single Storey" in EN)
  const translatedLabel: string = tsAny(`categories.${kategori}.subcategories.${hizmet}`)
    ?? hcSvc?.label
    ?? fsSub?.label
    ?? hizmet;

  // Translated subcategory description
  let translatedDescription: string = hcSvc?.description ?? fsSub?.description ?? "";
  try {
    const descs = tsAny.raw(`categories.${kategori}.subcategoryDescriptions`) as Record<string, string> | undefined;
    if (descs?.[hizmet]) translatedDescription = descs[hizmet];
  } catch { /* use hardcoded fallback */ }

  // Translated features / advantages
  let translatedFeatures: string[] = CATEGORY_FEATURES[kategori] ?? GENERIC_FEATURES;
  try {
    const feats = tsAny.raw(`categories.${kategori}.features`);
    if (Array.isArray(feats) && feats.length > 0) translatedFeatures = feats as string[];
  } catch { /* use hardcoded fallback */ }

  // Translated use cases
  let useCases: UseCases = CATEGORY_USE_CASES[kategori] ?? GENERIC_USE_CASES;
  try {
    const uc = tsAny.raw(`categories.${kategori}.useCases`) as UseCases | undefined;
    if (uc?.group1 && uc?.group2) useCases = uc;
  } catch { /* use hardcoded fallback */ }

  const merged = mergeSubcategory(fsSub ?? null, {
    label:          translatedLabel,
    description:    translatedDescription,
    categorySlug:   kategori,
    categoryHeader: categoryHeader,
    order:          0,
    features:       translatedFeatures,
  });

  const local = getLocalServiceImages(hizmet);

  const planSections = local.plans
    .filter((url) => url.toLowerCase().includes("plan"))
    .map((url, i) => ({ id: `plan-${i}`, title: "", text: "", imageUrl: url }));

  const seen = new Set<string>();
  const galleryImages: GalleryImage[] = [];

  function addImage(url: string, caption: string) {
    if (!url || seen.has(url)) return;
    seen.add(url);
    galleryImages.push({ url, caption });
  }

  if (local.gallery.length > 0) {
    addImage(local.gallery[0], merged.pageTitle);
    for (const url of local.gallery.slice(1)) addImage(url, "");
  } else {
    for (const g of merged.gallery) addImage(g.url ?? "", g.caption ?? "");
  }

  const textSections = merged.sections.filter((s) => s.title || s.text);
  const defaultWaMsg = t("whatsappDefaultMsg", { service: merged.label });
  const whatsappMsg  = merged.ctaWhatsappText || (locale === "tr"
    ? `Merhaba, ${merged.label} hakkında bilgi almak istiyorum.`
    : defaultWaMsg);

  const processSteps = [
    { n: "01", title: t("processStep01Title"), desc: t("processStep01Desc") },
    { n: "02", title: t("processStep02Title"), desc: t("processStep02Desc") },
    { n: "03", title: t("processStep03Title"), desc: t("processStep03Desc") },
    { n: "04", title: t("processStep04Title"), desc: t("processStep04Desc") },
    { n: "05", title: t("processStep05Title"), desc: t("processStep05Desc") },
  ] as const;

  const STEP_PT = [20, 30, 22, 36, 26];

  return (
    <div className="bg-white">

      <header className="bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-12">
          <BreadcrumbNav
            items={[
              { label: ts("breadcrumbHome"),     href: "/" },
              { label: ts("breadcrumbServices"), href: "/hizmetler" },
              { label: categoryHeader,           href: `/hizmetler/${kategori}` },
              { label: merged.label },
            ]}
          />
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9D7C64]">
              {merged.badge}
            </span>
            {isFoldable && <FoldableBadge />}
          </div>
          <h1 className="mt-2.5 text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-white max-w-3xl">
            {merged.pageTitle}
          </h1>
          {(merged.shortDescription || merged.subtitle) && (
            <p className="mt-4 text-[15px] leading-relaxed text-white/50 max-w-2xl">
              {merged.shortDescription || merged.subtitle}
            </p>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 pb-16">
        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-10 xl:gap-14 items-start">

          <div className="space-y-10">
            <ServiceGallery images={galleryImages} />

            <div>
              <p className={LABEL}>{t("about")}</p>
              <div className="mt-4 space-y-4">
                {merged.description.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i} className="text-[15px] leading-[1.75] text-[#2A2A2A]">{para}</p>
                ))}
              </div>
            </div>

            <div>
              <p className={LABEL}>{t("useCases")}</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-0">
                {[useCases.group1, useCases.group2].map((group) => (
                  <div key={group.heading}>
                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9D7C64] mb-3">
                      {group.heading}
                    </p>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[13px] text-[#1C1C1C] leading-snug">
                          <span className="text-[#9D7C64] mt-0.5 select-none">–</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {planSections.length > 0 && (
              <div>
                <p className={LABEL}>{t("planDetails")}</p>
                <div className="mt-4">
                  <PlanSection sections={planSections} />
                </div>
              </div>
            )}

            {textSections.length > 0 && (
              <div className="space-y-8">
                {textSections.map((sec) => (
                  <div key={sec.id}>
                    {sec.title && (
                      <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#1C1C1C] mb-3">
                        {sec.title}
                      </h3>
                    )}
                    {sec.text && (
                      <p className="text-[15px] leading-[1.75] text-[#2A2A2A]">{sec.text}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-8 self-start space-y-7">
            <div>
              <p className={LABEL}>{t("advantages")}</p>
              <div className="mt-3">
                {merged.features.map((feat, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-3 py-3">
                      <span className="text-[10px] font-bold tabular-nums text-[#9D7C64] mt-0.5 w-5 text-right flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[13px] leading-snug text-[#1C1C1C]">{feat}</p>
                    </div>
                    {i < merged.features.length - 1 && (
                      <div className="border-t border-[#F0EFEC]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#EAEAE6]" />

            <div className="border-l-2 border-[#9D7C64] pl-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9D7C64] mb-1.5">
                {t("getQuote")}
              </p>
              <p className="text-[13px] text-[#555555] mb-4 leading-relaxed">{t("ctaText")}</p>
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-[13px] font-bold text-white bg-[#25D366] hover:bg-[#1da851] transition-colors"
              >
                <MessageCircle size={13} />
                {t("whatsapp")}
              </a>
              <Link
                href={`/hizmetler/${kategori}`}
                className="block mt-2.5 text-center text-[11px] text-[#8A8680] hover:text-[#1C1C1C] transition-colors"
              >
                ← {categoryHeader}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-[#EAEAE6] bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9D7C64] mb-2">
            {t("processEyebrow")}
          </p>
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-10">{t("processTitle")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-0">
            {processSteps.map((step, i) => (
              <div
                key={step.n}
                className={`border-t-2 border-[#EAEAE6] pr-8 pt-5 lg:[padding-top:${STEP_PT[i]}px]`}
              >
                <p className="text-[40px] font-bold leading-none tabular-nums mb-4"
                   style={{ color: "rgba(157,124,100,0.18)" }}>
                  {step.n}
                </p>
                <h3 className="text-[13px] font-bold text-[#1C1C1C] mb-1.5">{step.title}</h3>
                <p className="text-[12px] leading-relaxed text-[#8A8680]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices currentSlug={hizmet} categorySlug={kategori} />

    </div>
  );
}

const LABEL = "text-[9px] font-bold uppercase tracking-[0.3em] text-[#9D7C64]";
