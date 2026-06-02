"use client";

import { useState, useEffect } from "react";
import type { HomePageData, Stat, ProcessStep } from "@/types/content";
import { getHomeContent, saveHomeContent } from "@/lib/firestore/home";
import SaveStatus, { type SaveStatusValue } from "@/components/admin/SaveStatus";

// ── Mevcut hardcoded değerler (Firestore boşken bunlar gösterilir) ──────────
const DEFAULTS: HomePageData = {
  heroEyebrow:       "Prefabrik & Çelik Yapı",
  heroTitle:         "Çeliğin Gücüyle\nGeleceği İnşa Ediyoruz",
  heroSubtitle:      "Hafif çelik, prefabrik, konteyner ve endüstriyel yapı sistemlerinde güçlü üretim çözümleri.",
  heroImageUrl:      "",
  whatsappNumber:    "905078363661",
  heroWhatsappText:  "WhatsApp'tan Yazın",
  heroSecondaryText: "Hizmetlerimizi Keşfedin",
  stats: [
    { number: "30+",  label: "Yıllık Deneyim" },
    { number: "500+", label: "Tamamlanan Proje" },
    { number: "30+",  label: "Hizmet Verilen Şehir" },
    { number: "5",    label: "Yapı Kategorisi" },
  ],
  processTitle:    "Üretimden Teslime Süreç",
  processSubtitle: "İlk tasarımdan anahtar teslime kadar tüm süreçleri titizlikle ve şeffaf biçimde yönetiyoruz.",
  processSteps: [
    { number: "01", title: "Projelendirme",   description: "Saha ölçümü, ihtiyaç analizi ve müşteriye özel teknik proje dosyasının hazırlanması." },
    { number: "02", title: "Fabrika Üretimi", description: "Tasarıma uygun çelik yapı elemanlarının ISO standartlarında kalite kontrollü üretimi." },
    { number: "03", title: "Sevkiyat",        description: "Tüm bileşenlerin paketlenerek şantiye sahasına planlı ve güvenli lojistikle taşınması." },
    { number: "04", title: "Montaj",          description: "Uzman ekibimiz tarafından sahada hızlı, güvenli ve teknik denetime uygun kurulum." },
    { number: "05", title: "Teslim",          description: "Son kontroller ve müşteri kabulünden sonra anahtar teslim yapı devri ve garanti belgesi." },
  ],
  ctaTitle:        "Projenizi Konuşalım",
  ctaDescription:  "Prefabrik yapı, çelik sistem veya konteyner çözümü için teklif almak ister misiniz? WhatsApp'tan yazın, en kısa sürede yanıt veririz.",
  ctaResponseNote: "Ortalama yanıt süresi: 1 saat içinde",
};

export default function HomeForm() {
  const [form, setForm]       = useState<HomePageData>(DEFAULTS);
  const [status, setStatus]   = useState<SaveStatusValue>("idle");
  const [errorMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeContent()
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          ...(data.heroEyebrow       ? { heroEyebrow:       data.heroEyebrow       } : {}),
          ...(data.heroTitle         ? { heroTitle:         data.heroTitle         } : {}),
          ...(data.heroSubtitle      ? { heroSubtitle:      data.heroSubtitle      } : {}),
          ...(data.heroImageUrl      ? { heroImageUrl:      data.heroImageUrl      } : {}),
          ...(data.whatsappNumber    ? { whatsappNumber:    data.whatsappNumber    } : {}),
          ...(data.heroWhatsappText  ? { heroWhatsappText:  data.heroWhatsappText  } : {}),
          ...(data.heroSecondaryText ? { heroSecondaryText: data.heroSecondaryText } : {}),
          ...(data.stats?.length     ? { stats:             data.stats             } : {}),
          ...(data.processTitle      ? { processTitle:      data.processTitle      } : {}),
          ...(data.processSubtitle   ? { processSubtitle:   data.processSubtitle   } : {}),
          ...(data.processSteps?.length ? { processSteps:   data.processSteps      } : {}),
          ...(data.ctaTitle          ? { ctaTitle:          data.ctaTitle          } : {}),
          ...(data.ctaDescription    ? { ctaDescription:    data.ctaDescription    } : {}),
          ...(data.ctaResponseNote   ? { ctaResponseNote:   data.ctaResponseNote   } : {}),
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof HomePageData>(key: K, value: HomePageData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function setStat(index: number, field: keyof Stat, value: string) {
    set("stats", form.stats.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function setStep(index: number, field: keyof Omit<ProcessStep, "number">, value: string) {
    set("processSteps", form.processSteps.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  async function handleSave() {
    setStatus("saving");
    setErrMsg("");
    try {
      await saveHomeContent(form);
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
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Ana Sayfa İçerikleri</h1>
        <p className="text-sm text-[#8A8680] mt-1">
          Ana sayfadaki tüm metin ve içerikleri buradan düzenleyin.
        </p>
      </div>

      {/* ── Hero Bölümü ───────────────────────────────────────── */}
      <Sec title="Hero Bölümü">
        <Field label="Üst etiket" hint="Başlığın üzerindeki küçük metin">
          <TI value={form.heroEyebrow} onChange={(v) => set("heroEyebrow", v)} />
        </Field>
        <Field
          label="Ana başlık"
          hint="Satır sonu için Enter tuşuna basın"
        >
          <TA rows={3} value={form.heroTitle} onChange={(v) => set("heroTitle", v)} />
        </Field>
        <Field label="Alt başlık">
          <TA rows={2} value={form.heroSubtitle} onChange={(v) => set("heroSubtitle", v)} />
        </Field>
        <Field label="Arka plan görseli URL" hint="Tam URL girin (jpg, png veya webp) — boş bırakırsanız varsayılan görsel kullanılır">
          <TI value={form.heroImageUrl} onChange={(v) => set("heroImageUrl", v)} placeholder="https://..." />
        </Field>
        <Field label="WhatsApp butonu metni">
          <TI value={form.heroWhatsappText} onChange={(v) => set("heroWhatsappText", v)} />
        </Field>
        <Field label="İkincil buton metni">
          <TI value={form.heroSecondaryText} onChange={(v) => set("heroSecondaryText", v)} />
        </Field>
        <Field
          label="WhatsApp numarası"
          hint='Sayfadaki tüm WhatsApp butonlarını etkiler. Başında + olmadan, örnek: "905551234567"'
        >
          <TI value={form.whatsappNumber} onChange={(v) => set("whatsappNumber", v)} placeholder="905551234567" />
        </Field>
      </Sec>

      {/* ── İstatistikler ─────────────────────────────────────── */}
      <Sec title="İstatistikler">
        {form.stats.map((stat, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-28">
              <label className="block text-xs text-[#8A8680] mb-1">Sayı</label>
              <TI value={stat.number} onChange={(v) => setStat(i, "number", v)} placeholder="30+" />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-[#8A8680] mb-1">Etiket</label>
              <TI value={stat.label} onChange={(v) => setStat(i, "label", v)} placeholder="Yıllık Deneyim" />
            </div>
          </div>
        ))}
      </Sec>

      {/* ── Süreç Adımları ────────────────────────────────────── */}
      <Sec title="Süreç Adımları Bölümü">
        <Field label="Bölüm başlığı">
          <TI value={form.processTitle} onChange={(v) => set("processTitle", v)} />
        </Field>
        <Field label="Bölüm açıklaması">
          <TA rows={2} value={form.processSubtitle} onChange={(v) => set("processSubtitle", v)} />
        </Field>
        <div className="pt-2 space-y-5">
          {form.processSteps.map((step, i) => (
            <div key={step.number} className="border border-[#F3F2EF] rounded-lg p-4 space-y-3">
              <p className="text-xs font-bold text-[#9D7C64]">{step.number}</p>
              <Field label="Başlık">
                <TI value={step.title} onChange={(v) => setStep(i, "title", v)} />
              </Field>
              <Field label="Açıklama">
                <TA rows={2} value={step.description} onChange={(v) => setStep(i, "description", v)} />
              </Field>
            </div>
          ))}
        </div>
      </Sec>

      {/* ── İletişime Çağrı (CTA) ─────────────────────────────── */}
      <Sec title="İletişime Çağrı Bölümü">
        <Field label="Başlık">
          <TI value={form.ctaTitle} onChange={(v) => set("ctaTitle", v)} />
        </Field>
        <Field label="Açıklama">
          <TA rows={3} value={form.ctaDescription} onChange={(v) => set("ctaDescription", v)} />
        </Field>
        <Field label="Yanıt süresi notu" hint='Butonun altında görünür, örn: "Ortalama yanıt süresi: 1 saat içinde"'>
          <TI value={form.ctaResponseNote} onChange={(v) => set("ctaResponseNote", v)} />
        </Field>
      </Sec>

      {/* ── Kaydet ────────────────────────────────────────────── */}
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

// ── Yardımcı bileşenler ───────────────────────────────────────────────────

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#DDDBD6] rounded-xl p-5 space-y-4">
      <h2 className="text-sm font-bold text-[#1C1C1C] pb-3 border-b border-[#F3F2EF]">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
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

function TI({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors"
    />
  );
}

function TA({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors resize-none leading-relaxed"
    />
  );
}
