import Image from "next/image";
import { MessageCircle, ChevronDown } from "lucide-react";

// Mevcut hardcoded değerler — Firestore boşken bunlar kullanılır
const D = {
  eyebrow:       "Prefabrik & Çelik Yapı",
  title:         "Çeliğin Gücüyle\nGeleceği İnşa Ediyoruz",
  subtitle:      "Hafif çelik, prefabrik, konteyner ve endüstriyel yapı sistemlerinde güçlü üretim çözümleri.",
  imageUrl:      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&auto=format&fit=crop",
  whatsapp:      "90XXXXXXXXXX",
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
    <section className="relative flex min-h-[780px] items-center overflow-hidden bg-[#0a0a0a]">

      {/* Background photo */}
      <Image
        src={imageUrl || D.imageUrl}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Primary overlay — left heavy, fades right to show photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.90) 30%, rgba(0,0,0,0.60) 60%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Frosted strip behind the text column */}
      <div
        className="absolute inset-y-0 left-0 w-[55%]"
        style={{
          backdropFilter: "blur(16px) brightness(0.70)",
          WebkitBackdropFilter: "blur(16px) brightness(0.70)",
          maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 100%)" }}
      />

      {/* Copper left-edge accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#9D7C64]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-36 md:py-44">
        <div className="max-w-xl">

          {/* Eyebrow */}
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#9D7C64]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.30em] text-[#9D7C64]">
              {eyebrow}
            </span>
          </div>

          {/* Headline — "\n" satır sonu olarak render edilir */}
          <h1 className="mb-8 text-[62px] font-bold leading-[1.02] tracking-tight text-white">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="mb-12 max-w-md text-lg font-normal leading-relaxed text-white/55">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Merhaba%2C%20bilgi%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/50 px-9 py-4 text-base font-bold tracking-wide text-[#25D366] backdrop-blur-sm transition-all duration-300 ease-out hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#25D366]/20 active:scale-[0.97] focus:outline-2 focus:outline-[#25D366]"
              style={{ background: "rgba(37,211,102,0.07)" }}
            >
              <MessageCircle size={18} />
              {whatsappText}
            </a>
            <a
              href="#hizmetler"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-9 py-4 text-base font-normal tracking-wide text-white/80 backdrop-blur-sm transition-all duration-300 ease-out hover:border-white/40 hover:text-white active:scale-[0.97] focus:outline-2 focus:outline-white"
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
