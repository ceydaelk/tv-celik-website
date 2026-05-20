// =============================================================
// Firestore REST API yardımcı fonksiyonları
//
// Public sayfalar (Server Components) içerik okumak için
// Firebase SDK yerine Firestore REST API kullanır.
// Bu yaklaşım Next.js Server Components ile %100 uyumludur.
// =============================================================

// Firestore REST API'nin döndürdüğü iç içe değer formatını düz objeye çevirir
function parseValue(value: Record<string, unknown>): unknown {
  if ("stringValue"  in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue"  in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue"    in value) return null;
  if ("arrayValue"   in value) {
    const arr = value.arrayValue as { values?: Record<string, unknown>[] };
    return (arr.values ?? []).map(parseValue);
  }
  if ("mapValue" in value) {
    const map = value.mapValue as { fields?: Record<string, Record<string, unknown>> };
    return parseFields(map.fields ?? {});
  }
  return null;
}

function parseFields(
  fields: Record<string, Record<string, unknown>>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(fields)) {
    result[key] = parseValue(val);
  }
  return result;
}

// Tek bir Firestore dökümanını Firestore REST API ile okur
// Hata olursa boş obje döner — public site asla çökmez
export async function fetchDoc(
  collection: string,
  document: string
): Promise<Record<string, unknown>> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return {};

  const url =
    `https://firestore.googleapis.com/v1/projects/${projectId}` +
    `/databases/(default)/documents/${collection}/${document}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }, // 60 saniyede bir yenile (ISR)
    });
    if (!res.ok) return {};
    const json = await res.json();
    if (!json.fields) return {};
    return parseFields(json.fields as Record<string, Record<string, unknown>>);
  } catch {
    return {};
  }
}

// Bir koleksiyonun tüm dökümanlarını Firestore REST API ile okur
export async function fetchCollection(
  collectionPath: string
): Promise<Array<Record<string, unknown>>> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return [];

  const url =
    `https://firestore.googleapis.com/v1/projects/${projectId}` +
    `/databases/(default)/documents/${collectionPath}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    if (!json.documents) return [];
    return (json.documents as Array<{ name: string; fields?: Record<string, Record<string, unknown>> }>).map(
      (doc) => ({
        id: doc.name.split("/").pop() ?? "",
        ...parseFields(doc.fields ?? {}),
      })
    );
  } catch {
    return [];
  }
}
