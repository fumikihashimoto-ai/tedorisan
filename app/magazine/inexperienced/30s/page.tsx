import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import Inexperienced30sArticle from './Inexperienced30sArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '30代の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  description:
    '30代の未経験転職の現状、ポータブルスキルの活かし方、即戦力として評価される転職のコツを解説。後悔しないキャリアチェンジ術を紹介。',
  keywords: ['30代', '未経験', '転職', 'キャリアチェンジ', 'ポータブルスキル', '即戦力'],
  canonicalPath: '/magazine/inexperienced/30s',
  openGraphTitle: '30代の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  openGraphDescription:
    '30代の未経験転職の現状、ポータブルスキルの活かし方、即戦力として評価される転職のコツを解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="30代未経験からの転職を成功させる！後悔しないキャリアチェンジ術"
        description="30代の未経験転職の現状、ポータブルスキルの活かし方、即戦力として評価される転職のコツを解説。後悔しないキャリアチェンジ術を紹介。"
        url="/magazine/inexperienced/30s"
      />
      <ArticlePageLayout
        catchphrase1="＼30代未経験でも転職成功／"
        catchphrase2="【後悔しないキャリアチェンジ】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/inexperienced/20s">マガジン</Link> {'>'} 未経験者の就職・転職 {'>'} 30代未経験者の転職
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          30代未経験からの転職を成功させる！後悔しないキャリアチェンジ術
        </h1>

        <Inexperienced30sArticle />
      </ArticlePageLayout>
    </>
  );
}
