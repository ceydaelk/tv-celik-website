import type { Metadata } from "next";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

// Admin sayfaları hiçbir zaman statik olarak oluşturulmamalı
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin — TV Çelik", template: "%s | Admin — TV Çelik" },
  robots: { index: false, follow: false }, // Admin sayfaları arama motorlarına kapalı
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  /*
   * fixed inset-0 z-[9999] → Public sitenin navbar/footer'ı tamamen gizler.
   * AdminLayoutClient → istemci tarafında kimlik doğrulama + sidebar düzeni.
   */
  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}
