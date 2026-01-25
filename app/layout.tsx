import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderAd from "./components/HeaderAd";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://tedorikun.jp'),
  title: {
    default: '手取り計算ツール - テドリさん | 年収から手取り額を自動計算',
    template: '%s｜テドリさん'
  },
  description:
    'テドリさんがあなたの手取り額を計算します。年収・扶養人数を入力するだけで、所得税・住民税・社会保険料を自動計算。転職・副業時の手取り比較も簡単！',
  keywords:
    '手取り計算, 年収, 給与計算, 所得税, 住民税, 社会保険料, 転職, 副業, テドリさん',
  applicationName: '手取り計算ツール - テドリさん',
  openGraph: {
    title: '手取り計算ツール - テドリさん',
    description: 'テドリさんがあなたの手取り額を計算します',
    type: 'website',
    locale: 'ja_JP',
    siteName: '手取り計算ツール - テドリさん',
  },
  twitter: {
    card: 'summary_large_image',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </head>
      <body
        className="antialiased bg-[#f5f5f5]"
      >
        {/* Google Tag Manager (noscript) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "手取り計算ツール - テドリさん",
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

        {/* A8.net 広告 - ヘッダー上部（PCのみ） */}
        <div className="hidden md:flex w-full bg-gray-50 py-2 justify-center border-b border-gray-200">
          <HeaderAd />
        </div>

        <Header />
        <main className="w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
