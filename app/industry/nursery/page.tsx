import type { Metadata } from 'next';
import NurseryClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '保育士の年収・手取り計算｜転職比較シミュレーター',
  description:
    '保育士の平均年収407万円。公立・私立・小規模など勤務先別の年収比較と、転職前後の手取りシミュレーションができます。処遇改善や借り上げ社宅制度についても解説。',
  keywords: ['保育士', '年収', '手取り', '転職', '公立保育園', '私立保育園', '処遇改善', '借り上げ社宅'],
  canonicalPath: '/industry/nursery',
  openGraphDescription: '保育士の平均年収407万円。勤務先別の年収比較と、転職前後の手取りシミュレーションができます。',
});

export default function Page() {
  return <NurseryClient />;
}

