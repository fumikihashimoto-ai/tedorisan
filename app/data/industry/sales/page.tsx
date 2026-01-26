import type { Metadata } from 'next';
import SalesClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '営業職の年収・手取り計算｜転職比較シミュレーター',
  description:
    '営業職の平均年収476万円。MR・金融・不動産・ITなど業界別、法人営業・個人営業など営業タイプ別の年収比較と、転職前後の手取りシミュレーションができます。',
  keywords: [
    '営業職',
    '年収',
    '手取り',
    '転職',
    'MR',
    '金融営業',
    '不動産営業',
    'IT営業',
    'インセンティブ',
    '法人営業',
  ],
  canonicalPath: '/data/industry/sales',
  openGraphDescription: '営業職の平均年収476万円。転職前後の手取りシミュレーションができます。',
});

export default function Page() {
  return <SalesClient />;
}
