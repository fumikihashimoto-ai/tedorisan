'use client';

import type { DiagnosisResult } from '@/lib/diagnosisLogic';
import { DiagnosisForm } from './DiagnosisForm';

type Props = {
  /** 診断完了時に親に結果を渡す（省略時はログ出力のみ） */
  onComplete?: (result: DiagnosisResult) => void;
};

export function DiagnosisSection({ onComplete }: Props) {
  const handleComplete = (result: DiagnosisResult) => {
    if (onComplete) {
      onComplete(result);
    } else {
      console.log('診断結果:', result);
    }
  };

  return (
    <>
      <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-4">
        年収アップの方法が、たった3問でわかる
      </h1>
      <p className="text-[#64748B] text-base mb-6">
        転職、資格、スキル習得。あなたに最適な収入アップの方法を診断します
      </p>
      <DiagnosisForm onComplete={handleComplete} />
    </>
  );
}
