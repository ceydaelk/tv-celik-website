// "Nerelerde Kullanılır?" — per-category use cases shown on service detail pages.
// Two groups per category so the section renders as a 2-column layout.

export interface UseCaseGroup {
  heading: string;
  items:   string[];
}

export interface UseCases {
  group1: UseCaseGroup;
  group2: UseCaseGroup;
}

export const CATEGORY_USE_CASES: Record<string, UseCases> = {
  "prefabrik-yapilar": {
    group1: {
      heading: "Konut ve Yaşam",
      items: [
        "Müstakil ve aile konutları",
        "Şantiye personel yapıları",
        "Tatil ve yazlık evler",
        "Köy ve kırsal konutlar",
      ],
    },
    group2: {
      heading: "Ticari ve Kurumsal",
      items: [
        "Eğitim ve okul binaları",
        "Sağlık merkezi ve klinik",
        "Yönetim ve ofis binaları",
        "Sosyal ve kültürel tesisler",
      ],
    },
  },

  "hafif-celik-yapilar": {
    group1: {
      heading: "Konut",
      items: [
        "Müstakil ev ve villa projeleri",
        "Tiny house uygulamaları",
        "Yazlık ve bağ evi",
        "İkincil konut yapıları",
      ],
    },
    group2: {
      heading: "Ticari ve Toplu",
      items: [
        "Modüler konut kompleksleri",
        "Öğrenci ve personel yurdu",
        "Turizm tesisi ve bungalov",
        "Yönetim ve hizmet binaları",
      ],
    },
  },

  "konteyner-sistemleri": {
    group1: {
      heading: "Saha ve Geçici",
      items: [
        "Şantiye ofis ve yatakhanesi",
        "Güvenlik ve bekçi yapısı",
        "Geçici saha depolama",
        "Seyyar hizmet birimi",
      ],
    },
    group2: {
      heading: "Kalıcı Kullanım",
      items: [
        "Küçük işletme ofisi",
        "Perakende satış noktası",
        "Kafe ve satış standı",
        "Sanat atölyesi ve stüdyo",
      ],
    },
  },

  "endustriyel-celik-yapilar": {
    group1: {
      heading: "Sanayi ve Üretim",
      items: [
        "Fabrika ve üretim tesisi",
        "Montaj ve işleme hangarı",
        "Makine ekipman alanı",
        "Üretim destek yapıları",
      ],
    },
    group2: {
      heading: "Depolama ve Tarım",
      items: [
        "Lojistik ve dağıtım deposu",
        "Soğuk hava deposu",
        "Tahıl ve ürün ambarı",
        "Tarımsal depo ve barınak",
      ],
    },
  },

  "yapisal-bilesenler": {
    group1: {
      heading: "Yapı Sistemleri",
      items: [
        "Çelik taşıyıcı iskelet",
        "Çatı makası ve kirişi",
        "Merdiven ve platform sistemi",
        "Asma kat yapısı",
      ],
    },
    group2: {
      heading: "Endüstriyel Uygulama",
      items: [
        "Konteyner şasi sistemi",
        "Cephe ve çatı kaplaması",
        "Hangar ve depo kapısı",
        "Sundurma ve gölgelik yapısı",
      ],
    },
  },
};

export const GENERIC_USE_CASES: UseCases = {
  group1: {
    heading: "Konut ve Ticari",
    items: ["Konut ve yaşam alanı", "Ticari ve ofis yapısı", "Eğitim tesisi", "Sağlık merkezi"],
  },
  group2: {
    heading: "Endüstriyel",
    items: ["Sanayi ve üretim", "Depolama tesisi", "Tarımsal yapı", "Saha ve şantiye"],
  },
};
