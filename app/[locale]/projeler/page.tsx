import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";
import { getProjects } from "@/lib/firestore/projects";
import { getCompanyData } from "@/lib/firestore/company";
import ProjectsGrid from "@/components/common/ProjectsGrid";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tvcelik.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Projeler — TV Çelik A.Ş." : "Projects — TV Çelik A.Ş.",
    description: isTr
      ? "TV Çelik A.Ş. tarafından tamamlanan prefabrik ve çelik yapı projeleri."
      : "Completed prefabricated and steel building projects by TV Çelik A.Ş.",
    alternates: {
      canonical: isTr ? "/projeler" : "/en/projeler",
      languages: {
        tr: `${siteUrl}/projeler`,
        en: `${siteUrl}/en/projeler`,
      },
    },
  };
}

export default async function ProjelerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const isTr = locale === "tr";

  const [projects, company] = await Promise.all([getProjects(), getCompanyData()]);
  const whatsapp = company.whatsapp ?? "905467343030";
  const waMsg = isTr
    ? "Merhaba%2C%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi%20yapmak%20istiyorum."
    : "Hello%2C%20I%20would%20like%20to%20have%20a%20project%20consultation.";

  return (
    <div className="bg-[#FAFAF9]">
      <div className="bg-[#1C1C1C] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-normal text-[#9D7C64] uppercase tracking-widest mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1]">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-16">
        <ProjectsGrid projects={projects} emptyText={t("empty")} />

        <div className="mt-10 sm:mt-16 bg-[#1C1C1C] rounded-lg p-5 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
          <p className="text-base font-normal text-white/75 mb-6">{t("ctaDesc")}</p>
          <a
            href={`https://wa.me/${whatsapp}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white transition-colors duration-150 hover:bg-[#1da851] active:scale-95 focus:outline-2 focus:outline-white"
          >
            <MessageCircle size={18} />
            {t("whatsapp")}
          </a>
        </div>
      </div>
    </div>
  );
}
