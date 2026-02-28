import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import SalesArticle from './SalesArticle';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '営業職の年収アップを確実にする！市場価値を高めるスキルと転職術 | 手取りのミカタ',
  description:
    '営業職の年収を徹底解説。業界・年齢・地域別の平均、成果直結の営業スキル、専門知識、マネジメント能力、語学・ITスキル、転職術、年収交渉のポイントまで網羅。',
  keywords: [
    '営業職',
    '年収',
    '手取り',
    '転職',
    'MR',
    '金融営業',
    '不動産営業',
    'IT営業',
    'インセンティブ',
    '法人営業',
  ],
  canonicalPath: '/magazine/job-salary/sales',
  openGraphDescription:
    '営業職の年収を徹底解説。市場価値を高めるスキル習得法、転職術、年収交渉のポイントまで網羅。',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="営業職の年収アップを確実にする！市場価値を高めるスキルと転職術"
        description="営業職の年収を徹底解説。業界・年齢・地域別の平均、成果直結の営業スキル、専門知識、マネジメント能力、語学・ITスキル、転職術、年収交渉のポイントまで網羅。"
        url="/magazine/job-salary/sales"
      />
      <ArticlePageLayout
        catchphrase1="＼営業職の年収を確実にアップ／"
        catchphrase2="【市場価値と転職術】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 営業職の年収・手取り
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          営業職の年収アップを確実にする！市場価値を高めるスキルと転職術
        </h1>

        <SalesArticle />
      </ArticlePageLayout>
    </>
  );
}
