import type { Metadata } from 'next';
import Link from 'next/link';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import SideBusinessArticle from './SideBusinessArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'これで安心！副業の確定申告をわかりやすく解説する完全マニュアル | 手取りのミカタ',
  description:
    '副業の確定申告、これで安心！必要条件から青色申告、経費、会社バレ対策まで、副業収入がある方が知るべき確定申告のすべてをわかりやすく解説。e-Taxでの提出方法も網羅した完全マニュアル。',
  keywords: [
    '副業 確定申告',
    '副業 税金',
    '副業 経費',
    '青色申告',
    '副業 住民税',
    '副業 会社バレ',
    '確定申告 マニュアル',
  ],
  canonicalPath: '/tools/side-business',
  openGraphTitle: 'これで安心！副業の確定申告をわかりやすく解説する完全マニュアル | 手取りのミカタ',
  openGraphDescription:
    '副業の確定申告、これで安心！必要条件から青色申告、経費、会社バレ対策まで、副業収入がある方が知るべき確定申告のすべてをわかりやすく解説。e-Taxでの提出方法も網羅した完全マニュアル。',
  openGraphType: 'article',
});

export default function SideBusinessPage() {
  return (
    <ArticlePageLayout
      catchphrase1="＼副業の確定申告を安心して／"
      catchphrase2="【わかりやすい完全マニュアル】"
    >
      <TedoriCalculator noMargin contentLayout={true} />
      <nav className="breadcrumb mb-3">
        <Link href="/">ホーム</Link> {'>'} <Link href="/">計算ツール</Link> {'>'} 副業向け手取り計算
      </nav>

      <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
        これで安心！副業の確定申告をわかりやすく解説する完全マニュアル
      </h1>

      <SideBusinessArticle />
    </ArticlePageLayout>
  );
}
