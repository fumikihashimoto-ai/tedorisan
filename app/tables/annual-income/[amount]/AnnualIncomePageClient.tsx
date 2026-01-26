'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { calculateTakeHome } from '@/lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '@/lib/ageIncomeData';
import PcAdSidebar from '../../../components/PcAdSidebar';
import CustomSelect, { type CustomSelectOption } from '../../../components/CustomSelect';

const AGE_OPTIONS: CustomSelectOption[] = [
  { value: '20代', label: '20代' },
  { value: '30代', label: '30代' },
  { value: '40代', label: '40代' },
  { value: '50代', label: '50代' },
  { value: '60代以上', label: '60代以上' },
];

type Props = {
  amount: number;
};

type PercentileResult = {
  percentile: number;
  message: string;
};

function getIncomePercentile(incomeYen: number, age: AgeGroup): PercentileResult {
  const incomeMan = incomeYen / 10000;
  const p = percentileByAge[age];
  const avg = averageIncomeByAge[age];

  if (incomeMan >= p.top5) {
    return { percentile: 5, message: '高収入層です。さらに上を目指せます。' };
  }
  if (incomeMan >= p.top10) {
    return { percentile: 10, message: '高収入層です。さらに上を目指せます。' };
  }
  if (incomeMan >= p.top25) {
    return { percentile: 25, message: '高収入層です。さらに上を目指せます。' };
  }
  if (incomeMan >= p.top50) {
    const diff = Math.round(incomeMan - avg);
    const msg =
      diff >= 0
        ? `平均より${diff}万円高い収入です。転職でさらに伸ばせる可能性があります。`
        : `平均より${Math.abs(diff)}万円低い収入です。転職で収入UPのチャンスがあります。`;
    return { percentile: 50, message: msg };
  }
  if (incomeMan >= p.top75) {
    return { percentile: 75, message: '転職で収入UPのチャンスが大きいです。' };
  }
  return { percentile: 90, message: '転職で大きく収入を伸ばせる可能性があります。' };
}

export default function AnnualIncomePageClient({ amount }: Props) {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');

  const amountInMan = amount / 10000;

  const result = useMemo(() => {
    const calc = calculateTakeHome(amount, 0);
    const takehomeRate = amount > 0 ? ((calc.takeHome / amount) * 100).toFixed(1) : '0.0';

    return {
      yearlyTakeHome: calc.takeHome,
      monthlyTakeHome: calc.monthlyTakeHome,
      incomeTax: calc.breakdown.incomeTax,
      residentTax: calc.breakdown.residentTax,
      socialInsurance: calc.breakdown.socialInsurance,
      takehomeRate,
    };
  }, [amount]);

  const percentileData = useMemo(() => getIncomePercentile(amount, ageGroup), [amount, ageGroup]);

  // 関連年収リンク（200万円〜1000万円、20万円刻み）
  const prevAmount = amount - 200000;
  const nextAmount = amount + 200000;

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-8">
      <div className="max-w-7xl mx-auto md:flex md:items-start md:gap-8">
        <div className="md:max-w-[800px] md:w-full">
          <nav className="breadcrumb mb-3">
            <Link href="/">ホーム</Link> {'>'} 年収別詳細
          </nav>
          <h1 className="page-title">年収{amountInMan}万円の手取りは？</h1>

          {/* 即答セクション（詳細内訳を統合） */}
          <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 md:p-8 mb-8 shadow-lg">

        {/* 即答 */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2 text-center md:text-left">年間手取り</p>
          <p className="text-5xl md:text-6xl font-black text-[#0a57d1] text-center md:text-left">
            {Math.round(result.yearlyTakeHome / 10000)}万円
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-600 mb-1 text-center md:text-left">月収（手取り）</p>
            <p className="text-2xl font-black text-[#0a57d1] text-center md:text-left">
              {Math.round(result.monthlyTakeHome / 10000)}万円
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-600 mb-1 text-center md:text-left">手取り率</p>
            <p className="text-2xl font-black text-[#0a57d1] text-center md:text-left">{result.takehomeRate}%</p>
          </div>
        </div>

        {/* 詳細内訳（同じブロック内） */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-left">💰 詳細内訳</h2>

          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-3 font-semibold">年収</td>
                <td className="py-3 text-right pr-4">{amountInMan}万円</td>
              </tr>
              <tr className="border-b bg-white">
                <td className="py-3 pl-6 text-sm">
                  <span className="mr-2">-</span>所得税
                </td>
                <td className="py-3 text-right text-[#333333] pr-4">
                  {Math.round(result.incomeTax / 10000)}万円
                </td>
              </tr>
              <tr className="border-b bg-white">
                <td className="py-3 pl-6 text-sm">
                  <span className="mr-2">-</span>住民税
                </td>
                <td className="py-3 text-right text-[#333333] pr-4">
                  {Math.round(result.residentTax / 10000)}万円
                </td>
              </tr>
              <tr className="border-b bg-white">
                <td className="py-3 pl-6 text-sm">
                  <span className="mr-2">-</span>社会保険料
                </td>
                <td className="py-3 text-right text-[#333333] pr-4">
                  {Math.round(result.socialInsurance / 10000)}万円
                </td>
              </tr>
              <tr className="bg-white">
                <td className="py-3" />
                <td className="py-3 text-right pr-4">
                  <span className="font-bold text-gray-800 text-base">
                    = 手取り
                    <span className="ml-3 text-[#0a57d1] text-xl">
                      {Math.round(result.yearlyTakeHome / 10000)}万円
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 年代選択（パーセンタイルの上） */}
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

      {/* パーセンタイル表示 */}
      <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 mb-8 shadow-lg">
        <h3 className="text-xl font-bold mb-4">📈 あなたの年収レベル</h3>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 mb-2">{ageGroup}の</p>
          <p className="text-4xl font-black text-[#0a57d1]">上位 {percentileData.percentile}%</p>
        </div>

        <div className="mb-4">
          <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-[#0a57d1] h-full rounded-full"
              style={{ width: `${percentileData.percentile}%` }}
            />
          </div>
        </div>

        <p className="text-center text-gray-700">{percentileData.message}</p>
      </div>

      {/* 関連年収へのリンク + 一覧表ボタン */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">🔍 他の年収も見る</h3>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {amount > 2000000 ? (
            <Link
              href={`/tables/annual-income/${prevAmount}`}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-center py-3 rounded-lg transition-colors"
            >
              年収{amountInMan - 20}万円
            </Link>
          ) : (
            <div className="bg-gray-100 border border-gray-300 text-center py-3 rounded-lg text-gray-400">
              -
            </div>
          )}

          <div className="bg-white border-2 border-[#e0e0e0] text-center py-3 rounded-2xl font-bold shadow-sm text-[#0a57d1]">
            年収{amountInMan}万円
          </div>

          {amount < 10000000 ? (
            <Link
              href={`/tables/annual-income/${nextAmount}`}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-center py-3 rounded-lg transition-colors"
            >
              年収{amountInMan + 20}万円
            </Link>
          ) : (
            <div className="bg-gray-100 border border-gray-300 text-center py-3 rounded-lg text-gray-400">
              -
            </div>
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
      <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 mb-6 shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-center">💡 あなたの正確な手取り額を計算</h3>
        <p className="text-sm text-gray-700 text-center mb-4">扶養家族の人数を考慮した詳細計算</p>
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-[#ff4f42] hover:bg-[#e5463b] text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            手取り計算ツールを使う
          </Link>
        </div>
      </div>
        </div>

        <PcAdSidebar />
      </div>
    </div>
  );
}
