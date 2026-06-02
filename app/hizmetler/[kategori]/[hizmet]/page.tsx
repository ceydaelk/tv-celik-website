import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CATEGORIES, SERVICES_MAP, CATEGORY_FEATURES, GENERIC_FEATURES } from "@/data/services";
import { CATEGORY_USE_CASES, GENERIC_USE_CASES } from "@/data/serviceUseCases";
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

const PROCESS_STEPS = [
  { n: "01", title: "Keşif",         desc: "Saha ziyareti, ihtiyaç analizi ve teknik değerlendirme." },
  { n: "02", title: "Projelendirme", desc: "Ölçüm ve gereksinimlere dayalı proje dosyasının hazırlanması." },
  { n: "03", title: "Üretim",        desc: "Çelik yapı elemanlarının ISO standartlarında üretimi." },
  { n: "04", title: "Montaj",        desc: "Uzman ekip tarafından güvenli ve denetimli kurulum." },
  { n: "05", title: "Teslim",        desc: "Müşteri kabulü, son kontroller ve anahtar teslim devir." },
] as const;

// Slight vertical stagger per step — breaks identical-column symmetry
const STEP_PT = [20, 30, 22, 36, 26];

export function generateStaticParams() {
  return CATEGORIES.flatMap((cat) =>
    cat.subcategories.map((sub) => ({ kategori: cat.slug, hizmet: sub.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string; hizmet: string }>;
}): Promise<Metadata> {
  const { hizmet } = await params;
  const fsSub   = await getSubcategoryBySlug(hizmet);
  const service = fsSub ?? SERVICES_MAP[hizmet];
  return {
    title:       fsSub?.seoTitle       || (service ? `${service.label} — TV Çelik A.Ş.` : "Hizmet — TV Çelik A.Ş."),
    description: fsSub?.seoDescription || service?.description,
  };
}

export default async function HizmetDetayPage({
  params,
}: {
  params: Promise<{ kategori: string; hizmet: string }>;
}) {
  const { kategori, hizmet } = await params;

  const [fsSub, company] = await Promise.all([
    getSubcategoryBySlug(hizmet),
    getCompanyData(),
  ]);
  const hcSvc = SERVICES_MAP[hizmet]?.categorySlug === kategori ? SERVICES_MAP[hizmet] : null;
  if (!fsSub && !hcSvc) notFound();

  const whatsappPhone = company.whatsapp ?? "90XXXXXXXXXX";

  const category   = CATEGORIES.find((c) => c.slug === kategori) ?? { header: kategori, slug: kategori, subcategories: [], description: "" };
  const isFoldable = FOLDABLE_SLUGS.includes(hizmet as typeof FOLDABLE_SLUGS[number]);

  const merged = mergeSubcategory(fsSub ?? null, {
    label:          hcSvc?.label       ?? fsSub?.label       ?? hizmet,
    description:    hcSvc?.description ?? fsSub?.description ?? "",
    categorySlug:   kategori,
    categoryHeader: category.header,
    order:          0,
    features:       CATEGORY_FEATURES[kategori] ?? GENERIC_FEATURES,
  });

  const local = getLocalServiceImages(hizmet);

  // Plan ve Teknik Detaylar — only URLs whose filename contains "plan"
  const planSections = local.plans
    .filter((url) => url.toLowerCase().includes("plan"))
    .map((url, i) => ({ id: `plan-${i}`, title: "", text: "", imageUrl: url }));

  // Gallery — local images only when present; no Unsplash/Firestore contamination.
  // Local images are the authoritative source. Firestore gallery is skipped entirely
  // when local images exist to prevent wrong/plan images leaking into the gallery.
  const seen = new Set<string>();
  const galleryImages: GalleryImage[] = [];

  function addImage(url: string, caption: string) {
    if (!url || seen.has(url)) return;
    seen.add(url);
    galleryImages.push({ url, caption });
  }

  if (local.gallery.length > 0) {
    // Local images: first entry is hero, rest are thumbnails
    addImage(local.gallery[0], merged.pageTitle);
    for (const url of local.gallery.slice(1)) addImage(url, "");
  } else {
    // No local images: use Firestore gallery only (no Unsplash fallback)
    for (const g of merged.gallery) addImage(g.url ?? "", g.caption ?? "");
  }

  // Firestore text sections — all of them, image fields are NOT rendered here
  const textSections = merged.sections.filter((s) => s.title || s.text);

  const useCases    = CATEGORY_USE_CASES[kategori] ?? GENERIC_USE_CASES;
  const whatsappMsg = merged.ctaWhatsappText || `Merhaba, ${merged.label} hakkında bilgi almak istiyorum.`;

  return (
    <div className="bg-white">

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className="bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-12">
          <BreadcrumbNav
            items={[
              { label: "Ana Sayfa",      href: "/" },
              { label: "Hizmetler",      href: "/hizmetler" },
              { label: category.header,  href: `/hizmetler/${kategori}` },
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

      {/* ── MAIN BODY: 2-column product layout ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10 pb-16">
        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-10 xl:gap-14 items-start">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="space-y-10">

            {/* Gallery */}
            <ServiceGallery images={galleryImages} />

            {/* Description */}
            <div>
              <p className={LABEL}>Hizmet Hakkında</p>
              <div className="mt-4 space-y-4">
                {merged.description.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i} className="text-[15px] leading-[1.75] text-[#2A2A2A]">{para}</p>
                ))}
              </div>
            </div>

            {/* Use cases */}
            <div>
              <p className={LABEL}>Nerelerde Kullanılır?</p>
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

            {/* Plan / technical drawings — shown only when sections have images */}
            {planSections.length > 0 && (
              <div>
                <p className={LABEL}>Plan ve Teknik Detaylar</p>
                <div className="mt-4">
                  <PlanSection sections={planSections} />
                </div>
              </div>
            )}

            {/* Text-only sections */}
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

          {/* ── RIGHT COLUMN — sticky sidebar ───────────────────────────── */}
          <div className="lg:sticky lg:top-8 self-start space-y-7">

            {/* Avantajlar */}
            <div>
              <p className={LABEL}>Avantajlar</p>
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

            {/* Separator */}
            <div className="border-t border-[#EAEAE6]" />

            {/* WhatsApp CTA — compact, left-accent, no rounded SaaS card */}
            <div className="border-l-2 border-[#9D7C64] pl-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9D7C64] mb-1.5">
                Teklif Alın
              </p>
              <p className="text-[13px] text-[#555555] mb-4 leading-relaxed">
                Bu hizmet hakkında uzmanlarımıza doğrudan yazın.
              </p>
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-[13px] font-bold text-white bg-[#25D366] hover:bg-[#1da851] transition-colors"
              >
                <MessageCircle size={13} />
                WhatsApp&apos;tan Yazın
              </a>
              <Link
                href={`/hizmetler/${kategori}`}
                className="block mt-2.5 text-center text-[11px] text-[#8A8680] hover:text-[#1C1C1C] transition-colors"
              >
                ← {category.header}
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── SÜREÇ — full-width, below grid ──────────────────────────────── */}
      <section className="border-t border-[#EAEAE6] bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9D7C64] mb-2">
            Çalışma Sürecimiz
          </p>
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-10">Üretimden Teslime</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-0">
            {PROCESS_STEPS.map((step, i) => (
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

      {/* ── RELATED ─────────────────────────────────────────────────────── */}
      <RelatedServices currentSlug={hizmet} categorySlug={kategori} />

    </div>
  );
}

const LABEL = "text-[9px] font-bold uppercase tracking-[0.3em] text-[#9D7C64]";
