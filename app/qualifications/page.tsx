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
        </div>
      </div>
    </div>
  );
}
