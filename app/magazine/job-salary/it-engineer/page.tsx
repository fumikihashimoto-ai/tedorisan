import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ItEngineerArticle from './ItEngineerArticle';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: 'システムエンジニアのリアル年収大公開！職種・経験年数別の平均と高収入の秘訣 | 手取り計算シミュレーションツール テドリさん',
  description:
    'システムエンジニアの年収を徹底解説。全体平均から年齢層別、経験年数別、職種別（アプリ開発・インフラ・コンサル）の詳細データまで。市場価値の高いスキル、資格取得、転職交渉術、高年収企業の選び方も網羅。',
  keywords: ['システムエンジニア', 'SE', '年収', 'ITエンジニア', '転職', 'SIer', 'SES', '自社開発', '平均年収'],
  canonicalPath: '/magazine/job-salary/it-engineer',
  openGraphDescription:
    'システムエンジニアの年収を徹底解説。年齢層別・職種別の詳細データ、年収アップの方法まで網羅。',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="システムエンジニアのリアル年収大公開！職種・経験年数別の平均と高収入の秘訣"
        description="システムエンジニアの年収を徹底解説。全体平均から年齢層別、経験年数別、職種別（アプリ開発・インフラ・コンサル）の詳細データまで。市場価値の高いスキル、資格取得、転職交渉術、高年収企業の選び方も網羅。"
        url="/magazine/job-salary/it-engineer"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_it-engineer.png"
                alt=""
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} ITエンジニア
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              システムエンジニアのリアル年収大公開！職種・経験年数別の平均と高収入の秘訣
            </h1>

            <ItEngineerArticle />
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
