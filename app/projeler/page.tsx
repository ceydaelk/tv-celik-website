import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getProjects } from "@/lib/firestore/projects";
import { getCompanyData } from "@/lib/firestore/company";

export const metadata: Metadata = {
  title: "Projeler — TV Çelik A.Ş.",
  description: "TV Çelik A.Ş. tarafından tamamlanan prefabrik ve çelik yapı projeleri.",
};

export default async function ProjelerPage() {
  const [projects, company] = await Promise.all([getProjects(), getCompanyData()]);
  const whatsapp = company.whatsapp ?? "905078363661";

  return (
    <div className="bg-[#FAFAF9]">
      {/* Page header */}
      <div className="bg-[#1C1C1C] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-normal text-[#9D7C64] uppercase tracking-widest mb-3">
            Referanslarımız
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1]">
            Projeler
          </h1>
        </div>
      </div>

      {/* Project grid */}
      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-16">

        {projects.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-base text-[#8A8680]">Projeler yakında eklenecektir.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-[#DDDBD6] rounded-lg overflow-hidden bg-white"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#E8E6E1] to-[#F3F2EF]">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#DDDBD6]" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {project.category && (
                    <span className="text-xs font-bold uppercase tracking-wide text-[#9D7C64]">
                      {project.category}
                    </span>
                  )}
                  <h3 className="text-base font-bold text-[#1C1C1C] mt-1 mb-1">{project.title}</h3>
                  {project.location && (
                    <p className="text-sm font-normal text-[#8A8680]">{project.location}</p>
                  )}
                  {project.description && (
                    <p className="text-sm font-normal text-[#8A8680] mt-1 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 sm:mt-16 bg-[#1C1C1C] rounded-lg p-5 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Projenizi Konuşalım</h2>
          <p className="text-base font-normal text-white/75 mb-6">
            Benzer bir proje için teklif almak ister misiniz?
          </p>
          <a
            href={`https://wa.me/${whatsapp}?text=Merhaba%2C%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi%20yapmak%20istiyorum.`}
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
