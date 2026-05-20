// =============================================================
// İçerik Türleri — Tüm Firestore veri yapıları buradadır
// Admin paneli ve public site bu tipleri paylaşır
// =============================================================

// ----- Ana Sayfa -----

export interface Stat {
  number: string; // "30+"
  label: string;  // "Yıllık Deneyim"
}

export interface ProcessStep {
  number: string;      // "01"
  title: string;       // "Projelendirme"
  description: string;
}

export interface HomePageData {
  heroEyebrow: string;     // "Prefabrik & Çelik Yapı"
  heroTitle: string;       // "Çeliğin Gücüyle Geleceği İnşa Ediyoruz"
  heroSubtitle: string;    // "Hafif çelik, prefabrik..."
  heroImageUrl: string;    // Unsplash ya da yüklenen görsel URL
  whatsappNumber: string;  // "905XXXXXXXXX" (başında + olmadan)
  stats: Stat[];
  ctaTitle: string;
  ctaDescription: string;
  ctaResponseNote: string; // "Ortalama yanıt süresi: 1 saat içinde"
  processTitle: string;      // "Üretimden Teslime Süreç"
  processSubtitle: string;
  processSteps: ProcessStep[];
  heroWhatsappText: string;  // "WhatsApp'tan Yazın"
  heroSecondaryText: string; // "Hizmetlerimizi Keşfedin"
}

// ----- Firma Bilgileri -----

export interface Address {
  type: string; // "Merkez" | "Showroom" | "Fabrika"
  text: string;
}

export interface CompanyData {
  about1: string;
  about2: string;
  about3: string;
  mission: string;
  vision: string;
  phone: string;         // "+90 XXX XXX XX XX"
  email: string;         // "info@tvcelik.com"
  whatsapp: string;      // "905XXXXXXXXX" (başında + olmadan)
  addresses: Address[];
}

// ----- Site Ayarları -----

export interface SiteSettings {
  seoTitle: string;        // "TV Çelik A.Ş. — Prefabrik ve Çelik Yapı Sistemleri"
  seoDescription: string;
  footerTagline: string;   // "Çelikten Güç, Yapıdan Güven"
  footerDescription: string;
  logoUrl?: string;        // Firebase Storage URL (boşsa /logo.png kullanılır)
}

// ----- Hizmetler -----

export interface ServiceSection {
  id: string;
  title: string;
  text: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
}

export interface Subcategory {
  slug: string;
  label: string;
  categorySlug: string;
  order: number;

  // Hero / başlık
  pageTitle?: string;        // Detay sayfası H1 (boşsa label kullanılır)
  badge?: string;            // H1 üzerindeki küçük etiket (boşsa kategori başlığı)
  subtitle?: string;         // H1 altına ekstra alt başlık

  // Açıklamalar
  shortDescription?: string; // Kart görünümü için kısa açıklama
  description: string;       // Detay sayfası tam açıklama

  // Görsel
  imageUrl?: string;         // Hero / kart görseli

  // Özellikler listesi
  features?: string[];       // Bullet list (boşsa CATEGORY_FEATURES hardcoded kullanılır)

  // Ek içerik bölümleri
  sections?: ServiceSection[];

  // CTA özelleştirme
  ctaWhatsappText?: string;  // WhatsApp ön dolu mesaj metni

  // Galeri
  gallery?: GalleryItem[];

  // SEO
  seoTitle?: string;
  seoDescription?: string;

  // Durum
  isActive?: boolean;        // false ise public sayfada gösterilmez (default: true)
}

export interface Category {
  id: string; // Firestore döküman ID'si (slug ile aynı)
  header: string;
  slug: string;
  order: number;
  description?: string;
  subcategories?: Subcategory[];
}

// ----- Projeler -----

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description?: string;
  imageUrl?: string;
  order: number;
  createdAt?: string;
}

// ----- Galeri -----

export interface GalleryImage {
  id: string;
  url: string;
  filename: string;
  title?: string;
  uploadedAt: string; // ISO string
}
