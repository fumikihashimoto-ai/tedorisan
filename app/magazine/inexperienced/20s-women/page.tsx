import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import InexperiencedWomenArticle from './InexperiencedWomenArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '20代女性の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  description:
    '20代女性の未経験転職の現状、女性に人気の業界・職種、ワークライフバランスを重視した転職のコツを解説。スキルなしと悩む方へ、後悔しないキャリアチェンジ術を紹介。',
  keywords: ['女性', '未経験', '転職', '20代', 'キャリアチェンジ', 'ワークライフバランス'],
  canonicalPath: '/magazine/inexperienced/20s-women',
  openGraphTitle: '20代女性の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  openGraphDescription:
    '20代女性の未経験転職の現状、女性に人気の業界・職種、ワークライフバランスを重視した転職のコツを解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="転職したい20代女性へ。スキルなしでも叶う！後悔しないキャリアチェンジ術"
        description="20代女性の未経験転職の現状、女性に人気の業界・職種、ワークライフバランスを重視した転職のコツを解説。スキルなしと悩む方へ、後悔しないキャリアチェンジ術を紹介。"
        url="/magazine/inexperienced/20s-women"
      />
      <ArticlePageLayout
        catchphrase1="＼20代女性の転職を成功させる／"
        catchphrase2="【スキルなしでも叶う転職】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/inexperienced/20s">マガジン</Link> {'>'} 未経験者の就職・転職 {'>'} 20代女性未経験者の転職
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          「転職」したい「20代女性」へ。「スキルなし」でも叶う！後悔しないキャリアチェンジ術
        </h1>

        <InexperiencedWomenArticle />
      </ArticlePageLayout>
    </>
  );
}
