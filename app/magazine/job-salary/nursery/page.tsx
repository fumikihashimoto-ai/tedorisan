import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import NurseryArticle from './NurseryArticle';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '「保育士 年収」を上げたい！今すぐできる給料アップ術と賢い転職先選び | 手取り計算シミュレーションツール テドリさん',
  description:
    '保育士の年収を徹底解説。全国平均から地域別・経験年数別・施設形態別の実態、資格手当・処遇改善手当・副業などの給料アップ術、高年収が期待できる保育施設の選び方、転職エージェントの活用法まで網羅。',
  keywords: ['保育士', '年収', '手取り', '転職', '公立保育園', '私立保育園', '処遇改善', '借り上げ社宅'],
  canonicalPath: '/magazine/job-salary/nursery',
  openGraphDescription:
    '保育士の年収を徹底解説。給料アップ術、高年収が期待できる保育施設の選び方、転職のポイントまで網羅。',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="保育士 年収を上げたい！今すぐできる給料アップ術と賢い転職先選び"
        description="保育士の年収を徹底解説。全国平均から地域別・経験年数別・施設形態別の実態、資格手当・処遇改善手当・副業などの給料アップ術、高年収が期待できる保育施設の選び方、転職エージェントの活用法まで網羅。"
        url="/magazine/job-salary/nursery"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_nursery.png"
                alt=""
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 保育士の年収・手取り
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              「保育士 年収」を上げたい！今すぐできる給料アップ術と賢い転職先選び
            </h1>

            <NurseryArticle />
          </main>

          {/* 右カラム：サイドバー */}
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
