import { MessageCircle } from "lucide-react";

const D = {
  title:        "Projenizi Konuşalım",
  description:  "Prefabrik yapı, çelik sistem veya konteyner çözümü için teklif almak ister misiniz? WhatsApp'tan yazın, en kısa sürede yanıt veririz.",
  responseNote: "Ortalama yanıt süresi: 1 saat içinde",
  whatsapp:     "905078363661",
};

interface WhatsAppCTASectionProps {
  title?:          string;
  description?:    string;
  responseNote?:   string;
  whatsappNumber?: string;
}

export default function WhatsAppCTASection({
  title         = D.title,
  description   = D.description,
  responseNote  = D.responseNote,
  whatsappNumber = D.whatsapp,
}: WhatsAppCTASectionProps) {
  return (
    <section
      className="relative overflow-hidden py-14 sm:py-20 lg:py-28"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #1a1a1a 0%, #0f0f0f 60%)",
      }}
    >
      {/* Top copper hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9D7C64]/60 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#9D7C64]">
          Ücretsiz Görüşme
        </p>
        <h2 className="mb-5 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white">
          {title}
        </h2>
        <p className="mb-6 sm:mb-10 text-base font-normal leading-relaxed text-white/50">
          {description}
        </p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=Merhaba%2C%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi%20yapmak%20istiyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border border-[#25D366]/50 px-8 py-3.5 sm:px-10 sm:py-4 text-base font-bold tracking-wide text-[#25D366] backdrop-blur-sm transition-all duration-300 ease-out hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#25D366]/25 active:scale-[0.97] focus:outline-2 focus:outline-[#25D366]"
          style={{ background: "rgba(37,211,102,0.07)" }}
        >
          <MessageCircle size={20} />
          WhatsApp&apos;tan Yazın
        </a>

        <p className="mt-6 text-xs font-normal text-white/25">
          {responseNote}
        </p>
      </div>
    </section>
  );
}
