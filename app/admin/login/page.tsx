"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  // TODO: remove after Firebase Auth debug
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  console.log("[debug] FIREBASE_API_KEY prefix:", apiKey ? apiKey.slice(0, 8) + "…" : "undefined");

  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPw]     = useState(false);
  const [error, setError]             = useState("");
  const [loading, setLoading]         = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/admin");
    } catch {
      setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full flex items-center justify-center p-4 bg-[#F7F8FA]">
      <div className="w-full max-w-sm">

        {/* Başlık */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1C1C1C] rounded-xl mb-4">
            <Lock size={20} className="text-[#9D7C64]" />
          </div>
          <h1 className="text-xl font-bold text-[#1C1C1C]">Admin Girişi</h1>
          <p className="text-sm text-[#8A8680] mt-1">TV Çelik Yönetim Paneli</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[#DDDBD6] p-6 shadow-sm space-y-4"
        >
          {/* Hata mesajı */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* E-posta */}
          <div>
            <label className="block text-sm font-normal text-[#1C1C1C] mb-1.5">
              E-posta
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8680]" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                required
                autoComplete="email"
                placeholder="admin@ornek.com"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors"
              />
            </div>
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-normal text-[#1C1C1C] mb-1.5">
              Şifre
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8680]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8680] hover:text-[#1C1C1C] transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Giriş butonu */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1C1C1C] hover:bg-[#333] text-white text-sm font-bold py-2.5 rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

      </div>
    </div>
  );
}
