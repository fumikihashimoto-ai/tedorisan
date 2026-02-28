import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import HighSchoolArticle from './HighSchoolArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '高卒・高校中退の就職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  description:
    '高卒・高校中退者の就職の現状、未経験から挑戦できる業界・職種、就職活動のコツを解説。',
  keywords: ['高卒', '高校中退', '就職', '未経験', 'キャリア'],
  canonicalPath: '/magazine/high-school',
  openGraphTitle: '高卒・高校中退の就職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  openGraphDescription:
    '高卒・高校中退者の就職の現状、未経験から挑戦できる業界・職種、就職活動のコツを解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="高卒・高校中退の就職｜成功のポイントとおすすめ業界・職種"
        description="高卒・高校中退者の就職の現状、未経験から挑戦できる業界・職種、就職活動のコツを解説。"
        url="/magazine/high-school"
      />
      <ArticlePageLayout
        catchphrase1="＼高卒・高校中退でも就職成功／"
        catchphrase2="【成功のポイントとおすすめ職種】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/high-school">マガジン</Link> {'>'} 高卒の就職 {'>'} 高卒・高校中退の就職
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          高卒・高校中退の就職｜成功のポイントとおすすめ業界・職種
        </h1>

        <HighSchoolArticle />
      </ArticlePageLayout>
    </>
  );
}
