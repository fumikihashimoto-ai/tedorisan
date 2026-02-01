import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import HomeClient from './components/HomeClient';
import StructuredData from './components/StructuredData';

export const metadata: Metadata = {
  // ========================================
  // 基本メタ情報
  // ========================================
  title: '【手取り計算シミュレーションツール付き】年収の手取りを最速で計算！初心者でも安心の仕組み解説 | 手取りのミカタ',
  description: '【手取り計算シミュレーションツール付き】あなたの年収手取り額を最速で計算！額面との違い、社会保険料・税金の種類と計算方法を初心者向けに徹底解説。年収アップのヒントも。年収の手取り計算はこれで完璧！',
  keywords: [
    '手取り計算',
    '年収 手取り',
    '手取り額',
    '額面 手取り 違い',
    '社会保険料 計算',
    '所得税 計算',
    '住民税 計算',
    '年収シミュレーション',
    '給与計算',
    '手取り 増やす',
  ],

  // ========================================
  // 正規URL（カノニカル）
  // ========================================
  alternates: {
    canonical: 'https://tedorisan.jp/',
  },

  // ========================================
  // ロボット制御
  // ========================================
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ========================================
  // Open Graph（Facebook, LINE, etc.）
  // ========================================
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://tedorisan.jp/',
    siteName: '手取りのミカタ',
    title: '【手取り計算シミュレーション付き】年収の手取りを最速で計算！初心者でも安心の仕組み解説 | 手取りのミカタ',
    description: '【手取り計算シミュレーションツール付き】あなたの年収手取り額を最速で計算！額面との違い、社会保険料・税金の種類と計算方法を初心者向けに徹底解説。年収アップのヒントも。年収の手取り計算はこれで完璧！',
    images: [
      {
        url: 'https://tedorisan.jp/og-image.png',
        width: 1200,
        height: 630,
        alt: '手取りのミカタ - 年収手取りシミュレーション',
      },
    ],
  },

  // ========================================
  // Twitter Card
  // ========================================
  twitter: {
    card: 'summary_large_image',
    title: '【手取り計算シミュレーションツール付き】年収の手取りを最速で計算！初心者でも安心の仕組み解説 | 手取りのミカタ',
    description: '【手取り計算シミュレーションツール付き】あなたの年収手取り額を最速で計算！額面との違い、社会保険料・税金の種類と計算方法を初心者向けに徹底解説。年収アップのヒントも。年収の手取り計算はこれで完璧！',
    images: ['https://tedorisan.jp/og-image.png'],
  },

  // ========================================
  // その他のメタ情報
  // ========================================
  authors: [{ name: '手取りのミカタ' }],
  creator: '手取りのミカタ',
  publisher: '手取りのミカタ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // ========================================
  // アイコン設定
  // ========================================
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // ========================================
  // カテゴリ
  // ========================================
  category: 'finance',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <StructuredData />

      {/* メインコンテンツ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        {/* 2カラムレイアウト（PC: 1024px以上） */}
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_top.png"
                alt="年収と手取りのギャップを説明する図"
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link>
            </nav>
            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
              年収の手取りを最速で計算！シミュレーション付きで初心者も安心
            </h1>
            <HomeClient />
          </main>

          {/* 右カラム：サイドバー（スマホ非表示） - 広告のみsticky固定 */}
          <aside className="hidden lg:block lg:w-72 xl:w-80 lg:flex-shrink-0 lg:self-start sticky top-5 h-fit">
            <div className="space-y-4">
              {/* サイドバー広告1 */}
              <div>
                <a
                  href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4QVFEA+5P1E+5YZ75"
                  rel="nofollow"
                >
                  <img
                    width={300}
                    height={250}
                    alt=""
                    src="https://www22.a8.net/svt/bgt?aid=260126641287&wid=001&eno=01&mid=s00000026573001003000&mc=1"
                  />
                </a>
                <img
                  width={1}
                  height={1}
                  src="https://www18.a8.net/0.gif?a8mat=4AVF01+4QVFEA+5P1E+5YZ75"
                  alt=""
                />
              </div>
              {/* サイドバー広告2 */}
              <div>
                <a
                  href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4FK6WI+3Y6M+66H9D"
                  rel="nofollow"
                >
                  <img
                    width={300}
                    height={250}
                    alt=""
                    src="https://www26.a8.net/svt/bgt?aid=260126641268&wid=001&eno=01&mid=s00000018427001038000&mc=1"
                  />
                </a>
                <img
                  width={1}
                  height={1}
                  src="https://www14.a8.net/0.gif?a8mat=4AVF01+4FK6WI+3Y6M+66H9D"
                  alt=""
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
