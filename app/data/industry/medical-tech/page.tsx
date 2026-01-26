import type { Metadata } from 'next';
import MedicalTechClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '医療技術職の年収・手取り計算｜転職比較シミュレーター',
  description:
    '医療技術職（診療放射線技師・臨床検査技師・理学療法士等）の平均年収は約480万円。年代別・勤務先別の年収データと、転職前後の手取り額を比較できる計算ツール。',
  keywords: [
    '医療技術職',
    '年収',
    '手取り',
    '転職',
    '診療放射線技師',
    '臨床検査技師',
    '理学療法士',
    '作業療法士',
    '臨床工学技士',
  ],
  canonicalPath: '/data/industry/medical-tech',
  openGraphDescription: '医療技術職の平均年収は約480万円。転職前後の手取り額を比較できる計算ツール。',
});

export default function Page() {
  return <MedicalTechClient />;
}
