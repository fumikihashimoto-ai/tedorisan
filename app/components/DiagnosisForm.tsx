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

type Props = {
  onComplete: (result: DiagnosisResult) => void;
};

const PLACEHOLDER_Q1 = 'Q1：年齢を教えてください';
const PLACEHOLDER_Q2 = 'Q2：現在の状況に最も近いものは？';
const PLACEHOLDER_Q3 = 'Q3：最も重視することは？';

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

  const selectClass =
    'w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
        {/* プルダウン3件を横並び */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <select
              id="diagnosis-age"
              value={age}
              onChange={(e) => setAge((e.target.value || '') as AgeRange | '')}
              className={selectClass}
              aria-label={PLACEHOLDER_Q1}
            >
              <option value="">{PLACEHOLDER_Q1}</option>
              {AGE_RANGES.map((value) => (
                <option key={value} value={value}>
                  {AGE_RANGE_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-0">
            <select
              id="diagnosis-situation"
              value={situation}
              onChange={(e) => setSituation((e.target.value || '') as Situation | '')}
              className={selectClass}
              aria-label={PLACEHOLDER_Q2}
            >
              <option value="">{PLACEHOLDER_Q2}</option>
              {SITUATIONS.map((value) => (
                <option key={value} value={value}>
                  {SITUATION_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-0">
            <select
              id="diagnosis-priority"
              value={priority}
              onChange={(e) => setPriority((e.target.value || '') as Priority | '')}
              className={selectClass}
              aria-label={PLACEHOLDER_Q3}
            >
              <option value="">{PLACEHOLDER_Q3}</option>
              {PRIORITIES.map((value) => (
                <option key={value} value={value}>
                  {PRIORITY_LABELS[value]}
                </option>
              ))}
            </select>
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
    </div>
  );
}
