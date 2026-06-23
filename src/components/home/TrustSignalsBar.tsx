"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { ease } from "@/lib/motion";
import type { Stat } from "@/types/content";

const DEFAULT_STATS: Stat[] = [
  { number: "30+",  label: "Yıllık Deneyim" },
  { number: "500+", label: "Tamamlanan Proje" },
  { number: "30+",  label: "Hizmet Verilen Şehir" },
  { number: "5",    label: "Yapı Kategorisi" },
];

interface TrustSignalsBarProps {
  stats?: Stat[];
}

export default function TrustSignalsBar({ stats }: TrustSignalsBarProps) {
  const displayStats = stats?.length ? stats : DEFAULT_STATS;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative bg-[#161616] border-b border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9D7C64]/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/5">
          {displayStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`flex flex-col items-center py-6 md:py-11 px-6 text-center${i >= 2 ? " border-t border-white/5 md:border-t-0" : ""}`}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, ease, delay: i * 0.09 }}
            >
              <span className="text-[32px] md:text-[42px] font-bold text-[#9D7C64] leading-none mb-2.5">
                <AnimatedCounter value={stat.number} />
              </span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.18em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
