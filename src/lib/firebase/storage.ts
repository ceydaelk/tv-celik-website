// Firebase Storage — SADECE admin paneli client bileşenlerinde import edin
import { getStorage } from "firebase/storage";
import { firebaseApp } from "./app";

export const storage = getStorage(firebaseApp);
