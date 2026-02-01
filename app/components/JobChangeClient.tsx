'use client';

import { useState } from 'react';
import { calculateTakeHomeDetailed, type TakeHomeDetailedResult } from '../../lib/salaryCalculator';
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

type JobChangeClientProps = {
  embedded?: boolean;
};

export default function JobChangeClient({ embedded = false }: JobChangeClientProps) {
  const [currentSalary, setCurrentSalary] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [dependents, setDependents] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');
  const [results, setResults] = useState<{
    current: TakeHomeDetailedResult | null;
    new: TakeHomeDetailedResult | null;
  }>({ current: null, new: null });

  const handleCalculate = () => {
    const current = parseFloat(currentSalary);
    const newSalaryValue = parseFloat(newSalary);
    const dependentsValue = parseInt(dependents) || 0;

    if (current && newSalaryValue) {
      const age = ageGroupToYears(ageGroup);
      setResults({
        current: calculateTakeHomeDetailed(current * 10000, age, dependentsValue),
        new: calculateTakeHomeDetailed(newSalaryValue * 10000, age, dependentsValue),
      });

      // 計算結果へスムーズスクロール
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const formatJPY = (value: number): string => {
    return Math.round(value).toLocaleString('ja-JP');
  };

  const calculatorSection = (
    <section id="calculator" className="pt-4 pb-6 mb-0 scroll-mt-6 -mt-4 md:-mt-6">
      <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
        手取り計算シミュレーション
      </h2>

        {/* 入力フォーム */}
        <div className="w-full mb-6 relative z-10">
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-end">
            {/* 現在の年収 */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-sm text-gray-600 mb-1">現在の年収</label>
              <div className="relative">
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(e.target.value)}
                  placeholder="400"
                  className="w-full px-4 h-12 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">万円</span>
              </div>
            </div>

            {/* 転職先の年収 */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-sm text-gray-600 mb-1">転職先の年収</label>
              <div className="relative">
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  placeholder="500"
                  className="w-full px-4 h-12 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">万円</span>
              </div>
            </div>

            {/* 年代選択 */}
            <div className="flex-1 min-w-[100px]">
              <label className="block text-sm text-gray-600 mb-1">あなたの年代</label>
              <AnimatedSelect
                options={AGE_SELECT_OPTIONS}
                value={ageGroup}
                onChange={(v) => setAgeGroup(v as AgeGroup)}
                placeholder="年代を選択"
              />
            </div>

            {/* 扶養人数 */}
            <div className="flex-1 min-w-[80px]">
              <label className="block text-sm text-gray-600 mb-1">扶養人数</label>
              <div className="relative">
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 h-12 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">人</span>
              </div>
            </div>

            {/* 計算ボタン（年代の右に配置） */}
            <button
              type="button"
              onClick={handleCalculate}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold px-6 h-12 rounded transition-colors"
            >
              計算
            </button>
          </div>
        </div>

        {/* 計算結果 */}
        {results.current && results.new && (
          <>
            <Card id="results" variant="flat" className="section-gap animate-fade-in mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">転職前の内訳</h3>
              <ResultTableAnnualMonthly
                items={[
                  { label: '額面収入', annual: `${formatJPY(results.current.annualSalary)}円`, monthly: `${formatJPY(results.current.monthlySalary)}円` },
                  { label: '所得税', annual: `${formatJPY(results.current.incomeTax.annual)}円`, monthly: `${formatJPY(results.current.incomeTax.monthly)}円` },
                  { label: '住民税', annual: `${formatJPY(results.current.residentTax.annual)}円`, monthly: `${formatJPY(results.current.residentTax.monthly)}円` },
                  { label: '健康保険', annual: `${formatJPY(results.current.healthInsurance.annual)}円`, monthly: `${formatJPY(results.current.healthInsurance.monthly)}円` },
                  { label: '厚生年金', annual: `${formatJPY(results.current.pension.annual)}円`, monthly: `${formatJPY(results.current.pension.monthly)}円` },
                  { label: '介護保険', annual: `${formatJPY(results.current.nursingCare.annual)}円`, monthly: `${formatJPY(results.current.nursingCare.monthly)}円` },
                  { label: '雇用保険', annual: `${formatJPY(results.current.employmentInsurance.annual)}円`, monthly: `${formatJPY(results.current.employmentInsurance.monthly)}円` },
                  { label: '手取り額', annual: `${formatJPY(results.current.takeHome.annual)}円`, monthly: `${formatJPY(results.current.takeHome.monthly)}円`, highlight: true },
                ]}
              />

              <h3 className="font-semibold text-gray-900 mb-3 mt-6">転職後の内訳</h3>
              <ResultTableAnnualMonthly
                items={[
                  { label: '額面収入', annual: `${formatJPY(results.new.annualSalary)}円`, monthly: `${formatJPY(results.new.monthlySalary)}円` },
                  { label: '所得税', annual: `${formatJPY(results.new.incomeTax.annual)}円`, monthly: `${formatJPY(results.new.incomeTax.monthly)}円` },
                  { label: '住民税', annual: `${formatJPY(results.new.residentTax.annual)}円`, monthly: `${formatJPY(results.new.residentTax.monthly)}円` },
                  { label: '健康保険', annual: `${formatJPY(results.new.healthInsurance.annual)}円`, monthly: `${formatJPY(results.new.healthInsurance.monthly)}円` },
                  { label: '厚生年金', annual: `${formatJPY(results.new.pension.annual)}円`, monthly: `${formatJPY(results.new.pension.monthly)}円` },
                  { label: '介護保険', annual: `${formatJPY(results.new.nursingCare.annual)}円`, monthly: `${formatJPY(results.new.nursingCare.monthly)}円` },
                  { label: '雇用保険', annual: `${formatJPY(results.new.employmentInsurance.annual)}円`, monthly: `${formatJPY(results.new.employmentInsurance.monthly)}円` },
                  { label: '手取り額', annual: `${formatJPY(results.new.takeHome.annual)}円`, monthly: `${formatJPY(results.new.takeHome.monthly)}円`, highlight: true },
                ]}
              />
            </Card>
          </>
        )}

    </section>
  );

  if (embedded) {
    return calculatorSection;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/">計算ツール</Link> {'>'} 転職向け手取り計算
            </nav>
            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
              転職検討者向け 手取り計算
            </h1>
            {calculatorSection}
          </main>
          <PcAdSidebar />
        </div>
      </div>
    </div>
  );
}
