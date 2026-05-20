"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, MessageCircle } from "lucide-react";
import { CATEGORIES } from "@/data/services";

const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Projeler", href: "/projeler" },
  { label: "İletişim", href: "/iletisim" },
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [hizmetlerOpen, setHizmetlerOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Body scroll lock when menu is open (per UI-SPEC §3 MobileMenu)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#1C1C1C] md:hidden">
      {/* Close button */}
      <div className="flex h-16 items-center justify-end px-6">
        <button
          onClick={onClose}
          aria-label="Menüyü Kapat"
          className="flex h-12 w-12 items-center justify-center text-white focus:outline-2 focus:outline-white"
        >
          <X size={24} />
        </button>
      </div>

      {/* Nav links */}
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
            aria-label="Hizmetleri Genişlet"
            className="flex w-full items-center justify-between py-3 text-lg font-normal text-white"
          >
            Hizmetler
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${hizmetlerOpen ? "rotate-180" : ""}`}
            />
          </button>

          {hizmetlerOpen && (
            <div className="pb-2">
              {CATEGORIES.map((cat) => (
                <div key={cat.slug} className="border-b border-white/5">
                  <button
                    onClick={() =>
                      setOpenCategory((prev) => (prev === cat.slug ? null : cat.slug))
                    }
                    className="flex w-full items-center justify-between py-2 pl-4 text-base font-normal text-white/70"
                  >
                    {cat.header}
                    <ChevronDown
                      size={16}
                      className={`mr-2 transition-transform duration-200 ${
                        openCategory === cat.slug ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openCategory === cat.slug && (
                    <ul className="pb-2 pl-8">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`/hizmetler/${cat.slug}/${sub.slug}`}
                            onClick={onClose}
                            className="block py-1.5 text-sm text-white/60 transition-colors hover:text-white focus:outline-2 focus:outline-white"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/90XXXXXXXXXX?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/50 py-3 text-base font-bold text-[#25D366] transition-all duration-300 ease-out hover:bg-[#25D366] hover:border-[#25D366] hover:text-white active:scale-[0.97]"
          style={{ background: "rgba(37,211,102,0.08)" }}
        >
          <MessageCircle size={18} />
          WhatsApp&apos;tan Yazın
        </a>
      </nav>
    </div>
  );
}
