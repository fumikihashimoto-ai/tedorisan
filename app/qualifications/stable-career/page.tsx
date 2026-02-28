import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import StableCareerArticle from './StableCareerArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '食いっぱぐれない資格｜もう仕事に困らない一生涯活躍できるスキル | 手取りのミカタ',
  description:
    'AI時代に強い食いっぱぐれない資格を徹底解説。医療介護、IT、法律会計、建設不動産など、高い専門性と安定した需要を持つ資格の選び方と取得方法。',
  keywords: ['食いっぱぐれない資格', '安定した資格', 'AI時代', 'キャリア', '国家資格', '専門性'],
  canonicalPath: '/qualifications/stable-career',
  openGraphTitle: '食いっぱぐれない資格｜もう仕事に困らない一生涯活躍できるスキル | 手取りのミカタ',
  openGraphDescription:
    'AI時代に強い食いっぱぐれない資格を徹底解説。医療介護、IT、法律会計、建設不動産など、高い専門性と安定した需要を持つ資格の選び方と取得方法。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="もう仕事に困らない!食いっぱぐれない資格で一生涯活躍できるスキルを手に入れる"
        description="AI時代に強い食いっぱぐれない資格を徹底解説。医療介護、IT、法律会計、建設不動産など、高い専門性と安定した需要を持つ資格の選び方と取得方法。"
        url="/qualifications/stable-career"
      />
      <ArticlePageLayout
        catchphrase1="＼一生涯食いっぱぐれない資格／"
        catchphrase2="【仕事に困らないスキル獲得】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/qualifications">資格</Link> {'>'} 食いっぱぐれない資格
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          もう仕事に困らない!食いっぱぐれない資格で一生涯活躍できるスキルを手に入れる
        </h1>

        <StableCareerArticle />
      </ArticlePageLayout>
    </>
  );
}
