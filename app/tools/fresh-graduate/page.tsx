import type { Metadata } from 'next';
import Link from 'next/link';
import FreshGraduateArticle from './FreshGraduateArticle';
import TopPageSidebar from '@/app/components/TopPageSidebar';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '新卒の手取り平均は？大卒・高卒・専門卒のリアルな金額を徹底比較 | 手取りのミカタ',
  description:
    '新卒の手取り平均はいくら？大卒・高卒・専門卒別にリアルな手取り平均額を徹底解説。初任給から引かれる税金や社会保険、手取りを増やす方法まで、新卒が知るべき情報を網羅。',
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
  openGraphTitle: '新卒の手取り平均は？大卒・高卒・専門卒のリアルな金額を徹底比較 | 手取りのミカタ',
  openGraphDescription:
    '新卒の手取り平均はいくら？大卒・高卒・専門卒別にリアルな手取り平均額を徹底解説。初任給から引かれる税金や社会保険、手取りを増やす方法まで、新卒が知るべき情報を網羅。',
  openGraphType: 'article',
});

export default function FreshGraduatePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_fresh-graduate.png"
                alt="年収と手取りのギャップを説明する図"
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/">計算ツール</Link> {'>'} 新卒向け手取り計算
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
              新卒の手取り平均は？大卒・高卒・専門卒のリアルな金額を徹底比較
            </h1>

            <FreshGraduateArticle />
          </main>

          {/* 右カラム：サイドバー（TOPページと同じ広告） */}
          <TopPageSidebar />
        </div>
      </div>
    </div>
  );
}
