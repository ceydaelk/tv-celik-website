import { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/services";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tvcelik.com";

function entry(
  trPath: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
): MetadataRoute.Sitemap[number] {
  const trUrl = trPath === "/" ? BASE : `${BASE}${trPath}`;
  const enUrl = `${BASE}/en${trPath === "/" ? "" : trPath}`;
  return {
    url: trUrl,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: { tr: trUrl, en: enUrl },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    entry("/",          1.0, "weekly"),
    entry("/hizmetler", 0.9, "weekly"),
    entry("/projeler",  0.8, "monthly"),
    entry("/kurumsal",  0.7, "monthly"),
    entry("/iletisim",  0.7, "monthly"),
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) =>
    entry(`/hizmetler/${cat.slug}`, 0.8, "weekly")
  );

  const servicePages: MetadataRoute.Sitemap = CATEGORIES.flatMap((cat) =>
    cat.subcategories.map((sub) =>
      entry(`/hizmetler/${cat.slug}/${sub.slug}`, 0.7, "monthly")
    )
  );

  return [...staticPages, ...categoryPages, ...servicePages];
}
