import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import Inexperienced40sWomenArticle from './Inexperienced40sWomenArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '40代女性の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  description:
    '40代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。',
  keywords: ['40代', '女性', '未経験', '転職', 'キャリアチェンジ', 'ワークライフバランス', 'ポータブルスキル', 'ミドルキャリア'],
  canonicalPath: '/magazine/inexperienced/40s-women',
  openGraphTitle: '40代女性の未経験転職｜成功のポイントとおすすめ業界・職種 | 手取りのミカタ',
  openGraphDescription:
    '40代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleStructuredData
        headline="40代未経験女性の転職を徹底サポート！新しいキャリアを掴む方法"
        description="40代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。"
        url="/magazine/inexperienced/40s-women"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_40s-women.png"
                alt=""
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/inexperienced/20s">マガジン</Link> {'>'} 未経験者の就職・転職 {'>'} 40代女性未経験者の転職
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              40代未経験女性の転職を徹底サポート！新しいキャリアを掴む方法
            </h1>

            <Inexperienced40sWomenArticle />
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
