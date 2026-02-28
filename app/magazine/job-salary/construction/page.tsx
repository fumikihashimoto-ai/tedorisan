import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import ConstructionArticle from './ConstructionArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '建設業で年収1000万円を目指す！高収入を実現するキャリア戦略と秘訣 | 手取りのミカタ',
  description:
    '建設業の平均年収から職種別の給与水準、年収1000万円を達成するキャリアパス、取得すべき国家資格、効果的な転職戦略まで、高収入を実現するための秘訣を網羅的に解説。',
  keywords: [
    '建設業界',
    '年収1000万円',
    '施工管理',
    '建築士',
    'ゼネコン',
    '転職',
    '資格',
    'キャリア',
  ],
  canonicalPath: '/magazine/job-salary/construction',
  openGraphTitle: '建設業で年収1000万円を目指す！高収入を実現するキャリア戦略と秘訣 | 手取りのミカタ',
  openGraphDescription:
    '建設業の平均年収から職種別の給与水準、年収1000万円を達成するキャリアパス、取得すべき国家資格、効果的な転職戦略まで、高収入を実現するための秘訣を網羅的に解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="建設業で年収1000万円を目指す！高収入を実現するキャリア戦略と秘訣"
        description="建設業の平均年収から職種別の給与水準、年収1000万円を達成するキャリアパス、取得すべき国家資格、効果的な転職戦略まで、高収入を実現するための秘訣を網羅的に解説。"
        url="/magazine/job-salary/construction"
      />
      <ArticlePageLayout
        catchphrase1="＼建設業で年収1000万を目指す／"
        catchphrase2="【高収入のキャリア戦略】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 建設業界
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          建設業で年収1000万円を目指す！高収入を実現するキャリア戦略と秘訣
        </h1>

        <ConstructionArticle />
      </ArticlePageLayout>
    </>
  );
}
