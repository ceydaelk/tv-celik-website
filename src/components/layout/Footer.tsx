import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { getCompanyData } from "@/lib/firestore/company";

const QUICK_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Projeler", href: "/projeler" },
  { label: "İletişim", href: "/iletisim" },
] as const;

const SERVICE_LINKS = [
  { label: "Prefabrik Yapılar", href: "/hizmetler/prefabrik-yapilar" },
  { label: "Hafif Çelik Yapılar", href: "/hizmetler/hafif-celik-yapilar" },
  { label: "Konteyner Sistemleri", href: "/hizmetler/konteyner-sistemleri" },
  { label: "Endüstriyel Çelik", href: "/hizmetler/endustriyel-celik-yapilar" },
  { label: "Yapısal Bileşenler", href: "/hizmetler/yapisal-bilesenler" },
] as const;

const COL_HEADING = "mb-5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/30";
const COL_LINK =
  "block py-1 text-[13px] font-normal text-white/50 transition-colors duration-150 hover:text-white/85 focus:rounded focus:outline-2 focus:outline-[#9D7C64]";

export default async function Footer() {
  // Firestore'dan iletişim bilgilerini oku — hata veya boşsa fallback değerler kullanılır
  const company = await getCompanyData();

  const phone    = company.phone    ?? "+90 XXX XXX XX XX";
  const email    = company.email    ?? "info@tvcelik.com";
  const whatsapp = company.whatsapp ?? "905078363661";
  const address  = company.addresses?.find((a) => a.type === "Merkez")?.text
    ?? "Güzelyalı Mh. Muştu Sk Kılıçlar Apt: NO:6/1 Pendik / İstanbul";

  return (
    <footer className="relative bg-[#1C1C1C] text-white">
      {/* Copper top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9D7C64]/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-14">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">

          {/* Column 1 — Brand */}
          <div>
            <Link href="/" className="inline-block focus:outline-2 focus:outline-[#9D7C64]">
              <Image
                src="/logo.png"
                alt="TV Çelik"
                width={1056}
                height={777}
                className="w-[170px] h-auto object-contain"
              />
            </Link>
            <p className="mt-6 text-sm font-normal leading-relaxed text-white/50">
              Çelikten Güç, Yapıdan Güven
            </p>
            <p className="mt-2 text-xs font-normal leading-relaxed text-white/25">
              Prefabrik, hafif çelik ve konteyner yapı sistemleri
            </p>
          </div>

          {/* Column 2 — Navigation links */}
          <div className="flex gap-10">
            <div className="flex-1">
              <p className={COL_HEADING}>Sayfalar</p>
              <ul className="space-y-0.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={COL_LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <p className={COL_HEADING}>Hizmetler</p>
              <ul className="space-y-0.5">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={COL_LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <p className={COL_HEADING}>İletişim</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={`https://wa.me/${whatsapp}?text=Merhaba%2C%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-[13px] font-normal text-[#25D366]/80 transition-colors hover:text-[#25D366]"
                >
                  <MessageCircle size={13} className="mt-0.5 shrink-0" />
                  WhatsApp&apos;tan Yazın
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[13px] font-normal text-white/45">
                <Phone size={13} className="mt-0.5 shrink-0 text-white/25" />
                {phone}
              </li>
              <li className="flex items-start gap-2.5 text-[13px] font-normal text-white/45">
                <Mail size={13} className="mt-0.5 shrink-0 text-white/25" />
                {email}
              </li>
              <li className="flex items-start gap-2.5 text-[13px] font-normal text-white/45">
                <MapPin size={13} className="mt-0.5 shrink-0 text-white/25" />
                {address}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex items-center justify-between border-t border-white/[0.07] pt-7">
          <p className="text-[11px] font-normal text-white/25">
            © {new Date().getFullYear()} TV Çelik A.Ş. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
