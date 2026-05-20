"use client";

import { useState, useEffect } from "react";
import type { CompanyData, Address } from "@/types/content";
import { getCompanyData, saveCompanyData } from "@/lib/firestore/company";
import SaveStatus, { type SaveStatusValue } from "@/components/admin/SaveStatus";

type ContactFields = Pick<CompanyData, "phone" | "email" | "whatsapp" | "addresses">;

const DEFAULTS: ContactFields = {
  phone:    "+90 XXX XXX XX XX",
  email:    "info@tvcelik.com",
  whatsapp: "90XXXXXXXXXX",
  addresses: [
    { type: "Merkez",   text: "Güzelyalı Mh. Muştu Sk Kılıçlar Apt: NO:6/1 Pendik / İstanbul" },
    { type: "Showroom", text: "Kargalı Hanbaba Mh. Sakarya Cd. No:336/A Hendek / Sakarya" },
    { type: "Fabrika",  text: "Akova Mh. 5038 Sk. No:14 Hendek / Sakarya" },
  ],
};

export default function ContactForm() {
  const [form, setForm]       = useState<ContactFields>(DEFAULTS);
  const [status, setStatus]   = useState<SaveStatusValue>("idle");
  const [errorMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanyData()
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          ...(data.phone    != null ? { phone:    data.phone    } : {}),
          ...(data.email    != null ? { email:    data.email    } : {}),
          ...(data.whatsapp != null ? { whatsapp: data.whatsapp } : {}),
          ...(data.addresses?.length ? { addresses: data.addresses } : {}),
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof ContactFields>(key: K, value: ContactFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function setAddressText(index: number, text: string) {
    setForm((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a, i) => (i === index ? { ...a, text } : a)),
    }));
    setStatus("idle");
  }

  function setAddressType(index: number, type: string) {
    setForm((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a, i) => (i === index ? { ...a, type } : a)),
    }));
    setStatus("idle");
  }

  function addAddress() {
    setForm((prev) => ({
      ...prev,
      addresses: [...prev.addresses, { type: "Yeni Adres", text: "" }],
    }));
    setStatus("idle");
  }

  function removeAddress(index: number) {
    setForm((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index),
    }));
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving"); setErrMsg("");
    try {
      // merge: true — sadece iletişim alanlarını günceller, hakkımızda/misyon/vizyon dokunulmaz
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
        <h1 className="text-2xl font-bold text-[#1C1C1C]">İletişim</h1>
        <p className="text-sm text-[#8A8680] mt-1">İletişim sayfasındaki telefon, e-posta, WhatsApp ve adres bilgilerini düzenleyin.</p>
      </div>

      <Sec title="İletişim Bilgileri">
        <FL label="Telefon" hint='Örnek: "+90 555 123 45 67"'>
          <TI value={form.phone} onChange={(v) => set("phone", v)} placeholder="+90 555 123 45 67" />
        </FL>
        <FL label="E-posta">
          <TI type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="info@firmaniz.com" />
        </FL>
        <FL label="WhatsApp Numarası" hint='Başında + olmadan, örnek: "905551234567"'>
          <TI value={form.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="905551234567" />
        </FL>
      </Sec>

      <Sec title="Adresler">
        <div className="space-y-4">
          {form.addresses.map((addr, i) => (
            <div key={i} className="border border-[#F3F2EF] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <input value={addr.type} onChange={(e) => setAddressType(i, e.target.value)}
                  className="text-xs font-bold text-[#9D7C64] bg-transparent border-none outline-none w-32"
                  placeholder="Adres Türü" />
                <button onClick={() => removeAddress(i)}
                  className="text-xs text-[#8A8680] hover:text-red-500 transition-colors px-2 py-0.5 rounded border border-[#DDDBD6] hover:border-red-200 hover:bg-red-50">
                  Kaldır
                </button>
              </div>
              <TA rows={2} value={addr.text} onChange={(v) => setAddressText(i, v)} />
            </div>
          ))}
        </div>
        <button onClick={addAddress}
          className="mt-3 flex items-center gap-1.5 text-sm text-[#9D7C64] hover:text-[#866A56] transition-colors">
          + Adres Ekle
        </button>
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

function TI({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors" />
  );
}

function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors resize-none leading-relaxed" />
  );
}
