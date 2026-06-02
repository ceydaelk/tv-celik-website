import { initializeApp, getApps, getApp } from "firebase/app";

const REQUIRED_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

// Placeholder patterns that indicate the env var was never set properly
const PLACEHOLDER_PATTERNS = [
  /\.\.\./,           // AIzaSy.....................
  /^proje-adi/,       // proje-adi.firebaseapp.com
  /example\.com/,     // https://api.example.com
  /^123456789012$/,   // numeric placeholder sender ID
];

function isPlaceholder(value: string): boolean {
  return PLACEHOLDER_PATTERNS.some((re) => re.test(value));
}

for (const key of REQUIRED_KEYS) {
  const value = process.env[key];
  if (!value || isPlaceholder(value)) {
    console.warn(
      `Firebase config warning: ${key} is ${
        !value ? "missing" : "still a placeholder value"
      }. Check your Vercel environment variables.`
    );
  }
}

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent multiple initializations (Next.js hot-reload)
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
