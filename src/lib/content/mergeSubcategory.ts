/**
 * mergeSubcategory — single source of truth for Firestore ↔ hardcoded merge.
 *
 * Priority for every field:
 *   1. Firestore value — if non-null AND non-empty-string (or non-empty array)
 *   2. Hardcoded default from @/data/services
 *   3. Safe empty value ("" / [] / true)
 *
 * Both the public page and the admin form call this function.
 * If they show the same content it is because they use the same logic here.
 */

import type { Subcategory, ServiceSection, GalleryItem } from "@/types/content";

export interface SubcategoryDefaults {
  label: string;
  description: string;
  categorySlug: string;
  categoryHeader: string;
  order: number;
  features: string[]; // category-level feature defaults
}

export interface MergedSubcategory {
  slug: string;
  label: string;
  categorySlug: string;
  order: number;
  isActive: boolean;

  // Detail page header band
  pageTitle: string;
  badge: string;
  subtitle: string;

  // Images
  imageUrl: string;

  // Descriptions
  shortDescription: string;
  description: string;

  // Feature cards
  features: string[];

  // Optional extra content
  sections: ServiceSection[];
  gallery: GalleryItem[];
  ctaWhatsappText: string;

  // SEO
  seoTitle: string;
  seoDescription: string;
}

export function mergeSubcategory(
  fsSub: Partial<Subcategory> | null,
  defaults: SubcategoryDefaults
): MergedSubcategory {
  return {
    slug:             fsSub?.slug ?? "",

    // String fields: use Firestore value only if it is a non-empty string.
    // Empty string ("") is treated the same as missing — fall back to default.
    label:            str(fsSub?.label)            ?? defaults.label,
    categorySlug:     str(fsSub?.categorySlug)     ?? defaults.categorySlug,
    pageTitle:        str(fsSub?.pageTitle)        ?? defaults.label,
    badge:            str(fsSub?.badge)            ?? defaults.categoryHeader,
    description:      str(fsSub?.description)      ?? defaults.description,

    // Optional string fields: no hardcoded fallback, just "" when missing.
    subtitle:         fsSub?.subtitle         ?? "",
    shortDescription: fsSub?.shortDescription ?? "",
    imageUrl:         fsSub?.imageUrl         ?? "",
    ctaWhatsappText:  fsSub?.ctaWhatsappText  ?? "",
    seoTitle:         fsSub?.seoTitle         ?? "",
    seoDescription:   fsSub?.seoDescription   ?? "",

    // Number: use Firestore value if document exists, else default order.
    order:    fsSub?.order ?? defaults.order,

    // Boolean: isActive defaults to true; Firestore false is honoured.
    isActive: fsSub?.isActive !== false,

    // Features: clean empty strings first, then use if non-empty.
    // If nothing survives cleaning, fall back to category defaults.
    // This is the canonical rule — identical to what the public page shows.
    features: cleanFeatures(fsSub?.features) ?? defaults.features,

    // Arrays with no hardcoded fallback — use Firestore or empty array.
    // "Adding a new item appends" works because the form is loaded from this
    // merged result; the user edits the in-memory array; save writes it back.
    sections: Array.isArray(fsSub?.sections) && fsSub!.sections!.length > 0
      ? fsSub!.sections!
      : [],
    gallery: Array.isArray(fsSub?.gallery) && fsSub!.gallery!.length > 0
      ? fsSub!.gallery!
      : [],
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns the string if it is non-null and non-empty, otherwise null.
 * This lets callers use `str(value) ?? fallback` cleanly.
 */
function str(value: string | null | undefined): string | null {
  if (value == null || value === "") return null;
  return value;
}

/**
 * Strip empty / whitespace-only strings from a features array.
 * Returns null (→ triggers fallback to defaults) when the result is empty.
 *
 * Handles the divergence that previously existed:
 *   public page: fsSub?.features?.length  (counts [""] as 1 → no fallback)
 *   admin form:  cleanFeatures            (strips [""] → fallback)
 * Now both use this function, so they always agree.
 */
export function cleanFeatures(arr: unknown): string[] | null {
  if (!Array.isArray(arr)) return null;
  const clean = (arr as string[]).filter(
    (f) => typeof f === "string" && f.trim() !== ""
  );
  return clean.length > 0 ? clean : null;
}
