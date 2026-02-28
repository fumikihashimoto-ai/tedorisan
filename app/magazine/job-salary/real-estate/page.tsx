import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import RealEstateArticle from './RealEstateArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '未経験から不動産営業で年収2000万！最短で稼ぐための全知識 | 手取りのミカタ',
  description:
    '未経験から不動産営業で年収2000万を達成するためのロードマップを徹底解説。年収構造、必須スキル、稼げる会社選び、顧客開拓・クロージング術、成功事例まで網羅。',
  keywords: [
    '不動産営業',
    '年収2000万',
    '未経験',
    '不動産業界',
    '宅建',
    '売買仲介',
    '投資用不動産',
    'インセンティブ',
  ],
  canonicalPath: '/magazine/job-salary/real-estate',
  openGraphTitle: '未経験から不動産営業で年収2000万！最短で稼ぐための全知識 | 手取りのミカタ',
  openGraphDescription:
    '未経験から不動産営業で年収2000万を達成するためのロードマップを徹底解説。年収構造、必須スキル、稼げる会社選び、顧客開拓・クロージング術、成功事例まで網羅。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="未経験から不動産営業で年収2000万！最短で稼ぐための全知識"
        description="未経験から不動産営業で年収2000万を達成するためのロードマップを徹底解説。年収構造、必須スキル、稼げる会社選び、顧客開拓・クロージング術、成功事例まで網羅。"
        url="/magazine/job-salary/real-estate"
      />
      <ArticlePageLayout
        catchphrase1="＼不動産営業で年収2000万へ／"
        catchphrase2="【未経験から最短で稼ぐ方法】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 不動産業界
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          未経験から不動産営業で年収2000万！最短で稼ぐための全知識
        </h1>

        <RealEstateArticle />
      </ArticlePageLayout>
    </>
  );
}
