"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { X, ChevronDown, MessageCircle } from "lucide-react";
import { CATEGORIES } from "@/data/services";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGS = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
] as const;

function LocaleSwitcherMobile() {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <div className="border-b border-white/10 py-3">
      <div className="flex gap-2">
        {LANGS.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => router.replace(pathname, { locale: code })}
            className={`flex items-center gap-2 rounded px-3 py-2 transition-colors duration-150 ${
              locale === code
                ? "bg-white/[0.07] text-white"
                : "text-white/38 hover:text-white/65"
            }`}
          >
            <span className="text-[10px] font-black tracking-[0.14em]">
              {code.toUpperCase()}
            </span>
            <span className="text-sm font-normal">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [hizmetlerOpen, setHizmetlerOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const t  = useTranslations("nav");
  const ts = useTranslations("services");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const NAV_LINKS = [
    { label: t("home"),      href: "/" as const },
    { label: t("corporate"), href: "/kurumsal" as const },
    { label: t("projects"),  href: "/projeler" as const },
    { label: t("contact"),   href: "/iletisim" as const },
  ];

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#1C1C1C] md:hidden">
      <div className="flex h-16 items-center justify-end px-6">
        <button
          onClick={onClose}
          aria-label={t("closeMenu")}
          className="flex h-12 w-12 items-center justify-center text-white focus:outline-2 focus:outline-white"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 py-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center justify-between border-b border-white/10 py-3 text-lg font-normal text-white hover:text-white/70 focus:outline-2 focus:outline-white"
          >
            {link.label}
          </Link>
        ))}

        {/* Hizmetler accordion */}
        <div className="border-b border-white/10">
          <button
            onClick={() => setHizmetlerOpen((prev) => !prev)}
            aria-expanded={hizmetlerOpen}
            aria-label={t("expandServices")}
            className="flex w-full items-center justify-between py-3 text-lg font-normal text-white"
          >
            {t("services")}
            <ChevronDown size={18} className={`transition-transform duration-200 ${hizmetlerOpen ? "rotate-180" : ""}`} />
          </button>

          {hizmetlerOpen && (
            <div className="pb-2">
              {CATEGORIES.map((cat) => {
                const catLabel = ts(`categories.${cat.slug}.header`, { fallback: cat.header });
                return (
                  <div key={cat.slug} className="border-b border-white/5">
                    <button
                      onClick={() => setOpenCategory((prev) => (prev === cat.slug ? null : cat.slug))}
                      className="flex w-full items-center justify-between py-2 pl-4 text-base font-normal text-white/70"
                    >
                      {catLabel}
                      <ChevronDown size={16} className={`mr-2 transition-transform duration-200 ${openCategory === cat.slug ? "rotate-180" : ""}`} />
                    </button>

                    {openCategory === cat.slug && (
                      <ul className="pb-2 pl-8">
                        {cat.subcategories.map((sub) => {
                          const subLabel = ts(`categories.${cat.slug}.subcategories.${sub.slug}`, { fallback: sub.label });
                          return (
                            <li key={sub.slug}>
                              <Link
                                href={`/hizmetler/${cat.slug}/${sub.slug}`}
                                onClick={onClose}
                                className="block py-1.5 text-sm text-white/60 transition-colors hover:text-white focus:outline-2 focus:outline-white"
                              >
                                {subLabel}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Language switcher */}
        <LocaleSwitcherMobile />

        {/* WhatsApp button */}
        <a
          href="https://wa.me/905467343030?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/50 py-3 text-base font-bold text-[#25D366] transition-all duration-300 ease-out hover:bg-[#25D366] hover:border-[#25D366] hover:text-white active:scale-[0.97]"
          style={{ background: "rgba(37,211,102,0.08)" }}
        >
          <MessageCircle size={18} />
          {t("whatsapp")}
        </a>
      </nav>
    </div>
  );
}
