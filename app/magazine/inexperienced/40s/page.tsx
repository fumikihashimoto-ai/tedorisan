import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import Inexperienced40sArticle from './Inexperienced40sArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '40代の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  description:
    '40代の未経験転職の現状、豊富な社会人経験の活かし方、即戦力として評価される転職のコツを解説。',
  keywords: ['40代', '未経験', '転職', 'キャリアチェンジ', 'ポータブルスキル', '即戦力', 'ミドルキャリア'],
  canonicalPath: '/magazine/inexperienced/40s',
  openGraphTitle: '40代の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  openGraphDescription:
    '40代の未経験転職の現状、豊富な社会人経験の活かし方、即戦力として評価される転職のコツを解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="40代未経験からの転職を成功させる！後悔しないキャリアチェンジ術"
        description="40代の未経験転職の現状、豊富な社会人経験の活かし方、即戦力として評価される転職のコツを解説。"
        url="/magazine/inexperienced/40s"
      />
      <ArticlePageLayout
        catchphrase1="＼40代未経験でも転職成功／"
        catchphrase2="【後悔しないキャリアチェンジ】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/inexperienced/20s">マガジン</Link> {'>'} 未経験者の就職・転職 {'>'} 40代未経験者の転職
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          40代未経験からの転職を成功させる！後悔しないキャリアチェンジ術
        </h1>

        <Inexperienced40sArticle />
      </ArticlePageLayout>
    </>
  );
}
