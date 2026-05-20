import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustSignalsBar from "@/components/home/TrustSignalsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProcessSection from "@/components/home/ProcessSection";
import WhatsAppCTASection from "@/components/home/WhatsAppCTASection";
import { getHomeContent } from "@/lib/firestore/home";

export const metadata: Metadata = {
  title: "TV Çelik A.Ş. — Prefabrik ve Çelik Yapı Sistemleri",
  description: "Türkiye'nin önde gelen prefabrik, hafif çelik ve konteyner yapı üreticisi.",
};

export default async function Home() {
  // Firestore'dan veri oku — boş gelirse her bileşen kendi fallback değerini kullanır
  const data = await getHomeContent();

  return (
    <>
      <HeroSection
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        imageUrl={data.heroImageUrl}
        whatsappNumber={data.whatsappNumber}
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
        whatsappNumber={data.whatsappNumber}
      />
    </>
  );
}
