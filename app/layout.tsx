import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RelatedLinks from "./components/RelatedLinks";
import ScrollToTopButton from "./components/ScrollToTopButton";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://tedorisan.jp'),
  title: {
    default: '手取りのミカタ | 年収から手取り額を自動計算',
    template: '%s｜手取りのミカタ'
  },
  description:
    '手取りのミカタがあなたの手取り額を計算します。年収・扶養人数を入力するだけで、所得税・住民税・社会保険料を自動計算。転職・副業時の手取り比較も簡単！',
  keywords:
    '手取り計算, 年収, 給与計算, 所得税, 住民税, 社会保険料, 転職, 副業, 手取りのミカタ',
  applicationName: '手取りのミカタ',
  openGraph: {
    title: '手取りのミカタ',
    description: '手取りのミカタがあなたの手取り額を計算します',
    type: 'website',
    locale: 'ja_JP',
    siteName: '手取りのミカタ',
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
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
        className="antialiased bg-[#F8FAFC]"
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

        <Header />
        <main className="w-full overflow-visible">{children}</main>
        <RelatedLinks />
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
