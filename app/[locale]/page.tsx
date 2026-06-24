import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import TrustSignalsBar from "@/components/home/TrustSignalsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProcessSection from "@/components/home/ProcessSection";
import WhatsAppCTASection from "@/components/home/WhatsAppCTASection";
import { getHomeContent } from "@/lib/firestore/home";
import { getCompanyData } from "@/lib/firestore/company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tvcelik.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr
      ? "TV Çelik A.Ş. — Prefabrik ve Çelik Yapı Sistemleri"
      : "TV Çelik A.Ş. — Prefabricated & Steel Building Systems",
    description: isTr
      ? "Türkiye'nin önde gelen prefabrik, hafif çelik ve konteyner yapı üreticisi."
      : "Turkey's leading manufacturer of prefabricated, light steel and container buildings.",
    alternates: {
      canonical: isTr ? "/" : "/en",
      languages: {
        tr: `${siteUrl}/`,
        en: `${siteUrl}/en`,
      },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const isTr = locale === "tr";

  const [data, company] = await Promise.all([getHomeContent(), getCompanyData()]);
  const whatsappNumber = (company.whatsapp as string | undefined) ?? "905467343030";

  // For English use translation defaults; for Turkish use Firestore content with TR fallback
  const heroEyebrow   = isTr ? (data.heroEyebrow   || t("eyebrow"))   : t("eyebrow");
  const heroTitle     = isTr ? (data.heroTitle      || t("title"))     : t("title");
  const heroSubtitle  = isTr ? (data.heroSubtitle   || t("subtitle"))  : t("subtitle");
  const whatsappText  = isTr ? (data.heroWhatsappText  || t("whatsappText"))  : t("whatsappText");
  const secondaryText = isTr ? (data.heroSecondaryText || t("secondaryText")) : t("secondaryText");
  const processTitle  = isTr ? (data.processTitle   || t("processTitle"))  : t("processTitle");
  const processSub    = isTr ? (data.processSubtitle || t("processSubtitle")) : t("processSubtitle");
  const ctaTitle      = isTr ? (data.ctaTitle        || t("ctaTitle"))       : t("ctaTitle");
  const ctaDesc       = isTr ? (data.ctaDescription  || t("ctaDescription")) : t("ctaDescription");
  const ctaNote       = isTr ? (data.ctaResponseNote || t("ctaResponseNote")) : t("ctaResponseNote");
  const stats         = isTr && data.stats?.length ? data.stats : undefined;

  return (
    <>
      <HeroSection
        eyebrow={heroEyebrow}
        title={heroTitle}
        subtitle={heroSubtitle}
        imageUrl="/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (10).jpeg"
        whatsappNumber={whatsappNumber}
        whatsappText={whatsappText}
        secondaryText={secondaryText}
      />
      <TrustSignalsBar stats={stats} />
      <ServicesGrid />
      <ProcessSection
        title={processTitle}
        subtitle={processSub}
        steps={isTr && data.processSteps?.length ? data.processSteps : undefined}
      />
      <WhatsAppCTASection
        title={ctaTitle}
        description={ctaDesc}
        responseNote={ctaNote}
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}
