// Ana sayfa içerik yardımcıları
//
// getHomeContent  → Firestore REST API — Next.js Server Components için güvenli
// saveHomeContent → Firebase SDK — SADECE admin panel client bileşenlerinden çağrılır
import { fetchDoc } from "./utils";
import type { HomePageData } from "@/types/content";

export async function getHomeContent(): Promise<Partial<HomePageData>> {
  const data = await fetchDoc("site", "home");
  return data as Partial<HomePageData>;
}

export async function saveHomeContent(
  data: Partial<HomePageData>
): Promise<void> {
  const { doc, setDoc } = await import("firebase/firestore");
  const { db }          = await import("@/lib/firebase/db");
  await setDoc(doc(db, "site", "home"), data, { merge: true });
}
