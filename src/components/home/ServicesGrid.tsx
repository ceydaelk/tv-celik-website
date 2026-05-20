import { CATEGORIES } from "@/data/services";
import ServiceCard from "@/components/home/ServiceCard";

export default function ServicesGrid() {
  return (
    <section id="hizmetler" className="bg-[#FAFAF9] py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header — architectural border-left pattern */}
        <div className="mb-16 flex items-end justify-between gap-6">
          <div className="border-l-2 border-[#9D7C64] pl-5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#9D7C64]">
              Ne İnşa Ediyoruz
            </p>
            <h2 className="text-3xl font-bold text-[#1C1C1C] leading-tight tracking-tight">
              Hizmet Kategorilerimiz
            </h2>
          </div>
          <a
            href="/hizmetler"
            className="flex-shrink-0 text-sm font-bold text-[#9D7C64] transition-colors duration-200 hover:text-[#866A56]"
          >
            Tümünü Gör →
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <ServiceCard
              key={cat.slug}
              slug={cat.slug}
              categorySlug={cat.slug}
              label={cat.header}
              description={cat.subcategories[0].description}
              imagePlaceholder={`/images/services/${cat.slug}/placeholder.jpg`}
              variant="homepage"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
