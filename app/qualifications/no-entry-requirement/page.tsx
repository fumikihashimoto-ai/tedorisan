import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import NoEntryRequirementArticle from './NoEntryRequirementArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '受験資格なしで取れる国家資格｜未経験から人生を変える方法【2026年版】',
  description:
    '学歴・実務経験不要で挑戦できる国家資格を厳選。行政書士、宅建士、ITパスポートなど各資格の難易度・合格率・費用を徹底比較。働きながら取得できる資格で年収アップを実現！無料の手取り計算ツールで転職後の収入をシミュレーション。',
  keywords: ['受験資格なし', '国家資格', '学歴不問', '未経験', '行政書士', '宅建士', 'ITパスポート'],
  canonicalPath: '/qualifications/no-entry-requirement',
  openGraphTitle: '受験資格なしで取れる国家資格｜未経験から人生を変える方法【2026年版】',
  openGraphDescription:
    '学歴・実務経験不要で挑戦できる国家資格を厳選。行政書士、宅建士、ITパスポートなど各資格の難易度・合格率・費用を徹底比較。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="未経験から挑戦!受験資格なしで取れる国家資格で人生を変える方法"
        description="学歴・実務経験不問の国家資格を厳選紹介。行政書士、宅建士、ITパスポートなど、未経験から挑戦できる資格の勉強法とキャリア戦略を徹底解説。"
        url="/qualifications/no-entry-requirement"
      />
      <ArticlePageLayout
        catchphrase1="＼受験資格なしで取れる資格／"
        catchphrase2="【未経験から人生を変える】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/qualifications">資格</Link> {'>'} 受験資格なしで取れる国家資格
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          未経験から挑戦!受験資格なしで取れる国家資格で人生を変える方法
        </h1>

        <NoEntryRequirementArticle />
      </ArticlePageLayout>
    </>
  );
}
