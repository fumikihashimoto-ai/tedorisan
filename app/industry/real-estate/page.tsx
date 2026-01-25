import type { Metadata } from 'next';
import RealEstateClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '不動産業界の年収・手取り計算｜転職比較シミュレーター',
  description:
    '不動産業界の平均年収536万円。デベロッパー・仲介・管理など企業タイプ別、営業・企画・事務など職種別の年収比較と、転職前後の手取りシミュレーションができます。',
  keywords: ['不動産業界', '年収', '手取り', '転職', 'デベロッパー', '不動産営業', '宅建', '仲介', '売買'],
  canonicalPath: '/industry/real-estate',
  openGraphDescription: '不動産業界の平均年収536万円。転職前後の手取りシミュレーションができます。',
});

export default function Page() {
  return <RealEstateClient />;
}

