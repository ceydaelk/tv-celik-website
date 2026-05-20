"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getSubcategoryAdmin, saveSubcategoryCard } from "@/lib/firestore/services";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SaveStatus, { type SaveStatusValue } from "@/components/admin/SaveStatus";

type CardState = {
  label: string;
  shortDescription: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
};

const EMPTY: CardState = {
  label: "", shortDescription: "", imageUrl: "", isActive: true, order: 0,
};

export default function ServiceCardForm({ slug }: { slug: string }) {
  const [initial, setInitial]   = useState<CardState | null>(null); // Firestore'dan yüklenen — değişmez
  const [form, setForm]         = useState<CardState>(EMPTY);        // Kullanıcı düzenliyor
  const [categorySlug, setCategorySlug] = useState("");
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [status, setStatus]     = useState<SaveStatusValue>("idle");
  const [errMsg, setErrMsg]     = useState("");

  useEffect(() => {
    getSubcategoryAdmin(slug)
      .then((data) => {
        if (!data) { setNotFound(true); return; }
        const card: CardState = {
          label:            data.label,
          shortDescription: data.shortDescription ?? "",
          imageUrl:         data.imageUrl ?? "",
          isActive:         data.isActive !== false,
          order:            data.order,
        };
        setInitial(card);  // mevcut görünüm için değişmez kopya
        setForm(card);     // düzenlenebilir kopya
        setCategorySlug(data.categorySlug);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  function upd<K extends keyof CardState>(key: K, val: CardState[K]) {
    setForm((p) => ({ ...p, [key]: val }));
    setStatus("idle");
  }

  async function handleSave() {
    if (!form.label.trim()) { setErrMsg("Hizmet adı boş bırakılamaz."); setStatus("error"); return; }
    setStatus("saving"); setErrMsg("");
    try {
      await saveSubcategoryCard(slug, {
        label:            form.label,
        shortDescription: form.shortDescription,
        imageUrl:         form.imageUrl,
        isActive:         form.isActive,
        order:            form.order,
        categorySlug,
      });
      // initial'ı güncelle — artık bu değerler "mevcut görünüm"
      setInitial(form);
      setStatus("success");
    } catch (e) {
      setErrMsg(`Kayıt başarısız: ${e instanceof Error ? e.message : String(e)}`);
      setStatus("error");
    }
  }

  if (loading) return (
    <div className="p-8 flex items-center gap-2 text-sm text-[#8A8680]">
      <div className="w-4 h-4 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin" />
      Yükleniyor...
    </div>
  );

  if (notFound) return (
    <div className="p-8">
      <p className="text-sm text-red-600 mb-3">Hizmet bulunamadı.</p>
      <Link href="/admin/services" className="flex items-center gap-2 text-sm text-[#9D7C64]">
        <ArrowLeft size={14} /> Hizmetlere Dön
      </Link>
    </div>
  );

  return (
    <div className="p-8 max-w-2xl space-y-6">

      {/* Gezinme */}
      <div className="flex items-center justify-between">
        <Link href="/admin/services" className="flex items-center gap-2 text-sm text-[#8A8680] hover:text-[#1C1C1C] transition-colors">
          <ArrowLeft size={14} /> Hizmetlere Dön
        </Link>
        <a href={`/hizmetler/${categorySlug}/${slug}`} target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-[#9D7C64] hover:text-[#866A56] transition-colors">
          <ExternalLink size={13} /> Sayfayı Görüntüle
        </a>
      </div>

      {/* Başlık */}
      <div className="pb-4 border-b border-[#DDDBD6]">
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Kart Düzenle</h1>
        <p className="text-sm text-[#8A8680] mt-1">
          Hizmet listesindeki kartta görünen bilgileri düzenleyin.
        </p>
      </div>

      {/* ── 1. Mevcut Görünüm ─────────────────────────────────────────── */}
      <section className="bg-white border border-[#DDDBD6] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#F3F2EF] bg-[#FAFAF9]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8A8680]">Mevcut Görünüm</p>
          <p className="text-[10px] text-[#8A8680] mt-0.5">Sitede şu an görünen içerik</p>
        </div>
        {initial && (
          <div className="p-5 flex items-start gap-4">
            {/* Görsel */}
            <div className="w-24 h-20 rounded-lg overflow-hidden border border-[#DDDBD6] bg-[#F7F8FA] flex-shrink-0 flex items-center justify-center">
              {initial.imageUrl ? (
                <Image src={initial.imageUrl} alt={initial.label} width={96} height={80} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-[#DDDBD6]">Görsel yok</span>
              )}
            </div>
            {/* Metin */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#1C1C1C]">{initial.label}</p>
                {initial.isActive
                  ? <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded">Aktif</span>
                  : <span className="text-[10px] bg-[#F3F2EF] text-[#8A8680] px-1.5 py-0.5 rounded">Pasif</span>}
              </div>
              {initial.shortDescription ? (
                <p className="text-sm text-[#8A8680] leading-relaxed line-clamp-2">{initial.shortDescription}</p>
              ) : (
                <p className="text-xs text-[#DDDBD6] italic">Kısa açıklama girilmemiş</p>
              )}
              <p className="text-xs text-[#8A8680]">Sıra: {initial.order}</p>
            </div>
          </div>
        )}
      </section>

      {/* ── 2. Düzenle ────────────────────────────────────────────────── */}
      <section className="bg-white border border-[#DDDBD6] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#F3F2EF] bg-[#FAFAF9]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8A8680]">Düzenle</p>
        </div>
        <div className="p-5 space-y-5">

          <FL label="Hizmet Adı" hint="Menü ve kartta görünür">
            <input type="text" value={form.label}
              onChange={(e) => upd("label", e.target.value)}
              className={IN} />
          </FL>

          <FL label="Kart Açıklaması" hint="Hizmet kartında kısa açıklama olarak görünür">
            <textarea rows={3} value={form.shortDescription}
              onChange={(e) => upd("shortDescription", e.target.value)}
              className={`${IN} resize-none leading-relaxed`} />
          </FL>

          <FL label="Kart Görseli">
            <ImageUploadField
              value={form.imageUrl}
              onChange={(url) => upd("imageUrl", url)}
              storagePath={`services/${categorySlug}`}
            />
          </FL>

          <FL label="Görünürlük">
            <div className="flex items-center justify-between p-3 bg-[#FAFAF9] rounded-lg border border-[#DDDBD6]">
              <span className="text-sm text-[#1C1C1C]">
                {form.isActive ? "Sitede gösteriliyor" : "Siteden gizlendi"}
              </span>
              <button type="button" onClick={() => upd("isActive", !form.isActive)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${form.isActive ? "bg-[#9D7C64]" : "bg-[#DDDBD6]"}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.isActive ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          </FL>

          <FL label="Sıra" hint="Listede kaçıncı sırada gösterileceği">
            <input type="number" value={form.order}
              onChange={(e) => upd("order", +e.target.value)}
              className={`${IN} w-28`} />
          </FL>

        </div>
      </section>

      {/* ── 3. Kaydet ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={status === "saving"}
          className="bg-[#1C1C1C] hover:bg-[#333] disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors">
          {status === "saving" ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <SaveStatus status={status} errorMessage={errMsg} />
      </div>

      {/* Detay sayfası bağlantısı */}
      <div className="pt-2 border-t border-[#F3F2EF]">
        <p className="text-xs text-[#8A8680] mb-2">
          Sayfa başlığı, ana açıklama, özellikler ve galeri gibi detay sayfası içeriklerini düzenlemek için:
        </p>
        <Link href={`/admin/services/edit/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-[#9D7C64] hover:text-[#866A56] transition-colors">
          Detay Sayfasını Düzenle →
        </Link>
      </div>

    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const IN = "w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors";

function FL({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-normal text-[#1C1C1C] mb-1.5">
        {label}
        {hint && <span className="ml-1.5 text-xs text-[#8A8680]">({hint})</span>}
      </label>
      {children}
    </div>
  );
}
