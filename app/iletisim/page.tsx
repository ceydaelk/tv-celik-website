import type { Metadata } from "next";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { getCompanyData } from "@/lib/firestore/company";

export const metadata: Metadata = {
  title: "İletişim — TV Çelik A.Ş.",
  description: "TV Çelik A.Ş. ile iletişime geçin. WhatsApp, telefon veya e-posta yoluyla ulaşabilirsiniz.",
};

export default async function IletisimPage() {
  const company = await getCompanyData();

  const phone    = company.phone    ?? "+90 XXX XXX XX XX";
  const email    = company.email    ?? "info@tvcelik.com";
  const whatsapp = company.whatsapp ?? "905078363661";

  const merkez   = company.addresses?.find((a) => a.type === "Merkez")?.text
    ?? "Güzelyalı Mh. Muştu Sk Kılıçlar Apt: NO:6/1 Pendik / İstanbul";
  const showroom = company.addresses?.find((a) => a.type === "Showroom")?.text
    ?? "Kargalı Hanbaba Mh. Sakarya Cd. No:336/A Hendek / Sakarya";
  const fabrika  = company.addresses?.find((a) => a.type === "Fabrika")?.text
    ?? "Akova Mh. 5038 Sk. No:14 Hendek / Sakarya";

  return (
    <div className="bg-[#FAFAF9]">
      {/* Page header */}
      <div className="bg-[#1C1C1C] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-normal text-[#9D7C64] uppercase tracking-widest mb-3">
            Bize Ulaşın
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1]">
            İletişim
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 sm:py-16">

        {/* Primary WhatsApp CTA */}
        <div className="bg-[#1C1C1C] rounded-lg p-5 sm:p-8 text-center mb-8 sm:mb-12">
          <h2 className="text-xl font-bold text-white mb-3">
            En Hızlı Yol: WhatsApp
          </h2>
          <p className="text-base font-normal text-white/75 mb-6 max-w-md mx-auto">
            Projeniz hakkında bilgi almak için doğrudan WhatsApp&apos;tan yazın.
            En kısa sürede yanıt veririz.
          </p>
          <a
            href={`https://wa.me/${whatsapp}?text=Merhaba%2C%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 sm:px-8 sm:py-4 text-base font-bold text-white transition-colors duration-150 hover:bg-[#1da851] active:scale-95 focus:outline-2 focus:outline-white"
          >
            <MessageCircle size={20} />
            WhatsApp&apos;tan Yazın
          </a>
        </div>

        {/* Contact details */}
        <div className="border border-[#DDDBD6] rounded-lg divide-y divide-[#DDDBD6]">
          <div className="flex items-start gap-4 p-6">
            <Phone size={20} className="text-[#9D7C64] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#1C1C1C] mb-1">Telefon</p>
              <p className="text-base font-normal text-[#8A8680]">{phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6">
            <Mail size={20} className="text-[#9D7C64] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#1C1C1C] mb-1">E-posta</p>
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
              <div>
                <p className="text-sm font-bold text-[#1C1C1C] mb-0.5">Merkez</p>
                <p className="text-base font-normal text-[#8A8680]">{merkez}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1C1C1C] mb-0.5">Showroom</p>
                <p className="text-base font-normal text-[#8A8680]">{showroom}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1C1C1C] mb-0.5">Fabrika</p>
                <p className="text-base font-normal text-[#8A8680]">{fabrika}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
