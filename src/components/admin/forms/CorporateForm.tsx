"use client";

import { useState, useEffect } from "react";
import type { CompanyData } from "@/types/content";
import { getCompanyData, saveCompanyData } from "@/lib/firestore/company";
import SaveStatus, { type SaveStatusValue } from "@/components/admin/SaveStatus";

type CorporateFields = Pick<CompanyData, "about1" | "about2" | "about3" | "mission" | "vision">;

const DEFAULTS: CorporateFields = {
  about1:
    "TV Çelik A.Ş. olarak, 30 yılı aşkın deneyimimizle; prefabrik yapılar, konteyner sistemleri, hafif çelik yapılar, hangarlar ve hayvan barınakları üretiminde sektörün güvenilir çözüm ortaklarından biri olmanın gururunu yaşıyoruz.",
  about2:
    "Üretimden montaja, demontajdan yeniden kuruluma ve anahtar teslim projelere kadar tüm süreçleri titizlikle yöneterek, milyonlarca insan için güvenli ve sürdürülebilir yaşam alanları oluşturduk.",
  about3:
    "Çevreye, canlılara ve insana duyarlı yaklaşımımızla; dayanıklı, fonksiyonel ve modern yapılar üretmeye, yaşam alanlarını yeniden tanımlamaya devam ediyoruz.",
  mission:
    "Kaliteli, dayanıklı ve hızlı uygulanabilir hafif çelik, prefabrik ve modüler yapı çözümleri üreterek; müşterilerimize güvenli, ekonomik ve uzun ömürlü yaşam ve çalışma alanları sunmak.",
  vision:
    "Hafif çelik ve modüler yapı sistemlerinde yenilikçi üretim anlayışıyla Türkiye'de ve dünyada güvenilir, güçlü ve tercih edilen bir marka olmak.",
};

export default function CorporateForm() {
  const [form, setForm]       = useState<CorporateFields>(DEFAULTS);
  const [status, setStatus]   = useState<SaveStatusValue>("idle");
  const [errorMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanyData()
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          ...(data.about1  != null ? { about1:  data.about1  } : {}),
          ...(data.about2  != null ? { about2:  data.about2  } : {}),
          ...(data.about3  != null ? { about3:  data.about3  } : {}),
          ...(data.mission != null ? { mission: data.mission } : {}),
          ...(data.vision  != null ? { vision:  data.vision  } : {}),
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof CorporateFields>(key: K, value: CorporateFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving"); setErrMsg("");
    try {
      // merge: true — sadece bu alanları günceller, iletişim bilgilerini silmez
      await saveCompanyData(form);
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
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Kurumsal</h1>
        <p className="text-sm text-[#8A8680] mt-1">Kurumsal sayfasındaki hakkımızda, misyon ve vizyon içeriklerini düzenleyin.</p>
      </div>

      <Sec title="Hakkımızda">
        <FL label="1. Paragraf"><TA rows={4} value={form.about1} onChange={(v) => set("about1", v)} /></FL>
        <FL label="2. Paragraf"><TA rows={4} value={form.about2} onChange={(v) => set("about2", v)} /></FL>
        <FL label="3. Paragraf"><TA rows={4} value={form.about3} onChange={(v) => set("about3", v)} /></FL>
      </Sec>

      <Sec title="Misyon & Vizyon">
        <FL label="Misyon"><TA rows={3} value={form.mission} onChange={(v) => set("mission", v)} /></FL>
        <FL label="Vizyon"><TA rows={3} value={form.vision} onChange={(v) => set("vision", v)} /></FL>
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

function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors resize-none leading-relaxed" />
  );
}
