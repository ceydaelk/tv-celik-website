import type { Metadata } from "next";
import HomeForm from "@/components/admin/forms/HomeForm";

export const metadata: Metadata = { title: "Ana Sayfa İçerikleri" };

export default function AdminHomePage() {
  return <HomeForm />;
}
