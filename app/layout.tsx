import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { WhatsAppFAB } from "@/components/common/WhatsAppFAB";
import MotionProvider from "@/components/common/MotionProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCompanyData } from "@/lib/firestore/company";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = await getCompanyData();
  const whatsappPhone = company.whatsapp ?? "905467343030";

  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFAB phone={whatsappPhone} />
        </MotionProvider>
      </body>
    </html>
  );
}
