'use client';

import { useState } from 'react';
import { calculateTakeHome, calculateTakeHomeDetailed, type TakeHomeDetailedResult } from '../../lib/salaryCalculator';
import { type AgeGroup } from '../../lib/ageIncomeData';
import Link from 'next/link';
import PcAdSidebar from './PcAdSidebar';
import AnimatedSelect, { type AnimatedSelectOption } from './AnimatedSelect';
import { Card } from './ui';
import ResultTableAnnualMonthly from './ResultTableAnnualMonthly';

const AGE_OPTIONS: AgeGroup[] = ['20代', '30代', '40代', '50代', '60代以上'];
const AGE_SELECT_OPTIONS: AnimatedSelectOption[] = AGE_OPTIONS.map((v) => ({ value: v, label: v }));

/** 年代を年齢に変換 */
function ageGroupToYears(ageGroup: AgeGroup): number {
  const map: Record<AgeGroup, number> = {
    '20代': 25,
    '30代': 35,
    '40代': 45,
    '50代': 55,
    '60代以上': 65,
  };
  return map[ageGroup];
}

type SideBusinessClientProps = {
  embedded?: boolean;
};

export default function SideBusinessClient({ embedded = false }: SideBusinessClientProps) {
  const [salary, setSalary] = useState('');
  const [sideIncome, setSideIncome] = useState('');
  const [sideExpenses, setSideExpenses] = useState('');
  const [dependents, setDependents] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');
  const [results, setResults] = useState<{
    salary: TakeHomeDetailedResult | null;
    withSideBusiness: {
      totalIncome: number;
      incomeTax: number;
      residentTax: number;
      takeHome: number;
    } | null;
  }>({ salary: null, withSideBusiness: null });

  const handleCalculate = () => {
    const salaryValue = parseFloat(salary);
    const sideIncomeValue = parseFloat(sideIncome) || 0;
    const dependentsValue = parseInt(dependents) || 0;

    if (salaryValue) {
      const age = ageGroupToYears(ageGroup);
      const salaryResult = calculateTakeHomeDetailed(salaryValue * 10000, age, dependentsValue);

      // 副業を含む計算（本業+副業の合計を給与所得として簡易計算）
      const totalIncome = salaryValue * 10000 + sideIncomeValue * 10000;
      const totalResult = calculateTakeHome(totalIncome, dependentsValue);

      setResults({
        salary: salaryResult,
        withSideBusiness: {
          totalIncome,
          incomeTax: totalResult.breakdown.incomeTax,
          residentTax: totalResult.breakdown.residentTax,
          takeHome: totalResult.takeHome,
        },
      });

      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const formatJPY = (value: number): string => {
    return Math.round(value).toLocaleString('ja-JP');
  };

  const formatYen = (value: number): string => {
    return (value / 10000).toFixed(1);
  };

  const calculatorSection = (
    <section id="calculator" className="pt-4 pb-6 mb-0 scroll-mt-6 -mt-4 md:-mt-6">
      <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
        手取り計算シミュレーション
      </h2>

        {/* 入力フォーム */}
        <div className="w-full mb-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* 会社員としての収入 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  会社員としての収入
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="400"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                    万円
                  </span>
                </div>
              </div>

              {/* 副業としての収入 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  副業としての収入
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={sideIncome}
                    onChange={(e) => setSideIncome(e.target.value)}
                    placeholder="50"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                    万円
                  </span>
                </div>
              </div>

              {/* 副業の費用/経費 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  副業の費用/経費
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={sideExpenses}
                    onChange={(e) => setSideExpenses(e.target.value)}
                    placeholder="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                    万円
                  </span>
                </div>
              </div>

              {/* 年代選択 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  あなたの年代
                </label>
                <AnimatedSelect
                  options={AGE_SELECT_OPTIONS}
                  value={ageGroup}
                  onChange={(v) => setAgeGroup(v as AgeGroup)}
                  placeholder="年代を選択"
                />
              </div>

              {/* 扶養人数 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  扶養人数
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={dependents}
                    onChange={(e) => setDependents(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                    人
                  </span>
                </div>
              </div>
            </div>

            {/* 計算ボタン */}
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded transition-colors"
            >
              計算
            </button>
        </div>

        {/* 計算結果 */}
        {results.salary && results.withSideBusiness && (
          <>
            <Card id="results" variant="flat" className="section-gap animate-fade-in mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">本業のみの内訳</h3>
              <ResultTableAnnualMonthly
                items={[
                  { label: '額面収入', annual: `${formatJPY(results.salary.annualSalary)}円`, monthly: `${formatJPY(results.salary.monthlySalary)}円` },
                  { label: '所得税', annual: `${formatJPY(results.salary.incomeTax.annual)}円`, monthly: `${formatJPY(results.salary.incomeTax.monthly)}円` },
                  { label: '住民税', annual: `${formatJPY(results.salary.residentTax.annual)}円`, monthly: `${formatJPY(results.salary.residentTax.monthly)}円` },
                  { label: '健康保険', annual: `${formatJPY(results.salary.healthInsurance.annual)}円`, monthly: `${formatJPY(results.salary.healthInsurance.monthly)}円` },
                  { label: '厚生年金', annual: `${formatJPY(results.salary.pension.annual)}円`, monthly: `${formatJPY(results.salary.pension.monthly)}円` },
                  { label: '介護保険', annual: `${formatJPY(results.salary.nursingCare.annual)}円`, monthly: `${formatJPY(results.salary.nursingCare.monthly)}円` },
                  { label: '雇用保険', annual: `${formatJPY(results.salary.employmentInsurance.annual)}円`, monthly: `${formatJPY(results.salary.employmentInsurance.monthly)}円` },
                  { label: '手取り額', annual: `${formatJPY(results.salary.takeHome.annual)}円`, monthly: `${formatJPY(results.salary.takeHome.monthly)}円`, highlight: true },
                ]}
              />

              <h3 className="font-semibold text-gray-900 mb-3 mt-6">本業+副業の内訳</h3>
              <ResultTableAnnualMonthly
                items={[
                  { label: '額面収入', annual: `${formatJPY(results.withSideBusiness.totalIncome)}円`, monthly: `${formatJPY(Math.round(results.withSideBusiness.totalIncome / 12))}円` },
                  { label: '所得税', annual: `${formatJPY(results.withSideBusiness.incomeTax)}円`, monthly: `${formatJPY(Math.round(results.withSideBusiness.incomeTax / 12))}円` },
                  { label: '住民税', annual: `${formatJPY(results.withSideBusiness.residentTax)}円`, monthly: `${formatJPY(Math.round(results.withSideBusiness.residentTax / 12))}円` },
                  { label: '健康保険', annual: `${formatJPY(results.salary.healthInsurance.annual)}円`, monthly: `${formatJPY(results.salary.healthInsurance.monthly)}円` },
                  { label: '厚生年金', annual: `${formatJPY(results.salary.pension.annual)}円`, monthly: `${formatJPY(results.salary.pension.monthly)}円` },
                  { label: '介護保険', annual: `${formatJPY(results.salary.nursingCare.annual)}円`, monthly: `${formatJPY(results.salary.nursingCare.monthly)}円` },
                  { label: '雇用保険', annual: `${formatJPY(results.salary.employmentInsurance.annual)}円`, monthly: `${formatJPY(results.salary.employmentInsurance.monthly)}円` },
                  { label: '手取り額', annual: `${formatJPY(results.withSideBusiness.takeHome)}円`, monthly: `${formatJPY(Math.round(results.withSideBusiness.takeHome / 12))}円`, highlight: true },
                ]}
              />
            </Card>

            {/* 青色申告ケース */}
            <Card variant="flat" className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">青色申告ケース（65万円控除）</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm sm:text-base">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                      <th className="bg-gray-50 text-gray-700 p-3 text-right font-semibold border-b border-gray-100">金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-b border-gray-100">控除額</td>
                      <td className="p-3 border-b border-gray-100 text-right tabular-nums">65万円</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-gray-100">節税効果</td>
                      <td className="p-3 border-b border-gray-100 text-right tabular-nums">約{formatYen(650000 * 0.33)}万円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

    </section>
  );

  if (embedded) {
    return calculatorSection;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 md:pb-0">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/">計算ツール</Link> {'>'} 副業向け手取り計算
            </nav>
            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
              副業検討者向け 手取り計算
            </h1>
            {calculatorSection}
          </main>
          <PcAdSidebar />
        </div>
      </div>

      {/* 固定広告: スマホのみ・ページ下部固定表示 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden">
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4V1GMQ+3SPO+9FIFPT" target="_blank" rel="nofollow noopener noreferrer">
          <img
            width={350}
            height={80}
            alt=""
            src="https://www22.a8.net/svt/bgt?aid=260126641294&wid=001&eno=01&mid=s00000017718057025000&mc=1"
            className="border-0"
          />
        </a>
        <img
          width={1}
          height={1}
          src="https://www11.a8.net/0.gif?a8mat=4AVF01+4V1GMQ+3SPO+9FIFPT"
          alt=""
          className="border-0"
        />
      </div>
    </div>
  );
}
