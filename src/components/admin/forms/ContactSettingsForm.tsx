"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import type { CompanyData } from "@/types/content";
import { getCompanyData, saveCompanyData } from "@/lib/firestore/company";
import SaveStatus, { type SaveStatusValue } from "@/components/admin/SaveStatus";

type ContactFields = Pick<CompanyData, "phone" | "email" | "whatsapp" | "addresses">;

const DEFAULTS: ContactFields = {
  phone:    "+90 XXX XXX XX XX",
  email:    "info@tvcelik.com",
  whatsapp: "905078363661",
  addresses: [
    { type: "Merkez",   text: "Güzelyalı Mh. Muştu Sk Kılıçlar Apt: NO:6/1 Pendik / İstanbul" },
    { type: "Showroom", text: "Kargalı Hanbaba Mh. Sakarya Cd. No:336/A Hendek / Sakarya" },
    { type: "Fabrika",  text: "Akova Mh. 5038 Sk. No:14 Hendek / Sakarya" },
  ],
};

export default function ContactSettingsForm() {
  const [contact, setContact] = useState<ContactFields>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [status, setStatus]   = useState<SaveStatusValue>("idle");
  const [errMsg, setErrMsg]   = useState("");

  useEffect(() => {
    getCompanyData()
      .then((cd) => {
        setContact((p) => ({
          ...p,
          ...(cd.phone     != null ? { phone:     cd.phone     } : {}),
          ...(cd.email     != null ? { email:     cd.email     } : {}),
          ...(cd.whatsapp  != null ? { whatsapp:  cd.whatsapp  } : {}),
          ...(cd.addresses?.length ? { addresses: cd.addresses } : {}),
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function setC<K extends keyof ContactFields>(key: K, val: ContactFields[K]) {
    setContact((p) => ({ ...p, [key]: val })); setStatus("idle");
  }

  function setAddressText(i: number, text: string) {
    setContact((p) => ({ ...p, addresses: p.addresses.map((a, j) => j === i ? { ...a, text } : a) }));
    setStatus("idle");
  }
  function addAddress() {
    setContact((p) => ({ ...p, addresses: [...p.addresses, { type: "Yeni Adres", text: "" }] }));
    setStatus("idle");
  }
  function removeAddress(i: number) {
    setContact((p) => ({ ...p, addresses: p.addresses.filter((_, j) => j !== i) }));
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving"); setErrMsg("");
    try {
      await saveCompanyData(contact);
      setStatus("success");
    } catch (e) {
      setErrMsg("Kayıt başarısız: " + (e instanceof Error ? e.message : String(e)));
      setStatus("error");
    }
  }

  if (loading) return (
    <div className="p-6 flex items-center gap-2 text-sm text-[#8A8680]">
      <div className="w-4 h-4 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin" /> Yükleniyor...
    </div>
  );

  return (
    <div className="p-6 max-w-xl space-y-7">
      <div className="border-b border-[#DDDBD6] pb-3">
        <h1 className="text-lg font-bold text-[#1C1C1C]">İletişim</h1>
        <p className="text-sm text-[#8A8680] mt-0.5">Telefon, e-posta, WhatsApp ve adres bilgileri.</p>
      </div>

      {/* ── İletişim Bilgileri ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className={SEC}>İletişim Bilgileri</h2>

        <div>
          <label className={LBL}>Telefon</label>
          <input type="text" value={contact.phone} onChange={(e) => setC("phone", e.target.value)}
            placeholder="+90 555 123 45 67" className={IN} />
        </div>

        <div>
          <label className={LBL}>E-posta</label>
          <input type="email" value={contact.email} onChange={(e) => setC("email", e.target.value)}
            placeholder="info@firmaniz.com" className={IN} />
        </div>

        <div>
          <label className={LBL}>WhatsApp <span className={HINT}>— başında + olmadan, örnek: 905551234567</span></label>
          <input type="text" value={contact.whatsapp} onChange={(e) => setC("whatsapp", e.target.value)}
            placeholder="905551234567" className={IN} />
        </div>
      </section>

      {/* ── Adresler ────────────────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className={SEC}>Adresler</h2>
        {contact.addresses.map((addr, i) => (
          <div key={i} className="border border-[#DDDBD6] rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#9D7C64]">{addr.type}</span>
              <button onClick={() => removeAddress(i)} className="text-[#DDDBD6] hover:text-red-400 transition-colors"><X size={12} /></button>
            </div>
            <textarea rows={2} value={addr.text} onChange={(e) => setAddressText(i, e.target.value)}
              className={`${IN} resize-none`} />
          </div>
        ))}
        <button onClick={addAddress}
          className="flex items-center gap-1 text-sm text-[#9D7C64] hover:text-[#866A56] transition-colors">
          <Plus size={13} /> Adres Ekle
        </button>
      </section>

      {/* ── Kaydet ──────────────────────────────────────────────────────── */}
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

const IN   = "w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors";
const LBL  = "block text-sm text-[#1C1C1C] mb-1";
const HINT = "text-xs text-[#8A8680] font-normal";
const SEC  = "text-xs font-bold uppercase tracking-wider text-[#8A8680]";
