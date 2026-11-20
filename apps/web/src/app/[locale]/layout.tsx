import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { routing } from "@/i18n/routing";
import { env } from "@/lib/env";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: "linguisticPro — IELTS preparation",
    template: "%s — linguisticPro",
  },
  description: "Prepare for IELTS Academic and General Training with a personal study plan.",
  applicationName: "linguisticPro",
  icons: { icon: "/favicon.ico" },
  openGraph: { siteName: "linguisticPro", type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#14181f",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    // suppressHydrationWarning: next-themes sets the theme class on <html> before hydration.
    <html
      lang={locale}
      className={`${manrope.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
