import type { Metadata } from 'next';
import Link from 'next/link';
import JobChangeClient from '../../components/JobChangeClient';
import JobChangeArticle from './JobChangeArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '【2026年版】年収アップ確実！失敗しない転職ロードマップ | テドリさん',
  description:
    '2026年の転職市場で年収アップを確実にするロードマップ。市場価値の把握、職務経歴書の書き方、面接・年収交渉のコツ、転職エージェントの活用法まで徹底解説。転職前後の手取り比較シミュレーター付き。',
  keywords: [
    '転職 年収',
    '転職 年収アップ',
    '転職 ロードマップ',
    '転職 年収交渉',
    '年収比較',
    '転職シミュレーション',
    '年収 手取り 比較',
  ],
  canonicalPath: '/tools/job-change',
  openGraphTitle: '【2026年版】年収アップ確実！失敗しない転職ロードマップ',
  openGraphDescription:
    '2026年の転職市場で年収アップを確実にするロードマップ。市場価値の把握、職務経歴書の書き方、面接・年収交渉のコツまで徹底解説。',
  openGraphType: 'article',
});

export default function JobChangePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} 転職検討者向け
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              【2026年版】年収アップ確実！失敗しない転職ロードマップ
            </h1>

            {/* 計算ツール（記事の上に配置） */}
            <JobChangeClient embedded />

            <JobChangeArticle />
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
