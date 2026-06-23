"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppFABProps {
  phone?: string;
}

export function WhatsAppFAB({ phone = "905467343030" }: WhatsAppFABProps) {
  return (
    <div className="group fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <span
        className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-[#1C1C1C] px-2 py-1 text-xs font-normal text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      >
        Hemen Yazın
      </span>

      {/* FAB — deep emerald base with subtle ring, brightens on hover */}
      <a
        href={`https://wa.me/${phone}?text=Merhaba%2C%20bilgi%20almak%20istiyorum.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile İletişime Geçin"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#064e3b] ring-1 ring-[#059669]/40 shadow-[0_4px_20px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out hover:bg-[#065f46] hover:ring-[#10b981]/55 hover:shadow-[0_6px_24px_rgba(5,150,105,0.18),0_2px_8px_rgba(0,0,0,0.45)] hover:scale-105 active:scale-95 focus:outline-none"
      >
        <MessageCircle size={28} className="text-white" />
      </a>
    </div>
  );
}
