"use client";

import { useState, useEffect } from "react";
import type { SiteSettings } from "@/types/content";
import { getSiteSettings, saveSiteSettings } from "@/lib/firestore/settings";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SaveStatus, { type SaveStatusValue } from "@/components/admin/SaveStatus";

const DEFAULTS: SiteSettings = {
  seoTitle:          "TV Çelik A.Ş. — Prefabrik ve Çelik Yapı Sistemleri",
  seoDescription:    "30 yılı aşkın deneyimle prefabrik yapı, hafif çelik, konteyner ve endüstriyel çelik yapı sistemleri üretimi.",
  footerTagline:     "Çelikten Güç, Yapıdan Güven",
  footerDescription: "30 yılı aşkın deneyimle prefabrik yapı, hafif çelik, konteyner ve endüstriyel çelik yapı sistemleri üretimi.",
  logoUrl:           "",
};

export default function SettingsForm() {
  const [form, setForm]       = useState<SiteSettings>(DEFAULTS);
  const [status, setStatus]   = useState<SaveStatusValue>("idle");
  const [errorMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSiteSettings()
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          ...(data.seoTitle          != null ? { seoTitle:          data.seoTitle          } : {}),
          ...(data.seoDescription    != null ? { seoDescription:    data.seoDescription    } : {}),
          ...(data.footerTagline     != null ? { footerTagline:     data.footerTagline     } : {}),
          ...(data.footerDescription != null ? { footerDescription: data.footerDescription } : {}),
          ...(data.logoUrl           != null ? { logoUrl:           data.logoUrl           } : {}),
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving"); setErrMsg("");
    try {
      await saveSiteSettings(form);
      setStatus("success");
    } catch {
      setErrMsg("Kayıt başarısız.");
      setStatus("error");
    }
  }

  if (loading) return (
    <div className="p-8 flex items-center gap-2 text-sm text-[#8A8680]">
      <div className="w-4 h-4 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin" />
      Yükleniyor...
    </div>
  );

  return (
    <div className="p-8 max-w-3xl space-y-6">

      <div className="pb-5 border-b border-[#DDDBD6]">
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Ayarlar</h1>
        <p className="text-sm text-[#8A8680] mt-1">Logo, footer metni ve varsayılan SEO ayarlarını düzenleyin.</p>
      </div>

      <Sec title="Logo">
        <FL label="Site Logosu" hint="Boşsa /logo.png kullanılır">
          <ImageUploadField
            value={form.logoUrl ?? ""}
            onChange={(url) => set("logoUrl", url)}
            storagePath="branding"
          />
        </FL>
      </Sec>

      <Sec title="Footer">
        <FL label="Slogan" hint="Logonun altındaki kısa metin">
          <TI value={form.footerTagline} onChange={(v) => set("footerTagline", v)} />
        </FL>
        <FL label="Açıklama" hint="Footer'daki paragraf metni">
          <TA rows={3} value={form.footerDescription} onChange={(v) => set("footerDescription", v)} />
        </FL>
      </Sec>

      <Sec title="Varsayılan SEO">
        <FL label="Sayfa Başlığı" hint="Tarayıcı sekmesi ve Google'da görünür">
          <TI value={form.seoTitle} onChange={(v) => set("seoTitle", v)} />
        </FL>
        <FL label="Açıklama" hint="Google arama önizlemesinde görünür — 160 karaktere kadar">
          <TA rows={3} value={form.seoDescription} onChange={(v) => set("seoDescription", v)} />
        </FL>
      </Sec>

      <div className="flex items-center gap-4 pt-1">
        <button onClick={handleSave} disabled={status === "saving"}
          className="bg-[#1C1C1C] hover:bg-[#333] disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors">
          {status === "saving" ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <SaveStatus status={status} errorMessage={errorMsg} />
      </div>

    </div>
  );
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#DDDBD6] rounded-xl p-5 space-y-4">
      <h2 className="text-sm font-bold text-[#1C1C1C] pb-3 border-b border-[#F3F2EF]">{title}</h2>
      {children}
    </div>
  );
}

function FL({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-normal text-[#1C1C1C] mb-1">
        {label}
        {hint && <span className="ml-1.5 text-xs text-[#8A8680]">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function TI({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors" />
  );
}

function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors resize-none leading-relaxed" />
  );
}
