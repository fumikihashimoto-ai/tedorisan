import type { Metadata } from 'next';
import SideBusinessClient from '../components/SideBusinessClient';

export const metadata: Metadata = {
  title: '副業税金シミュレーター - 確定申告判定ツール｜テドリくん',
  description: '副業収入の税金を自動計算。確定申告が必要か判定します。20万円ルールもわかりやすく解説。本業+副業の手取り額を計算。経費計上や青色申告の効果も比較。完全無料。',
  keywords: ['副業 税金', '副業 税金 計算', '副業 確定申告', '副業 税金 いくらから', '副業 手取り', '副業 税金シミュレーション', '確定申告 いくらから'],
  openGraph: {
    title: '副業税金シミュレーター - 確定申告判定ツール',
    description: '副業収入の税金を自動計算',
    type: 'website',
    locale: 'ja_JP',
    siteName: '手取り計算ツール - テドリくん',
  },
  twitter: {
    card: 'summary_large_image',
    title: '副業税金シミュレーター',
    description: '副業収入の税金を自動計算',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tedorikun.jp/side-business',
  },
};

export default function SideBusinessPage() {
  return <SideBusinessClient />;
}
