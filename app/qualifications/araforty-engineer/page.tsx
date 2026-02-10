import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticleSidebarAd from '@/app/components/ArticleSidebarAd';
import ArafortyEngineerArticle from './ArafortyEngineerArticle';
import { ARTICLE_SIDEBAR_ADS } from '@/lib/ads';
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

      {/* 固定広告: ページ下部固定表示（ディープロ） */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div>
          <a
            href="https://h.accesstrade.net/sp/cc?rk=0100kno800onsa"
            rel="nofollow"
            referrerPolicy="no-referrer-when-downgrade"
            target="_blank"
          >
            <img
              src="https://h.accesstrade.net/sp/rr?rk=0100kno800onsa"
              alt="ディープロ"
              width={728}
              height={90}
              className="border-0 max-w-full h-auto"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
