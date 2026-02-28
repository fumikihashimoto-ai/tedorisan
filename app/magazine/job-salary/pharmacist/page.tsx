import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import PharmacistArticle from './PharmacistArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法 | 手取りのミカタ',
  description:
    '薬剤師の平均年収や年代別・施設別の給与実態、年収1000万円を達成する薬剤師の特徴と割合、専門性の向上・管理職・企業薬剤師・独立開業といった具体的なキャリア戦略を解説。',
  keywords: [
    '薬剤師',
    '年収',
    '年収1000万円',
    '転職',
    '調剤薬局',
    'ドラッグストア',
    '病院',
    '製薬会社',
    '管理薬剤師',
    '企業薬剤師',
  ],
  canonicalPath: '/magazine/job-salary/pharmacist',
  openGraphTitle: '薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法 | 手取りのミカタ',
  openGraphDescription:
    '薬剤師の平均年収や年代別・施設別の給与実態、年収1000万円を達成する薬剤師の特徴と割合、専門性の向上・管理職・企業薬剤師・独立開業といった具体的なキャリア戦略を解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法"
        description="薬剤師の平均年収や年代別・施設別の給与実態、年収1000万円を達成する薬剤師の特徴と割合、専門性の向上・管理職・企業薬剤師・独立開業といった具体的なキャリア戦略を解説。"
        url="/magazine/job-salary/pharmacist"
      />
      <ArticlePageLayout
        catchphrase1="＼薬剤師の年収を1000万に／"
        catchphrase2="【高収入を狙う方法を徹底解説】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 薬剤師
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法
        </h1>

        <PharmacistArticle />
      </ArticlePageLayout>
    </>
  );
}
