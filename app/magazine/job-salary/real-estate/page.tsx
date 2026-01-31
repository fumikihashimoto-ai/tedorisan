import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import RealEstateArticle from './RealEstateArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '未経験から不動産営業で年収2000万！最短で稼ぐための全知識 | 手取り計算シミュレーションツール テドリさん',
  description:
    '未経験から不動産営業で年収2000万を達成するためのロードマップを徹底解説。年収構造、必須スキル、稼げる会社選び、顧客開拓・クロージング術、成功事例まで網羅。',
  keywords: [
    '不動産営業',
    '年収2000万',
    '未経験',
    '不動産業界',
    '宅建',
    '売買仲介',
    '投資用不動産',
    'インセンティブ',
  ],
  canonicalPath: '/magazine/job-salary/real-estate',
  openGraphTitle: '未経験から不動産営業で年収2000万！最短で稼ぐための全知識 | 手取り計算シミュレーションツール テドリさん',
  openGraphDescription:
    '未経験から不動産営業で年収2000万を達成するためのロードマップを徹底解説。年収構造、必須スキル、稼げる会社選び、顧客開拓・クロージング術、成功事例まで網羅。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="未経験から不動産営業で年収2000万！最短で稼ぐための全知識"
        description="未経験から不動産営業で年収2000万を達成するためのロードマップを徹底解説。年収構造、必須スキル、稼げる会社選び、顧客開拓・クロージング術、成功事例まで網羅。"
        url="/magazine/job-salary/real-estate"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 不動産業界
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              未経験から不動産営業で年収2000万！最短で稼ぐための全知識
            </h1>

            <RealEstateArticle />
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
