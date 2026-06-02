// Hardcoded image map — keys must match the EXACT slug from services.ts / the URL segment.
// gallery: shown in the photo gallery (first image = main/hero)
// plans:   shown only in Plan ve Teknik Detaylar
//
// CLASSIFICATION RULES (filename-based):
//   contains "cover" → gallery (first cover = hero)
//   contains "plan"  → plans only, never gallery
//   everything else  → gallery
//
// Use LITERAL spaces in paths — NOT %20. Next.js Image encodes once internally;
// pre-encoding causes double-encoding and silent 404s.

const SERVICE_IMAGES: Record<string, { gallery: string[]; plans: string[] }> = {
  // slug: "tek-katli"  (URL: /hizmetler/prefabrik-yapilar/tek-katli)
  "tek-katli": {
    gallery: [
      // cover first → becomes hero
      "/assets/services/tek-katli-prefabrik/tek-katli-prefabrik-cover (1).jpeg",
      "/assets/services/tek-katli-prefabrik/tek-katli-prefabrik (2).jpeg",
      "/assets/services/tek-katli-prefabrik/tek-katli-prefabrik (3).jpeg",
      "/assets/services/tek-katli-prefabrik/tek-katli-prefabrik (4).jpeg",
    ],
    plans: [
      "/assets/services/tek-katli-prefabrik/plan.jpeg",
    ],
  },

  // slug: "iki-katli"  (URL: /hizmetler/prefabrik-yapilar/iki-katli)
  // merges cift-katli-prefabrik + cift-katli-prefabrik-2 folders
  "iki-katli": {
    gallery: [
      // cover first → becomes hero
      "/assets/services/cift-katli-prefabrik/cift-katli-prefabrik-cover(5).jpeg",
      "/assets/services/cift-katli-prefabrik/cift-katli-prefabrik (1).jpeg",
      "/assets/services/cift-katli-prefabrik/cift-katli-prefabrik (2).jpeg",
      "/assets/services/cift-katli-prefabrik/cift-katli-prefabrik (3).jpeg",
      "/assets/services/cift-katli-prefabrik/cift-katli-prefabrik (4).jpeg",
      // folder 2 — merged; cover first within this folder
      "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik-cover(4).jpeg",
      "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik (1).jpeg",
      "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik (2).jpeg",
      "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik (3).jpeg",
    ],
    plans: [
      "/assets/services/cift-katli-prefabrik/plan.jpeg",
      "/assets/services/cift-katli-prefabrik-2/plan.jpeg",
    ],
  },

  // slug: "villa-projeleri"  (URL: /hizmetler/hafif-celik-yapilar/villa-projeleri)
  "villa-projeleri": {
    gallery: [
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (1).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (2).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (3).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (4).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (5).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (6).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (7).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (8).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (9).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (10).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (11).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (12).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (13).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (14).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (15).jpeg",
      "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (16).jpeg",
    ],
    plans: [
      "/assets/services/ucgen-bina-hafif-celik/plan.jpeg",
    ],
  },

  // slug: "hafif-celik-evler"  (URL: /hizmetler/hafif-celik-yapilar/hafif-celik-evler)
  "hafif-celik-evler": {
    gallery: [
      // cover first → becomes hero
      "/assets/services/cift-katli-hafif-celik/cift-katli-hafif-celik-cover (5).jpeg",
      "/assets/services/cift-katli-hafif-celik/cift-katli-hafif-celik (1).jpeg",
      "/assets/services/cift-katli-hafif-celik/cift-katli-hafif-celik (2).jpeg",
      "/assets/services/cift-katli-hafif-celik/cift-katli-hafif-celik (3).jpeg",
      "/assets/services/cift-katli-hafif-celik/cift-katli-hafif-celik (4).jpeg",
      "/assets/services/cift-katli-hafif-celik/cift-katli-hafif-celik (6).jpeg",
    ],
    plans: [
      "/assets/services/cift-katli-hafif-celik/plan.jpeg",
      "/assets/services/cift-katli-hafif-celik/plan-2.jpeg",
    ],
  },
};

export interface LocalImages {
  gallery: string[]; // first image = main/hero
  plans:   string[]; // only shown in Plan ve Teknik Detaylar
}

export function getLocalServiceImages(slug: string): LocalImages {
  return SERVICE_IMAGES[slug] ?? { gallery: [], plans: [] };
}

// Returns the first gallery image whose filename contains "cover", or undefined.
// Used by ServiceCard to show a real photo instead of the Unsplash placeholder.
export function getServiceCoverImage(slug: string): string | undefined {
  return SERVICE_IMAGES[slug]?.gallery.find((img) => img.includes("cover"));
}

// Category-level cover images — keyed by category slug.
// Used on the homepage "Hizmet Kategorilerimiz" section.
// Each entry uses a real company project photo; categories without dedicated photos
// borrow from the nearest matching project folder until client photos are delivered.
const CATEGORY_COVER_IMAGES: Record<string, string> = {
  "prefabrik-yapilar":
    "/assets/services/tek-katli-prefabrik/tek-katli-prefabrik-cover (1).jpeg",
  "hafif-celik-yapilar":
    "/assets/services/cift-katli-hafif-celik/cift-katli-hafif-celik-cover (5).jpeg",
  "konteyner-sistemleri":
    "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik-cover(4).jpeg",
  "endustriyel-celik-yapilar":
    "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (1).jpeg",
  "yapisal-bilesenler":
    "/assets/services/cift-katli-prefabrik/cift-katli-prefabrik (2).jpeg",
};

export function getCategoryCoverImage(slug: string): string | undefined {
  return CATEGORY_COVER_IMAGES[slug];
}
