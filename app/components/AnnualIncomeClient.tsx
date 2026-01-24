'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateTakeHome } from '../../lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '../../lib/ageIncomeData';

type Props = {
  amount: number;
};

export default function AnnualIncomeClient({ amount }: Props) {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');

  const amountInMan = amount / 10000;
  const result = calculateTakeHome(amount, 0); // 扶養人数0人

  // 手取り率を計算
  const takeHomeRate = ((result.takeHome / amount) * 100).toFixed(1);

  // パーセンタイル計算
  const calculatePercentile = (income: number, age: AgeGroup) => {
    const incomeManEn = income / 10000; // 万円に変換
    const percentiles = percentileByAge[age];
    const average = averageIncomeByAge[age];
    
    let percentile = 50;
    let averageDiff = Math.round(incomeManEn - average);
    let message = "";
    
    if (incomeManEn >= percentiles.top5) {
      percentile = 5;
      message = "高収入層です。さらに上を目指せます。";
    } else if (incomeManEn >= percentiles.top10) {
      percentile = 10;
      message = "高収入層です。さらに上を目指せます。";
    } else if (incomeManEn >= percentiles.top25) {
      percentile = 25;
      message = "高収入層です。さらに上を目指せます。";
    } else if (incomeManEn >= percentiles.top50) {
      percentile = 50;
      message = "平均以上の収入です。転職で大きく伸ばせる可能性があります。";
    } else if (incomeManEn >= percentiles.top75) {
      percentile = 75;
      message = "転職で収入UPのチャンスが大きいです。";
    } else {
      percentile = 90;
      message = "転職で大きく収入を伸ばせる可能性があります。";
    }
    
    return { percentile, averageDiff, message };
  };

  const percentileData = calculatePercentile(amount, ageGroup);

  // 数値をフォーマット（万円単位、小数点以下1桁）
  const formatManYen = (value: number): string => {
    return (value / 10000).toFixed(1);
  };

  // 関連年収のリンク（範囲チェック）
  const prevAmount = amount - 200000;
  const nextAmount = amount + 200000;
  const canShowPrev = prevAmount >= 2000000;
  const canShowNext = nextAmount <= 10000000;

  return (
    <div className="min-h-screen bg-[#FFFEF9] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 即答セクション（最重要） */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-8 text-center mb-8 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            年収{amountInMan}万円の手取りは？
          </h1>
          
          <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">年間手取り</p>
            <p className="text-5xl md:text-6xl font-black text-orange-600">
              {formatManYen(result.takeHome)}万円
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">月収（手取り）</p>
              <p className="text-2xl font-black text-orange-600">
                {formatManYen(result.monthlyTakeHome)}万円
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">手取り率</p>
              <p className="text-2xl font-black text-orange-600">
                {takeHomeRate}%
              </p>
            </div>
          </div>
        </div>

        {/* 年代選択 */}
        <div className="mb-6 max-w-md mx-auto">
          <label className="block text-sm font-semibold mb-2">
            年代を選択
          </label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
            className="w-full border border-gray-300 rounded px-4 py-3"
          >
            <option value="20代">20代</option>
            <option value="30代">30代</option>
            <option value="40代">40代</option>
            <option value="50代">50代</option>
            <option value="60代以上">60代以上</option>
          </select>
        </div>

        {/* 詳細内訳表 */}
        <div className="bg-white border-2 border-yellow-200 rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-bold mb-4">💰 詳細内訳</h2>
          
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-3 font-semibold">年収</td>
                <td className="py-3 text-right pr-4">{amountInMan}万円</td>
              </tr>
              <tr className="border-b bg-orange-50">
                <td className="py-3 pl-6 text-sm">
                  <span className="mr-2">-</span>所得税
                </td>
                <td className="py-3 text-right text-orange-600 pr-4">{formatManYen(result.breakdown.incomeTax)}万円</td>
              </tr>
              <tr className="border-b bg-orange-50">
                <td className="py-3 pl-6 text-sm">
                  <span className="mr-2">-</span>住民税
                </td>
                <td className="py-3 text-right text-orange-600 pr-4">{formatManYen(result.breakdown.residentTax)}万円</td>
              </tr>
              <tr className="border-b bg-orange-50">
                <td className="py-3 pl-6 text-sm">
                  <span className="mr-2">-</span>社会保険料
                </td>
                <td className="py-3 text-right text-orange-600 pr-4">{formatManYen(result.breakdown.socialInsurance)}万円</td>
              </tr>
              <tr className="bg-yellow-50">
                <td className="py-3" />
                <td className="py-3 text-right pr-4">
                  <span className="font-bold text-gray-800 text-base">
                    = 手取り
                    <span className="ml-3 text-yellow-700 text-xl">{formatManYen(result.takeHome)}万円</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* パーセンタイル表示 */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-2xl p-6 mb-8 shadow-lg">
          <h3 className="text-xl font-bold mb-4">📈 あなたの年収レベル</h3>
          
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">{ageGroup}の</p>
            <p className="text-4xl font-black text-orange-600">上位 {percentileData.percentile}%</p>
          </div>
          
          <div className="mb-4">
            <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentileData.percentile}%` }}
              />
            </div>
          </div>
          
          <p className="text-center text-gray-700">
            {percentileData.averageDiff > 0 
              ? `${ageGroup}の平均より ${percentileData.averageDiff}万円 高い収入です`
              : `${ageGroup}の平均より ${Math.abs(percentileData.averageDiff)}万円 低い収入です`
            }
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            {percentileData.message}
          </p>
        </div>

        {/* 関連年収へのリンク */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">🔍 他の年収も見る</h3>
          
          <div className="grid grid-cols-3 gap-3">
            {/* 20万円少ない */}
            {canShowPrev ? (
              <Link 
                href={`/annual-income/${prevAmount}`}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-center py-3 rounded-lg transition-colors"
              >
                年収{amountInMan - 20}万円
              </Link>
            ) : (
              <div className="bg-gray-100 border border-gray-300 text-center py-3 rounded-lg text-gray-400">
                -
              </div>
            )}
            
            {/* 現在（無効化） */}
            <div className="bg-yellow-100 border-2 border-yellow-500 text-center py-3 rounded-2xl font-bold shadow-sm">
              年収{amountInMan}万円
            </div>
            
            {/* 20万円多い */}
            {canShowNext ? (
              <Link 
                href={`/annual-income/${nextAmount}`}
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
          
          <div className="mt-4 text-center">
            <Link 
              href="/comparison/list"
              className="text-orange-600 hover:underline text-sm"
            >
              → 全年収の一覧表を見る
            </Link>
          </div>
        </div>

        {/* CTAセクション */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 mb-6 shadow-lg">
          <h3 className="text-xl font-bold mb-3 text-center">
            💡 あなたの正確な手取り額を計算
          </h3>
          <p className="text-sm text-gray-700 text-center mb-4">
            扶養家族の人数を考慮した詳細計算
          </p>
          <div className="text-center">
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              手取り計算ツールを使う
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
