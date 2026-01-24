import type { Metadata } from 'next';
import JobChangeClient from '../components/JobChangeClient';

export const metadata: Metadata = {
  title: '転職年収シミュレーター - 手取り比較｜テドリくん',
  description: '転職前後の手取り年収を比較できる計算ツール。年収アップ額が一目でわかります。年収交渉の参考に。年代別の平均年収との比較も表示。完全無料・個人情報不要。',
  keywords: ['転職 年収', '転職 手取り', '転職 年収アップ', '転職 年収交渉', '年収比較', '転職シミュレーション', '年収 手取り 比較'],
  openGraph: {
    title: '転職年収シミュレーター - 手取り比較',
    description: '転職前後の手取り年収を比較',
    type: 'website',
    locale: 'ja_JP',
    siteName: '手取り計算ツール - テドリくん',
  },
  twitter: {
    card: 'summary_large_image',
    title: '転職年収シミュレーター',
    description: '転職前後の手取り年収を比較',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tedorikun.jp/job-change',
  },
};

export default function JobChangePage() {
  return <JobChangeClient />;
}
