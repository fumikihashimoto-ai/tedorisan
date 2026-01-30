import type { Metadata } from 'next';
import HomeClient from './components/HomeClient';
import StructuredData from './components/StructuredData';

export const metadata: Metadata = {
  // ========================================
  // 基本メタ情報
  // ========================================
  title: '【自動計算ツール付き】年収の手取りを最速で計算！初心者でも安心の仕組み解説 | テドリさん',
  description: '年収から手取り額を自動計算。額面との違い、社会保険料・税金の仕組みを初心者向けに解説。年収300万〜700万円のシミュレーション例と手取りを増やす方法も紹介。',
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
    siteName: 'テドリさん',
    title: '【シミュレーション付き】年収の手取りを最速で計算！ | テドリさん',
    description: '年収から手取り額をシミュレーション。額面との違い、社会保険料・税金の仕組みを初心者向けに解説。年収300万〜700万円のシミュレーション例付き。',
    images: [
      {
        url: 'https://tedorisan.jp/og-image.png',
        width: 1200,
        height: 630,
        alt: 'テドリさん - 年収手取りシミュレーション',
      },
    ],
  },

  // ========================================
  // Twitter Card
  // ========================================
  twitter: {
    card: 'summary_large_image',
    title: '【シミュレーション付き】年収の手取りを最速で計算！ | テドリさん',
    description: '年収から手取り額をシミュレーション。額面との違い、社会保険料・税金の仕組みを初心者向けに解説。',
    images: ['https://tedorisan.jp/og-image.png'],
  },

  // ========================================
  // その他のメタ情報
  // ========================================
  authors: [{ name: 'テドリさん' }],
  creator: 'テドリさん',
  publisher: 'テドリさん',
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
  // テーマカラー
  // ========================================
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],

  // ========================================
  // ビューポート設定
  // ========================================
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },

  // ========================================
  // カテゴリ
  // ========================================
  category: 'finance',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData />

      {/* メインコンテンツ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        {/* 2カラムレイアウト（PC: 1024px以上） */}
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
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
