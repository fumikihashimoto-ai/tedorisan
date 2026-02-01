import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import PharmacistSidebar from '@/app/components/PharmacistSidebar';
import PharmacistArticle from './PharmacistArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法 | 手取りのミカタ',
  description:
    '薬剤師の平均年収や年代別・施設別の給与実態、年収1000万円を達成する薬剤師の特徴と割合、専門性の向上・管理職・企業薬剤師・独立開業といった具体的なキャリア戦略を解説。',
  keywords: [
    '薬剤師',
    '年収',
    '年収1000万円',
    '転職',
    '調剤薬局',
    'ドラッグストア',
    '病院',
    '製薬会社',
    '管理薬剤師',
    '企業薬剤師',
  ],
  canonicalPath: '/magazine/job-salary/pharmacist',
  openGraphTitle: '薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法 | 手取りのミカタ',
  openGraphDescription:
    '薬剤師の平均年収や年代別・施設別の給与実態、年収1000万円を達成する薬剤師の特徴と割合、専門性の向上・管理職・企業薬剤師・独立開業といった具体的なキャリア戦略を解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ArticleStructuredData
        headline="薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法"
        description="薬剤師の平均年収や年代別・施設別の給与実態、年収1000万円を達成する薬剤師の特徴と割合、専門性の向上・管理職・企業薬剤師・独立開業といった具体的なキャリア戦略を解説。"
        url="/magazine/job-salary/pharmacist"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_pharmacist.png"
                alt=""
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 薬剤師
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
              薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法
            </h1>

            <PharmacistArticle />
          </main>

          {/* 右カラム：サイドバー（ファルマスタッフ広告） */}
          <PharmacistSidebar />
        </div>
      </div>

      {/* 固定広告: ページ下部固定表示 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div>
          <a
            href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+68EPD"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img
              width={728}
              height={90}
              alt=""
              src="https://www28.a8.net/svt/bgt?aid=260126641284&wid=001&eno=01&mid=s00000010261001047000&mc=1"
              className="border-0 max-w-full h-auto"
            />
          </a>
          <img
            width={1}
            height={1}
            src="https://www15.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+68EPD"
            alt=""
            className="border-0"
          />
        </div>
      </div>
    </div>
  );
}
