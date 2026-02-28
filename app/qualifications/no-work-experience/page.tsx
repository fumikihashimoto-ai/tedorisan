import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import NoWorkExperienceArticle from './NoWorkExperienceArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '未経験転職の年収相場｜職種別・年齢別の平均給与と年収アップ戦略【2026年版】',
  description:
    '未経験転職のリアルな年収データを職種別・年齢別に公開。IT・営業・事務・製造業など業界別の平均給与、転職で年収アップした実例、給与交渉のコツを徹底解説。無料の手取り計算ツールで転職後の収入をシミュレーション！',
  keywords: ['実務経験なし', '国家資格', '未経験', '行政書士', '宅建士', 'ITパスポート', 'FP', '登録販売者'],
  canonicalPath: '/qualifications/no-work-experience',
  openGraphTitle: '未経験転職の年収相場｜職種別・年齢別の平均給与と年収アップ戦略【2026年版】',
  openGraphDescription:
    '未経験転職のリアルな年収データを職種別・年齢別に公開。IT・営業・事務・製造業など業界別の平均給与を解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="未経験から始める!実務経験なしで取れる国家資格でキャリアを切り拓く方法"
        description="文系・理系・IT・医療福祉など分野別に厳選。行政書士、宅建士、FP、ITパスポート、登録販売者など未経験から取得できる国家資格と学習戦略を徹底解説。"
        url="/qualifications/no-work-experience"
      />
      <ArticlePageLayout
        catchphrase1="＼未経験から取れる国家資格／"
        catchphrase2="【実務経験なしでキャリアアップ】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/qualifications">資格</Link> {'>'} 実務経験なしで取れる国家資格
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          未経験から始める!実務経験なしで取れる国家資格でキャリアを切り拓く方法
        </h1>

        <NoWorkExperienceArticle />
      </ArticlePageLayout>
    </>
  );
}
