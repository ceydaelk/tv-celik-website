import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";

export default async function FoldableBadge() {
  const t = await getTranslations("common");
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide bg-[#9D7C64] text-white px-2 py-0.5 rounded-sm">
      <Star size={10} />
      {t("foldableBadge")}
    </span>
  );
}
