import type { Metadata } from "next";
import CorporateForm from "@/components/admin/forms/CorporateForm";

export const metadata: Metadata = { title: "Kurumsal" };

export default function AdminCorporatePage() {
  return <CorporateForm />;
}
