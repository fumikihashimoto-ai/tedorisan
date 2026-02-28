import type { Metadata } from 'next';
import Link from 'next/link';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import ComparisonListClient from '../components/ComparisonListClient';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '年代別 手取り徹底解説!将来設計に役立つ賢いお金の増やし方 | 手取りのミカタ',
  description: '年代別のリアルな手取り額と税金・社会保険料の仕組みを徹底解説。節税対策、スキルアップ、NISA・iDeCoを活用した資産形成術まで、手取りを最大化する具体的な戦略を網羅。',
  keywords: ['年代別 手取り', '手取り 徹底解説', '将来設計', '資産形成', 'NISA', 'iDeCo', '節税'],
  canonicalPath: '/tables',
  openGraphTitle: '年代別 手取り徹底解説!将来設計に役立つ賢いお金の増やし方',
  openGraphDescription: '年代別のリアルな手取り額と税金・社会保険料の仕組みを徹底解説。節税対策、スキルアップ、NISA・iDeCoを活用した資産形成術まで網羅。',
  openGraphType: 'website',
});

export default function TablesPage() {
  return (
    <ArticlePageLayout
      catchphrase1="＼年代別 手取りを徹底解説／"
      catchphrase2="【将来設計に役立つお金の増やし方】"
    >
      <TedoriCalculator noMargin contentLayout={true} />
      <nav className="breadcrumb mb-3">
        <Link href="/">ホーム</Link> {'>'} <Link href="/tables">手取り一覧表</Link> {'>'} 一覧表
      </nav>

      <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
        年代別 手取り徹底解説!将来設計に役立つ賢いお金の増やし方
      </h1>

      <ComparisonListClient />
    </ArticlePageLayout>
  );
}
