"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface Props {
  value: string;           // URL in Firestore — empty string when nothing saved yet
  onChange: (url: string) => void;
  storagePath?: string;
  fallbackUrl?: string;    // URL the public website shows when value is empty (e.g. CATEGORY_IMAGES)
}

export default function ImageUploadField({
  value,
  onChange,
  storagePath = "uploads",
  fallbackUrl,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr]             = useState("");
  const fileRef                   = useRef<HTMLInputElement>(null);

  const stored   = value?.startsWith("http");  // saved in Firestore
  const fallback = !stored && !!fallbackUrl;   // no saved URL, but public page shows this (local or http)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErr("Sadece görsel dosyaları kabul edilir (jpg, png, webp).");
      return;
    }

    setUploading(true);
    setErr("");

    try {
      const { auth } = await import("@/lib/firebase/auth");
      if (!auth.currentUser) {
        setErr("Yükleme yapabilmek için giriş yapmış olmanız gerekir.");
        return;
      }

      const { storage }                          = await import("@/lib/firebase/storage");
      const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");

      const safeName = file.name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
      const path     = `${storagePath}/${Date.now()}_${safeName}`;

      const snapshot = await uploadBytes(ref(storage, path), file);
      const url      = await getDownloadURL(snapshot.ref);

      onChange(url);
    } catch (e) {
      console.error("[ImageUploadField] upload error:", e);
      const code = (e as { code?: string }).code;
      const msg  = e instanceof Error ? e.message : String(e);
      setErr(code ? `[${code}] ${msg}` : msg);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {stored ? (
        /* ── Saved image ──────────────────────────────────────────── */
        <div className="flex items-start gap-3 p-3 bg-[#F7F8FA] border border-[#DDDBD6] rounded-lg">
          <div className="relative w-20 h-16 rounded-md overflow-hidden border border-[#DDDBD6] flex-shrink-0">
            <Image src={value} alt="Görsel" fill className="object-cover" sizes="80px" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5 space-y-2">
            <p className="text-xs font-medium text-[#1C1C1C]">Kayıtlı görsel</p>
            <div className="flex items-center gap-2 flex-wrap">
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                className="flex items-center gap-1 text-xs text-[#9D7C64] hover:text-[#866A56] border border-[#F3D9C0] bg-white rounded px-2 py-1 transition-colors disabled:opacity-50">
                <Upload size={11} />
                {uploading ? "Yükleniyor..." : "Görseli Değiştir"}
              </button>
              <button type="button" onClick={() => { onChange(""); setErr(""); }}
                className="flex items-center gap-1 text-xs text-[#8A8680] hover:text-red-500 transition-colors">
                <X size={11} /> Kaldır
              </button>
            </div>
          </div>
        </div>
      ) : fallback ? (
        /* ── Fallback image (public page default, nothing saved yet) ─ */
        <div className="flex items-start gap-3 p-3 bg-[#F7F8FA] border border-dashed border-[#DDDBD6] rounded-lg">
          <div className="relative w-20 h-16 rounded-md overflow-hidden border border-[#DDDBD6] flex-shrink-0 opacity-70">
            <Image src={fallbackUrl!} alt="Varsayılan görsel" fill className="object-cover" sizes="80px" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5 space-y-2">
            <p className="text-xs text-[#8A8680]">Sitede şu an bu görsel gösteriliyor <span className="text-[#DDDBD6]">(varsayılan)</span></p>
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              className="flex items-center gap-1 text-xs text-[#9D7C64] hover:text-[#866A56] border border-[#F3D9C0] bg-white rounded px-2 py-1 transition-colors disabled:opacity-50">
              <Upload size={11} />
              {uploading ? "Yükleniyor..." : "Farklı Görsel Yükle"}
            </button>
          </div>
        </div>
      ) : (
        /* ── No image ─────────────────────────────────────────────── */
        <div className="flex items-center gap-3 p-3 bg-[#F7F8FA] border border-dashed border-[#DDDBD6] rounded-lg">
          <div className="w-20 h-16 rounded-md border border-[#DDDBD6] bg-white flex items-center justify-center flex-shrink-0">
            <Upload size={16} className="text-[#DDDBD6]" />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-[#8A8680]">Henüz görsel yüklenmemiş</p>
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              className="flex items-center gap-1 text-xs text-[#9D7C64] hover:text-[#866A56] border border-[#F3D9C0] bg-white rounded px-2 py-1 transition-colors disabled:opacity-50">
              <Upload size={11} />
              {uploading ? "Yükleniyor..." : "Görsel Yükle"}
            </button>
          </div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {err && <p className="text-xs text-red-600 bg-red-50 rounded px-2 py-1 break-all">{err}</p>}
    </div>
  );
}
