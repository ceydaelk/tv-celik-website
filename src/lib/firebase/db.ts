// Firestore istemcisi — admin paneli yazma işlemleri için kullanılır
// Public sayfalarda içerik okuma: src/lib/firestore/ klasöründeki helpers'ları kullanın
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./app";

export const db = getFirestore(firebaseApp);
