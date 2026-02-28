import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import HighIncomeArticle from './HighIncomeArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '高収入が期待できる資格｜年収1000万円も夢じゃない | 手取りのミカタ',
  description:
    'ITストラテジスト、社労士、USCPAなど高収入が期待できる資格を厳選紹介。資格の選び方、効率的な学習計画、転職・独立の成功事例まで徹底解説。',
  keywords: ['高収入資格', '年収1000万円', 'ITストラテジスト', '社労士', 'USCPA', '資格取得'],
  canonicalPath: '/qualifications/high-income',
  openGraphTitle: '高収入が期待できる資格｜年収1000万円も夢じゃない | 手取りのミカタ',
  openGraphDescription:
    'ITストラテジスト、社労士、USCPAなど高収入が期待できる資格を厳選紹介。資格の選び方、効率的な学習計画、転職・独立の成功事例まで徹底解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="年収1000万円も夢じゃない!高収入が期待できる資格の選び方と成功事例"
        description="ITストラテジスト、社労士、USCPAなど高収入が期待できる資格を厳選紹介。資格の選び方、効率的な学習計画、転職・独立の成功事例まで徹底解説。"
        url="/qualifications/high-income"
      />
      <ArticlePageLayout
        catchphrase1="＼年収1000万を狙う資格／"
        catchphrase2="【高収入が期待できる資格】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/qualifications">資格</Link> {'>'} 高収入が期待できる資格
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          年収1000万円も夢じゃない!高収入が期待できる資格の選び方と成功事例
        </h1>

        <HighIncomeArticle />
      </ArticlePageLayout>
    </>
  );
}
