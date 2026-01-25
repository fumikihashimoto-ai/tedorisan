import type { Metadata } from 'next';
import HighIncomeClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '年収1000万超えの手取り早見表｜税金・社会保険料の内訳を解説',
  description:
    '年収1000万円の手取りは約720万円。年収1500万円なら約1000万円。高年収帯の手取り早見表と税金・社会保険料の内訳、節税対策を詳しく解説します。',
  keywords: ['年収1000万', '手取り', '税金', '所得税', '住民税', '社会保険料', '累進課税', '節税', '高収入'],
  canonicalPath: '/career/high-income',
  openGraphDescription:
    '年収1000万円の手取りは約720万円。高年収帯の手取り早見表と税金・社会保険料の内訳、節税対策を解説。',
});

export default function Page() {
  return <HighIncomeClient />;
}

