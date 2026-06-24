import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
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
    title: isTr ? "İletişim — TV Çelik A.Ş." : "Contact — TV Çelik A.Ş.",
    description: isTr
      ? "TV Çelik A.Ş. ile iletişime geçin. WhatsApp, telefon veya e-posta yoluyla ulaşabilirsiniz."
      : "Contact TV Çelik A.Ş. via WhatsApp, phone or email.",
    alternates: {
      canonical: isTr ? "/iletisim" : "/en/iletisim",
      languages: {
        tr: `${siteUrl}/iletisim`,
        en: `${siteUrl}/en/iletisim`,
      },
    },
  };
}

export default async function IletisimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const isTr = locale === "tr";

  const company = await getCompanyData();
  const phone    = company.phone    ?? "+90 546 734 30 30";
  const email    = company.email    ?? "info@tvcelik.com";
  const whatsapp = company.whatsapp ?? "905467343030";

  const merkez   = company.addresses?.find((a) => a.type === "Merkez")?.text
    ?? "Güzelyalı Mh. Muştu Sk Kılıçlar Apt: NO:6/1 Pendik / İstanbul";
  const showroom = company.addresses?.find((a) => a.type === "Showroom")?.text
    ?? "Kargalı Hanbaba Mh. Sakarya Cd. No:336/A Hendek / Sakarya";
  const fabrika  = company.addresses?.find((a) => a.type === "Fabrika")?.text
    ?? "Akova Mh. 5038 Sk. No:14 Hendek / Sakarya";

  const waMsg = isTr ? "Merhaba%2C%20bilgi%20almak%20istiyorum." : "Hello%2C%20I%20would%20like%20to%20get%20information.";

  return (
    <div className="bg-[#FAFAF9]">
      <div className="bg-[#1C1C1C] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-normal text-[#9D7C64] uppercase tracking-widest mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1]">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 sm:py-16">

        <ScrollReveal>
          <div className="bg-[#1C1C1C] rounded-lg p-5 sm:p-8 text-center mb-8 sm:mb-12">
            <h2 className="text-xl font-bold text-white mb-3">{t("whatsappTitle")}</h2>
            <p className="text-base font-normal text-white/75 mb-6 max-w-md mx-auto">
              {t("whatsappDesc")}
            </p>
            <a
              href={`https://wa.me/${whatsapp}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 sm:px-8 sm:py-4 text-base font-bold text-white transition-colors duration-150 hover:bg-[#1da851] active:scale-95 focus:outline-2 focus:outline-white"
            >
              <MessageCircle size={20} />
              {t("whatsappBtn")}
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="border border-[#DDDBD6] rounded-lg divide-y divide-[#DDDBD6]">
            <div className="flex items-start gap-4 p-6">
              <Phone size={20} className="text-[#9D7C64] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#1C1C1C] mb-1">{t("phoneLabel")}</p>
                <p className="text-base font-normal text-[#8A8680]">{phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <Mail size={20} className="text-[#9D7C64] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#1C1C1C] mb-1">{t("emailLabel")}</p>
                <a
                  href={`mailto:${email}`}
                  className="text-base font-normal text-[#8A8680] hover:text-[#9D7C64] transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <MapPin size={20} className="text-[#9D7C64] mt-0.5 flex-shrink-0" />
              <div className="space-y-3">
                <p className="text-sm font-bold text-[#1C1C1C] mb-1">{t("addressLabel")}</p>
                <div>
                  <p className="text-sm font-bold text-[#1C1C1C] mb-0.5">{t("addressMerkez")}</p>
                  <p className="text-base font-normal text-[#8A8680]">{merkez}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C1C1C] mb-0.5">{t("addressShowroom")}</p>
                  <p className="text-base font-normal text-[#8A8680]">{showroom}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C1C1C] mb-0.5">{t("addressFabrika")}</p>
                  <p className="text-base font-normal text-[#8A8680]">{fabrika}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
