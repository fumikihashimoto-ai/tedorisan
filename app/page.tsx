import type { Metadata, Viewport } from 'next';
import { TopPageClient } from '@/app/components/v2/TopPageClient';

export const metadata: Metadata = {
  title: '手取りのミカタ｜手取り計算・年収シミュレーション・転職サービス',
  description:
    '手取り計算から年収アップまで。たった3問であなたに最適な転職サービス・スキル習得方法をご提案。完全無料で今すぐ診断スタート！',
  keywords: [
    '手取り',
    '年収',
    '転職',
    'スキルアップ',
    '手取り計算',
    '年収シミュレーション',
    '転職サービス',
    'IT転職',
    'エンジニア転職',
  ],
  openGraph: {
    title: '手取りのミカタ｜手取り計算・年収シミュレーション・転職サービス',
    description:
      '手取り計算から年収アップまで。たった3問であなたに最適な転職サービス・スキル習得方法をご提案。',
    url: 'https://tedorisan.jp',
    siteName: '手取りのミカタ',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '手取りのミカタ｜手取り計算・年収シミュレーション・転職サービス',
    description:
      '手取り計算から年収アップまで。たった3問であなたに最適な転職サービス・スキル習得方法をご提案。',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function Home() {
  return <TopPageClient />;
}
