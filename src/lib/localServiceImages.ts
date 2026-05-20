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
      // folder 2 — merged
      "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik (1).jpeg",
      "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik (2).jpeg",
      "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik (3).jpeg",
    ],
    plans: [
      "/assets/services/cift-katli-prefabrik/plan.jpeg",
      "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik-plan (4).jpeg",
      "/assets/services/cift-katli-prefabrik-2/plan.jpeg",
    ],
  },

  // TODO: confirm which slug maps to cift-katli-hafif-celik folder
  // Current candidates: "hafif-celik-evler", "villa-projeleri", or another slug
  // "hafif-celik-evler": { ... }
};

export interface LocalImages {
  gallery: string[]; // first image = main/hero
  plans:   string[]; // only shown in Plan ve Teknik Detaylar
}

export function getLocalServiceImages(slug: string): LocalImages {
  return SERVICE_IMAGES[slug] ?? { gallery: [], plans: [] };
}
