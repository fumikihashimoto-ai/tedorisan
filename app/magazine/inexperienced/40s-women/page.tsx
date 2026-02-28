import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import Inexperienced40sWomenArticle from './Inexperienced40sWomenArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '40代女性の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  description:
    '40代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。',
  keywords: ['40代', '女性', '未経験', '転職', 'キャリアチェンジ', 'ワークライフバランス', 'ポータブルスキル', 'ミドルキャリア'],
  canonicalPath: '/magazine/inexperienced/40s-women',
  openGraphTitle: '40代女性の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  openGraphDescription:
    '40代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="40代未経験女性の転職を徹底サポート！新しいキャリアを掴む方法"
        description="40代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。"
        url="/magazine/inexperienced/40s-women"
      />
      <ArticlePageLayout
        catchphrase1="＼40代女性の転職を成功させる／"
        catchphrase2="【新しいキャリアを掴む方法】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/inexperienced/20s">マガジン</Link> {'>'} 未経験者の就職・転職 {'>'} 40代女性未経験者の転職
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          40代未経験女性の転職を徹底サポート！新しいキャリアを掴む方法
        </h1>

        <Inexperienced40sWomenArticle />
      </ArticlePageLayout>
    </>
  );
}
