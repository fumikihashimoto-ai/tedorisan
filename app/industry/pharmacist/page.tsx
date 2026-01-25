import type { Metadata } from 'next';
import PharmacistClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '薬剤師の年収・手取り計算｜転職比較シミュレーター',
  description:
    '薬剤師の平均年収は約583万円。年代別・勤務先別の年収データと、転職前後の手取り額を比較できる計算ツール。',
  keywords: ['薬剤師', '年収', '手取り', '転職', '調剤薬局', 'ドラッグストア', '病院', '製薬会社', '平均年収'],
  canonicalPath: '/industry/pharmacist',
});

export default function Page() {
  return <PharmacistClient />;
}

