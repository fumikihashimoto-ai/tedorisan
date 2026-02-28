import type { Metadata } from 'next';
import Link from 'next/link';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import FreshGraduateArticle from './FreshGraduateArticle';
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
    <ArticlePageLayout
      catchphrase1="＼新卒の手取り平均を徹底比較／"
      catchphrase2="【大卒・高卒・専門卒別】"
    >
      <TedoriCalculator noMargin contentLayout={true} />
      <nav className="breadcrumb mb-3">
        <Link href="/">ホーム</Link> {'>'} <Link href="/">計算ツール</Link> {'>'} 新卒向け手取り計算
      </nav>

      <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
        新卒の手取り平均は？大卒・高卒・専門卒のリアルな金額を徹底比較
      </h1>

      <FreshGraduateArticle />
    </ArticlePageLayout>
  );
}
