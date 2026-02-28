import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import CareerChange20sClient from './pageClient';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '20代転職の年収相場｜平均年収365万円から年収アップする方法',
  description:
    '20代の平均年収は365万円。転職で約40%が年収アップに成功。20代前半・後半の年収データ、転職前後の手取り比較シミュレーター、年収アップしやすい業界・転職パターンを解説。',
  keywords: ['20代', '転職', '年収', '平均年収', '手取り', '年収アップ', '第二新卒', 'キャリアチェンジ'],
  canonicalPath: '/career/career-change-20s',
  openGraphTitle: '20代転職の年収相場｜平均年収365万円から年収アップする方法 | 手取りのミカタ',
  openGraphDescription:
    '20代の平均年収は365万円。転職前後の手取り比較シミュレーターと、年収アップしやすい業界・転職パターンを解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="20代転職の年収相場｜平均年収365万円から年収アップする方法"
        description="20代の平均年収は365万円。転職で約40%が年収アップに成功。20代前半・後半の年収データ、転職前後の手取り比較シミュレーター、年収アップしやすい業界・転職パターンを解説。"
        url="/career/career-change-20s"
      />
      <ArticlePageLayout
        catchphrase1="＼20代転職の年収相場を解説／"
        catchphrase2="【手取り計算付き完全ガイド】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/career/career-change-20s">キャリア</Link> {'>'} 20代転職の年収相場
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          20代転職の年収相場と手取り計算
        </h1>

        <CareerChange20sClient />
      </ArticlePageLayout>
    </>
  );
}

