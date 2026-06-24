"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/data/services";
import ServiceCard from "@/components/home/ServiceCard";
import { fadeUp, staggerFast, ease } from "@/lib/motion";

export default function ServicesGrid() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView   = useInView(gridRef,   { once: true, amount: 0.1 });
  const t  = useTranslations("home");
  const ts = useTranslations("services");

  return (
    <section id="hizmetler" className="bg-[#FAFAF9] py-14 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">

        <div ref={headerRef} className="mb-8 sm:mb-12 lg:mb-16 flex items-end justify-between gap-6">
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
                {t("servicesEyebrow")}
              </p>
              <h2 className="text-3xl font-bold text-[#1C1C1C] leading-tight tracking-tight">
                {t("servicesTitle")}
              </h2>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, ease, delay: 0.25 }}
          >
            <Link
              href="/hizmetler"
              className="flex-shrink-0 text-sm font-bold text-[#9D7C64] transition-colors duration-200 hover:text-[#866A56]"
            >
              {t("viewAll")}
            </Link>
          </motion.div>
        </div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={staggerFast}
        >
          {CATEGORIES.map((cat) => {
            const catLabel = ts(`categories.${cat.slug}.header`, { fallback: cat.header });
            return (
              <motion.div key={cat.slug} variants={fadeUp}>
                <ServiceCard
                  slug={cat.slug}
                  categorySlug={cat.slug}
                  label={catLabel}
                  description={cat.subcategories[0].description}
                  imagePlaceholder=""
                  variant="homepage"
                />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
