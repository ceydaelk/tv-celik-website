import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustSignalsBar from "@/components/home/TrustSignalsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProcessSection from "@/components/home/ProcessSection";
import WhatsAppCTASection from "@/components/home/WhatsAppCTASection";
import { getHomeContent } from "@/lib/firestore/home";
import { getCompanyData } from "@/lib/firestore/company";

export const metadata: Metadata = {
  title: "TV Çelik A.Ş. — Prefabrik ve Çelik Yapı Sistemleri",
  description: "Türkiye'nin önde gelen prefabrik, hafif çelik ve konteyner yapı üreticisi.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [data, company] = await Promise.all([getHomeContent(), getCompanyData()]);
  // company.whatsapp is the single source of truth for WhatsApp across the site
  const whatsappNumber = (company.whatsapp as string | undefined) ?? "905467343030";

  return (
    <>
      <HeroSection
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        imageUrl="/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (10).jpeg"
        whatsappNumber={whatsappNumber}
        whatsappText={data.heroWhatsappText}
        secondaryText={data.heroSecondaryText}
      />
      <TrustSignalsBar
        stats={data.stats}
      />
      <ServicesGrid />
      <ProcessSection
        title={data.processTitle}
        subtitle={data.processSubtitle}
        steps={data.processSteps}
      />
      <WhatsAppCTASection
        title={data.ctaTitle}
        description={data.ctaDescription}
        responseNote={data.ctaResponseNote}
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}
