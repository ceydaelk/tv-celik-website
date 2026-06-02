import Image from "next/image";
import { MessageCircle, ChevronDown } from "lucide-react";

// Mevcut hardcoded değerler — Firestore boşken bunlar kullanılır
const D = {
  eyebrow:       "Prefabrik & Çelik Yapı",
  title:         "Çeliğin Gücüyle\nGeleceği İnşa Ediyoruz",
  subtitle:      "Hafif çelik, prefabrik, konteyner ve endüstriyel yapı sistemlerinde güçlü üretim çözümleri.",
  imageUrl:      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (10).jpeg",
  whatsapp:      "905078363661",
  whatsappText:  "WhatsApp'tan Yazın",
  secondaryText: "Hizmetlerimizi Keşfedin",
};

interface HeroSectionProps {
  eyebrow?:       string;
  title?:         string; // "\n" ile satır sonu oluşturulabilir
  subtitle?:      string;
  imageUrl?:      string;
  whatsappNumber?: string;
  whatsappText?:  string;
  secondaryText?: string;
}

export default function HeroSection({
  eyebrow       = D.eyebrow,
  title         = D.title,
  subtitle      = D.subtitle,
  imageUrl      = D.imageUrl,
  whatsappNumber = D.whatsapp,
  whatsappText  = D.whatsappText,
  secondaryText = D.secondaryText,
}: HeroSectionProps) {
  // "\n" karakterine göre başlığı satırlara böl
  const titleLines = (title || D.title).split("\n");

  return (
    <section className="relative flex min-h-[520px] sm:min-h-[780px] items-center overflow-hidden bg-[#0a0a0a]">

      {/* Background photo — shifted slightly right so glass facade stays visible */}
      <Image
        src={imageUrl || D.imageUrl}
        alt=""
        fill
        priority
        className="object-cover object-[60%_center]"
        sizes="100vw"
      />

      {/* Primary overlay — left heavy, fades right to show building */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.44) 30%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.03) 100%)",
        }}
      />

      {/* Frosted strip behind the text column — narrower so building shows sooner */}
      <div
        className="absolute inset-y-0 left-0 w-[45%]"
        style={{
          backdropFilter: "blur(14px) brightness(0.86)",
          WebkitBackdropFilter: "blur(14px) brightness(0.86)",
          maskImage: "linear-gradient(to right, black 10%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 15%, transparent 100%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 100%)" }}
      />

      {/* Copper left-edge accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#9D7C64]/40 to-transparent" />

      {/* Content — pulled left: smaller left padding than right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pl-4 pr-6 sm:pl-5 sm:pr-8 lg:pl-6 lg:pr-10 py-20 sm:py-28 md:py-44">
        <div className="max-w-[520px]">

          {/* Eyebrow */}
          <div className="mb-5 sm:mb-8 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#9D7C64]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.30em] text-[#9D7C64]">
              {eyebrow}
            </span>
          </div>

          {/* Headline — "\n" satır sonu olarak render edilir */}
          <h1 className="mb-5 sm:mb-8 text-[33px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.05] tracking-tight text-white">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="mb-8 sm:mb-12 max-w-md text-base sm:text-lg font-normal leading-relaxed text-white/55">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Merhaba%2C%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#25D366]/50 px-6 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-bold tracking-wide text-[#25D366] backdrop-blur-sm transition-all duration-300 ease-out hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#25D366]/20 active:scale-[0.97] focus:outline-2 focus:outline-[#25D366]"
              style={{ background: "rgba(37,211,102,0.07)" }}
            >
              <MessageCircle size={18} />
              {whatsappText}
            </a>
            <a
              href="#hizmetler"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 px-6 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-normal tracking-wide text-white/80 backdrop-blur-sm transition-all duration-300 ease-out hover:border-white/40 hover:text-white active:scale-[0.97] focus:outline-2 focus:outline-white"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {secondaryText}
              <ChevronDown size={18} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
