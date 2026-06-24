"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/data/services";

interface MegaMenuProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenu({ onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const t = useTranslations("services");

  return (
    <div
      className="absolute left-0 top-full z-40 w-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="border-t-2 border-[#9D7C64] bg-[#FAFAF9] shadow-2xl">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-5 gap-8">
            {CATEGORIES.map((cat) => {
              const catHeader = t(`categories.${cat.slug}.header`, { fallback: cat.header });
              return (
                <div key={cat.slug}>
                  <Link
                    href={`/hizmetler/${cat.slug}`}
                    className="mb-3 block text-xs font-bold uppercase tracking-wide text-[#9D7C64] hover:text-[#866A56]"
                  >
                    {catHeader}
                  </Link>
                  <ul className="space-y-1">
                    {cat.subcategories.map((sub) => {
                      const subLabel = t(`categories.${cat.slug}.subcategories.${sub.slug}`, { fallback: sub.label });
                      return (
                        <li key={sub.slug}>
                          <Link
                            href={`/hizmetler/${cat.slug}/${sub.slug}`}
                            className="block py-0.5 text-sm text-[#1C1C1C] transition-all hover:translate-x-0.5 hover:text-[#9D7C64] focus:rounded focus:outline-2 focus:outline-[#9D7C64]"
                          >
                            {subLabel}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-[#DDDBD6] pt-4 text-right">
            <Link
              href="/hizmetler"
              className="text-sm font-bold text-[#9D7C64] hover:text-[#866A56]"
            >
              {t("viewAllServices")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
