"use client";

import { useState, useEffect } from "react";
import type { CompanyData } from "@/types/content";
import { getCompanyData, saveCompanyData } from "@/lib/firestore/company";
import SaveStatus, { type SaveStatusValue } from "@/components/admin/SaveStatus";

// Mevcut hardcoded değerler — Firestore boşken bunlar gösterilir
const DEFAULTS: CompanyData = {
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
  phone:    "+90 XXX XXX XX XX",
  email:    "info@tvcelik.com",
  whatsapp: "90XXXXXXXXXX",
  addresses: [
    { type: "Merkez",   text: "Güzelyalı Mh. Muştu Sk Kılıçlar Apt: NO:6/1 Pendik / İstanbul" },
    { type: "Showroom", text: "Kargalı Hanbaba Mh. Sakarya Cd. No:336/A Hendek / Sakarya" },
    { type: "Fabrika",  text: "Akova Mh. 5038 Sk. No:14 Hendek / Sakarya" },
  ],
};

export default function CompanyForm() {
  const [form, setForm]       = useState<CompanyData>(DEFAULTS);
  const [status, setStatus]   = useState<SaveStatusValue>("idle");
  const [errorMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Firestore'daki mevcut veriyi yükle
  useEffect(() => {
    getCompanyData()
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          ...(data.about1    ? { about1:    data.about1    } : {}),
          ...(data.about2    ? { about2:    data.about2    } : {}),
          ...(data.about3    ? { about3:    data.about3    } : {}),
          ...(data.mission   ? { mission:   data.mission   } : {}),
          ...(data.vision    ? { vision:    data.vision    } : {}),
          ...(data.phone     ? { phone:     data.phone     } : {}),
          ...(data.email     ? { email:     data.email     } : {}),
          ...(data.whatsapp  ? { whatsapp:  data.whatsapp  } : {}),
          ...(data.addresses?.length ? { addresses: data.addresses } : {}),
        }));
      })
      .catch(() => { /* hata olursa defaults kalır */ })
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof CompanyData>(key: K, value: CompanyData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function setAddress(index: number, text: string) {
    set("addresses", form.addresses.map((a, i) => (i === index ? { ...a, text } : a)));
  }

  async function handleSave() {
    setStatus("saving");
    setErrMsg("");
    try {
      await saveCompanyData(form);
      setStatus("success");
    } catch {
      setErrMsg("Kayıt başarısız. Firebase bağlantısını ve API anahtarını kontrol edin.");
      setStatus("error");
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center gap-2 text-sm text-[#8A8680]">
        <div className="w-4 h-4 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin" />
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl space-y-6">

      {/* Başlık */}
      <div className="pb-5 border-b border-[#DDDBD6]">
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Firma Bilgileri</h1>
        <p className="text-sm text-[#8A8680] mt-1">
          Şirket tanıtımı, iletişim bilgileri ve adresleri düzenleyin.
        </p>
      </div>

      {/* Hakkımızda */}
      <FormSection title="Hakkımızda">
        <FormField label="1. Paragraf">
          <Textarea rows={4} value={form.about1} onChange={(v) => set("about1", v)} />
        </FormField>
        <FormField label="2. Paragraf">
          <Textarea rows={4} value={form.about2} onChange={(v) => set("about2", v)} />
        </FormField>
        <FormField label="3. Paragraf">
          <Textarea rows={4} value={form.about3} onChange={(v) => set("about3", v)} />
        </FormField>
      </FormSection>

      {/* Misyon & Vizyon */}
      <FormSection title="Misyon & Vizyon">
        <FormField label="Misyon">
          <Textarea rows={3} value={form.mission} onChange={(v) => set("mission", v)} />
        </FormField>
        <FormField label="Vizyon">
          <Textarea rows={3} value={form.vision} onChange={(v) => set("vision", v)} />
        </FormField>
      </FormSection>

      {/* İletişim */}
      <FormSection title="İletişim Bilgileri">
        <FormField label="Telefon" hint='+90 ile başlayın, örnek: "+90 555 123 45 67"'>
          <TextInput
            value={form.phone}
            onChange={(v) => set("phone", v)}
            placeholder="+90 555 123 45 67"
          />
        </FormField>
        <FormField label="E-posta">
          <TextInput
            type="email"
            value={form.email}
            onChange={(v) => set("email", v)}
            placeholder="info@firmaniz.com"
          />
        </FormField>
        <FormField
          label="WhatsApp Numarası"
          hint='Başında + olmadan, örnek: "905551234567"'
        >
          <TextInput
            value={form.whatsapp}
            onChange={(v) => set("whatsapp", v)}
            placeholder="905551234567"
          />
        </FormField>
      </FormSection>

      {/* Adresler */}
      <FormSection title="Adresler">
        {form.addresses.map((addr, i) => (
          <FormField key={addr.type} label={addr.type}>
            <Textarea rows={2} value={addr.text} onChange={(v) => setAddress(i, v)} />
          </FormField>
        ))}
      </FormSection>

      {/* Kaydet */}
      <div className="flex items-center gap-4 pt-1">
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className="bg-[#1C1C1C] hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors"
        >
          {status === "saving" ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <SaveStatus status={status} errorMessage={errorMsg} />
      </div>

    </div>
  );
}

// ── Yardımcı form bileşenleri ──────────────────────────────────────────

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#DDDBD6] rounded-xl p-5 space-y-4">
      <h2 className="text-sm font-bold text-[#1C1C1C] pb-3 border-b border-[#F3F2EF]">
        {title}
      </h2>
      {children}
    </div>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
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

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors"
    />
  );
}

function Textarea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors resize-none leading-relaxed"
    />
  );
}
