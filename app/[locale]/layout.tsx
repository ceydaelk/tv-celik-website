import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { WhatsAppFAB } from "@/components/common/WhatsAppFAB";
import MotionProvider from "@/components/common/MotionProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCompanyData } from "@/lib/firestore/company";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "tr" | "en")) {
    notFound();
  }

  const [messages, company] = await Promise.all([
    getMessages(),
    getCompanyData(),
  ]);
  const whatsappPhone = company.whatsapp ?? "905467343030";

  return (
    <NextIntlClientProvider messages={messages}>
      <MotionProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB phone={whatsappPhone} />
      </MotionProvider>
    </NextIntlClientProvider>
  );
}
