"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, MessageCircle, ChevronDown } from "lucide-react";
import MegaMenu from "@/components/layout/MegaMenu";
import MobileMenu from "@/components/layout/MobileMenu";

const WHATSAPP_HREF =
  "https://wa.me/905467343030?text=Merhaba%2C%20bilgi%20almak%20istiyorum.";

const NAV_ITEM =
  "px-5 py-3 text-sm font-normal transition-colors duration-200 ease-out focus:outline-none";
const NAV_ACTIVE = "text-white";
const NAV_IDLE   = "text-white/50 hover:text-white/85";

const LANGS = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
] as const;

function LocaleSwitcher() {
  const [open, setOpen] = useState(false);
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const ref      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function switchLocale(code: "tr" | "en") {
    setOpen(false);
    router.replace(pathname, { locale: code });
  }

  return (
    <div ref={ref} className="relative" style={{ zIndex: 60 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-[5px] px-2 py-1.5 text-[11px] font-bold tracking-wider transition-colors duration-150 focus:outline-none select-none"
        style={{ color: open ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)" }}
      >
        {locale.toUpperCase()}
        <ChevronDown
          size={10}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] w-[112px] overflow-hidden rounded"
          style={{
            background: "rgba(18,18,18,0.97)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
            zIndex: 60,
          }}
        >
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              role="option"
              aria-selected={locale === code}
              onClick={() => switchLocale(code)}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors duration-100"
              style={{
                background: locale === code ? "rgba(157,124,100,0.10)" : undefined,
                color: locale === code ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.42)",
              }}
              onMouseEnter={(e) => {
                if (locale !== code) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.035)";
                if (locale !== code) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
              }}
              onMouseLeave={(e) => {
                if (locale !== code) (e.currentTarget as HTMLButtonElement).style.background = "";
                if (locale !== code) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.42)";
              }}
            >
              <span className="text-[9px] font-black tracking-[0.14em] leading-none opacity-70">
                {code.toUpperCase()}
              </span>
              <span className="text-[11px] font-normal">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const NAV_LINKS = [
    { label: t("home"),      href: "/" as const },
    { label: t("corporate"), href: "/kurumsal" as const },
    { label: t("projects"),  href: "/projeler" as const },
    { label: t("contact"),   href: "/iletisim" as const },
  ];

  return (
    <>
      <header
        className="relative sticky top-0 z-50 border-b border-white/[0.07] backdrop-blur-md"
        style={{
          background: "linear-gradient(180deg, rgba(40,40,40,0.98) 0%, rgba(30,30,30,0.97) 38%, rgba(23,23,23,0.97) 70%, rgba(18,18,18,0.97) 100%)",
          boxShadow: "0 4px 24px -4px rgba(0,0,0,0.55), 0 8px 40px -8px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.055), inset 0 -1px 0 rgba(0,0,0,0.28)",
        }}
      >
        {/* Texture layers */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='4'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015 0.70' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='4' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "400px 4px" }} />
        <div aria-hidden className="pointer-events-none absolute top-0 left-0 right-0" style={{ height: "42%", background: "linear-gradient(180deg, rgba(255,255,255,0.022) 0%, transparent 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.11) 18%, rgba(255,255,255,0.11) 82%, transparent 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-[38%]" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 100%)" }} />

        <nav className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link href="/" className="relative flex-shrink-0 focus:outline-2 focus:outline-[#9D7C64]">
            <div aria-hidden className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 50% 58%, rgba(157,124,100,0.045) 0%, rgba(8,8,8,0.13) 60%, transparent 80%)" }} />
            <Image
              src="/logo.png"
              alt="TV Çelik"
              width={1056}
              height={777}
              className="relative h-[65px] w-auto object-contain"
              style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.68)) drop-shadow(0 1px 3px rgba(0,0,0,0.42))" }}
              priority
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.024] mix-blend-overlay"
              style={{ background: "linear-gradient(180deg, #fff 0%, transparent 55%)" }} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setMegaMenuOpen(false)}
                  className={`${NAV_ITEM} ${isActive ? NAV_ACTIVE : NAV_IDLE}`}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              onMouseEnter={() => setMegaMenuOpen(true)}
              aria-haspopup="true"
              aria-expanded={megaMenuOpen}
              className={`${NAV_ITEM} ${pathname.startsWith("/hizmetler") ? NAV_ACTIVE : NAV_IDLE}`}
            >
              {t("services")}
            </button>

            <div className="mx-4 h-5 w-px bg-white/[0.10]" onMouseEnter={() => setMegaMenuOpen(false)} />

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setMegaMenuOpen(false)}
              className="flex items-center gap-2 rounded-full border border-[#25D366]/35 px-5 py-2 text-sm font-bold text-[#25D366]/75 transition-all duration-300 ease-out hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:scale-[1.03] hover:shadow-[0_0_16px_rgba(37,211,102,0.18)] active:scale-95 focus:outline-2 focus:outline-[#25D366]"
              style={{ background: "rgba(37,211,102,0.05)" }}
            >
              <MessageCircle size={15} />
              {t("whatsapp")}
            </a>

            {/* Divider before locale switcher */}
            <div className="mx-3 h-5 w-px bg-white/[0.08]" onMouseEnter={() => setMegaMenuOpen(false)} />

            {/* Language dropdown */}
            <div onMouseEnter={() => setMegaMenuOpen(false)}>
              <LocaleSwitcher />
            </div>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t("openMenu")}
            className="flex h-10 w-10 items-center justify-center text-white/65 transition-colors hover:text-white focus:outline-2 focus:outline-[#9D7C64] md:hidden"
          >
            <Menu size={22} />
          </button>
        </nav>

        {megaMenuOpen && (
          <MegaMenu
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          />
        )}
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
