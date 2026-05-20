import type { Metadata } from "next";
import ServicesManager from "@/components/admin/services/ServicesManager";

export const metadata: Metadata = { title: "Hizmetler" };

export default function AdminServicesPage() {
  return <ServicesManager />;
}
