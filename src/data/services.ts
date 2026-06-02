export interface Subcategory {
  slug: string;
  label: string;
  description: string;
  categorySlug: string;
  imagePlaceholder: string;
}

export interface Category {
  header: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
}

export const CATEGORIES: Category[] = [
  {
    header: "Prefabrik Yapılar",
    slug: "prefabrik-yapilar",
    description: "Fabrikada üretilerek sahaya monte edilen, hızlı kurulum ve uygun maliyet avantajıyla öne çıkan modüler yapı sistemleri. Konut, ofis, şantiye ve sosyal tesis projelerine hazır çözümler sunulmaktadır.",
    subcategories: [
      {
        slug: "tek-katli",
        label: "Tek katlı",
        description: "Hızlı kurulum ve uygun maliyet avantajı sunan tek katlı prefabrik yapılar.",
        categorySlug: "prefabrik-yapilar",
        imagePlaceholder: "/images/services/prefabrik-yapilar/tek-katli.jpg",
      },
      {
        slug: "iki-katli",
        label: "İki katlı",
        description: "İki katlı prefabrik yapılar ile daha geniş yaşam ve çalışma alanları.",
        categorySlug: "prefabrik-yapilar",
        imagePlaceholder: "/images/services/prefabrik-yapilar/iki-katli.jpg",
      },
      {
        slug: "villa-tipi",
        label: "Villa tipi",
        description: "Estetik ve konforlu villa tipi prefabrik konut çözümleri.",
        categorySlug: "prefabrik-yapilar",
        imagePlaceholder: "/images/services/prefabrik-yapilar/villa-tipi.jpg",
      },
      {
        slug: "santiye-yapilari",
        label: "Şantiye yapıları",
        description: "Dayanıklı ve taşınabilir şantiye ofisleri ve barınakları.",
        categorySlug: "prefabrik-yapilar",
        imagePlaceholder: "/images/services/prefabrik-yapilar/santiye-yapilari.jpg",
      },
      {
        slug: "ofis-ve-idari",
        label: "Ofis ve idari",
        description: "Modern ofis ve idari binaların prefabrik çelik yapı sistemleriyle inşaatı.",
        categorySlug: "prefabrik-yapilar",
        imagePlaceholder: "/images/services/prefabrik-yapilar/ofis-ve-idari.jpg",
      },
      {
        slug: "sosyal-tesisler",
        label: "Sosyal tesisler",
        description: "Kafeterya, spor salonu ve toplanma alanı gibi sosyal tesis prefabrik yapıları.",
        categorySlug: "prefabrik-yapilar",
        imagePlaceholder: "/images/services/prefabrik-yapilar/sosyal-tesisler.jpg",
      },
      {
        slug: "egitim-ve-saglik",
        label: "Eğitim ve sağlık",
        description: "Okul, klinik ve sağlık merkezi için hızlı temin edilebilen prefabrik yapılar.",
        categorySlug: "prefabrik-yapilar",
        imagePlaceholder: "/images/services/prefabrik-yapilar/egitim-ve-saglik.jpg",
      },
    ],
  },
  {
    header: "Hafif Çelik Yapılar",
    slug: "hafif-celik-yapilar",
    description: "Galvanizli çelik profil sistemiyle üretilen, depreme dayanıklı ve enerji verimli yapılar. Konuttan villaya, tiny house'tan modüler konut sistemine kadar geniş çözüm yelpazesi sunulmaktadır.",
    subcategories: [
      {
        slug: "hafif-celik-evler",
        label: "Hafif çelik evler",
        description: "Hafif çelik strüktür sistemiyle üretilen, depreme dayanıklı modern konutlar.",
        categorySlug: "hafif-celik-yapilar",
        imagePlaceholder: "/images/services/hafif-celik-yapilar/hafif-celik-evler.jpg",
      },
      {
        slug: "villa-projeleri",
        label: "Villa projeleri",
        description: "Hafif çelik sistemle hayata geçirilen özel villa projeleri.",
        categorySlug: "hafif-celik-yapilar",
        imagePlaceholder: "/images/services/hafif-celik-yapilar/villa-projeleri.jpg",
      },
      {
        slug: "tiny-house",
        label: "Tiny house",
        description: "Küçük alanlarda maksimum konfor sunan hafif çelik tiny house yapıları.",
        categorySlug: "hafif-celik-yapilar",
        imagePlaceholder: "/images/services/hafif-celik-yapilar/tiny-house.jpg",
      },
      {
        slug: "moduler-konut-sistemleri",
        label: "Modüler konut sistemleri",
        description: "Fabrikada üretilip sahada birleştirilen modüler hafif çelik konut sistemleri.",
        categorySlug: "hafif-celik-yapilar",
        imagePlaceholder: "/images/services/hafif-celik-yapilar/moduler-konut-sistemleri.jpg",
      },
      {
        slug: "katlanir-tasinabilir",
        label: "Katlanır / taşınabilir",
        description: "Sabit temele gerek duymadan kurulabilen, kolayca taşınıp yeniden monte edilebilen hafif çelik yapılar.",
        categorySlug: "hafif-celik-yapilar",
        imagePlaceholder: "/images/services/hafif-celik-yapilar/katlanir-tasinabilir.jpg",
      },
    ],
  },
  {
    header: "Konteyner Sistemleri",
    slug: "konteyner-sistemleri",
    description: "ISO standartlarında üretilmiş, anahtar teslim donatımlı ve modüler birleştirmeye uygun konteyner yapı çözümleri. Yaşam, ofis, şantiye ve özel tasarım projelerine hızlı teslimat imkânı.",
    subcategories: [
      {
        slug: "yasam-konteyneri",
        label: "Yaşam konteyneri",
        description: "Yüksek yalıtım standartlarında konforlu yaşam alanı sunan konteyner sistemleri.",
        categorySlug: "konteyner-sistemleri",
        imagePlaceholder: "/images/services/konteyner-sistemleri/yasam-konteyneri.jpg",
      },
      {
        slug: "ofis-konteyneri",
        label: "Ofis konteyneri",
        description: "Hızlı kurulum avantajıyla saha ve ofis ihtiyaçlarını karşılayan konteyner çözümleri.",
        categorySlug: "konteyner-sistemleri",
        imagePlaceholder: "/images/services/konteyner-sistemleri/ofis-konteyneri.jpg",
      },
      {
        slug: "santiye-konteyneri",
        label: "Şantiye konteyneri",
        description: "Şantiye operasyonları için dayanıklı ve güvenli konteyner yapıları.",
        categorySlug: "konteyner-sistemleri",
        imagePlaceholder: "/images/services/konteyner-sistemleri/santiye-konteyneri.jpg",
      },
      {
        slug: "tiny-house-konteyner",
        label: "Tiny house konteyner",
        description: "Minimal yaşam felsefesiyle tasarlanmış konteyner tiny house çözümleri.",
        categorySlug: "konteyner-sistemleri",
        imagePlaceholder: "/images/services/konteyner-sistemleri/tiny-house-konteyner.jpg",
      },
      {
        slug: "katlanir-konteyner",
        label: "Katlanır konteyner",
        description: "Taşıma ve depolama kolaylığı sağlayan, ihtiyaç anında hızla açılabilen katlanır konteyner sistemleri.",
        categorySlug: "konteyner-sistemleri",
        imagePlaceholder: "/images/services/konteyner-sistemleri/katlanir-konteyner.jpg",
      },
      {
        slug: "ozel-tasarim",
        label: "Özel tasarım",
        description: "Projeye özel ölçü ve konfigürasyonlarda üretilen konteyner yapılar.",
        categorySlug: "konteyner-sistemleri",
        imagePlaceholder: "/images/services/konteyner-sistemleri/ozel-tasarim.jpg",
      },
    ],
  },
  {
    header: "Endüstriyel Çelik Yapılar",
    slug: "endustriyel-celik-yapilar",
    description: "Geniş açıklıklı kirişsiz tasarımıyla fabrika, depo, hangar ve tarımsal yapı ihtiyaçlarına yönelik çelik sistemler. Yüksek yük kapasitesi ve uzun kullanım ömrüyle endüstriyel güvenilirlik.",
    subcategories: [
      {
        slug: "celik-hangarlar",
        label: "Çelik hangarlar",
        description: "Geniş açıklıklı ve yüksek taşıma kapasiteli endüstriyel çelik hangarlar.",
        categorySlug: "endustriyel-celik-yapilar",
        imagePlaceholder: "/images/services/endustriyel-celik-yapilar/celik-hangarlar.jpg",
      },
      {
        slug: "fabrika-binalari",
        label: "Fabrika binaları",
        description: "Üretim hatlarına uygun özelleştirilebilir çelik fabrika binası çözümleri.",
        categorySlug: "endustriyel-celik-yapilar",
        imagePlaceholder: "/images/services/endustriyel-celik-yapilar/fabrika-binalari.jpg",
      },
      {
        slug: "depolar",
        label: "Depolar",
        description: "Lojistik ve depolama operasyonları için geniş hacimli çelik depo yapıları.",
        categorySlug: "endustriyel-celik-yapilar",
        imagePlaceholder: "/images/services/endustriyel-celik-yapilar/depolar.jpg",
      },
      {
        slug: "hayvan-barinalari",
        label: "Hayvan barınakları",
        description: "Hayvancılık işletmeleri için havalandırmalı ve dayanıklı çelik barınak yapıları.",
        categorySlug: "endustriyel-celik-yapilar",
        imagePlaceholder: "/images/services/endustriyel-celik-yapilar/hayvan-barinalari.jpg",
      },
      {
        slug: "tarimsal-yapilar",
        label: "Tarımsal yapılar",
        description: "Sera, ahır ve tarım deposu gibi tarımsal faaliyetler için çelik yapı çözümleri.",
        categorySlug: "endustriyel-celik-yapilar",
        imagePlaceholder: "/images/services/endustriyel-celik-yapilar/tarimsal-yapilar.jpg",
      },
    ],
  },
  {
    header: "Yapısal Bileşenler",
    slug: "yapisal-bilesenler",
    description: "CNC plazma kesim ve özel üretim çelik profil, şasi, çatı ve kaplama sistemleri. TSE ve EN standartlarına uygun, projeden teslimata hızlı sevkiyat imkânıyla taşıyıcı sistem çözümleri.",
    subcategories: [
      {
        slug: "celik-profiller",
        label: "Çelik profiller",
        description: "Taşıyıcı sistem için hassas üretimli standart ve özel çelik profiller.",
        categorySlug: "yapisal-bilesenler",
        imagePlaceholder: "/images/services/yapisal-bilesenler/celik-profiller.jpg",
      },
      {
        slug: "sasi-sistemleri",
        label: "Şasi sistemleri",
        description: "Konteyner ve modüler yapılar için güçlü çelik şasi sistemleri.",
        categorySlug: "yapisal-bilesenler",
        imagePlaceholder: "/images/services/yapisal-bilesenler/sasi-sistemleri.jpg",
      },
      {
        slug: "cati-ve-celik-sac",
        label: "Çatı ve çelik sac",
        description: "Uzun ömürlü ve su yalıtımlı çatı kaplaması ve çelik sac ürünleri.",
        categorySlug: "yapisal-bilesenler",
        imagePlaceholder: "/images/services/yapisal-bilesenler/cati-ve-celik-sac.jpg",
      },
      {
        slug: "panel-ve-kaplama",
        label: "Panel ve kaplama",
        description: "Isı yalıtımlı sandviç panel ve cephe kaplama sistemleri.",
        categorySlug: "yapisal-bilesenler",
        imagePlaceholder: "/images/services/yapisal-bilesenler/panel-ve-kaplama.jpg",
      },
      {
        slug: "ozel-uretim",
        label: "Özel üretim",
        description: "Proje gereksinimlerine göre CNC işleme ve özel üretim çelik bileşenler.",
        categorySlug: "yapisal-bilesenler",
        imagePlaceholder: "/images/services/yapisal-bilesenler/ozel-uretim.jpg",
      },
    ],
  },
];

export const CATEGORY_IMAGES: Record<string, string> = {
  "prefabrik-yapilar":
    "/assets/services/tek-katli-prefabrik/tek-katli-prefabrik-cover (1).jpeg",
  "hafif-celik-yapilar":
    "/assets/services/cift-katli-hafif-celik/cift-katli-hafif-celik-cover (5).jpeg",
  "konteyner-sistemleri":
    "/assets/services/cift-katli-prefabrik-2/cift-katli-prefabrik-cover(4).jpeg",
  "endustriyel-celik-yapilar":
    "/assets/services/ucgen-bina-hafif-celik/ucgen-bina-hafif-celik (1).jpeg",
  "yapisal-bilesenler":
    "/assets/services/cift-katli-prefabrik/cift-katli-prefabrik (2).jpeg",
};

export const SERVICES_MAP: Record<string, Subcategory> = Object.fromEntries(
  CATEGORIES.flatMap((cat) => cat.subcategories.map((sub) => [sub.slug, sub]))
);

// Kategori başına varsayılan özellik listesi.
// Hem public sayfa hem de admin formu bu tek kaynaktan okur.
// Firestore'dan gelen features doluysa bu liste devre dışı kalır.
export const GENERIC_FEATURES = [
  "Yüksek kaliteli çelik malzeme ile uzun ömürlü yapı",
  "Proje gereksinimlerine göre özelleştirilebilir tasarım",
  "Hızlı üretim ve teslimat süreci",
  "Profesyonel montaj ve teknik destek",
];

export const CATEGORY_FEATURES: Record<string, string[]> = {
  "prefabrik-yapilar": [
    "Fabrikada üretilip sahaya monte edildiğinden inşaat süresi kısalır",
    "Çelik taşıyıcı sistem ile yüksek deprem dayanımı sağlar",
    "Standart modüler boyutlar sayesinde hızlı teslimat imkânı sunar",
    "Kapı, pencere ve yalıtım sistemleri fabrikada entegre edilir",
    "Uzun vadeli bakım maliyetleri düşük, kullanım ömrü uzundur",
  ],
  "hafif-celik-yapilar": [
    "Ağır beton strüktüre kıyasla %30–50 daha hafif yapı ağırlığı",
    "Galvanizli çelik profiller ile korozyon ve nem direnci",
    "Zemin hazırlık süresi minimuma indirilerek hızlı kurulum",
    "Sandviç panel entegrasyonu ile A sınıfı enerji verimliliği",
    "Taşınabilir veya yeniden kurulabilir yapı seçeneği mevcuttur",
  ],
  "konteyner-sistemleri": [
    "ISO standartlarında üretilmiş yüksek dayanımlı çelik gövde",
    "Fabrika çıkışlı komple donatımlı teslim (elektrik, sıhhi tesisat)",
    "Modüler birleştirme ile farklı büyüklüklerde kompleks oluşturulabilir",
    "Nakliye ve yeniden kurulum desteği ile taşınabilir çözüm",
    "Isı ve ses yalıtımı için çift cidarlı sandviç panel seçeneği",
  ],
  "endustriyel-celik-yapilar": [
    "Geniş açıklıklı kirişsiz iç mekân tasarımı imkânı",
    "Yüksek kar yükü ve rüzgar yüküne karşı hesaplı strüktür",
    "Çelik bileşenler kumlama ve boya ile uzun süreli korunur",
    "Vinç ray sistemi ve asma kat entegrasyonuna uygun çelik iskelet",
    "Hızlı montaj ile üretim kayıplarını minimize eden inşaat süreci",
  ],
  "yapisal-bilesenler": [
    "TSE ve EN standardına uygun sertifikalı çelik profiller",
    "CNC plazma kesim ve lazer işleme ile hassas toleranslar",
    "Proje bazlı özel kesit ve boy seçenekleri mevcuttur",
    "Galvaniz veya epoksi boya ile yüzey koruma alternatifleri",
    "Hızlı sevkiyat için stok yönetimi ve lojistik desteği",
  ],
};
