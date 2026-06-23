"use client";
import { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

export interface LightboxImage {
  url: string;
  caption: string;
}

interface Props {
  images: LightboxImage[];
  startIdx: number;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;

export default function Lightbox({ images, startIdx, onClose }: Props) {
  const [activeIdx, setActiveIdx] = useState(startIdx);
  const [imgVisible, setImgVisible] = useState(true);
  const drag = useRef<{ startX: number; active: boolean }>({ startX: 0, active: false });

  const hasMany = images.length > 1;

  const goTo = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    setImgVisible(false);
    setTimeout(() => { setActiveIdx(idx); setImgVisible(true); }, 140);
  }, [activeIdx]);

  const prev = useCallback(() => goTo((activeIdx - 1 + images.length) % images.length), [activeIdx, images.length, goTo]);
  const next = useCallback(() => goTo((activeIdx + 1) % images.length), [activeIdx, images.length, goTo]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft"  && hasMany) prev();
    if (e.key === "ArrowRight" && hasMany) next();
  }, [onClose, prev, next, hasMany]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [handleKey]);

  function onPointerDown(e: React.PointerEvent) {
    drag.current = { startX: e.clientX, active: true };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerUp(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.active = false;
    if (Math.abs(dx) < SWIPE_THRESHOLD || !hasMany) return;
    if (dx < 0) next(); else prev();
  }
  function onPointerCancel() { drag.current.active = false; }

  const active = images[activeIdx];

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease }}
      aria-modal="true"
      role="dialog"
      aria-label="Görsel büyütme"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-sm cursor-zoom-out"
        onClick={onClose}
      />

      {/* Counter */}
      {hasMany && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 px-3 py-1 text-[11px] font-mono tabular-nums text-white/60 select-none">
          {activeIdx + 1} / {images.length}
        </div>
      )}

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Kapat"
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
      >
        <X size={18} />
      </button>

      {/* Image */}
      <div
        className="relative z-10 select-none"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div style={{ opacity: imgVisible ? 1 : 0, transition: "opacity 0.14s ease" }}>
          <Image
            src={active.url}
            alt={active.caption || ""}
            width={0}
            height={0}
            sizes="92vw"
            style={{
              display: "block",
              width:  "auto",
              height: "auto",
              maxWidth:  "92vw",
              maxHeight: "86vh",
              objectFit: "contain",
            }}
            draggable={false}
            priority
          />
        </div>
        {active.caption && (
          <p className="mt-2.5 text-center text-[12px] leading-snug text-white/45">
            {active.caption}
          </p>
        )}
      </div>

      {/* Prev / Next arrows */}
      {hasMany && (
        <>
          <button
            onClick={prev}
            aria-label="Önceki görsel"
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Sonraki görsel"
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </motion.div>,
    document.body
  );
}
