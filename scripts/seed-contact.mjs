/**
 * Tek seferlik çalıştırılacak script.
 * Firestore site/company ve site/home dokümanlarını doğru iletişim bilgileriyle günceller.
 *
 * Kullanım:
 *   node scripts/seed-contact.mjs <firebase-auth-sifresi>
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = join(__dirname, "..", ".env.local");
  const lines = readFileSync(envPath, "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key) env[key.trim()] = rest.join("=").trim();
  }
  return env;
}

const env = loadEnv();
const API_KEY     = env.NEXT_PUBLIC_FIREBASE_API_KEY;
const PROJECT_ID  = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const ADMIN_EMAIL = env.NEXT_PUBLIC_ADMIN_EMAIL;
const password    = process.argv[2];

if (!password) {
  console.error("Hata: Şifre eksik.\nKullanım: node scripts/seed-contact.mjs <şifre>");
  process.exit(1);
}
if (!API_KEY || !PROJECT_ID || !ADMIN_EMAIL) {
  console.error("Hata: .env.local dosyasında Firebase yapılandırması eksik.");
  process.exit(1);
}

const WHATSAPP = "905078363661";

async function signIn() {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: ADMIN_EMAIL, password, returnSecureToken: true }),
    }
  );
  const json = await res.json();
  if (!res.ok) {
    console.error("Giriş başarısız:", json.error?.message ?? JSON.stringify(json));
    process.exit(1);
  }
  return json.idToken;
}

async function patch(idToken, collection, docId, fields, maskFields) {
  const mask = maskFields.map((f) => `updateMask.fieldPaths=${f}`).join("&");
  const url =
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}` +
    `/databases/(default)/documents/${collection}/${docId}?${mask}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ fields }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`Firestore ${collection}/${docId} güncellenemedi:`, json.error?.message ?? JSON.stringify(json));
    process.exit(1);
  }
}

console.log(`Firebase Auth: ${ADMIN_EMAIL} ile giriş yapılıyor...`);
const idToken = await signIn();
console.log("Giriş başarılı.\n");

// site/company — phone, email, whatsapp
console.log("site/company güncelleniyor...");
await patch(idToken, "site", "company",
  {
    phone:    { stringValue: "+90 507 836 36 61" },
    email:    { stringValue: "info@tvcelik.com" },
    whatsapp: { stringValue: WHATSAPP },
  },
  ["phone", "email", "whatsapp"]
);
console.log("  ✓ phone:    +90 507 836 36 61");
console.log("  ✓ email:    info@tvcelik.com");
console.log("  ✓ whatsapp: 905078363661");

// site/home — whatsappNumber
console.log("\nsite/home güncelleniyor...");
await patch(idToken, "site", "home",
  { whatsappNumber: { stringValue: WHATSAPP } },
  ["whatsappNumber"]
);
console.log("  ✓ whatsappNumber: 905078363661");

console.log("\nTamamlandı. Değişiklikler ISR cache süresi (10 sn) sonra yansır.");
