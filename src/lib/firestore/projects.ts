// Projeler yardımcıları
import {
  collection, doc,
  addDoc, updateDoc, deleteDoc,
  query, orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase/db";
import { fetchCollection } from "./utils";
import type { Project } from "@/types/content";

// ---- Okuma (sunucu) ----

export async function getProjects(): Promise<Project[]> {
  const docs = await fetchCollection("projects");
  return (docs as unknown as Project[]).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// ---- Yazma (admin) ----

export async function getProjectsAdmin(): Promise<Project[]> {
  const snap = await getDocs(query(collection(db, "projects"), orderBy("order")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Project[];
}

export async function addProject(
  data: Omit<Project, "id">
): Promise<string> {
  const ref = await addDoc(collection(db, "projects"), data);
  return ref.id;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, "id">>
): Promise<void> {
  await updateDoc(doc(db, "projects", id), data);
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}
