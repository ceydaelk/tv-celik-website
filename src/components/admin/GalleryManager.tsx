"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Upload } from "lucide-react";
import type { GalleryImage } from "@/types/content";
import { getGalleryImagesAdmin, addGalleryImage, deleteGalleryImage } from "@/lib/firestore/gallery";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function GalleryManager() {
  const [images, setImages]   = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg]   = useState("");
  const [delId, setDelId]     = useState<string | null>(null);

  // Upload state — title is optional
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setUploading]     = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getGalleryImagesAdmin();
      setImages(data);
    } catch {
      setErrMsg("Görseller yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleUpload(url: string) {
    if (!url) return;
    setUploading(true);
    try {
      const filename = url.split("/").pop()?.split("?")[0] ?? "gorsel";
      await addGalleryImage({
        url,
        filename,
        title:      uploadTitle || undefined,
        uploadedAt: new Date().toISOString(),
      });
      setUploadTitle("");
      await load();
    } catch {
      setErrMsg("Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  }

  async function confirmDel(id: string) {
    try { await deleteGalleryImage(id); setDelId(null); await load(); }
    catch { setErrMsg("Silme başarısız."); }
  }

  if (loading) return (
    <div className="p-8 flex items-center gap-2 text-sm text-[#8A8680]">
      <div className="w-4 h-4 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin" />
      Yükleniyor...
    </div>
  );

  return (
    <div className="p-8 max-w-4xl">

      <div className="mb-8 pb-5 border-b border-[#DDDBD6]">
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Galeri</h1>
        <p className="text-sm text-[#8A8680] mt-1">Site geneli fotoğraf galerisi — yükleyin ve yönetin.</p>
      </div>

      {errMsg && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errMsg}</div>
      )}

      {/* Upload panel */}
      <div className="bg-white border border-[#DDDBD6] rounded-xl p-5 mb-6 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Upload size={14} className="text-[#9D7C64]" />
          <p className="text-sm font-bold text-[#1C1C1C]">Fotoğraf Yükle</p>
        </div>
        <div>
          <label className="block text-sm text-[#1C1C1C] mb-1">
            Başlık <span className="text-xs text-[#8A8680]">(isteğe bağlı)</span>
          </label>
          <input type="text" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)}
            placeholder="Fotoğraf başlığı"
            className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors" />
        </div>
        <ImageUploadField
          value=""
          onChange={handleUpload}
          storagePath="gallery"
        />
        {uploading && <p className="text-xs text-[#8A8680]">Kaydediliyor...</p>}
      </div>

      {/* Gallery grid */}
      {images.length === 0 ? (
        <div className="bg-[#F7F8FA] border border-[#DDDBD6] rounded-xl p-10 text-center">
          <p className="text-sm text-[#8A8680]">Henüz fotoğraf yüklenmemiş.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden border border-[#DDDBD6] aspect-square bg-[#F7F8FA]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.title ?? ""} className="w-full h-full object-cover" />
              {img.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                  <p className="text-[10px] text-white truncate">{img.title}</p>
                </div>
              )}
              {/* Delete overlay */}
              {delId === img.id ? (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
                  <p className="text-xs text-white font-bold">Silinsin mi?</p>
                  <div className="flex gap-2">
                    <button onClick={() => confirmDel(img.id)}
                      className="text-xs text-white bg-red-500 hover:bg-red-600 rounded px-3 py-1">
                      Sil
                    </button>
                    <button onClick={() => setDelId(null)}
                      className="text-xs text-white border border-white/40 rounded px-3 py-1 hover:bg-white/10">
                      İptal
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setDelId(img.id)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80">
                  <X size={11} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
