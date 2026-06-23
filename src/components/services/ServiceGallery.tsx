"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Lightbox from "@/components/common/Lightbox";

export interface GalleryImage {
  url:     string;
  caption: string;
}

// Minimum horizontal distance (px) to count as an intentional swipe
const SWIPE_THRESHOLD = 40;

export default function ServiceGallery({ images }: { images: GalleryImage[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible,   setVisible]   = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  // Tracks the pointer-down position; stored in a ref to avoid re-renders during drag
  const drag = useRef<{ startX: number; active: boolean }>({ startX: 0, active: false });

  const goTo = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    setVisible(false);
    setTimeout(() => { setActiveIdx(idx); setVisible(true); }, 130);
  }, [activeIdx]);

  const prev = useCallback(() => goTo((activeIdx - 1 + images.length) % images.length), [activeIdx, images.length, goTo]);
  const next = useCallback(() => goTo((activeIdx + 1)                 % images.length), [activeIdx, images.length, goTo]);

  // ── Pointer-based swipe (touch + mouse) ─────────────────────────────────
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    drag.current = { startX: e.clientX, active: true };
    // Capture so pointerup fires here even if the finger slides off the element
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.active = false;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) next(); else prev();
  }

  function onPointerCancel() {
    drag.current.active = false;
  }
  // ────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const thumb = strip.children[activeIdx] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [activeIdx]);

  if (images.length === 0) return null;

  const active = images[activeIdx];
  const hasMany = images.length > 1;

  return (
    <div>

      {/* ── Main image ──────────────────────────────────────────────────────
          Natural proportions only. No maxHeight cap, no objectFit, no forced
          aspect ratio. The image renders at its own width/height ratio inside
          the column. Frame images show their full frame without cropping.

          touchAction:"pan-y" — lets the browser handle vertical scroll normally
          while we capture horizontal swipes ourselves.
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full select-none group/main"
        style={{ touchAction: "pan-y" }}
        onPointerDown={hasMany ? onPointerDown : undefined}
        onPointerUp={hasMany ? onPointerUp : undefined}
        onPointerCancel={hasMany ? onPointerCancel : undefined}
      >
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.13s ease" }}>
          <Image
            src={active.url}
            alt={active.caption || ""}
            width={0}
            height={0}
            sizes="(max-width: 1024px) 100vw, 65vw"
            style={{ display: "block", width: "100%", height: "auto" }}
            draggable={false}
          />
        </div>

        {/* Expand to lightbox — appears on hover */}
        <button
          onClick={() => setLightboxOpen(true)}
          aria-label="Görseli büyüt"
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded bg-black/35 text-white/70 opacity-0 transition-opacity duration-200 hover:bg-black/55 hover:text-white group-hover/main:opacity-100 focus:opacity-100 focus:outline-none"
        >
          <Expand size={14} />
        </button>

        {hasMany && (
          <>
            <button
              onClick={prev}
              aria-label="Önceki görsel"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/25 text-white hover:bg-black/45 transition-colors focus:outline-none"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={next}
              aria-label="Sonraki görsel"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/25 text-white hover:bg-black/45 transition-colors focus:outline-none"
            >
              <ChevronRight size={17} />
            </button>
          </>
        )}

        {hasMany && (
          <span className="absolute bottom-2 right-2.5 z-10 text-[11px] text-white font-mono tabular-nums select-none bg-black/35 px-1.5 py-0.5">
            {activeIdx + 1} / {images.length}
          </span>
        )}
      </div>

      {/* ── Thumbnail strip ─────────────────────────────────────────────────
          Fixed height (80px), width follows each image's own aspect ratio.
          No object-cover, no forced square box, no cropping.
          Active state: thin accent outline only — no dimming on inactive.
      ────────────────────────────────────────────────────────────────────── */}
      {hasMany && (
        <div
          ref={stripRef}
          className="mt-2 flex gap-1.5 overflow-x-auto focus:outline-none"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Görsel ${i + 1}`}
              className="flex-none focus:outline-none"
              style={{
                height:        80,
                outline:       i === activeIdx ? "2px solid #9D7C64" : "2px solid transparent",
                outlineOffset: "-2px",
              }}
            >
              <Image
                src={img.url}
                alt={img.caption || ""}
                width={0}
                height={0}
                sizes="200px"
                style={{ display: "block", height: 80, width: "auto" }}
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

      {active.caption && (
        <p className="mt-1.5 text-[11px] text-[#8A8680] leading-snug">{active.caption}</p>
      )}

      {/* ── Full-screen lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            key="lightbox"
            images={images}
            startIdx={activeIdx}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
