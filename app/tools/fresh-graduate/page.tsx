import type { Metadata } from 'next';
import Link from 'next/link';
import FreshGraduateClient from '../../components/FreshGraduateClient';
import FreshGraduateArticle from './FreshGraduateArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '新卒の手取り平均は？大卒・高卒・専門卒のリアルな金額を徹底比較 | テドリさん',
  description:
    '新卒の手取り平均を大卒・高卒・専門卒別に徹底解説。大卒は約17.8万〜20.2万円、高卒は約14.8万〜16.8万円、専門卒は約16.7万〜18.9万円が目安。額面から手取りの計算方法や、手取りを増やす具体的な方法も紹介。',
  keywords: [
    '新卒 手取り',
    '新卒 手取り 平均',
    '大卒 手取り',
    '高卒 手取り',
    '専門卒 手取り',
    '初任給',
    '新卒 年収',
  ],
  canonicalPath: '/tools/fresh-graduate',
  openGraphTitle: '新卒の手取り平均は？大卒・高卒・専門卒のリアルな金額を徹底比較',
  openGraphDescription:
    '新卒の手取り平均を大卒・高卒・専門卒別に徹底解説。額面から手取りの計算方法や、手取りを増やす具体的な方法も紹介。',
  openGraphType: 'article',
});

export default function FreshGraduatePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} 新卒・就活生向け
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              新卒の手取り平均は？大卒・高卒・専門卒のリアルな金額を徹底比較
            </h1>

            {/* 計算ツール（記事の上に配置） */}
            <FreshGraduateClient embedded />

            <FreshGraduateArticle />
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
