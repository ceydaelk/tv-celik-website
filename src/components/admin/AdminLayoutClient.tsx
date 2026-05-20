"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // Giriş yapılmamış + login dışı bir admin sayfasında → giriş sayfasına yönlendir
      if (!currentUser && !isLoginPage) {
        router.replace("/admin/login");
      }
      // Zaten giriş yapılmış + login sayfasında → dashboard'a yönlendir
      if (currentUser && isLoginPage) {
        router.replace("/admin");
      }
    });
    return () => unsubscribe();
  }, [isLoginPage, router]);

  // Firebase Auth kontrol edilirken yükleme ekranı
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F7F8FA]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#8A8680]">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Giriş sayfası — sidebar olmadan, tam ekran form
  if (isLoginPage) {
    return <div className="h-full">{children}</div>;
  }

  // Giriş yapılmamış — boş render (router.replace devreye girecek)
  if (!user) {
    return null;
  }

  // Admin paneli — sidebar + içerik alanı
  return (
    <div className="flex h-full bg-[#F7F8FA]">
      <AdminSidebar user={user} />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
