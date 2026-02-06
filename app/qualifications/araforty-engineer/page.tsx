import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticleSidebarAd from '@/app/components/ArticleSidebarAd';
import ArafortyEngineerArticle from './ArafortyEngineerArticle';
import { ARTICLE_SIDEBAR_ADS } from '@/lib/ads';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '【2026年版】アラフォー未経験からエンジニア転職｜42歳でも年収600万円を実現した学習ロードマップ',
  description:
    '42歳未経験からエンジニア転職は可能です。年収600万円を実現した学習ロードマップ、おすすめスクール、転職成功の秘訣を徹底解説。手取り計算も掲載。アラフォーだからこその強みを活かす方法がわかります。',
  keywords: ['アラフォー', '40代', '未経験', 'エンジニア転職', 'IT転職', 'プログラミング', '資格'],
  canonicalPath: '/qualifications/araforty-engineer',
  openGraphTitle: '【2026年版】アラフォー未経験からエンジニア転職｜42歳でも年収600万円を実現した学習ロードマップ',
  openGraphDescription:
    '42歳未経験からエンジニア転職は可能です。年収600万円を実現した学習ロードマップ、おすすめスクール、転職成功の秘訣を徹底解説。手取り計算も掲載。アラフォーだからこその強みを活かす方法がわかります。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ArticleStructuredData
        headline="【2026年版】アラフォー未経験からエンジニア転職｜42歳でも年収600万円を実現した学習ロードマップ"
        description="42歳未経験からエンジニア転職は可能です。年収600万円を実現した学習ロードマップ、おすすめスクール、転職成功の秘訣を徹底解説。手取り計算も掲載。アラフォーだからこその強みを活かす方法がわかります。"
        url="/qualifications/araforty-engineer"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_araforty-engineer.png"
                alt=""
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/qualifications">資格</Link> {'>'} アラフォー未経験からのエンジニア転職
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
              【2026年版】アラフォー未経験からエンジニア転職｜42歳でも年収600万円を実現した学習ロードマップ
            </h1>

            <ArafortyEngineerArticle />
          </main>

          {/* 右カラム：サイドバー（ディープロ・薬剤師ページ同様デザイン） */}
          <ArticleSidebarAd {...ARTICLE_SIDEBAR_ADS.arafortyEngineer} />
        </div>
      </div>
    </div>
  );
}
