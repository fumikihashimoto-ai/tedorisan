'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { calculateRequiredAnnualIncome } from '@/lib/reverseSalaryCalculator';
import { averageIncomeByAge, type AgeGroup } from '@/lib/ageIncomeData';
import PcAdSidebar from '../../../components/PcAdSidebar';
import ResultTable from '../../../components/ResultTable';
import CustomSelect, { type CustomSelectOption } from '../../../components/CustomSelect';

const AGE_OPTIONS: CustomSelectOption[] = [
  { value: '20代', label: '20代' },
  { value: '30代', label: '30代' },
  { value: '40代', label: '40代' },
  { value: '50代', label: '50代' },
  { value: '60代以上', label: '60代以上' },
];

type Props = {
  amount: number; // 手取り月収（円）
};

export default function MonthlyTakeHomePageClient({ amount }: Props) {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');

  const amountInMan = amount / 10000;

  const result = useMemo(() => calculateRequiredAnnualIncome(amount, 0), [amount]);

  const requiredAnnualInMan = Math.round(result.annualIncome / 10000);
  const monthlyGrossInMan = Math.round(result.monthlyGross / 10000);

  const ageEntries = useMemo(() => Object.entries(averageIncomeByAge) as [AgeGroup, number][], []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-8">
      <div className="max-w-7xl mx-auto md:flex md:items-start md:gap-8">
        <div className="md:max-w-[800px] md:w-full">
          <nav className="breadcrumb mb-3">
            <Link href="/">ホーム</Link> {'>'} <Link href="/tables">早見表</Link> {'>'} 手取り月収から逆算
          </nav>
          <h1 className="page-title">手取り{amountInMan}万円に必要な年収は？</h1>

          {/* 即答セクション */}
          <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 md:p-8 mb-8 shadow-lg">

        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2 text-center md:text-left">必要な年収</p>
          <p className="text-5xl md:text-6xl font-black text-[#0a57d1] text-center md:text-left">
            {requiredAnnualInMan}万円
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-600 mb-1 text-center md:text-left">月収（額面）</p>
            <p className="text-2xl font-black text-[#0a57d1] text-center md:text-left">{monthlyGrossInMan}万円</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-600 mb-1 text-center md:text-left">手取り率</p>
            <p className="text-2xl font-black text-[#0a57d1] text-center md:text-left">{result.takehomeRate}%</p>
          </div>
        </div>

        {/* 詳細内訳（同じブロック内） */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-left">💰 詳細内訳</h2>

          <ResultTable
            variant="breakdown"
            hideHeader
            items={[
              { label: '年収', value: `${requiredAnnualInMan}万円` },
              { label: '所得税', value: `${Math.round(result.incomeTax / 10000)}万円`, labelPrefix: '-' },
              { label: '住民税', value: `${Math.round(result.residentTax / 10000)}万円`, labelPrefix: '-' },
              { label: '社会保険料', value: `${Math.round(result.socialInsurance / 10000)}万円`, labelPrefix: '-' },
              { label: '', value: `${amountInMan * 12}万円`, isTotalRow: true },
            ]}
          />
        </div>
      </div>

      {/* 年代選択 */}
      <div className="mb-8">
        <label className="block text-left text-sm font-semibold mb-3">年代を選択</label>
        <div className="w-full max-w-md mx-auto md:mx-0">
          <CustomSelect
            options={AGE_OPTIONS}
            value={ageGroup}
            onChange={(v) => setAgeGroup(v as AgeGroup)}
            placeholder="年代を選択"
          />
        </div>
      </div>

      {/* 年代別の達成難易度 */}
      <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 mb-8 shadow-lg">
        <h2 className="text-xl font-bold mb-4">📊 年代別の達成難易度</h2>

        <div className="space-y-4">
          {ageEntries.map(([age, avgIncome]) => {
            const avgIncomeYen = avgIncome * 10000;
            const ratio = (result.annualIncome / avgIncomeYen) * 100;

            let difficulty = '';
            let difficultyColor = '';
            let barColor = '';

            if (ratio < 80) {
              difficulty = '達成しやすい';
              difficultyColor = 'text-[#0a57d1]';
              barColor = 'bg-green-500';
            } else if (ratio < 120) {
              difficulty = '達成可能';
              difficultyColor = 'text-[#0a57d1]';
              barColor = 'bg-yellow-500';
            } else if (ratio < 150) {
              difficulty = 'やや難しい';
              difficultyColor = 'text-[#666666]';
              barColor = 'bg-yellow-500';
            } else {
              difficulty = '難しい';
              difficultyColor = 'text-[#ff4f42]';
              barColor = 'bg-red-500';
            }

            const barWidth = Math.min(ratio, 200);

            return (
              <div key={age}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-semibold ${age === ageGroup ? 'text-green-700' : ''}`}>{age}</span>
                  <span className={`text-sm ${difficultyColor} font-semibold`}>{difficulty}</span>
                </div>
                <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className={`${barColor} h-full transition-all`} style={{ width: `${barWidth / 2}%` }} />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  平均年収: {avgIncome}万円（必要年収の{Math.round(ratio)}%）
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 関連する手取り額へのリンク */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">🔍 他の手取り額も見る</h3>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {amount > 150000 ? (
            <Link
              href={`/tables/monthly-takehome/${amount - 50000}`}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-center py-3 rounded-lg transition-colors"
            >
              手取り{amountInMan - 5}万円
            </Link>
          ) : (
            <div className="bg-gray-100 border border-gray-300 text-center py-3 rounded-lg text-gray-400">-</div>
          )}

          <div className="bg-white border-2 border-[#e0e0e0] text-center py-3 rounded-2xl font-bold shadow-sm text-[#0a57d1]">
            手取り{amountInMan}万円
          </div>

          {amount < 500000 ? (
            <Link
              href={`/tables/monthly-takehome/${amount + 50000}`}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-center py-3 rounded-lg transition-colors"
            >
              手取り{amountInMan + 5}万円
            </Link>
          ) : (
            <div className="bg-gray-100 border border-gray-300 text-center py-3 rounded-lg text-gray-400">-</div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/tables"
            className="inline-block bg-[#ff4f42] hover:bg-[#e5463b] text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            年代・年収別 手取り一覧表を見る
          </Link>
        </div>
      </div>

      {/* CTAセクション */}
      <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-left">💡 あなたの正確な手取り額を計算</h3>
        <p className="text-sm text-gray-700 text-left mb-4">扶養家族の人数を考慮した詳細計算</p>
        <div className="text-left">
          <Link
            href="/"
            className="inline-block bg-[#ff4f42] hover:bg-[#e5463b] text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            手取り計算シミュレーションツールを使う
          </Link>
        </div>
      </div>
        </div>

        <PcAdSidebar />
      </div>
    </div>
  );
}
