import type { Metadata } from 'next';
import CareerChange20sClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '20代転職の年収相場｜平均年収365万円から年収アップする方法',
  description:
    '20代の平均年収は365万円。転職で約40%が年収アップに成功。20代前半・後半の年収データ、転職前後の手取り比較シミュレーター、年収アップしやすい業界・転職パターンを解説。',
  keywords: ['20代', '転職', '年収', '平均年収', '手取り', '年収アップ', '第二新卒', 'キャリアチェンジ'],
  canonicalPath: '/career/career-change-20s',
  openGraphDescription:
    '20代の平均年収は365万円。転職前後の手取り比較シミュレーターと、年収アップしやすい業界・転職パターンを解説。',
});

export default function Page() {
  return <CareerChange20sClient />;
}

