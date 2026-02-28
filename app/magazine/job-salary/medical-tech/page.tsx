import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import MedicalTechArticle from './MedicalTechArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '臨床検査技師の年収を上げる！給料アップの秘訣とキャリア戦略 | 手取りのミカタ',
  description:
    '臨床検査技師の平均年収を年代別・勤務先別・地域別に徹底解説。経験年数、保有資格、役職が年収に与える影響と、資格取得・転職・管理職・副業による年収アップの具体的な方法を紹介。',
  keywords: [
    '臨床検査技師',
    '年収',
    '給料',
    '転職',
    '細胞検査士',
    '超音波検査士',
    '認定臨床検査技師',
    '医療技術職',
  ],
  canonicalPath: '/magazine/job-salary/medical-tech',
  openGraphTitle: '臨床検査技師の年収を上げる！給料アップの秘訣とキャリア戦略 | 手取りのミカタ',
  openGraphDescription:
    '臨床検査技師の平均年収を年代別・勤務先別・地域別に徹底解説。経験年数、保有資格、役職が年収に与える影響と、資格取得・転職・管理職・副業による年収アップの具体的な方法を紹介。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="臨床検査技師の年収を上げる！給料アップの秘訣とキャリア戦略"
        description="臨床検査技師の平均年収を年代別・勤務先別・地域別に徹底解説。経験年数、保有資格、役職が年収に与える影響と、資格取得・転職・管理職・副業による年収アップの具体的な方法を紹介。"
        url="/magazine/job-salary/medical-tech"
      />
      <ArticlePageLayout
        catchphrase1="＼臨検技師の年収を上げる／"
        catchphrase2="【給料アップの秘訣と戦略】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/job-salary/it-engineer">マガジン</Link> {'>'} 職種別年収 {'>'} 臨床検査技師
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          臨床検査技師の年収を上げる！給料アップの秘訣とキャリア戦略
        </h1>

        <MedicalTechArticle />
      </ArticlePageLayout>
    </>
  );
}
