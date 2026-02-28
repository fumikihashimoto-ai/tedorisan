import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import ArafortyEngineerArticle from './ArafortyEngineerArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '40代未経験エンジニア転職｜年収600万の学習ロードマップ【2026年版】',
  description:
    'アラフォーからのエンジニア転職成功事例を徹底分析。42歳未経験で年収600万円を実現した学習ロードマップ、おすすめプログラミング言語、成功率を上げる転職戦略を解説。無料の年収シミュレーターで転職後の手取りを確認！',
  keywords: ['アラフォー', '40代', '未経験', 'エンジニア転職', 'IT転職', 'プログラミング', '資格'],
  canonicalPath: '/qualifications/araforty-engineer',
  openGraphTitle: '40代未経験エンジニア転職｜年収600万の学習ロードマップ【2026年版】',
  openGraphDescription:
    'アラフォーからのエンジニア転職成功事例を徹底分析。42歳未経験で年収600万円を実現した学習ロードマップを解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="【2026年版】アラフォー未経験からエンジニア転職｜42歳でも年収600万円を実現した学習ロードマップ"
        description="42歳未経験からエンジニア転職は可能です。年収600万円を実現した学習ロードマップ、おすすめスクール、転職成功の秘訣を徹底解説。手取り計算も掲載。アラフォーだからこその強みを活かす方法がわかります。"
        url="/qualifications/araforty-engineer"
      />
      <ArticlePageLayout
        catchphrase1="＼40代未経験でもエンジニア転職／"
        catchphrase2="【年収600万の学習ロードマップ】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/qualifications">資格</Link> {'>'} アラフォー未経験からのエンジニア転職
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          【2026年版】アラフォー未経験からエンジニア転職｜42歳でも年収600万円を実現した学習ロードマップ
        </h1>

        <ArafortyEngineerArticle />
      </ArticlePageLayout>
    </>
  );
}
