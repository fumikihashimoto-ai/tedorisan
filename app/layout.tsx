import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tedorikun.jp'),
  title: {
    default: '手取り計算ツール - テドリくん',
    template: '%s｜テドリくん'
  },
  description: '手取り計算ツール - テドリくん。転職・新卒・副業の年収シミュレーション。',
  applicationName: '手取り計算ツール - テドリくん',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '手取り計算ツール - テドリくん',
  },
  twitter: {
    card: 'summary_large_image',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    google: 'あとで設定',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "手取り計算ツール - テドリくん",
              "description": "転職・新卒・副業の年収・手取りシミュレーション",
              "url": "https://tedorikun.jp",
              "applicationCategory": "FinanceApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "JPY"
              },
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript"
            })
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
