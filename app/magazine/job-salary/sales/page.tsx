import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import SalesArticle from './SalesArticle';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '営業職の年収アップを確実にする！市場価値を高めるスキルと転職術 | 手取り計算シミュレーションツール テドリさん',
  description:
    '営業職の年収を徹底解説。業界・年齢・地域別の平均、成果直結の営業スキル、専門知識、マネジメント能力、語学・ITスキル、転職術、年収交渉のポイントまで網羅。',
  keywords: [
    '営業職',
    '年収',
    '手取り',
    '転職',
    'MR',
    '金融営業',
    '不動産営業',
    'IT営業',
    'インセンティブ',
    '法人営業',
  ],
  canonicalPath: '/magazine/job-salary/sales',
  openGraphDescription:
    '営業職の年収を徹底解説。市場価値を高めるスキル習得法、転職術、年収交渉のポイントまで網羅。',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="営業職の年収アップを確実にする！市場価値を高めるスキルと転職術"
        description="営業職の年収を徹底解説。業界・年齢・地域別の平均、成果直結の営業スキル、専門知識、マネジメント能力、語学・ITスキル、転職術、年収交渉のポイントまで網羅。"
        url="/magazine/job-salary/sales"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 営業職の年収・手取り
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              営業職の年収アップを確実にする！市場価値を高めるスキルと転職術
            </h1>

            <SalesArticle />
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
