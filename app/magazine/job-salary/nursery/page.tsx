import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import NurseryArticle from './NurseryArticle';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '「保育士 年収」を上げたい！今すぐできる給料アップ術と賢い転職先選び | 手取りのミカタ',
  description:
    '保育士の年収を徹底解説。全国平均から地域別・経験年数別・施設形態別の実態、資格手当・処遇改善手当・副業などの給料アップ術、高年収が期待できる保育施設の選び方、転職エージェントの活用法まで網羅。',
  keywords: ['保育士', '年収', '手取り', '転職', '公立保育園', '私立保育園', '処遇改善', '借り上げ社宅'],
  canonicalPath: '/magazine/job-salary/nursery',
  openGraphDescription:
    '保育士の年収を徹底解説。給料アップ術、高年収が期待できる保育施設の選び方、転職のポイントまで網羅。',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="保育士 年収を上げたい！今すぐできる給料アップ術と賢い転職先選び"
        description="保育士の年収を徹底解説。全国平均から地域別・経験年数別・施設形態別の実態、資格手当・処遇改善手当・副業などの給料アップ術、高年収が期待できる保育施設の選び方、転職エージェントの活用法まで網羅。"
        url="/magazine/job-salary/nursery"
      />
      <ArticlePageLayout
        catchphrase1="＼保育士の年収を上げたい／"
        catchphrase2="【給料アップ術と転職先選び】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 保育士の年収・手取り
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          「保育士 年収」を上げたい！今すぐできる給料アップ術と賢い転職先選び
        </h1>

        <NurseryArticle />
      </ArticlePageLayout>
    </>
  );
}
