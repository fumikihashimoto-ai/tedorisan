import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import HighIncomeClient from './pageClient';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '年収1000万超えの手取り早見表｜税金・社会保険料の内訳を解説',
  description:
    '年収1000万円の手取りは約720万円。年収1500万円なら約1000万円。高年収帯の手取り早見表と税金・社会保険料の内訳、節税対策を詳しく解説します。',
  keywords: ['年収1000万', '手取り', '税金', '所得税', '住民税', '社会保険料', '累進課税', '節税', '高収入'],
  canonicalPath: '/career/high-income',
  openGraphTitle: '年収1000万超えの手取り早見表｜税金・社会保険料の内訳を解説 | 手取りのミカタ',
  openGraphDescription:
    '年収1000万円の手取りは約720万円。高年収帯の手取り早見表と税金・社会保険料の内訳、節税対策を解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="年収1000万超えの手取り早見表｜税金・社会保険料の内訳を解説"
        description="年収1000万円の手取りは約720万円。年収1500万円なら約1000万円。高年収帯の手取り早見表と税金・社会保険料の内訳、節税対策を詳しく解説します。"
        url="/career/high-income"
      />
      <ArticlePageLayout
        catchphrase1="＼年収1000万超えの手取り／"
        catchphrase2="【税金・社会保険料の内訳解説】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/career/career-change-20s">キャリア</Link> {'>'} 年収1000万超えの手取り
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          年収1000万超えの手取り計算
        </h1>

        <HighIncomeClient />
      </ArticlePageLayout>
    </>
  );
}

