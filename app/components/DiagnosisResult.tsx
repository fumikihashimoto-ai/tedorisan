'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { DiagnosisResult as DiagnosisResultType } from '@/lib/diagnosisLogic';
import type { Situation } from '@/lib/diagnosisLogic';
import { getRecommendedServices } from '@/lib/comparisonData';
import { ServiceCard } from './ServiceCard';

// ============================================================
// 型定義
// ============================================================

export interface DiagnosisResultProps {
  result: DiagnosisResultType;
}

// ============================================================
// GA4（gtag）の型拡張
// ============================================================

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params: Record<string, string>
    ) => void;
  }
}

// ============================================================
// パーソナライズメッセージ
// ============================================================

const SITUATION_MESSAGES: Record<Situation, string> = {
  it_beginner:
    'IT業界未経験からの転職をサポートするサービスをご紹介します',
  it_experienced:
    'IT業界での年収アップを実現するサービスをご紹介します',
  pharmacist: '薬剤師の転職に特化したサービスをご紹介します',
  skill_learning:
    '実践的なスキルを身につけられるサービスをご紹介します',
};

// ============================================================
// コンポーネント
// ============================================================

export function DiagnosisResult({ result }: DiagnosisResultProps) {
  const services = getRecommendedServices(result);

  /** 診断完了GA4イベント */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'diagnosis_complete', {
        age: result.age,
        situation: result.situation,
        priority: result.priority,
      });
    }
  }, [result.age, result.situation, result.priority]);

  const comparisonHref = `/comparison/services/?age=${encodeURIComponent(result.age)}&situation=${encodeURIComponent(result.situation)}&priority=${encodeURIComponent(result.priority)}`;

  const getMessage = () => SITUATION_MESSAGES[result.situation];

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        あなたにおすすめの方法
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        {getMessage()}
      </p>

      {/* サービスカード */}
      <div className="space-y-8 mb-8">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            rank={index + 1}
            position="diagnosis_result"
          />
        ))}
      </div>

      {/* 比較表への誘導 */}
      <Link
        href={comparisonHref}
        className="block w-full border-2 border-blue-600 text-blue-600 text-center py-3 rounded-lg font-bold hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
      >
        さらに詳しく比較する
      </Link>
    </>
  );
}
