import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbNavProps {
  items: Array<{ label: string; href?: string }>;
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm font-normal text-[#8A8680]">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#9D7C64] transition-colors focus:rounded focus:outline-2 focus:outline-[#9D7C64]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#9D7C64] font-bold">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <ChevronRight size={14} className="text-[#DDDBD6]" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
