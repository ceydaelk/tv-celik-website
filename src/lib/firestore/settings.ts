// Site ayarları yardımcıları
//
// getSiteSettings → Firestore REST API — Next.js Server Components için güvenli
// saveSiteSettings → Firebase SDK (dynamic import) — SADECE admin panel client bileşenlerinden çağrılır
import { fetchDoc } from "./utils";
import type { SiteSettings } from "@/types/content";

export async function getSiteSettings(): Promise<Partial<SiteSettings>> {
  const data = await fetchDoc("site", "settings");
  return data as Partial<SiteSettings>;
}

export async function saveSiteSettings(data: Partial<SiteSettings>): Promise<void> {
  const { doc, setDoc } = await import("firebase/firestore");
  const { db }          = await import("@/lib/firebase/db");
  await setDoc(doc(db, "site", "settings"), data, { merge: true });
}
