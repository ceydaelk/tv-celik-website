import { Star } from "lucide-react";

export default function FoldableBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide bg-[#9D7C64] text-white px-2 py-0.5 rounded-sm">
      <Star size={10} />
      Öne Çıkan
    </span>
  );
}
