import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { getProjects } from "@/lib/firestore/projects";
import { getCompanyData } from "@/lib/firestore/company";
import ProjectsGrid from "@/components/common/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projeler — TV Çelik A.Ş.",
  description: "TV Çelik A.Ş. tarafından tamamlanan prefabrik ve çelik yapı projeleri.",
  alternates: { canonical: "/projeler" },
};

export default async function ProjelerPage() {
  const [projects, company] = await Promise.all([getProjects(), getCompanyData()]);
  const whatsapp = company.whatsapp ?? "905467343030";

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

        <ProjectsGrid projects={projects} />

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
