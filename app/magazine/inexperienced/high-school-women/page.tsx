import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import HighSchoolWomenArticle from './HighSchoolWomenArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '高卒女性の就職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  description:
    '高卒女性の就職の現状、女性に人気の業界・職種、ワークライフバランスを重視した就職のコツを解説。',
  keywords: ['高卒', '女性', '就職', '未経験', 'キャリア', 'ワークライフバランス'],
  canonicalPath: '/magazine/inexperienced/high-school-women',
  openGraphTitle: '高卒女性の就職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  openGraphDescription:
    '高卒女性の就職の現状、女性に人気の業界・職種、ワークライフバランスを重視した就職のコツを解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="高卒女性の就職を成功させる！未経験から理想のキャリアを掴む秘訣"
        description="高卒女性の就職の現状、女性に人気の業界・職種、ワークライフバランスを重視した就職のコツを解説。"
        url="/magazine/inexperienced/high-school-women"
      />
      <ArticlePageLayout
        catchphrase1="＼高卒女性の就職を成功させる／"
        catchphrase2="【未経験から理想のキャリア】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/inexperienced/20s">マガジン</Link> {'>'} 未経験者の就職・転職 {'>'} 高卒女性の就職
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          高卒女性の就職を成功させる！未経験から理想のキャリアを掴む秘訣
        </h1>

        <HighSchoolWomenArticle />
      </ArticlePageLayout>
    </>
  );
}
