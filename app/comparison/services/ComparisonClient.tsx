'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type {
  DiagnosisResult,
  AgeRange,
  Situation,
  Priority,
} from '@/lib/diagnosisLogic';
import { isAgeRange, isSituation, isPriority } from '@/lib/diagnosisLogic';
import { getRecommendedServices } from '@/lib/comparisonData';
import { ServiceCard } from '@/app/components/ServiceCard';

export default function ComparisonClient() {
  const searchParams = useSearchParams();
  const age = searchParams.get('age');
  const situation = searchParams.get('situation');
  const priority = searchParams.get('priority');

  // パラメータ検証
  const isValid =
    age != null &&
    situation != null &&
    priority != null &&
    isAgeRange(age) &&
    isSituation(situation) &&
    isPriority(priority);

  if (!isValid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md text-center border border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            診断結果がありません
          </h1>
          <p className="text-gray-600 mb-6">
            診断からやり直してください
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold transition"
          >
            診断を開始する
          </Link>
        </div>
      </div>
    );
  }

  const result: DiagnosisResult = {
    age: age as AgeRange,
    situation: situation as Situation,
    priority: priority as Priority,
  };

  const services = getRecommendedServices(result);

  const getMessage = () => {
    switch (result.situation) {
      case 'it_beginner':
        return 'IT業界未経験からの転職をサポートするサービスをご紹介します';
      case 'it_experienced':
        return 'IT業界での年収アップを実現するサービスをご紹介します';
      case 'pharmacist':
        return '薬剤師の転職に特化したサービスをご紹介します';
      case 'skill_learning':
        return '実践的なスキルを身につけられるサービスをご紹介します';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* パンくずリスト */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            ホーム
          </Link>
          <span className="mx-2">&gt;</span>
          <span>サービス比較</span>
        </nav>

        {/* 見出し */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          あなたにおすすめのサービス
        </h1>
        <p className="text-lg text-gray-700 mb-8">{getMessage()}</p>

        {/* サービスカード */}
        <div className="space-y-6 mb-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              rank={index + 1}
              position="comparison_table"
            />
          ))}
        </div>

        {/* もう一度診断する */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-bold transition"
          >
            もう一度診断する
          </Link>
        </div>
      </div>
    </div>
  );
}
