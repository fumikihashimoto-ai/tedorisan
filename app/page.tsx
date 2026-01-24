import type { Metadata } from 'next';
import HomeClient from './components/HomeClient';

export const metadata: Metadata = {
  title: '手取り計算ツール - テドリくん｜年収・給与シミュレーター',
  description: '3秒で手取り額がわかる計算ツール。年収から手取りを自動計算。転職・新卒・副業の年収シミュレーションに対応。年代別の収入比較も表示。完全無料・個人情報不要。2025年度の最新税率で計算。',
  keywords: ['手取り計算', '手取り計算ツール', '年収 手取り', '給与 手取り', '手取りシミュレーション', '年収計算', '給与計算', '手取り', '年収シミュレーション'],
  openGraph: {
    title: '手取り計算ツール - テドリくん',
    description: '3秒で手取り額がわかる計算ツール',
    type: 'website',
    locale: 'ja_JP',
    siteName: '手取り計算ツール - テドリくん',
  },
  twitter: {
    card: 'summary_large_image',
    title: '手取り計算ツール - テドリくん',
    description: '3秒で手取り額がわかる',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tedorikun.jp',
  },
};

export default function Home() {
  return <HomeClient />;
}
