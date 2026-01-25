import type { Metadata } from 'next';
import ConstructionClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '建設業界の年収・手取り計算｜転職比較シミュレーター',
  description:
    '建設業界の平均年収565万円。ゼネコン・中小企業・専門工事会社など企業規模別、施工管理・建築士・職人など職種別の年収比較と、転職前後の手取りシミュレーションができます。',
  keywords: ['建設業界', '年収', '手取り', '転職', 'ゼネコン', '施工管理', '建築士', '土木', '職人'],
  canonicalPath: '/industry/construction',
  openGraphDescription: '建設業界の平均年収565万円。転職前後の手取りシミュレーションができます。',
});

export default function Page() {
  return <ConstructionClient />;
}

