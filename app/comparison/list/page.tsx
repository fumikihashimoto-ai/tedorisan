import type { Metadata } from 'next';
import ComparisonListClient from '../../components/ComparisonListClient';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '年代・年収別 手取り一覧表 - 早見表｜テドリさん',
  description: '年収200万円〜1000万円の手取り額を一覧表で確認。年代別の平均年収もマーク表示。所得税・住民税・社会保険料の内訳も。完全無料の手取り早見表。',
  keywords: ['年収 手取り 一覧', '手取り計算 早見表', '年収 手取り 表', '手取り 一覧', '給与 早見表'],
  canonicalPath: '/comparison/list',
  openGraphTitle: '年代・年収別 手取り一覧表 - 早見表',
  openGraphDescription: '年収200万円〜1000万円の手取り額を一覧表で確認',
  openGraphType: 'website',
});

export default function ComparisonListPage() {
  return <ComparisonListClient />;
}
