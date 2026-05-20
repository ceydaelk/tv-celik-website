import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FoldableCallout() {
  return (
    <section
      className="relative overflow-hidden bg-[#111111] py-28"
      style={{
        background:
          "radial-gradient(ellipse at 0% 50%, #1e1610 0%, #111111 55%, #0a0a0a 100%)",
      }}
    >
      {/* Copper glow — left accent */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-px bg-[#9D7C64]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#9D7C64] opacity-[0.07] blur-3xl"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left — text */}
          <div className="border-l-4 border-[#9D7C64] pl-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#9D7C64]">
              Öne Çıkan Hizmet
            </p>
            <h2 className="mb-5 text-4xl font-bold leading-[1.1] text-white">
              Katlanır ve Taşınabilir Yapılar
            </h2>
            <p className="mb-8 max-w-md text-base font-normal leading-relaxed text-white/65">
              Sabit temele gerek duymadan kurulabilen, taşınıp yeniden
              monte edilebilen yapı sistemlerimiz — hızlı kurulum, düşük
              maliyet, maksimum esneklik.
            </p>
            <Link
              href="/hizmetler/hafif-celik-yapilar/katlanir-tasinabilir"
              className="inline-flex items-center gap-2 rounded-full bg-[#9D7C64] px-8 py-4 text-base font-bold text-white shadow-lg shadow-black/40 transition-all duration-300 ease-out hover:bg-[#866A56] hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97] focus:outline-2 focus:outline-[#9D7C64]"
            >
              Daha Fazla Bilgi Al
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right — feature bullets */}
          <div className="space-y-4">
            {[
              { title: "Hızlı Kurulum", body: "Beton temel gerektirmez, 1–3 günde kuruluma hazır." },
              { title: "Taşınabilir", body: "İhtiyaca göre söküp farklı bir konuma nakledebilirsiniz." },
              { title: "Maliyet Avantajı", body: "Geleneksel inşaata kıyasla %40'a varan tasarruf." },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="rounded-lg border border-white/8 p-5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <p className="mb-1 text-sm font-bold text-white">{title}</p>
                <p className="text-sm font-normal text-white/55">{body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
