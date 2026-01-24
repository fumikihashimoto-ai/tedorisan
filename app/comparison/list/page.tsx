import type { Metadata } from 'next';
import ComparisonListClient from '../../components/ComparisonListClient';

export const metadata: Metadata = {
  title: '年代・年収別 手取り一覧表 - 早見表｜テドリくん',
  description: '年収200万円〜1000万円の手取り額を一覧表で確認。年代別の平均年収もマーク表示。所得税・住民税・社会保険料の内訳も。完全無料の手取り早見表。',
  keywords: ['年収 手取り 一覧', '手取り計算 早見表', '年収 手取り 表', '手取り 一覧', '給与 早見表'],
  openGraph: {
    title: '年代・年収別 手取り一覧表 - 早見表',
    description: '年収200万円〜1000万円の手取り額を一覧表で確認',
    type: 'website',
    locale: 'ja_JP',
    siteName: '手取り計算ツール - テドリくん',
  },
  alternates: {
    canonical: 'https://tedorikun.jp/comparison/list',
  },
};

export default function ComparisonListPage() {
  return <ComparisonListClient />;
}
