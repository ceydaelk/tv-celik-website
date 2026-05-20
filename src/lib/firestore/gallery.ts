// Galeri yardımcıları
import {
  collection, doc,
  addDoc, deleteDoc,
  query, orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase/db";
import { fetchCollection } from "./utils";
import type { GalleryImage } from "@/types/content";

// ---- Okuma (sunucu) ----

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const docs = await fetchCollection("gallery");
  return (docs as unknown as GalleryImage[]).sort(
    (a, b) => new Date(b.uploadedAt ?? 0).getTime() - new Date(a.uploadedAt ?? 0).getTime()
  );
}

// ---- Yazma (admin) ----

export async function getGalleryImagesAdmin(): Promise<GalleryImage[]> {
  const snap = await getDocs(
    query(collection(db, "gallery"), orderBy("uploadedAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as GalleryImage[];
}

export async function addGalleryImage(
  data: Omit<GalleryImage, "id">
): Promise<string> {
  const ref = await addDoc(collection(db, "gallery"), data);
  return ref.id;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  await deleteDoc(doc(db, "gallery", id));
}
