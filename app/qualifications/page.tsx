import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '資格一覧｜手取りアップに役立つ資格 | テドリさん',
  description: '年収・手取りアップに役立つ資格を一覧で紹介。国家資格、民間資格、職種別のおすすめ資格を解説。',
  keywords: ['資格', '国家資格', '民間資格', '年収アップ', '手取り', 'キャリアアップ'],
  canonicalPath: '/qualifications',
  openGraphTitle: '資格一覧｜手取りアップに役立つ資格 | テドリさん',
  openGraphDescription: '年収・手取りアップに役立つ資格を一覧で紹介。国家資格、民間資格、職種別のおすすめ資格を解説。',
  openGraphType: 'website',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} 資格
        </nav>
        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6">
          資格一覧
        </h1>
        <p className="text-base leading-[1.8] mb-4">
          年収・手取りアップに役立つ資格を一覧で紹介します。国家資格、民間資格、職種別のおすすめ資格を解説予定です。
        </p>
        <div className="space-y-4 mt-6">
          <Link
            href="/qualifications/araforty-engineer"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="font-bold text-gray-800 mb-1">アラフォー未経験からのエンジニア転職</h2>
            <p className="text-sm text-gray-600">
              40代から未経験でエンジニアを目指す方へ。成功のポイントとおすすめの資格・学習方法を解説。
            </p>
          </Link>
          <Link
            href="/qualifications/40s-women-restart"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="font-bold text-gray-800 mb-1">40代女性が人生をやり直すためにおすすめな資格</h2>
            <p className="text-sm text-gray-600">
              在宅・高収入も夢じゃない。Webデザイナー、プログラマー、オンライン秘書、医療事務、FPなどおすすめ資格5選を徹底解説。
            </p>
          </Link>
          <Link
            href="/qualifications/stable-career"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="font-bold text-gray-800 mb-1">食いっぱぐれない資格</h2>
            <p className="text-sm text-gray-600">
              もう仕事に困らない。医療介護、IT、法律会計、建設不動産など、一生涯活躍できる食いっぱぐれない資格を徹底解説。
            </p>
          </Link>
          <Link
            href="/qualifications/high-income"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="font-bold text-gray-800 mb-1">高収入が期待できる資格</h2>
            <p className="text-sm text-gray-600">
              年収1000万円も夢じゃない。ITストラテジスト、社労士、USCPAなど、本当に稼げる資格の選び方と成功事例を徹底解説。
            </p>
          </Link>
          <Link
            href="/qualifications/no-entry-requirement"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="font-bold text-gray-800 mb-1">受験資格なしで取れる国家資格</h2>
            <p className="text-sm text-gray-600">
              学歴・実務経験不問。行政書士、宅建士、ITパスポートなど、未経験から挑戦できる国家資格で人生を変える方法を徹底解説。
            </p>
          </Link>
          <Link
            href="/qualifications/no-work-experience"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="font-bold text-gray-800 mb-1">実務経験なしで取れる国家資格</h2>
            <p className="text-sm text-gray-600">
              文系・理系・IT・医療福祉など分野別に厳選。行政書士、宅建士、FP、ITパスポート、登録販売者など未経験からキャリアを切り拓く方法を徹底解説。
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
