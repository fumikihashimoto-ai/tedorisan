import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import Inexperienced30sWomenArticle from './Inexperienced30sWomenArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '30代女性の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  description:
    '30代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。',
  keywords: ['30代', '女性', '未経験', '転職', 'キャリアチェンジ', 'ワークライフバランス', 'ポータブルスキル'],
  canonicalPath: '/magazine/inexperienced/30s-women',
  openGraphTitle: '30代女性の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  openGraphDescription:
    '30代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="30代女性が未経験で転職成功！不安を自信に変える秘訣【完全ガイド】"
        description="30代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。"
        url="/magazine/inexperienced/30s-women"
      />
      <ArticlePageLayout
        catchphrase1="＼30代女性の未経験転職を成功／"
        catchphrase2="【不安を自信に変える秘訣】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/inexperienced/20s">マガジン</Link> {'>'} 未経験者の就職・転職 {'>'} 30代女性未経験者の転職
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          30代女性が未経験で転職成功！不安を自信に変える秘訣【完全ガイド】
        </h1>

        <Inexperienced30sWomenArticle />
      </ArticlePageLayout>
    </>
  );
}
