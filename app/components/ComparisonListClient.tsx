'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { calculateTakeHome } from '@/lib/salaryCalculator';
import { averageIncomeByAge } from '@/lib/ageIncomeData';

export default function ComparisonListClient() {
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [showCTA, setShowCTA] = useState(false);
  const [ctaDismissed, setCtaDismissed] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // 年収200万円から1000万円まで20万円刻み（円）
  const incomeList: number[] = [];
  for (let i = 200; i <= 1000; i += 20) {
    incomeList.push(i * 10000);
  }

  const averageIncome =
    ageGroup ? averageIncomeByAge[ageGroup as keyof typeof averageIncomeByAge] : null;

  // 数値をフォーマット（万円単位、小数点以下1桁）
  const formatManYen = (value: number): string => {
    return (value / 10000).toFixed(1);
  };

  // 手取り率を計算（%）
  const calculateTakeHomeRate = (annualSalary: number, takeHome: number): string => {
    if (annualSalary === 0) return '0.0';
    return ((takeHome / annualSalary) * 100).toFixed(1);
  };

  const handleScroll = useCallback(() => {
    if (!ageGroup || ctaDismissed) {
      setShowCTA(false);
      return;
    }
    if (!tableRef.current) {
      setShowCTA(false);
      return;
    }

    const rect = tableRef.current.getBoundingClientRect();
    const scrolled = window.scrollY > 200;
    const tableVisible = rect.top < window.innerHeight;

    setShowCTA(scrolled && tableVisible);
  }, [ageGroup, ctaDismissed]);

  const onScroll = useCallback(() => {
    // rAFで軽いthrottle
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      handleScroll();
    });
  }, [handleScroll]);

  useEffect(() => {
    if (!ageGroup) {
      setShowCTA(false);
      return;
    }
    if (ctaDismissed) {
      setShowCTA(false);
      return;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // 初回チェック

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [ageGroup, ctaDismissed, handleScroll, onScroll]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* タイトルセクション */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            年代・年収別 手取り一覧表
          </h1>
          <p className="text-gray-600">
            年収200万円〜1000万円の手取り額を確認できます
          </p>
        </div>

        {/* 年代選択 */}
        <div className="mb-6 max-w-md mx-auto">
          <label className="block text-sm font-semibold mb-2">
            年代を選択
          </label>
          <select
            value={ageGroup}
            onChange={(e) => {
              setAgeGroup(e.target.value);
              setShowCTA(false); // リセット
              setTimeout(() => {
                tableRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }, 100);
            }}
            className="w-full border border-gray-300 rounded px-4 py-3"
          >
            <option value="" disabled>
              年代を選択してください
            </option>
            <option value="20代">20代</option>
            <option value="30代">30代</option>
            <option value="40代">40代</option>
            <option value="50代">50代</option>
            <option value="60代以上">60代以上</option>
          </select>
        </div>

        {ageGroup && (
          <>
            {/* 一覧表 */}
            <div id="income-table" ref={tableRef} className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <th className="border border-gray-300 px-4 py-3">年収</th>
                  <th className="border border-gray-300 px-4 py-3">手取り年収</th>
                  <th className="border border-gray-300 px-4 py-3">手取り月収</th>
                  <th className="border border-gray-300 px-4 py-3 hidden md:table-cell">
                    所得税
                  </th>
                  <th className="border border-gray-300 px-4 py-3 hidden md:table-cell">
                    住民税
                  </th>
                  <th className="border border-gray-300 px-4 py-3 hidden md:table-cell">
                    社会保険料
                  </th>
                  <th className="border border-gray-300 px-4 py-3 hidden md:table-cell">
                    手取り率
                  </th>
                </tr>
              </thead>
              <tbody>
                {incomeList.map((income) => {
                  const amountInMan = income / 10000;
                  const result = calculateTakeHome(income, 0); // 扶養人数0人

                  // 年代平均との比較（±10万円の範囲）
                  const isAverageRow =
                    averageIncome !== null &&
                    Math.abs(income - averageIncome * 10000) < 100000;

                  const takeHomeRate = calculateTakeHomeRate(income, result.takeHome);

                  return (
                    <tr
                      key={income}
                      className={isAverageRow ? 'bg-yellow-50 border-2 border-yellow-400' : ''}
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {isAverageRow && <span className="mr-2 text-lg">👤</span>}
                        <span className={isAverageRow ? 'font-bold' : ''}>
                          {amountInMan}万円
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                        {Math.round(result.takeHome / 10000)}万円
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {Math.round(result.monthlyTakeHome / 10000)}万円
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-600 hidden md:table-cell">
                        {Math.round(result.breakdown.incomeTax / 10000)}万円
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-600 hidden md:table-cell">
                        {Math.round(result.breakdown.residentTax / 10000)}万円
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-600 hidden md:table-cell">
                        {Math.round(result.breakdown.socialInsurance / 10000)}万円
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm hidden md:table-cell">
                        {takeHomeRate}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

            {/* スティッキーCTAバナー */}
            {showCTA && (
              <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-2xl z-50 animate-slide-up">
                <div className="max-w-7xl mx-auto px-4 py-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-sm sm:text-base font-semibold mb-1">
                        💡 あなたの詳細な手取り額を計算
                      </p>
                      <p className="text-xs opacity-90 hidden sm:block">
                        扶養人数を考慮した正確な計算
                      </p>
                    </div>
                    <Link
                      href="/"
                      className="bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-yellow-50 transition-all hover:shadow-lg hover:scale-105 whitespace-nowrap text-sm"
                    >
                      計算する →
                    </Link>
                  </div>
                </div>

                {/* 閉じるボタン */}
                <button
                  type="button"
                  onClick={() => {
                    setShowCTA(false);
                    setCtaDismissed(true);
                  }}
                  className="absolute top-2 right-2 text-white hover:text-gray-200 text-xl"
                  aria-label="閉じる"
                >
                  ×
                </button>
              </div>
            )}

            {/* 注意事項 */}
            <div className="mt-8 bg-[#FFFEF9] border-2 border-yellow-200 rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold mb-3">📌 この表について</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 扶養家族: 0人で計算</li>
                <li>• 2025年度の税率・保険料率を使用</li>
                <li>• 👤マークは選択した年代の平均年収</li>
                <li className="md:hidden">• 詳細な内訳は手取り計算ツールで確認できます</li>
                <li className="hidden md:block">• 実際の手取り額は扶養人数等により変動します</li>
              </ul>
            </div>

            {/* CTAセクション（既存のまま） */}
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold mb-4">
                💡 あなたの詳細な手取り額を計算
              </p>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                手取り計算ツールを使う
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
