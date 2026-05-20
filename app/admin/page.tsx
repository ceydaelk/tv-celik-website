import type { Metadata } from "next";
import Link from "next/link";
import { Home, Wrench, FolderOpen, Building2, Phone } from "lucide-react";

export const metadata: Metadata = { title: "Yönetim Paneli" };

const PAGES = [
  { label: "Ana Sayfa",           desc: "Başlık, görsel, istatistikler, süreç adımları", href: "/admin/home",      icon: Home,      color: "text-blue-600 bg-blue-50" },
  { label: "Hizmetler",           desc: "Hizmet metinleri, görseller, özellik listesi",  href: "/admin/services",  icon: Wrench,    color: "text-amber-600 bg-amber-50" },
  { label: "Projeler",            desc: "Referans projeler",                              href: "/admin/projects",  icon: FolderOpen,color: "text-green-600 bg-green-50" },
  { label: "Kurumsal",            desc: "Hakkımızda, misyon, vizyon",                    href: "/admin/corporate", icon: Building2, color: "text-rose-600 bg-rose-50" },
  { label: "İletişim ve Ayarlar", desc: "Telefon, adres, WhatsApp, footer, logo",        href: "/admin/contact",   icon: Phone,     color: "text-teal-600 bg-teal-50" },
] as const;

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-xl font-bold text-[#1C1C1C] mb-1">Yönetim Paneli</h1>
      <p className="text-sm text-[#8A8680] mb-6">Düzenlemek istediğiniz bölümü seçin.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PAGES.map((p) => (
          <Link key={p.href} href={p.href}
            className="flex items-start gap-3 p-4 bg-white border border-[#DDDBD6] rounded-lg hover:border-[#9D7C64] hover:shadow-sm transition-all">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${p.color}`}>
              <p.icon size={15} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1C1C1C]">{p.label}</p>
              <p className="text-xs text-[#8A8680] mt-0.5 leading-relaxed">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
