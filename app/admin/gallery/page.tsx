import type { Metadata } from "next";
import GalleryManager from "@/components/admin/GalleryManager";

export const metadata: Metadata = { title: "Galeri" };

export default function AdminGalleryPage() {
  return <GalleryManager />;
}
