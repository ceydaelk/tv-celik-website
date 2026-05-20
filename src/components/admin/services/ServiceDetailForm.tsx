"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X, ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import type { ServiceSection, GalleryItem } from "@/types/content";
import { getMergedSubcategoryAdmin, saveSubcategory } from "@/lib/firestore/services";
import { CATEGORY_FEATURES, GENERIC_FEATURES, CATEGORY_IMAGES } from "@/data/services";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SaveStatus, { type SaveStatusValue } from "@/components/admin/SaveStatus";

type F = {
  slug: string; label: string; categorySlug: string; order: number; isActive: boolean;
  pageTitle: string; badge: string; subtitle: string;
  imageUrl: string; shortDescription: string; description: string;
  features: string[];
  sections: ServiceSection[];
  ctaWhatsappText: string; gallery: GalleryItem[];
  seoTitle: string; seoDescription: string;
};

const EMPTY: F = {
  slug: "", label: "", categorySlug: "", order: 0, isActive: true,
  pageTitle: "", badge: "", subtitle: "",
  imageUrl: "", shortDescription: "", description: "",
  features: [], sections: [],
  ctaWhatsappText: "", gallery: [],
  seoTitle: "", seoDescription: "",
};

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

export default function ServiceDetailForm({ slug }: { slug: string }) {
  const [form, setForm]       = useState<F>({ ...EMPTY, slug });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [status, setStatus]   = useState<SaveStatusValue>("idle");
  const [errMsg, setErrMsg]   = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const m = await getMergedSubcategoryAdmin(slug);
      if (!m) { setNotFound(true); return; }
      setForm({
        slug:             m.slug || slug,
        label:            m.label,
        categorySlug:     m.categorySlug,
        order:            m.order,
        isActive:         m.isActive,
        pageTitle:        m.pageTitle,
        badge:            m.badge,
        subtitle:         m.subtitle,
        imageUrl:         m.imageUrl,
        shortDescription: m.shortDescription,
        description:      m.description,
        features:         m.features,
        sections:         m.sections,
        ctaWhatsappText:  m.ctaWhatsappText,
        gallery:          m.gallery,
        seoTitle:         m.seoTitle,
        seoDescription:   m.seoDescription,
      });
    } catch (e) {
      setErrMsg("Yüklenemedi: " + (e instanceof Error ? e.message : String(e)));
    } finally { setLoading(false); }
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  async function handleSave() {
    setStatus("saving"); setErrMsg("");
    try {
      const cleanedFeatures = form.features.filter((f) => f.trim() !== "");
      await saveSubcategory(form.slug, {
        slug:             form.slug,
        label:            form.label,
        categorySlug:     form.categorySlug,
        order:            form.order,
        description:      form.description,
        isActive:         form.isActive,
        pageTitle:        form.pageTitle,
        badge:            form.badge,
        subtitle:         form.subtitle,
        imageUrl:         form.imageUrl,
        shortDescription: form.shortDescription,
        features:         cleanedFeatures,
        sections:         form.sections,
        ctaWhatsappText:  form.ctaWhatsappText,
        gallery:          form.gallery,
        seoTitle:         form.seoTitle,
        seoDescription:   form.seoDescription,
      });
      setForm((p) => ({ ...p, features: cleanedFeatures }));
      setStatus("success");
    } catch (e) {
      setErrMsg("Kayıt başarısız: " + (e instanceof Error ? e.message : String(e)));
      setStatus("error");
    }
  }

  // ── Field helpers ────────────────────────────────────────────────────────────
  function upd<K extends keyof F>(key: K, val: F[K]) {
    setForm((p) => ({ ...p, [key]: val })); setStatus("idle");
  }

  // ── Features ─────────────────────────────────────────────────────────────────
  function addFeature() {
    setForm((p) => ({ ...p, features: [...p.features, ""] })); setStatus("idle");
  }
  function setFeature(i: number, v: string) {
    setForm((p) => ({ ...p, features: p.features.map((f, j) => j === i ? v : f) })); setStatus("idle");
  }
  function removeFeature(i: number) {
    setForm((p) => ({ ...p, features: p.features.filter((_, j) => j !== i) })); setStatus("idle");
  }
  function moveFeature(i: number, dir: -1 | 1) {
    setForm((p) => {
      const a = [...p.features], j = i + dir;
      if (j < 0 || j >= a.length) return p;
      [a[i], a[j]] = [a[j], a[i]];
      return { ...p, features: a };
    }); setStatus("idle");
  }
  function resetFeatures() {
    setForm((p) => ({ ...p, features: CATEGORY_FEATURES[p.categorySlug] ?? GENERIC_FEATURES }));
    setStatus("idle");
  }

  // ── Sections ─────────────────────────────────────────────────────────────────
  function addSection() {
    setForm((p) => ({ ...p, sections: [...p.sections, { id: uid(), title: "", text: "", imageUrl: "" }] }));
    setStatus("idle");
  }
  function updSection(i: number, patch: Partial<ServiceSection>) {
    setForm((p) => ({ ...p, sections: p.sections.map((s, j) => j === i ? { ...s, ...patch } : s) }));
    setStatus("idle");
  }
  function removeSection(i: number) {
    setForm((p) => ({ ...p, sections: p.sections.filter((_, j) => j !== i) })); setStatus("idle");
  }
  function moveSection(i: number, dir: -1 | 1) {
    setForm((p) => {
      const a = [...p.sections], j = i + dir;
      if (j < 0 || j >= a.length) return p;
      [a[i], a[j]] = [a[j], a[i]];
      return { ...p, sections: a };
    }); setStatus("idle");
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="p-6 flex items-center gap-2 text-sm text-[#8A8680]">
      <div className="w-4 h-4 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin" /> Yükleniyor...
    </div>
  );
  if (notFound) return (
    <div className="p-6 space-y-3">
      <p className="text-sm text-red-600">Hizmet bulunamadı.</p>
      <Link href="/admin/services" className="flex items-center gap-1.5 text-sm text-[#9D7C64]"><ArrowLeft size={13} /> Geri dön</Link>
    </div>
  );

  return (
    <div className="p-6 max-w-2xl space-y-5">

      {/* Nav */}
      <Link href="/admin/services" className="inline-flex items-center gap-1.5 text-sm text-[#8A8680] hover:text-[#1C1C1C] transition-colors">
        <ArrowLeft size={13} /> Hizmetlere Dön
      </Link>

      {/* Title */}
      <div className="border-b border-[#DDDBD6] pb-3">
        <h1 className="text-lg font-bold text-[#1C1C1C]">{form.label}</h1>
        <a href={`/hizmetler/${form.categorySlug}/${form.slug}`} target="_blank" rel="noreferrer"
          className="text-xs text-[#9D7C64] hover:underline">Siteyi görüntüle →</a>
      </div>

      {/* ── 1. Hizmet Bilgileri ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#8A8680]">Hizmet Bilgileri</h2>

        <div>
          <label className={LBL}>Hizmet Adı</label>
          <input type="text" value={form.label} onChange={(e) => upd("label", e.target.value)} className={IN} />
        </div>

        <div>
          <label className={LBL}>Kısa Açıklama <span className={HINT}>— hizmet listesindeki kartlarda görünür</span></label>
          <textarea rows={2} value={form.shortDescription} onChange={(e) => upd("shortDescription", e.target.value)}
            className={`${IN} resize-none`} />
        </div>

        <div>
          <label className={LBL}>Açıklama <span className={HINT}>— hizmet detay sayfasında görünür</span></label>
          <textarea rows={4} value={form.description} onChange={(e) => upd("description", e.target.value)}
            className={`${IN} resize-none leading-relaxed`} />
        </div>

        <div>
          <label className={LBL}>Görsel</label>
          <ImageUploadField
            value={form.imageUrl}
            onChange={(v) => upd("imageUrl", v)}
            storagePath={`services/${form.categorySlug}`}
            fallbackUrl={CATEGORY_IMAGES[form.categorySlug]}
          />
        </div>
      </section>

      {/* ── 2. Özellikler ───────────────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#8A8680]">Özellikler</h2>
        <div className="space-y-2">
          {form.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-[#9D7C64] w-4 text-right flex-shrink-0">{i + 1}.</span>
              <input type="text" value={f} onChange={(e) => setFeature(i, e.target.value)}
                className={`${IN} flex-1`} placeholder="Özellik metni" />
              <button onClick={() => moveFeature(i, -1)} disabled={i === 0} className={IBN}><ChevronUp size={12} /></button>
              <button onClick={() => moveFeature(i, 1)} disabled={i === form.features.length - 1} className={IBN}><ChevronDown size={12} /></button>
              <button onClick={() => removeFeature(i)} className={`${IBN} hover:text-red-500`}><X size={12} /></button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={addFeature}
            className="flex items-center gap-1 text-sm text-[#9D7C64] hover:text-[#866A56] transition-colors">
            <Plus size={13} /> Ekle
          </button>
          <button onClick={resetFeatures}
            className="flex items-center gap-1 text-xs text-[#8A8680] hover:text-[#1C1C1C] transition-colors"
            title="Tüm özellikler hizmetin varsayılan listesine döner">
            <RotateCcw size={11} /> Varsayılana sıfırla
          </button>
        </div>
      </section>

      {/* ── 3. Ek Bölümler ──────────────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#8A8680]">Ek Bölümler
          <span className={`${HINT} normal-case tracking-normal ml-1`}>— sayfada ekstra metin alanı</span>
        </h2>
        <div className="space-y-3">
          {form.sections.map((sec, i) => (
            <div key={sec.id} className="border border-[#DDDBD6] rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#8A8680]">Bölüm {i + 1}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveSection(i, -1)} disabled={i === 0} className={IBN}><ChevronUp size={12} /></button>
                  <button onClick={() => moveSection(i, 1)} disabled={i === form.sections.length - 1} className={IBN}><ChevronDown size={12} /></button>
                  <button onClick={() => removeSection(i)} className={`${IBN} hover:text-red-500`}><X size={12} /></button>
                </div>
              </div>
              <input type="text" value={sec.title} onChange={(e) => updSection(i, { title: e.target.value })}
                placeholder="Başlık" className={IN} />
              <textarea rows={3} value={sec.text} onChange={(e) => updSection(i, { text: e.target.value })}
                placeholder="Metin" className={`${IN} resize-none`} />
            </div>
          ))}
        </div>
        <button onClick={addSection}
          className="flex items-center gap-1 text-sm text-[#9D7C64] hover:text-[#866A56] transition-colors">
          <Plus size={13} /> Bölüm Ekle
        </button>
      </section>

      {/* ── Görünürlük ──────────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between py-2 border-t border-[#F3F2EF]">
          <span className="text-sm text-[#1C1C1C]">
            {form.isActive ? "Sitede görünüyor" : "Siteden gizlendi"}
          </span>
          <button type="button" onClick={() => upd("isActive", !form.isActive)}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${form.isActive ? "bg-[#9D7C64]" : "bg-[#DDDBD6]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.isActive ? "left-4" : "left-0.5"}`} />
          </button>
        </div>
      </section>

      {/* ── Kaydet ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 pt-1 border-t border-[#F3F2EF]">
        <button onClick={handleSave} disabled={status === "saving"}
          className="bg-[#1C1C1C] hover:bg-[#333] disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
          {status === "saving" ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <SaveStatus status={status} errorMessage={errMsg} />
      </div>

    </div>
  );
}

const IN  = "w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors";
const IBN = "p-1 text-[#8A8680] hover:text-[#9D7C64] hover:bg-[#F3F2EF] rounded transition-colors disabled:opacity-30";
const LBL = "block text-sm text-[#1C1C1C] mb-1";
const HINT = "text-xs text-[#8A8680] font-normal";
