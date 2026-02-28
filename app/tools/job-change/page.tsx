import type { Metadata } from 'next';
import Link from 'next/link';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import JobChangeArticle from './JobChangeArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '【2026年版】年収アップ確実！失敗しない転職ロードマップ | 手取りのミカタ',
  description:
    '2026年版！転職で年収アップを確実に実現するロードマップ。市場価値の把握から企業選び、面接・年収交渉術まで、失敗しない転職戦略であなたの年収をアップさせる方法を徹底解説。',
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
  openGraphTitle: '【2026年版】年収アップ確実！失敗しない転職ロードマップ | 手取りのミカタ',
  openGraphDescription:
    '2026年版！転職で年収アップを確実に実現するロードマップ。市場価値の把握から企業選び、面接・年収交渉術まで、失敗しない転職戦略であなたの年収をアップさせる方法を徹底解説。',
  openGraphType: 'article',
});

export default function JobChangePage() {
  return (
    <ArticlePageLayout
      catchphrase1="＼年収アップ確実の転職術／"
      catchphrase2="【失敗しないロードマップ】"
    >
      <TedoriCalculator noMargin contentLayout={true} />
      <nav className="breadcrumb mb-3">
        <Link href="/">ホーム</Link> {'>'} <Link href="/">計算ツール</Link> {'>'} 転職向け手取り計算
      </nav>

      <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
        【2026年版】年収アップ確実！失敗しない転職ロードマップ
      </h1>

      <JobChangeArticle />
    </ArticlePageLayout>
  );
}
