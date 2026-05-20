import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Projeler — TV Çelik A.Ş.",
  description: "TV Çelik A.Ş. tarafından tamamlanan prefabrik ve çelik yapı projeleri.",
};

const PLACEHOLDER_PROJECTS = [
  { title: "Endüstriyel Depo Kompleksi", category: "Endüstriyel Çelik", location: "İstanbul" },
  { title: "Prefabrik Ofis Binası", category: "Prefabrik Yapılar", location: "Ankara" },
  { title: "Modüler Konteyner Kampüsü", category: "Konteyner Sistemleri", location: "İzmir" },
  { title: "Hafif Çelik Villa Projesi", category: "Hafif Çelik Yapılar", location: "Bursa" },
  { title: "Tarımsal Depo ve Ahır", category: "Endüstriyel Çelik", location: "Konya" },
  { title: "Şantiye Konteyner Köyü", category: "Konteyner Sistemleri", location: "Adana" },
] as const;

export default function ProjelerPage() {
  return (
    <div className="bg-[#FAFAF9]">
      {/* Page header */}
      <div className="bg-[#1C1C1C] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-normal text-[#9D7C64] uppercase tracking-widest mb-3">
            Referanslarımız
          </p>
          <h1 className="text-4xl font-bold text-white leading-[1.1]">
            Projeler
          </h1>
        </div>
      </div>

      {/* Project grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_PROJECTS.map((project) => (
            <div
              key={project.title}
              className="border border-[#DDDBD6] rounded-lg overflow-hidden bg-white"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-[#E8E6E1] to-[#F3F2EF] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#DDDBD6]" />
              </div>
              <div className="p-4">
                <span className="text-xs font-bold uppercase tracking-wide text-[#9D7C64]">
                  {project.category}
                </span>
                <h3 className="text-base font-bold text-[#1C1C1C] mt-1 mb-1">{project.title}</h3>
                <p className="text-sm font-normal text-[#8A8680]">{project.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#1C1C1C] rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Projenizi Konuşalım</h2>
          <p className="text-base font-normal text-white/75 mb-6">
            Benzer bir proje için teklif almak ister misiniz?
          </p>
          <a
            href="https://wa.me/90XXXXXXXXXX?text=Merhaba%2C%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi%20yapmak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white transition-colors duration-150 hover:bg-[#1da851] active:scale-95 focus:outline-2 focus:outline-white"
          >
            <MessageCircle size={18} />
            WhatsApp&apos;tan Yazın
          </a>
        </div>
      </div>
    </div>
  );
}
