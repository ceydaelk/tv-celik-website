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

  return (
    <section className="relative bg-[#161616] border-b border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9D7C64]/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {displayStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-11 px-6 text-center">
              <span className="text-[42px] font-bold text-[#9D7C64] leading-none mb-2.5">
                {stat.number}
              </span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.18em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
