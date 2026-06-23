"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, ease } from "@/lib/motion";
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

// Subtle engineering grid — barely visible lines that evoke technical drawings
const GRID_STYLE = {
  backgroundImage: [
    "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "60px 60px",
} as React.CSSProperties;

export default function ProcessSection({
  title    = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  steps,
}: ProcessSectionProps) {
  const displaySteps = steps?.length ? steps : DEFAULT_STEPS;

  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef  = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const stepsInView  = useInView(stepsRef,  { once: true, amount: 0.1 });

  return (
    <section className="bg-[#111111] py-12 sm:py-16 lg:py-24" style={GRID_STYLE}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div ref={headerRef} className="mb-8 sm:mb-12 lg:mb-16">
          <div className="border-l-2 border-[#9D7C64] pl-5">
            <motion.div
              className="mb-2 h-px w-10 bg-[#9D7C64] origin-left"
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : undefined}
              transition={{ duration: 0.45, ease }}
            />
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease, delay: 0.12 }}
            >
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#9D7C64]">
                Nasıl Çalışıyoruz
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
                {title}
              </h2>
            </motion.div>
          </div>
          <motion.p
            className="mt-5 max-w-lg pl-6 text-base font-normal leading-relaxed text-white/45"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Steps — stagger in */}
        <div ref={stepsRef} className="grid grid-cols-1 gap-5 md:grid-cols-5 md:gap-6 lg:gap-8">
          {displaySteps.map((step, i) => (
            <motion.div
              key={step.number}
              className="group relative border-t border-white/[0.08] pt-7 pb-2"
              initial={{ opacity: 0, y: 24 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease, delay: i * 0.09 }}
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
