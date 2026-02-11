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

  return <DiagnosisForm onComplete={handleComplete} />;
}
