import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import NoEntryRequirementArticle from './NoEntryRequirementArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '受験資格なしで取れる国家資格｜未経験から人生を変える | 手取りのミカタ',
  description:
    '学歴・実務経験不問の国家資格を厳選紹介。行政書士、宅建士、ITパスポートなど、未経験から挑戦できる資格の勉強法とキャリア戦略を徹底解説。',
  keywords: ['受験資格なし', '国家資格', '学歴不問', '未経験', '行政書士', '宅建士', 'ITパスポート'],
  canonicalPath: '/qualifications/no-entry-requirement',
  openGraphTitle: '受験資格なしで取れる国家資格｜未経験から人生を変える | 手取りのミカタ',
  openGraphDescription:
    '学歴・実務経験不問の国家資格を厳選紹介。行政書士、宅建士、ITパスポートなど、未経験から挑戦できる資格の勉強法とキャリア戦略を徹底解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="未経験から挑戦!受験資格なしで取れる国家資格で人生を変える方法"
        description="学歴・実務経験不問の国家資格を厳選紹介。行政書士、宅建士、ITパスポートなど、未経験から挑戦できる資格の勉強法とキャリア戦略を徹底解説。"
        url="/qualifications/no-entry-requirement"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_no-entry-requirement.png"
                alt=""
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/qualifications">資格</Link> {'>'} 受験資格なしで取れる国家資格
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              未経験から挑戦!受験資格なしで取れる国家資格で人生を変える方法
            </h1>

            <NoEntryRequirementArticle />
          </main>

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
