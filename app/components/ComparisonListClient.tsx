'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { calculateTakeHome } from '@/lib/salaryCalculator';
import { averageIncomeByAge } from '@/lib/ageIncomeData';
import PcAdSidebar from './PcAdSidebar';
import CustomSelect, { type CustomSelectOption } from './CustomSelect';

const AGE_OPTIONS: CustomSelectOption[] = [
  { value: '20代', label: '20代' },
  { value: '30代', label: '30代' },
  { value: '40代', label: '40代' },
  { value: '50代', label: '50代' },
  { value: '60代以上', label: '60代以上' },
];

type TakeHomeRow = {
  income: number;
  amountInMan: number;
  takeHomeMan: number;
  monthlyTakeHomeMan: number;
  incomeTaxMan: number;
  residentTaxMan: number;
  socialInsuranceMan: number;
  takeHomeRate: string;
};

// 手取り率を計算（%）
function calculateTakeHomeRate(annualSalary: number, takeHome: number): string {
  if (annualSalary === 0) return '0.0';
  return ((takeHome / annualSalary) * 100).toFixed(1);
}

export default function ComparisonListClient() {
  const [ageGroup, setAgeGroup] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);

  // 年収200万円から1000万円まで20万円刻み（円）
  const incomeList = useMemo(() => {
    const list: number[] = [];
    for (let i = 200; i <= 1000; i += 20) {
      list.push(i * 10000);
    }
    return list;
  }, []);

  const averageIncome =
    ageGroup ? averageIncomeByAge[ageGroup as keyof typeof averageIncomeByAge] : null;

  // 重い計算（所得税/住民税/社保の内訳含む）は一度だけ作ってキャッシュ
  const takeHomeRows: TakeHomeRow[] = useMemo(() => {
    return incomeList.map((income) => {
      const result = calculateTakeHome(income, 0); // 扶養人数0人
      const amountInMan = income / 10000;
      return {
        income,
        amountInMan,
        takeHomeMan: Math.round(result.takeHome / 10000),
        monthlyTakeHomeMan: Math.round(result.monthlyTakeHome / 10000),
        incomeTaxMan: Math.round(result.breakdown.incomeTax / 10000),
        residentTaxMan: Math.round(result.breakdown.residentTax / 10000),
        socialInsuranceMan: Math.round(result.breakdown.socialInsurance / 10000),
        takeHomeRate: calculateTakeHomeRate(income, result.takeHome),
      };
    });
  }, [incomeList]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] container-main">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-start md:gap-8">
          <div className="md:max-w-[800px] md:w-full">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/tables">早見表</Link> {'>'} 一覧表
            </nav>
            <h1 className="page-title">年代・年収別 手取り一覧表</h1>

        {/* 年代選択 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-left">年代を選択</label>
          <CustomSelect
            options={AGE_OPTIONS}
            value={ageGroup}
            onChange={(value) => {
              setAgeGroup(value);
              setTimeout(() => {
                tableRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }, 100);
            }}
            placeholder="年代を選択してください"
          />
            </div>

        {ageGroup && (
          <>
            {/* 一覧表 */}
            <div className="md:hidden text-small mb-3">
              ※ 表は横にスクロールできます（左右にスワイプ）
            </div>
            <div id="income-table" ref={tableRef} className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-[#e0e0e0] bg-white table-zebra">
              <thead>
                <tr className="bg-[#0a57d1] text-white">
                  <th className="border-2 border-[#e0e0e0] px-4 py-3">年収</th>
                  <th className="border-2 border-[#e0e0e0] px-4 py-3">手取り年収</th>
                  <th className="border-2 border-[#e0e0e0] px-4 py-3">手取り月収</th>
                  <th className="border-2 border-[#e0e0e0] px-4 py-3 hidden md:table-cell">
                    所得税
                  </th>
                  <th className="border-2 border-[#e0e0e0] px-4 py-3 hidden md:table-cell">
                    住民税
                  </th>
                  <th className="border-2 border-[#e0e0e0] px-4 py-3 hidden md:table-cell">
                    社会保険料
                  </th>
                  <th className="border-2 border-[#e0e0e0] px-4 py-3 hidden md:table-cell">
                    手取り率
                  </th>
                </tr>
              </thead>
              <tbody>
                {takeHomeRows.map((row) => {
                  // 年代平均との比較（±10万円の範囲）
                  const isAverageRow =
                    averageIncome !== null &&
                    Math.abs(row.income - averageIncome * 10000) < 100000;

                  return (
                    <tr
                      key={row.income}
                      className={isAverageRow ? 'bg-white border-2 border-[#e0e0e0]' : ''}
                    >
                      <td className="border-2 border-[#e0e0e0] px-4 py-2 text-center">
                        {isAverageRow && <span className="mr-2 text-lg">👤</span>}
                        <span className={isAverageRow ? 'font-bold' : ''}>
                          {row.amountInMan}万円
                        </span>
                      </td>
                      <td className="border-2 border-[#e0e0e0] px-4 py-2 text-center font-semibold">
                        {row.takeHomeMan}万円
                      </td>
                      <td className="border-2 border-[#e0e0e0] px-4 py-2 text-center">
                        {row.monthlyTakeHomeMan}万円
                      </td>
                      <td className="border-2 border-[#e0e0e0] px-4 py-2 text-center text-caption hidden md:table-cell">
                        {row.incomeTaxMan}万円
                      </td>
                      <td className="border-2 border-[#e0e0e0] px-4 py-2 text-center text-caption hidden md:table-cell">
                        {row.residentTaxMan}万円
                      </td>
                      <td className="border-2 border-[#e0e0e0] px-4 py-2 text-center text-caption hidden md:table-cell">
                        {row.socialInsuranceMan}万円
                      </td>
                      <td className="border-2 border-[#e0e0e0] px-4 py-2 text-center text-caption hidden md:table-cell">
                        {row.takeHomeRate}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

            {/* 注意事項 */}
            <div className="mt-8 bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold mb-3">📌 この表について</h3>
              <ul className="text-body space-y-2">
                <li>• 扶養家族: 0人で計算</li>
                <li>• 2025年度の税率・保険料率を使用</li>
                <li>• 👤マークは選択した年代の平均年収</li>
                <li className="md:hidden">• 詳細な内訳は手取り計算シミュレーションツールで確認できます</li>
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
                className="btn-primary-inline"
              >
                手取り計算シミュレーションツールを使う
              </Link>
            </div>
          </>
        )}
          </div>

          <PcAdSidebar />
        </div>
      </div>
    </div>
  );
}
