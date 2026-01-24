import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFEF9]`}
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
