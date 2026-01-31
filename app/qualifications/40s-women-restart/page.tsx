import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import Qualification40sWomenArticle from './Qualification40sWomenArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '40代女性が人生をやり直すためにおすすめな資格｜在宅・高収入を実現 | テドリさん',
  description:
    '在宅・高収入も夢じゃない。40代女性が人生をやり直すために本当に役立つ資格を厳選。Webデザイナー、プログラマー、オンライン秘書、医療事務、FPなどおすすめ資格5選を徹底解説。',
  keywords: ['40代', '女性', '資格', '人生やり直し', '在宅ワーク', '高収入', 'セカンドキャリア'],
  canonicalPath: '/qualifications/40s-women-restart',
  openGraphTitle: '40代女性が人生をやり直すためにおすすめな資格｜在宅・高収入を実現 | テドリさん',
  openGraphDescription:
    '在宅・高収入も夢じゃない。40代女性が人生をやり直すために本当に役立つ資格を厳選。Webデザイナー、プログラマー、オンライン秘書、医療事務、FPなどおすすめ資格5選を徹底解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="在宅・高収入も夢じゃない!「40代女性が人生をやり直すためにおすすめな資格」徹底解説"
        description="在宅・高収入も夢じゃない。40代女性が人生をやり直すために本当に役立つ資格を厳選。Webデザイナー、プログラマー、オンライン秘書、医療事務、FPなどおすすめ資格5選を徹底解説。"
        url="/qualifications/40s-women-restart"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/qualifications">資格</Link> {'>'} 40代女性が人生をやり直すためにおすすめな資格
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              在宅・高収入も夢じゃない!「40代女性が人生をやり直すためにおすすめな資格」徹底解説
            </h1>

            <Qualification40sWomenArticle />
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
