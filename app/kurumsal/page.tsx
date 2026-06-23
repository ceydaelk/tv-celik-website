import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { getCompanyData } from "@/lib/firestore/company";
import ScrollReveal from "@/components/common/ScrollReveal";

export const metadata: Metadata = {
  title: "Kurumsal — TV Çelik A.Ş.",
  description: "TV Çelik A.Ş. hakkında kurumsal bilgiler, misyon ve vizyonumuz.",
  alternates: { canonical: "/kurumsal" },
};

export default async function KurumsalPage() {
  // Firestore'dan veri oku — hata veya boş gelirse fallback değerler kullanılır
  const company = await getCompanyData();

  const about1  = company.about1  ?? "TV Çelik A.Ş. olarak, 30 yılı aşkın deneyimimizle; prefabrik yapılar, konteyner sistemleri, hafif çelik yapılar, hangarlar ve hayvan barınakları üretiminde sektörün güvenilir çözüm ortaklarından biri olmanın gururunu yaşıyoruz.";
  const about2  = company.about2  ?? "Üretimden montaja, demontajdan yeniden kuruluma ve anahtar teslim projelere kadar tüm süreçleri titizlikle yöneterek, milyonlarca insan için güvenli ve sürdürülebilir yaşam alanları oluşturduk.";
  const about3  = company.about3  ?? "Çevreye, canlılara ve insana duyarlı yaklaşımımızla; dayanıklı, fonksiyonel ve modern yapılar üretmeye, yaşam alanlarını yeniden tanımlamaya devam ediyoruz.";
  const mission = company.mission ?? "Kaliteli, dayanıklı ve hızlı uygulanabilir hafif çelik, prefabrik ve modüler yapı çözümleri üreterek; müşterilerimize güvenli, ekonomik ve uzun ömürlü yaşam ve çalışma alanları sunmak.";
  const vision  = company.vision  ?? "Hafif çelik ve modüler yapı sistemlerinde yenilikçi üretim anlayışıyla Türkiye’de ve dünyada güvenilir, güçlü ve tercih edilen bir marka olmak.";
  const whatsapp = company.whatsapp ?? "905467343030";

  return (
    <div className="bg-[#FAFAF9]">
      {/* Page header */}
      <div className="bg-[#1C1C1C] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-normal text-[#9D7C64] uppercase tracking-widest mb-3">
            Hakkımızda
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1] max-w-2xl">
            Kurumsal
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 sm:py-16">
        <div className="space-y-12">

          <ScrollReveal>
            <div>
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-4">Hakkımızda</h2>
              <div className="space-y-4">
                <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{about1}</p>
                <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{about2}</p>
                <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{about3}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-4">Misyonumuz</h2>
              <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{mission}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-4">Vizyonumuz</h2>
              <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{vision}</p>
            </div>
          </ScrollReveal>

        </div>

        {/* CTA */}
        <ScrollReveal delay={0.05}>
          <div className="mt-10 sm:mt-16 bg-[#1C1C1C] rounded-lg p-5 sm:p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">Bizimle Çalışmak İster misiniz?</h2>
            <p className="text-base font-normal text-white/75 mb-6">
              Projenizi konuşmak için WhatsApp&apos;tan bize yazın.
            </p>
            <a
              href={`https://wa.me/${whatsapp}?text=Merhaba%2C%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white transition-colors duration-150 hover:bg-[#1da851] active:scale-95 focus:outline-2 focus:outline-white"
            >
              <MessageCircle size={18} />
              WhatsApp&apos;tan Yazın
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
