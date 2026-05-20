import type { Metadata } from "next";
import ServiceDetailForm from "@/components/admin/services/ServiceDetailForm";

export const metadata: Metadata = { title: "Hizmet Düzenle" };

export default async function AdminServiceEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ServiceDetailForm slug={slug} />;
}
