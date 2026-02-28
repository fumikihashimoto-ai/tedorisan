'use client';

import { useState, useRef, useEffect } from 'react';
import SectionBar from '@/app/components/v2/common/SectionBar';
import NumberInputWithSuffix from '@/app/components/v2/common/NumberInputWithSuffix';
import AnimatedSelect, { type AnimatedSelectOption } from '@/app/components/AnimatedSelect';
import ResultTableAnnualMonthly from '@/app/components/ResultTableAnnualMonthly';
import { calculateTakeHomeDetailed } from '@/lib/salaryCalculator';

const AGE_SELECT_OPTIONS: AnimatedSelectOption[] = [
  { value: '20s', label: '20代' },
  { value: '30s', label: '30代' },
  { value: '40s', label: '40代' },
  { value: '50s', label: '50代以上' },
];

function ageGroupToYears(ageGroup: string): number {
  const map: Record<string, number> = {
    '20s': 25,
    '30s': 35,
    '40s': 45,
    '50s': 55,
  };
  return map[ageGroup] ?? 25;
}

function formatJPY(value: number): string {
  return Math.round(value).toLocaleString('ja-JP');
}

interface TedoriCalculatorProps {
  /** タイトル（デフォルト: 手取り計算シミュレーション） */
  title?: string;
  /** 背景色を全幅にするか（デフォルト: true） */
  fullWidth?: boolean;
  /** 計算実行時のコールバック（任意） */
  onCalculate?: (ageGroup: string, monthlySalary: number) => void;
  /** 下マージンなし */
  noMargin?: boolean;
  /** コンテンツ幅750pxレイアウト（TOP仕様） */
  contentLayout?: boolean;
}

export default function TedoriCalculator({
  title = '手取り計算シミュレーション',
  fullWidth = true,
  onCalculate,
  noMargin = false,
  contentLayout = false,
}: TedoriCalculatorProps) {
  const [ageGroup, setAgeGroup] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [results, setResults] = useState<ReturnType<typeof calculateTakeHomeDetailed> | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results]);

  const handleCalculate = () => {
    const monthlyNum = parseFloat(monthlySalary);
    if (ageGroup && !Number.isNaN(monthlyNum) && monthlyNum > 0) {
      const annualSalary = monthlyNum * 12 * 10000;
      const age = ageGroupToYears(ageGroup);
      setResults(calculateTakeHomeDetailed(annualSalary, age, 0));

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tedori_calculate', {
          age_group: ageGroup,
          monthly_salary: String(monthlyNum),
        });
      }

      if (onCalculate) {
        onCalculate(ageGroup, monthlyNum);
      }
    }
  };

  const fullBleedClass = contentLayout ? '-mx-4 px-4' : '-mx-[10px] px-[10px]';
  const containerClasses = fullWidth
    ? `bg-[var(--color-v2-bg)] ${fullBleedClass} pt-5 pb-[16px] ${noMargin ? 'mb-0' : 'mb-6'}`
    : `bg-[var(--color-v2-bg)] pt-5 pb-[16px] ${noMargin ? 'mb-0' : 'mb-6'}`;

  const canCalculate = ageGroup && monthlySalary && parseFloat(monthlySalary) > 0;

  return (
    <div className={containerClasses}>
      <SectionBar title={title} />

      <div className="flex flex-wrap md:flex-nowrap gap-4 items-end mt-4">
        <div className="flex-1 min-w-[140px]">
          <AnimatedSelect
            options={AGE_SELECT_OPTIONS}
            value={ageGroup}
            onChange={setAgeGroup}
            placeholder="年代を選択"
            placeholderClassName="font-['Noto_Sans_JP'] font-bold text-[14px] text-[#AAAAAA]"
          />
        </div>

        <div className="flex-1 min-w-[140px]">
          <NumberInputWithSuffix
            value={monthlySalary}
            onChange={setMonthlySalary}
            placeholder="あなたの月収"
            suffix="万円"
            inputClassName="bg-white text-[14px]"
          />
        </div>
      </div>

      <div className="flex justify-center mt-4 relative z-10">
        <button
          type="button"
          onClick={handleCalculate}
          disabled={!canCalculate}
          className="bg-[#1390c8] text-white font-black text-xs py-2 px-6 rounded-md shadow-[0px_3px_0px_0px_#0a81b7] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          手取りを確認
        </button>
      </div>

      {results && (
        <div ref={resultsRef} className="mb-6 animate-fade-in mt-6">
          <ResultTableAnnualMonthly
            items={[
              { label: '額面収入', annual: `${formatJPY(results.annualSalary)}円`, monthly: `${formatJPY(results.monthlySalary)}円` },
              { label: '所得税', annual: `${formatJPY(results.incomeTax.annual)}円`, monthly: `${formatJPY(results.incomeTax.monthly)}円` },
              { label: '住民税', annual: `${formatJPY(results.residentTax.annual)}円`, monthly: `${formatJPY(results.residentTax.monthly)}円` },
              { label: '健康保険', annual: `${formatJPY(results.healthInsurance.annual)}円`, monthly: `${formatJPY(results.healthInsurance.monthly)}円` },
              { label: '厚生年金', annual: `${formatJPY(results.pension.annual)}円`, monthly: `${formatJPY(results.pension.monthly)}円` },
              { label: '介護保険', annual: `${formatJPY(results.nursingCare.annual)}円`, monthly: `${formatJPY(results.nursingCare.monthly)}円` },
              { label: '雇用保険', annual: `${formatJPY(results.employmentInsurance.annual)}円`, monthly: `${formatJPY(results.employmentInsurance.monthly)}円` },
              { label: '手取り額', annual: `${formatJPY(results.takeHome.annual)}円`, monthly: `${formatJPY(results.takeHome.monthly)}円`, highlight: true },
            ]}
          />
        </div>
      )}
    </div>
  );
}
