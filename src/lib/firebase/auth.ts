// Firebase Auth — SADECE admin paneli client bileşenlerinde import edin
// Public sayfalarda bu dosyayı import etmeyin
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./app";

export const auth = getAuth(firebaseApp);
