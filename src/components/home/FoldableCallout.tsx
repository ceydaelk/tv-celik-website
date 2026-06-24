"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { ease } from "@/lib/motion";

const SECTION_BG = {
  backgroundColor: "#0a0a0a",
  backgroundImage: [
    "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
    "radial-gradient(ellipse at 0% 50%, #1e1610 0%, #111111 55%, #0a0a0a 100%)",
  ].join(", "),
  backgroundSize: "70px 70px, 70px 70px, 100% 100%",
} as React.CSSProperties;

export default function FoldableCallout() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const t = useTranslations("home");

  const features = [
    { title: t("foldableF1Title"), body: t("foldableF1Body") },
    { title: t("foldableF2Title"), body: t("foldableF2Body") },
    { title: t("foldableF3Title"), body: t("foldableF3Body") },
  ];

  return (
    <section
      className="relative overflow-hidden py-28"
      style={SECTION_BG}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-[#9D7C64]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#9D7C64] opacity-[0.07] blur-3xl" aria-hidden />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div className="border-l-4 border-[#9D7C64] pl-8">
            <motion.div
              className="mb-3 h-px w-10 bg-[#9D7C64] origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : undefined}
              transition={{ duration: 0.45, ease }}
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.65, ease, delay: 0.12 }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#9D7C64]">
                {t("foldableEyebrow")}
              </p>
              <h2 className="mb-5 text-4xl font-bold leading-[1.1] text-white">
                {t("foldableTitle")}
              </h2>
              <p className="mb-8 max-w-md text-base font-normal leading-relaxed text-white/65">
                {t("foldableDesc")}
              </p>
              <Link
                href="/hizmetler/hafif-celik-yapilar/katlanir-tasinabilir"
                className="inline-flex items-center gap-2 rounded-full bg-[#9D7C64] px-8 py-4 text-base font-bold text-white shadow-lg shadow-black/40 transition-all duration-300 ease-out hover:bg-[#866A56] hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97] focus:outline-2 focus:outline-[#9D7C64]"
              >
                {t("foldableCta")}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          <div className="space-y-4">
            {features.map(({ title, body }, i) => (
              <motion.div
                key={title}
                className="rounded-lg border border-white/8 p-5"
                style={{ background: "rgba(255,255,255,0.04)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.55, ease, delay: 0.15 + i * 0.1 }}
              >
                <p className="mb-1 text-sm font-bold text-white">{title}</p>
                <p className="text-sm font-normal text-white/55">{body}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
