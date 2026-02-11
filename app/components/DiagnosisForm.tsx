'use client';

import { useState } from 'react';
import type { DiagnosisResult } from '@/lib/diagnosisLogic';
import {
  type AgeRange,
  type Situation,
  type Priority,
  AGE_RANGES,
  AGE_RANGE_LABELS,
  SITUATIONS,
  SITUATION_LABELS,
  PRIORITIES,
  PRIORITY_LABELS,
} from '@/lib/diagnosisLogic';
import AnimatedSelect, { type AnimatedSelectOption } from './AnimatedSelect';

type Props = {
  onComplete: (result: DiagnosisResult) => void;
};

const PLACEHOLDER_Q1 = 'Q1：年齢を教えてください';
const PLACEHOLDER_Q2 = 'Q2：現在の状況に最も近いものは？';
const PLACEHOLDER_Q3 = 'Q3：最も重視することは？';

const AGE_OPTIONS: AnimatedSelectOption[] = AGE_RANGES.map((value) => ({
  value,
  label: AGE_RANGE_LABELS[value],
}));
const SITUATION_OPTIONS: AnimatedSelectOption[] = SITUATIONS.map((value) => ({
  value,
  label: SITUATION_LABELS[value],
}));
const PRIORITY_OPTIONS: AnimatedSelectOption[] = PRIORITIES.map((value) => ({
  value,
  label: PRIORITY_LABELS[value],
}));

export function DiagnosisForm({ onComplete }: Props) {
  const [age, setAge] = useState<AgeRange | ''>('');
  const [situation, setSituation] = useState<Situation | ''>('');
  const [priority, setPriority] = useState<Priority | ''>('');

  const isComplete = Boolean(age && situation && priority);

  const handleSubmit = () => {
    if (age && situation && priority) {
      onComplete({
        age: age as AgeRange,
        situation: situation as Situation,
        priority: priority as Priority,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* プルダウン3件を横並び（AnimatedSelect：新卒手取り計算と同じ動き） */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <AnimatedSelect
            options={AGE_OPTIONS}
            value={age}
            onChange={(v) => setAge((v || '') as AgeRange | '')}
            placeholder={PLACEHOLDER_Q1}
            className="text-sm"
          />
        </div>
        <div className="flex-1 min-w-0">
          <AnimatedSelect
            options={SITUATION_OPTIONS}
            value={situation}
            onChange={(v) => setSituation((v || '') as Situation | '')}
            placeholder={PLACEHOLDER_Q2}
            className="text-sm"
          />
        </div>
        <div className="flex-1 min-w-0">
          <AnimatedSelect
            options={PRIORITY_OPTIONS}
            value={priority}
            onChange={(v) => setPriority((v || '') as Priority | '')}
            placeholder={PLACEHOLDER_Q3}
            className="text-sm"
          />
        </div>
      </div>

      {/* 診断結果を見るボタン */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isComplete}
        className={`w-full py-4 rounded-lg font-bold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isComplete
            ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        🔍 診断結果を見る
      </button>
    </div>
  );
}
