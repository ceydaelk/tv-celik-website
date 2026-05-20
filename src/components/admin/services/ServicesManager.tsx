"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import type { Category } from "@/types/content";
import { getCategoriesWithSubs, saveCategory, saveSubcategory, deleteSubcategory } from "@/lib/firestore/services";

export default function ServicesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]       = useState(true);
  const [seeding, setSeeding]       = useState(false);
  const [openCat, setOpenCat]       = useState<string | null>(null);
  const [err, setErr]               = useState("");

  // Add service modal
  const [addModal, setAddModal]   = useState<{ categorySlug: string; order: number } | null>(null);
  const [addSlug, setAddSlug]     = useState("");
  const [addLabel, setAddLabel]   = useState("");
  const [addSaving, setAddSaving] = useState(false);
  const [addErr, setAddErr]       = useState("");

  // Delete confirm
  const [delSlug, setDelSlug] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCategoriesWithSubs();
      setCategories(data);
      if (data.length > 0) setOpenCat((p) => p ?? data[0].id);
    } catch { setErr("Yüklenemedi."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSeed() {
    setSeeding(true);
    try {
      const { CATEGORIES } = await import("@/data/services");
      for (let i = 0; i < CATEGORIES.length; i++) {
        const cat = CATEGORIES[i];
        await saveCategory(cat.slug, { header: cat.header, slug: cat.slug, order: i });
        for (let j = 0; j < cat.subcategories.length; j++) {
          const sub = cat.subcategories[j];
          await saveSubcategory(sub.slug, {
            slug: sub.slug, label: sub.label, description: sub.description,
            categorySlug: sub.categorySlug, imageUrl: "", order: j, isActive: true, shortDescription: "",
          });
        }
      }
      await load();
    } catch { setErr("Yükleme başarısız."); }
    finally { setSeeding(false); }
  }

  function openAdd(categorySlug: string) {
    const count = categories.find((c) => c.id === categorySlug)?.subcategories?.length ?? 0;
    setAddModal({ categorySlug, order: count });
    setAddSlug(""); setAddLabel(""); setAddErr("");
  }

  async function handleAdd() {
    const slug = addSlug.trim();
    if (!addLabel.trim()) { setAddErr("Ad zorunludur."); return; }
    if (!slug) { setAddErr("Slug zorunludur."); return; }
    if (!addModal) return;
    setAddSaving(true); setAddErr("");
    try {
      await saveSubcategory(slug, {
        slug, label: addLabel, shortDescription: "", description: "",
        categorySlug: addModal.categorySlug, imageUrl: "", order: addModal.order, isActive: true,
      });
      setAddModal(null);
      await load();
    } catch { setAddErr("Kayıt başarısız."); }
    finally { setAddSaving(false); }
  }

  async function confirmDel(slug: string) {
    try { await deleteSubcategory(slug); setDelSlug(null); await load(); }
    catch { setErr("Silme başarısız."); }
  }

  if (loading) return (
    <div className="p-6 flex items-center gap-2 text-sm text-[#8A8680]">
      <div className="w-4 h-4 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin" /> Yükleniyor...
    </div>
  );

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-xl font-bold text-[#1C1C1C] mb-1">Hizmetler</h1>
      <p className="text-sm text-[#8A8680] mb-5">Düzenlemek istediğiniz hizmeti seçin.</p>

      {err && <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{err}</p>}

      {categories.length === 0 && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">İlk Kurulum</p>
          <p className="text-sm text-amber-700 mb-3">Tüm hizmetleri otomatik yükleyin.</p>
          <button onClick={handleSeed} disabled={seeding}
            className="text-sm font-semibold bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-4 py-1.5 rounded-md transition-colors">
            {seeding ? "Yükleniyor..." : "Varsayılanları Yükle"}
          </button>
        </div>
      )}

      <div className="space-y-1">
        {categories.map((cat) => {
          const open = openCat === cat.id;
          const subs = cat.subcategories ?? [];
          return (
            <div key={cat.id}>
              {/* Category row */}
              <button onClick={() => setOpenCat(open ? null : cat.id)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#F7F8FA] transition-colors text-left">
                {open ? <ChevronDown size={14} className="text-[#8A8680] flex-shrink-0" />
                       : <ChevronRight size={14} className="text-[#8A8680] flex-shrink-0" />}
                <span className="text-sm font-semibold text-[#1C1C1C]">{cat.header}</span>
                <span className="text-xs text-[#8A8680] ml-1">{subs.length}</span>
              </button>

              {/* Service rows */}
              {open && (
                <div className="ml-6 border-l border-[#DDDBD6] pl-3 mb-2 space-y-0.5">
                  {subs.map((sub) => (
                    <div key={sub.slug} className="flex items-center gap-2 py-1">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sub.isActive === false ? "bg-[#DDDBD6]" : "bg-green-500"}`} />
                      <span className="flex-1 text-sm text-[#1C1C1C] truncate">{sub.label}</span>
                      <Link href={`/admin/services/edit/${sub.slug}`}
                        className="text-xs text-[#9D7C64] hover:text-[#866A56] font-medium px-2 py-0.5 rounded border border-[#F3D9C0] hover:bg-[#FFFBF7] transition-colors">
                        Düzenle
                      </Link>
                      {delSlug === sub.slug ? (
                        <span className="flex items-center gap-1 text-xs">
                          <button onClick={() => confirmDel(sub.slug)} className="text-white bg-red-500 rounded px-2 py-0.5">Sil</button>
                          <button onClick={() => setDelSlug(null)} className="text-[#8A8680] border border-[#DDDBD6] rounded px-2 py-0.5">İptal</button>
                        </span>
                      ) : (
                        <button onClick={() => setDelSlug(sub.slug)} className="text-[#DDDBD6] hover:text-red-400 transition-colors" title="Sil">
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => openAdd(cat.id)}
                    className="flex items-center gap-1 text-xs text-[#8A8680] hover:text-[#9D7C64] py-1 transition-colors">
                    <Plus size={12} /> Hizmet Ekle
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add modal */}
      {addModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#1C1C1C]">Yeni Hizmet</h2>
              <button onClick={() => setAddModal(null)} className="text-[#8A8680] hover:text-[#1C1C1C]"><X size={16} /></button>
            </div>
            {addErr && <p className="text-sm text-red-600">{addErr}</p>}
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-[#1C1C1C] mb-1">Hizmet Adı <span className="text-red-500">*</span></label>
                <input type="text" value={addLabel} onChange={(e) => setAddLabel(e.target.value)} className={IN} />
              </div>
              <div>
                <label className="block text-sm text-[#1C1C1C] mb-1">URL (slug) <span className="text-red-500">*</span></label>
                <input type="text" value={addSlug}
                  onChange={(e) => setAddSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                  placeholder="ornek-hizmet" className={IN} />
                <p className="text-[10px] text-[#8A8680] mt-0.5">Küçük harf, rakam ve tire. Oluşturduktan sonra değiştirmeyin.</p>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={handleAdd} disabled={addSaving}
                className="bg-[#1C1C1C] hover:bg-[#333] disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                {addSaving ? "Kaydediliyor..." : "Oluştur"}
              </button>
              <button onClick={() => setAddModal(null)} className="text-sm text-[#8A8680] border border-[#DDDBD6] px-4 py-2 rounded-lg hover:text-[#1C1C1C] transition-colors">İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const IN = "w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors";
