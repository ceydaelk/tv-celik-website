// Hizmet kategorileri ve alt hizmetler yardımcıları
//
// getCategories / getSubcategories → REST API — Next.js Server Components için güvenli
// getCategoriesWithSubs / save* / delete* → Firebase SDK (dynamic import, admin-only)
import { fetchCollection, fetchDoc } from "./utils";
import type { Category, Subcategory } from "@/types/content";

// ── REST API reads (server-safe) ──────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const docs = await fetchCollection("categories");
  return (docs as unknown as Category[]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// Tek bir alt hizmeti slug ile oku (sunucu tarafı, REST API)
export async function getSubcategoryBySlug(slug: string): Promise<Subcategory | null> {
  const data = await fetchDoc("subcategories", slug);
  if (!data.slug) return null;
  return data as unknown as Subcategory;
}

export async function getSubcategories(categorySlug?: string): Promise<Subcategory[]> {
  const all = await fetchCollection("subcategories");
  const typed = all as unknown as Subcategory[];
  const filtered = categorySlug
    ? typed.filter((s) => s.categorySlug === categorySlug)
    : typed;
  return filtered.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// ── Firebase SDK (admin client-side, all use dynamic import) ──────────────────

export async function getCategoriesWithSubs(): Promise<Category[]> {
  const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
  const { db } = await import("@/lib/firebase/db");

  const catSnap = await getDocs(query(collection(db, "categories"), orderBy("order")));
  const categories = catSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Category[];

  const subSnap = await getDocs(query(collection(db, "subcategories"), orderBy("order")));
  const allSubs = subSnap.docs.map((d) => ({ ...d.data() })) as Subcategory[];

  return categories.map((cat) => ({
    ...cat,
    subcategories: allSubs.filter((s) => s.categorySlug === cat.slug),
  }));
}

export async function saveCategory(
  slug: string,
  data: { header: string; slug: string; order: number }
): Promise<void> {
  const { doc, setDoc } = await import("firebase/firestore");
  const { db } = await import("@/lib/firebase/db");
  await setDoc(doc(db, "categories", slug), data, { merge: true });
}

// Firestore SDK v9+ rejects undefined values — strip them recursively before writing
function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      out[k] = v
        .map((item) =>
          item !== null && typeof item === "object"
            ? stripUndefined(item as Record<string, unknown>)
            : item
        )
        .filter((item) => item !== undefined);
    } else if (v !== null && typeof v === "object") {
      out[k] = stripUndefined(v as Record<string, unknown>);
    } else {
      out[k] = v;
    }
  }
  return out;
}

// Sadece kart alanlarını kaydeder — detay alanlarına (features, sections, gallery vb.) dokunmaz
export async function saveSubcategoryCard(
  slug: string,
  data: { label: string; shortDescription: string; imageUrl: string; isActive: boolean; order: number; categorySlug: string }
): Promise<void> {
  const { doc, setDoc } = await import("firebase/firestore");
  const { db } = await import("@/lib/firebase/db");
  await setDoc(doc(db, "subcategories", slug), data, { merge: true });
}

export async function saveSubcategory(
  slug: string,
  data: Subcategory
): Promise<void> {
  const { doc, setDoc } = await import("firebase/firestore");
  const { db } = await import("@/lib/firebase/db");
  const clean = stripUndefined(data as unknown as Record<string, unknown>);
  await setDoc(doc(db, "subcategories", slug), clean, { merge: true });
}

export async function deleteSubcategory(slug: string): Promise<void> {
  const { doc, deleteDoc } = await import("firebase/firestore");
  const { db } = await import("@/lib/firebase/db");
  await deleteDoc(doc(db, "subcategories", slug));
}

// Tek bir alt hizmeti admin panelinde taze veriyle oku (Firebase SDK)
export async function getSubcategoryAdmin(slug: string): Promise<Subcategory | null> {
  const { doc, getDoc } = await import("firebase/firestore");
  const { db }          = await import("@/lib/firebase/db");
  const snap = await getDoc(doc(db, "subcategories", slug));
  if (!snap.exists()) return null;
  return snap.data() as Subcategory;
}

/**
 * Admin için birleştirilmiş hizmet verisi.
 * Firestore değeri varsa kullanır, yoksa hardcoded varsayılanı döner.
 * Public sayfa ile birebir aynı merge mantığını kullanır → admin ve site her zaman uyumlu.
 */
export async function getMergedSubcategoryAdmin(slug: string) {
  const { mergeSubcategory } = await import("@/lib/content/mergeSubcategory");
  const { SERVICES_MAP, CATEGORIES, CATEGORY_FEATURES, GENERIC_FEATURES } =
    await import("@/data/services");

  const fsSub = await getSubcategoryAdmin(slug);
  const hc    = SERVICES_MAP[slug];

  if (!fsSub && !hc) return null;

  const categorySlug   = fsSub?.categorySlug ?? hc?.categorySlug ?? "";
  const category       = CATEGORIES.find((c) => c.slug === categorySlug);

  return mergeSubcategory(fsSub ?? null, {
    label:          hc?.label        ?? fsSub?.label       ?? slug,
    description:    hc?.description  ?? fsSub?.description ?? "",
    categorySlug,
    categoryHeader: category?.header ?? categorySlug,
    order:          fsSub?.order     ?? 0,
    features:       CATEGORY_FEATURES[categorySlug] ?? GENERIC_FEATURES,
  });
}

export async function deleteCategory(slug: string): Promise<void> {
  const { doc, deleteDoc } = await import("firebase/firestore");
  const { db } = await import("@/lib/firebase/db");
  await deleteDoc(doc(db, "categories", slug));
}
