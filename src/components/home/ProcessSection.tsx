import type { ProcessStep } from "@/types/content";

const DEFAULT_STEPS: ProcessStep[] = [
  { number: "01", title: "Projelendirme",   description: "Saha ölçümü, ihtiyaç analizi ve müşteriye özel teknik proje dosyasının hazırlanması." },
  { number: "02", title: "Fabrika Üretimi", description: "Tasarıma uygun çelik yapı elemanlarının ISO standartlarında kalite kontrollü üretimi." },
  { number: "03", title: "Sevkiyat",        description: "Tüm bileşenlerin paketlenerek şantiye sahasına planlı ve güvenli lojistikle taşınması." },
  { number: "04", title: "Montaj",          description: "Uzman ekibimiz tarafından sahada hızlı, güvenli ve teknik denetime uygun kurulum." },
  { number: "05", title: "Teslim",          description: "Son kontroller ve müşteri kabulünden sonra anahtar teslim yapı devri ve garanti belgesi." },
];

const DEFAULT_TITLE    = "Üretimden Teslime Süreç";
const DEFAULT_SUBTITLE = "İlk tasarımdan anahtar teslime kadar tüm süreçleri titizlikle ve şeffaf biçimde yönetiyoruz.";

interface ProcessSectionProps {
  title?:    string;
  subtitle?: string;
  steps?:    ProcessStep[];
}

export default function ProcessSection({
  title    = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  steps,
}: ProcessSectionProps) {
  const displaySteps = steps?.length ? steps : DEFAULT_STEPS;

  return (
    <section className="bg-[#111111] py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="border-l-2 border-[#9D7C64] pl-5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#9D7C64]">
              Nasıl Çalışıyoruz
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
              {title}
            </h2>
          </div>
          <p className="mt-5 max-w-lg pl-6 text-base font-normal leading-relaxed text-white/45">
            {subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-5 md:gap-6 lg:gap-8">
          {displaySteps.map((step) => (
            <div
              key={step.number}
              className="group relative border-t border-white/[0.08] pt-7 pb-2"
            >
              {/* Copper reveal line — slides in from left on hover */}
              <div className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 bg-[#9D7C64] transition-transform duration-300 ease-out group-hover:scale-x-100" />

              <p className="mb-5 text-[36px] lg:text-[48px] font-bold leading-none tracking-tight text-[#9D7C64]/20 transition-colors duration-300 group-hover:text-[#9D7C64]/40">
                {step.number}
              </p>

              <h3 className="mb-2.5 text-[15px] font-bold leading-snug text-white/75 transition-colors duration-200 group-hover:text-white">
                {step.title}
              </h3>

              <p className="text-sm font-normal leading-relaxed text-white/40 transition-colors duration-200 group-hover:text-white/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
