import { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/services";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tvcelik.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/hizmetler`,     lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/projeler`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/kurumsal`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/iletisim`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url:             `${BASE_URL}/hizmetler/${cat.slug}`,
    lastModified:    now,
    changeFrequency: "weekly",
    priority:        0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = CATEGORIES.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      url:             `${BASE_URL}/hizmetler/${cat.slug}/${sub.slug}`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.7,
    }))
  );

  return [...staticPages, ...categoryPages, ...servicePages];
}
