import type { Metadata } from 'next';
import Link from 'next/link';
import ItEngineerArticle from './ItEngineerArticle';
import PcAdSidebar from '@/app/components/PcAdSidebar';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: 'システムエンジニアのリアル年収大公開！職種・経験年数別の平均と高収入の秘訣 | 手取り計算シミュレーションツール テドリさん',
  description:
    'システムエンジニアの年収を徹底解説。全体平均から年齢層別、経験年数別、職種別（アプリ開発・インフラ・コンサル）の詳細データまで。市場価値の高いスキル、資格取得、転職交渉術、高年収企業の選び方も網羅。',
  keywords: ['システムエンジニア', 'SE', '年収', 'ITエンジニア', '転職', 'SIer', 'SES', '自社開発', '平均年収'],
  canonicalPath: '/data/industry/it-engineer',
  openGraphDescription:
    'システムエンジニアの年収を徹底解説。年齢層別・職種別の詳細データ、年収アップの方法まで網羅。',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          {/* 左カラム：メインコンテンツ */}
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} 業種別 {'>'} ITエンジニア
            </nav>

            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
              システムエンジニアのリアル年収大公開！職種・経験年数別の平均と高収入の秘訣
            </h1>

            <ItEngineerArticle />
          </main>

          {/* 右カラム：サイドバー広告 */}
          <div className="hidden lg:block lg:flex-shrink-0">
            <PcAdSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
