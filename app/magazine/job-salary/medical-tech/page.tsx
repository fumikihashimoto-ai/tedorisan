import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import MedicalTechArticle from './MedicalTechArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '臨床検査技師の年収を上げる！給料アップの秘訣とキャリア戦略 | 手取り計算シミュレーションツール テドリさん',
  description:
    '臨床検査技師の平均年収を年代別・勤務先別・地域別に徹底解説。経験年数、保有資格、役職が年収に与える影響と、資格取得・転職・管理職・副業による年収アップの具体的な方法を紹介。',
  keywords: [
    '臨床検査技師',
    '年収',
    '給料',
    '転職',
    '細胞検査士',
    '超音波検査士',
    '認定臨床検査技師',
    '医療技術職',
  ],
  canonicalPath: '/magazine/job-salary/medical-tech',
  openGraphTitle: '臨床検査技師の年収を上げる！給料アップの秘訣とキャリア戦略 | 手取り計算シミュレーションツール テドリさん',
  openGraphDescription:
    '臨床検査技師の平均年収を年代別・勤務先別・地域別に徹底解説。経験年数、保有資格、役職が年収に与える影響と、資格取得・転職・管理職・副業による年収アップの具体的な方法を紹介。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="臨床検査技師の年収を上げる！給料アップの秘訣とキャリア戦略"
        description="臨床検査技師の平均年収を年代別・勤務先別・地域別に徹底解説。経験年数、保有資格、役職が年収に与える影響と、資格取得・転職・管理職・副業による年収アップの具体的な方法を紹介。"
        url="/magazine/job-salary/medical-tech"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 臨床検査技師
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              臨床検査技師の年収を上げる！給料アップの秘訣とキャリア戦略
            </h1>

            <MedicalTechArticle />
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
