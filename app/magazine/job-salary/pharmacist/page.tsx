import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import PharmacistArticle from './PharmacistArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法 | 手取り計算シミュレーションツール テドリさん',
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
  openGraphTitle: '薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法 | 手取り計算シミュレーションツール テドリさん',
  openGraphDescription:
    '薬剤師の平均年収や年代別・施設別の給与実態、年収1000万円を達成する薬剤師の特徴と割合、専門性の向上・管理職・企業薬剤師・独立開業といった具体的なキャリア戦略を解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法"
        description="薬剤師の平均年収や年代別・施設別の給与実態、年収1000万円を達成する薬剤師の特徴と割合、専門性の向上・管理職・企業薬剤師・独立開業といった具体的なキャリア戦略を解説。"
        url="/magazine/job-salary/pharmacist"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 薬剤師
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              薬剤師で年収1000万円は可能？高収入を狙うための具体的な方法
            </h1>

            <PharmacistArticle />
          </main>

          {/* 右カラム：サイドバー（fresh-graduate と同じ固定バナー2つ） */}
          <aside className="hidden lg:block lg:w-72 xl:w-80 lg:flex-shrink-0 lg:self-start sticky top-5 h-fit">
            <div className="space-y-4">
              <div>
                <a
                  href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4QVFEA+5P1E+5YZ75"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <img
                    width={300}
                    height={250}
                    alt=""
                    src="https://www22.a8.net/svt/bgt?aid=260126641287&wid=001&eno=01&mid=s00000026573001003000&mc=1"
                  />
                </a>
                <img
                  width={1}
                  height={1}
                  src="https://www18.a8.net/0.gif?a8mat=4AVF01+4QVFEA+5P1E+5YZ75"
                  alt=""
                />
              </div>
              <div>
                <a
                  href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4FK6WI+3Y6M+66H9D"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <img
                    width={300}
                    height={250}
                    alt=""
                    src="https://www26.a8.net/svt/bgt?aid=260126641268&wid=001&eno=01&mid=s00000018427001038000&mc=1"
                  />
                </a>
                <img
                  width={1}
                  height={1}
                  src="https://www14.a8.net/0.gif?a8mat=4AVF01+4FK6WI+3Y6M+66H9D"
                  alt=""
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
