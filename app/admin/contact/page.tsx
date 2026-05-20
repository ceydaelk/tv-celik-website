import type { Metadata } from "next";
import ContactSettingsForm from "@/components/admin/forms/ContactSettingsForm";

export const metadata: Metadata = { title: "İletişim ve Ayarlar" };

export default function AdminContactPage() {
  return <ContactSettingsForm />;
}
