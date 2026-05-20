// Firma bilgileri yardımcıları
//
// getCompanyData  → Firestore REST API kullanır — Next.js Server Components için güvenli
// saveCompanyData → Firebase SDK kullanır — SADECE admin panel client bileşenlerinden çağrılır
//                  (dynamic import ile yüklenir, server bundle'a girmez)
import { fetchDoc } from "./utils";
import type { CompanyData } from "@/types/content";

export async function getCompanyData(): Promise<Partial<CompanyData>> {
  const data = await fetchDoc("site", "company");
  return data as Partial<CompanyData>;
}

export async function saveCompanyData(
  data: Partial<CompanyData>
): Promise<void> {
  // Dynamic import → Firebase SDK sadece tarayıcıda çağrıldığında yüklenir
  const { doc, setDoc } = await import("firebase/firestore");
  const { db }          = await import("@/lib/firebase/db");
  await setDoc(doc(db, "site", "company"), data, { merge: true });
}
