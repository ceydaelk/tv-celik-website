import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";
import { getCompanyData } from "@/lib/firestore/company";
import ScrollReveal from "@/components/common/ScrollReveal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tvcelik.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Kurumsal — TV Çelik A.Ş." : "Corporate — TV Çelik A.Ş.",
    description: isTr
      ? "TV Çelik A.Ş. hakkında kurumsal bilgiler, misyon ve vizyonumuz."
      : "About TV Çelik A.Ş. — corporate information, our mission and vision.",
    alternates: {
      canonical: isTr ? "/kurumsal" : "/en/kurumsal",
      languages: {
        tr: `${siteUrl}/kurumsal`,
        en: `${siteUrl}/en/kurumsal`,
      },
    },
  };
}

export default async function KurumsalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "corporate" });
  const isTr = locale === "tr";

  const company = await getCompanyData();
  const whatsapp = company.whatsapp ?? "905467343030";

  const about1  = isTr ? (company.about1  ?? t("about1"))  : t("about1");
  const about2  = isTr ? (company.about2  ?? t("about2"))  : t("about2");
  const about3  = isTr ? (company.about3  ?? t("about3"))  : t("about3");
  const mission = isTr ? (company.mission ?? t("mission")) : t("mission");
  const vision  = isTr ? (company.vision  ?? t("vision"))  : t("vision");

  return (
    <div className="bg-[#FAFAF9]">
      <div className="bg-[#1C1C1C] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-normal text-[#9D7C64] uppercase tracking-widest mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1] max-w-2xl">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 sm:py-16">
        <div className="space-y-12">

          <ScrollReveal>
            <div>
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-4">{t("aboutTitle")}</h2>
              <div className="space-y-4">
                <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{about1}</p>
                <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{about2}</p>
                <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{about3}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-4">{t("missionTitle")}</h2>
              <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{mission}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-4">{t("visionTitle")}</h2>
              <p className="text-base font-normal text-[#1C1C1C] leading-relaxed">{vision}</p>
            </div>
          </ScrollReveal>

        </div>

        <ScrollReveal delay={0.05}>
          <div className="mt-10 sm:mt-16 bg-[#1C1C1C] rounded-lg p-5 sm:p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
            <p className="text-base font-normal text-white/75 mb-6">{t("ctaDesc")}</p>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                isTr ? "Merhaba, bilgi almak istiyorum." : "Hello, I would like to get information."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white transition-colors duration-150 hover:bg-[#1da851] active:scale-95 focus:outline-2 focus:outline-white"
            >
              <MessageCircle size={18} />
              {t("whatsapp")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
