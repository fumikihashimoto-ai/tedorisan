import type { Metadata, Viewport } from 'next';
import { HomePageClient } from './components/HomePageClient';
import StructuredData from './components/StructuredData';

export const metadata: Metadata = {
  // ========================================
  // 基本メタ情報
  // ========================================
  title: '【年収アップ診断＋手取り計算】あなたに最適な収入アップ方法｜手取りのミカタ',
  description: '3問の診断であなたに最適な年収アップ方法がわかります。転職・資格・スキル習得から最適なサービスをご提案。手取り計算ツールで転職後の収入もシミュレーション可能。',
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
    title: '【年収アップ診断＋手取り計算】あなたに最適な収入アップ方法｜手取りのミカタ',
    description: '3問の診断であなたに最適な年収アップ方法がわかります。転職・資格・スキル習得から最適なサービスをご提案。手取り計算ツールで転職後の収入もシミュレーション可能。',
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
    title: '【年収アップ診断＋手取り計算】あなたに最適な収入アップ方法｜手取りのミカタ',
    description: '3問の診断であなたに最適な年収アップ方法がわかります。転職・資格・スキル習得から最適なサービスをご提案。手取り計算ツールで転職後の収入もシミュレーション可能。',
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

      {/* メインコンテンツ（状態管理は HomePageClient で実施） */}
      <HomePageClient />
    </div>
  );
}
