import type { Metadata } from 'next';
import ComparisonListClient from '../components/ComparisonListClient';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '年代・年収別 手取り早見表 | テドリさん',
  description: '年収200万円〜1000万円、年代別の手取り額を一覧表で確認できます。',
  keywords: ['年収 手取り 一覧', '手取り計算 早見表', '年収 手取り 表', '手取り 一覧', '給与 早見表'],
  canonicalPath: '/tables',
  openGraphTitle: '年代・年収別 手取り早見表',
  openGraphDescription: '年収200万円〜1000万円、年代別の手取り額を一覧表で確認できます。',
  openGraphType: 'website',
});

export default function TablesPage() {
  return <ComparisonListClient />;
}
