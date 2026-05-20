"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { LayoutDashboard, Home, Wrench, FolderOpen, Building2, Phone, LogOut } from "lucide-react";

const NAV: { label: string; href: string; icon: React.ElementType; exact?: boolean }[] = [
  { label: "Panel",               href: "/admin",           icon: LayoutDashboard, exact: true },
  { label: "Ana Sayfa",           href: "/admin/home",      icon: Home },
  { label: "Hizmetler",           href: "/admin/services",  icon: Wrench },
  { label: "Projeler",            href: "/admin/projects",  icon: FolderOpen },
  { label: "Kurumsal",            href: "/admin/corporate", icon: Building2 },
  { label: "İletişim ve Ayarlar", href: "/admin/contact",   icon: Phone },
];

export default function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/admin/login");
  }

  return (
    <aside className="w-48 flex-shrink-0 bg-[#1C1C1C] flex flex-col h-full">
      <div className="px-4 py-4 border-b border-white/[0.07]">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9D7C64] mb-0.5">Yönetim</p>
        <p className="text-sm font-bold text-white tracking-widest">TV ÇELİK</p>
      </div>

      <nav className="flex-1 py-2 px-2 space-y-0.5">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                active ? "bg-[#9D7C64] text-white" : "text-white/60 hover:text-white hover:bg-white/[0.07]"
              }`}>
              <item.icon size={14} className="flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-3 border-t border-white/[0.07]">
        <p className="px-3 mb-1 text-[10px] text-white/30 truncate">{user.email}</p>
        <button onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/[0.07] transition-colors">
          <LogOut size={14} />Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
