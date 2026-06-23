"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";
import MegaMenu from "@/components/layout/MegaMenu";
import MobileMenu from "@/components/layout/MobileMenu";

const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Projeler", href: "/projeler" },
  { label: "İletişim", href: "/iletisim" },
] as const;

const WHATSAPP_HREF =
  "https://wa.me/905467343030?text=Merhaba%2C%20bilgi%20almak%20istiyorum.";

// Shared base class for every nav item — text brightness is the sole state indicator
const NAV_ITEM =
  "px-5 py-3 text-sm font-normal transition-colors duration-200 ease-out focus:outline-none";

const NAV_ACTIVE = "text-white";
const NAV_IDLE   = "text-white/50 hover:text-white/85";

export default function Navbar() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/*
        relative is required so MegaMenu's "absolute top-full left-0 w-full"
        is positioned relative to the full-width header, not a narrow button wrapper.
      */}
      <header
        className="relative sticky top-0 z-50 border-b border-white/[0.07] backdrop-blur-md"
        style={{
          background: "linear-gradient(180deg, rgba(40,40,40,0.98) 0%, rgba(30,30,30,0.97) 38%, rgba(23,23,23,0.97) 70%, rgba(18,18,18,0.97) 100%)",
          boxShadow: "0 4px 24px -4px rgba(0,0,0,0.55), 0 8px 40px -8px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.055), inset 0 -1px 0 rgba(0,0,0,0.28)",
        }}
      >
        {/* Layer 1: Fine isotropic noise grain — surface micro-texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
        {/* Layer 2: Horizontal directional grain — brushed-metal surface feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='4'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015 0.70' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='4' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "400px 4px",
          }}
        />
        {/* Layer 3: Specular band — top-surface catch-light */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 right-0"
          style={{ height: "42%", background: "linear-gradient(180deg, rgba(255,255,255,0.022) 0%, transparent 100%)" }}
        />
        {/* Layer 4: Top edge highlight — single-pixel catch-light */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.11) 18%, rgba(255,255,255,0.11) 82%, transparent 100%)" }}
        />
        {/* Layer 5: Bottom vignette — surface depth, curves away from viewer */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[38%]"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 100%)" }}
        />

        <nav className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link
            href="/"
            className="relative flex-shrink-0 focus:outline-2 focus:outline-[#9D7C64]"
          >
            {/* Backing atmosphere — warm copper centre, dark rim, creates depth behind logo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 58%, rgba(157,124,100,0.045) 0%, rgba(8,8,8,0.13) 60%, transparent 80%)",
              }}
            />

            {/* Logo — drop-shadow follows transparent PNG shape, not the bounding box */}
            <Image
              src="/logo.png"
              alt="TV Çelik"
              width={1056}
              height={777}
              className="relative h-[65px] w-auto object-contain"
              style={{
                filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.68)) drop-shadow(0 1px 3px rgba(0,0,0,0.42))",
              }}
              priority
            />

            {/* Chrome sheen — imperceptible top-to-transparent overlay, catch-light on logo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.024] mix-blend-overlay"
              style={{ background: "linear-gradient(180deg, #fff 0%, transparent 55%)" }}
            />
          </Link>

          {/* Desktop nav — all items in one group so WhatsApp feels integrated */}
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

            {/* Hizmetler — opens mega menu on hover */}
            <button
              onMouseEnter={() => setMegaMenuOpen(true)}
              aria-haspopup="true"
              aria-expanded={megaMenuOpen}
              className={`${NAV_ITEM} ${pathname.startsWith("/hizmetler") ? NAV_ACTIVE : NAV_IDLE}`}
            >
              Hizmetler
            </button>

            {/* Hairline separator — makes CTA feel integrated, not floating */}
            <div
              className="mx-6 h-5 w-px bg-white/[0.10]"
              onMouseEnter={() => setMegaMenuOpen(false)}
            />

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
              WhatsApp&apos;tan Yazın
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menüyü Aç"
            className="flex h-10 w-10 items-center justify-center text-white/65 transition-colors hover:text-white focus:outline-2 focus:outline-[#9D7C64] md:hidden"
          >
            <Menu size={22} />
          </button>
        </nav>

        {/* MegaMenu rendered at header level — gets full viewport width */}
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
