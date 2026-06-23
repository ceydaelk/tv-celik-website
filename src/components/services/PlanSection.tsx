"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import type { ServiceSection } from "@/types/content";

interface Props {
  sections: ServiceSection[]; // only sections that have imageUrl
}

export default function PlanSection({ sections }: Props) {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  if (sections.length === 0) return null;

  const first = sections[0];
  const rest  = sections.slice(1);

  return (
    <>
      <div className="space-y-8">
        {/* First plan — full column width, dominant */}
        <figure>
          <div
            className="relative cursor-zoom-in group bg-[#F7F8FA] border border-[#EAEAE6]"
            onClick={() => setLightboxUrl(first.imageUrl!)}
          >
            {/* Natural proportions — width 100%, height auto. Portrait and landscape both preserved. */}
            <Image
              src={first.imageUrl!}
              alt={first.title || "Plan görseli"}
              width={0}
              height={0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-150">
              <ZoomIn size={22} className="text-[#1C1C1C] opacity-0 group-hover:opacity-50 transition-opacity duration-150" />
            </div>
          </div>
          <figcaption className="mt-2">
            {first.title && <p className="text-[12px] font-medium text-[#1C1C1C]">{first.title}</p>}
            {first.text  && <p className="mt-0.5 text-[11px] text-[#8A8680] leading-relaxed">{first.text}</p>}
          </figcaption>
        </figure>

        {/* Additional plans — side by side, natural proportions */}
        {rest.length > 0 && (
          <div className={rest.length === 1 ? "" : "grid grid-cols-1 sm:grid-cols-2 gap-5"}>
            {rest.map((sec) => (
              <figure key={sec.id}>
                <div
                  className="relative cursor-zoom-in group bg-[#F7F8FA] border border-[#EAEAE6]"
                  onClick={() => setLightboxUrl(sec.imageUrl!)}
                >
                  <Image
                    src={sec.imageUrl!}
                    alt={sec.title || ""}
                    width={0}
                    height={0}
                    sizes="(max-width: 640px) 100vw, 400px"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-150">
                    <ZoomIn size={18} className="text-[#1C1C1C] opacity-0 group-hover:opacity-50 transition-opacity duration-150" />
                  </div>
                </div>
                <figcaption className="mt-2">
                  {sec.title && <p className="text-[12px] font-medium text-[#1C1C1C]">{sec.title}</p>}
                  {sec.text  && <p className="mt-0.5 text-[11px] text-[#8A8680] leading-relaxed">{sec.text}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox — opens plan at full readable size */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[9999] bg-black/96 flex items-center justify-center p-6"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
            onClick={() => setLightboxUrl(null)}
            aria-label="Kapat"
          >
            <X size={20} />
          </button>
          <Image
            src={lightboxUrl}
            alt={sections.find((s) => s.imageUrl === lightboxUrl)?.title || "Plan görseli"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ maxWidth: "min(95vw, 1440px)", maxHeight: "92vh", width: "auto", height: "auto", display: "block" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
