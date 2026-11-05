import type { Metadata, Viewport } from "next";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { ScrollObserver } from "@/components/ui/ScrollObserver";
import { CurrencyProvider } from "@/lib/context/CurrencyContext";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#111827",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | XC Global Limited",
    default: "XC Global Limited | Modern Growth & Elite Marketing Talent Ecosystem",
  },
  description:
    "We bridge high-performing marketing leaders and specialized execution talent with tech startups, fintech, SaaS, Web3, and AI scale-ups.",
  keywords: [
    "growth marketing",
    "marketing talent",
    "growth engineering",
    "fractional CMO",
    "fintech marketing",
    "SaaS growth",
    "XC Global",
  ],
  authors: [{ name: "XC Global Limited" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xcglobalhq.com",
    siteName: "XC Global Limited",
    title: "XC Global Limited | Modern Growth & Elite Marketing Talent Ecosystem",
    description:
      "Empowering high-growth tech ventures with elite marketing talent and revenue execution.",
  },
  twitter: {
    card: "summary_large_image",
    title: "XC Global Limited | Growth & Talent Ecosystem",
    description:
      "Empowering high-growth tech ventures with elite marketing talent and revenue execution.",
    site: "@xcglobalhq",
  },
  metadataBase: new URL("https://xcglobalhq.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col bg-background text-text-primary">
        <CurrencyProvider>
          <SkipToContent />
          <ScrollObserver />
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}

