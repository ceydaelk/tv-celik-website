"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
  return (
    <div className="group fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <span
        className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-[#1C1C1C] px-2 py-1 text-xs font-normal text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      >
        Hemen Yazın
      </span>

      {/* FAB — dark teal base, fills to recognizable green on hover */}
      <a
        href="https://wa.me/90XXXXXXXXXX?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile İletişime Geçin"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#128C7E] shadow-lg transition-all duration-300 ease-out hover:bg-[#25D366] hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-2 focus:outline-[#25D366]"
      >
        <MessageCircle size={28} className="text-white" />
      </a>
    </div>
  );
}
