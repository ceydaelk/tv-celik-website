// Kaydetme durumu göstergesi — admin formlarında kullanılır
export type SaveStatusValue = "idle" | "saving" | "success" | "error";

interface Props {
  status: SaveStatusValue;
  errorMessage?: string;
}

export default function SaveStatus({ status, errorMessage }: Props) {
  if (status === "idle") return null;

  if (status === "saving") {
    return (
      <div className="flex items-center gap-2 text-sm text-[#8A8680]">
        <div className="w-4 h-4 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin" />
        Kaydediliyor...
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
        ✓ Başarıyla kaydedildi.
      </div>
    );
  }

  return (
    <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
      {errorMessage ?? "Bir hata oluştu. Lütfen tekrar deneyin."}
    </div>
  );
}
