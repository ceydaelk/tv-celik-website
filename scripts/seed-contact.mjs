/**
 * Tek seferlik çalıştırılacak script.
 * Firestore site/company dokümanını doğru iletişim bilgileriyle günceller.
 *
 * Kullanım:
 *   node scripts/seed-contact.mjs <firebase-auth-sifresi>
 *
 * Örnek:
 *   node scripts/seed-contact.mjs mysecretpassword
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local dosyasını parse et
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
const API_KEY    = env.NEXT_PUBLIC_FIREBASE_API_KEY;
const PROJECT_ID = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const ADMIN_EMAIL = env.NEXT_PUBLIC_ADMIN_EMAIL;
const password   = process.argv[2];

if (!password) {
  console.error("Hata: Şifre eksik.\nKullanım: node scripts/seed-contact.mjs <şifre>");
  process.exit(1);
}

if (!API_KEY || !PROJECT_ID || !ADMIN_EMAIL) {
  console.error("Hata: .env.local dosyasında Firebase yapılandırması eksik.");
  process.exit(1);
}

// Güncellenecek iletişim bilgileri
const CONTACT = {
  phone:    "+90 507 836 36 61",
  email:    "info@tvcelik.com",
  whatsapp: "905078363661",
};

// 1. Firebase Auth ile giriş yap → idToken al
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

// 2. Firestore PATCH — yalnızca phone/email/whatsapp alanlarını güncelle
async function patchCompany(idToken) {
  const url =
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}` +
    `/databases/(default)/documents/site/company` +
    `?updateMask.fieldPaths=phone&updateMask.fieldPaths=email&updateMask.fieldPaths=whatsapp`;

  const body = {
    fields: {
      phone:    { stringValue: CONTACT.phone },
      email:    { stringValue: CONTACT.email },
      whatsapp: { stringValue: CONTACT.whatsapp },
    },
  };

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) {
    console.error("Firestore güncelleme başarısız:", json.error?.message ?? JSON.stringify(json));
    process.exit(1);
  }
  return json;
}

// Ana akış
console.log(`Firebase Auth: ${ADMIN_EMAIL} ile giriş yapılıyor...`);
const idToken = await signIn();
console.log("Giriş başarılı.");

console.log("Firestore site/company güncelleniyor...");
await patchCompany(idToken);

console.log("\nBaşarılı! Güncellenen alanlar:");
console.log(`  phone:    ${CONTACT.phone}`);
console.log(`  email:    ${CONTACT.email}`);
console.log(`  whatsapp: ${CONTACT.whatsapp}`);
console.log("\nSiteyi yenileyin — değişiklikler ISR cache süresi (10 sn) sonra görünür.");
