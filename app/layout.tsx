import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tvcelik.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TV Çelik A.Ş. — Prefabrik, Hafif Çelik ve Konteyner Yapı Sistemleri",
  description: "TV Çelik A.Ş. — 30 yılı aşkın deneyimle prefabrik yapılar, hafif çelik evler, konteyner sistemleri ve endüstriyel çelik yapı çözümleri.",
  openGraph: {
    type:     "website",
    siteName: "TV Çelik A.Ş.",
    images:   [{ url: "/logo.png", width: 1056, height: 777, alt: "TV Çelik A.Ş." }],
  },
  twitter: {
    card:   "summary_large_image",
    images: ["/logo.png"],
  },
};

// Root layout: provides html/body and fonts only.
// Navbar, Footer and locale providers live in app/[locale]/layout.tsx.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
