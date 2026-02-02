import type { Metadata } from 'next';
import Link from 'next/link';
import SideBusinessArticle from './SideBusinessArticle';
import ArticleSidebarAd from '@/app/components/ArticleSidebarAd';
import { ARTICLE_SIDEBAR_ADS } from '@/lib/ads';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'これで安心！副業の確定申告をわかりやすく解説する完全マニュアル | 手取りのミカタ',
  description:
    '副業の確定申告、これで安心！必要条件から青色申告、経費、会社バレ対策まで、副業収入がある方が知るべき確定申告のすべてをわかりやすく解説。e-Taxでの提出方法も網羅した完全マニュアル。',
  keywords: [
    '副業 確定申告',
    '副業 税金',
    '副業 経費',
    '青色申告',
    '副業 住民税',
    '副業 会社バレ',
    '確定申告 マニュアル',
  ],
  canonicalPath: '/tools/side-business',
  openGraphTitle: 'これで安心！副業の確定申告をわかりやすく解説する完全マニュアル | 手取りのミカタ',
  openGraphDescription:
    '副業の確定申告、これで安心！必要条件から青色申告、経費、会社バレ対策まで、副業収入がある方が知るべき確定申告のすべてをわかりやすく解説。e-Taxでの提出方法も網羅した完全マニュアル。',
  openGraphType: 'article',
});

export default function SideBusinessPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_side-business.png"
                alt=""
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/">計算ツール</Link> {'>'} 副業向け手取り計算
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
              これで安心！副業の確定申告をわかりやすく解説する完全マニュアル
            </h1>

            <SideBusinessArticle />
          </main>

          {/* 右カラム：サイドバー */}
          <ArticleSidebarAd {...ARTICLE_SIDEBAR_ADS.sideBusiness} />
        </div>
      </div>

      {/* 固定広告: ページ下部に常時表示 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div>
          <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4VMW8I+4JGQ+BXIYP" target="_blank" rel="nofollow noopener noreferrer">
            <img
              width={728}
              height={90}
              alt=""
              src="https://www26.a8.net/svt/bgt?aid=260126641295&wid=001&eno=01&mid=s00000021185002004000&mc=1"
              className="border-0 max-w-full h-auto"
            />
          </a>
          <img width={1} height={1} src="https://www12.a8.net/0.gif?a8mat=4AVF01+4VMW8I+4JGQ+BXIYP" alt="" aria-hidden />
        </div>
      </div>
    </div>
  );
}
