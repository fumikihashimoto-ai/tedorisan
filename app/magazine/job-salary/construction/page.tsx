import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ConstructionArticle from './ConstructionArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '建設業で年収1000万円を目指す！高収入を実現するキャリア戦略と秘訣 | 手取りのミカタ',
  description:
    '建設業の平均年収から職種別の給与水準、年収1000万円を達成するキャリアパス、取得すべき国家資格、効果的な転職戦略まで、高収入を実現するための秘訣を網羅的に解説。',
  keywords: [
    '建設業界',
    '年収1000万円',
    '施工管理',
    '建築士',
    'ゼネコン',
    '転職',
    '資格',
    'キャリア',
  ],
  canonicalPath: '/magazine/job-salary/construction',
  openGraphTitle: '建設業で年収1000万円を目指す！高収入を実現するキャリア戦略と秘訣 | 手取りのミカタ',
  openGraphDescription:
    '建設業の平均年収から職種別の給与水準、年収1000万円を達成するキャリアパス、取得すべき国家資格、効果的な転職戦略まで、高収入を実現するための秘訣を網羅的に解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="建設業で年収1000万円を目指す！高収入を実現するキャリア戦略と秘訣"
        description="建設業の平均年収から職種別の給与水準、年収1000万円を達成するキャリアパス、取得すべき国家資格、効果的な転職戦略まで、高収入を実現するための秘訣を網羅的に解説。"
        url="/magazine/job-salary/construction"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_construction.png"
                alt=""
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 建設業界
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              建設業で年収1000万円を目指す！高収入を実現するキャリア戦略と秘訣
            </h1>

            <ConstructionArticle />
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
