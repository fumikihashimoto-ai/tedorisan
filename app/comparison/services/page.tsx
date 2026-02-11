import { Suspense } from 'react';
import type { Metadata } from 'next';
import ComparisonClient from './ComparisonClient';

export const metadata: Metadata = {
  title: 'あなたにおすすめのサービス比較｜手取りのミカタ',
  description:
    '診断結果に基づいたおすすめサービスを比較。転職・スキル習得であなたに最適な方法を見つけましょう。',
  robots: {
    index: false,
    follow: true,
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">読み込み中...</p>
      </div>
    </div>
  );
}

export default function ComparisonPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ComparisonClient />
    </Suspense>
  );
}
