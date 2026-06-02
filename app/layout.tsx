import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { WhatsAppFAB } from "@/components/common/WhatsAppFAB";
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

export const metadata: Metadata = {
  title: "TV Çelik A.Ş.",
  description: "Prefabrik, hafif çelik ve konteyner yapı sistemleri",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = await getCompanyData();
  const whatsappPhone = company.whatsapp ?? "905078363661";

  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB phone={whatsappPhone} />
      </body>
    </html>
  );
}
