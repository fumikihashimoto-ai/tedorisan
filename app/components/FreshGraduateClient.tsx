'use client';

import { useState } from 'react';
import { calculateTakeHomeDetailed } from '../../lib/salaryCalculator';
import { type AgeGroup } from '../../lib/ageIncomeData';
import Link from 'next/link';
import PcAdSidebar from './PcAdSidebar';
import AnimatedSelect, { type AnimatedSelectOption } from './AnimatedSelect';
import { Card } from './ui';
import ResultTableAnnualMonthly from './ResultTableAnnualMonthly';

const AGE_OPTIONS: AgeGroup[] = ['20代', '30代', '40代', '50代', '60代以上'];
const AGE_SELECT_OPTIONS: AnimatedSelectOption[] = AGE_OPTIONS.map((v) => ({ value: v, label: v }));

/** 年代を年齢に変換（新卒想定） */
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

type FreshGraduateClientProps = {
  embedded?: boolean;
};

export default function FreshGraduateClient({ embedded = false }: FreshGraduateClientProps) {
  const [salary, setSalary] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('20代');
  const [results, setResults] = useState<ReturnType<typeof calculateTakeHomeDetailed> | null>(null);

  const handleCalculate = () => {
    const salaryValue = parseFloat(salary);
    if (salaryValue) {
      const age = ageGroupToYears(ageGroup);
      setResults(calculateTakeHomeDetailed(salaryValue * 10000, age, 0));

      // 計算結果へスムーズスクロール
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

  // 生活費シミュレーション
  const monthlyTakeHome = results ? results.takeHome.monthly : 0;
  const rent = 70000; // 家賃7万円
  const utilities = 15000; // 光熱費1.5万円
  const food = 40000; // 食費4万円
  const transport = 10000; // 交通費1万円
  const phone = 3000; // 通信費3千円
  const other = 20000; // その他2万円
  const totalExpenses = rent + utilities + food + transport + phone + other;
  const surplus = monthlyTakeHome - totalExpenses;

  const calculatorSection = (
    <section id="calculator" className="pt-4 pb-6 mb-0 scroll-mt-6 -mt-4 md:-mt-6">
      <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
        新卒の手取り計算シミュレーション
      </h2>
      <div className="pt-0 pb-4 w-full">
        {/* 入力フォーム */}
        <div className="w-full mb-6 relative z-10">
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-end">
            {/* 内定先の年収 */}
            <div className="flex-1 min-w-[140px]">
              <label className="block text-sm text-gray-600 mb-1">内定先の年収</label>
              <div className="relative">
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="300"
                  className="w-full px-4 h-12 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                  万円
                </span>
              </div>
            </div>

            {/* 年代選択 */}
            <div className="flex-1 min-w-[140px]">
              <label className="block text-sm text-gray-600 mb-1">あなたの年代</label>
              <AnimatedSelect
                options={AGE_SELECT_OPTIONS}
                value={ageGroup}
                onChange={(v) => setAgeGroup(v as AgeGroup)}
                placeholder="年代を選択"
              />
            </div>

            {/* 計算ボタン */}
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
        {results && (
          <>
            <Card id="results" variant="flat" className="section-gap animate-fade-in mt-6">
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
            </Card>

            {/* 一人暮らしの支出の目安 */}
            <Card variant="flat" className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">一人暮らしの支出の目安</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">家賃</span>
                  <span className="text-gray-900 font-semibold">{formatYen(rent)}万円</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">光熱費</span>
                  <span className="text-gray-900 font-semibold">{formatYen(utilities)}万円</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">食費</span>
                  <span className="text-gray-900 font-semibold">{formatYen(food)}万円</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">交通費</span>
                  <span className="text-gray-900 font-semibold">{formatYen(transport)}万円</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">通信費</span>
                  <span className="text-gray-900 font-semibold">{formatYen(phone)}万円</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">その他</span>
                  <span className="text-gray-900 font-semibold">{formatYen(other)}万円</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#E2E8F0]">
                  <span className="text-gray-700 font-semibold">合計</span>
                  <span className="text-gray-900 font-semibold">{formatYen(totalExpenses)}万円</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#E2E8F0]">
                  <span className="text-gray-700 font-semibold">月の余剰金の目安</span>
                  <span className={`font-semibold text-right ${surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatYen(surplus)}万円
                  </span>
                </div>
              </div>
            </Card>

            {/* A8.net 新卒・就活生向け広告（埋め込み時は非表示） */}
            {!embedded && (
              <div className="mt-8 flex justify-center">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `
<a href="https://px.a8.net/svt/ejp?a8mat=4AVDG5+5CB16A+1WP2+6GRMP" target="_blank" rel="nofollow noopener noreferrer">
<img width="480" height="220" alt="" src="https://www28.a8.net/svt/bgt?aid=260124629323&wid=001&eno=01&mid=s00000008903001086000&mc=1" style="border:none;"></a>
<img width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4AVDG5+5CB16A+1WP2+6GRMP" alt="" style="border:none;">
`,
                  }}
                />
              </div>
            )}
          </>
        )}

        {/* 訴求テキストセクション（埋め込み時は非表示・CTA設定しない） */}
        {!embedded && results && (
          <div className="card-base mt-6">
            <h3 className="text-xl font-bold mb-4">💡 今すぐ行動すべき理由</h3>
            
            <div className="bg-white border-l-4 border-[#E2E8F0] p-4 mb-3">
              <p className="font-bold mb-2">⏰ 転職市場は今がチャンス</p>
              <ul className="text-body space-y-1">
                <li>• 求人倍率: 1.5倍（過去最高水準）</li>
                <li>• 人手不足で企業が高待遇提示</li>
                <li>• 2025年は転職好機</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-3">
              <p className="font-bold mb-2">💰 1年遅れると...</p>
              <ul className="text-body space-y-1">
                <li>• 年収UP機会を逃す: -100万円/年</li>
                <li>• 生涯年収の損失: -1000万円以上</li>
                <li>• スキルアップの機会も逃す</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="font-bold mb-2">📊 転職成功者の平均UP額</p>
              <ul className="text-body space-y-1">
                <li className={ageGroup === '20代' ? 'font-bold text-green-700' : ''}>
                  • 20代: +80万円 {ageGroup === '20代' && '← あなたの年代'}
                </li>
                <li>• 30代: +120万円</li>
                <li className={ageGroup === '30代' ? 'font-bold text-green-700' : ''}>
                  {ageGroup === '30代' && '• 30代: +120万円 ← あなたの年代'}
                </li>
                <li>• 40代: +150万円</li>
                <li className={ageGroup === '40代' ? 'font-bold text-green-700' : ''}>
                  {ageGroup === '40代' && '• 40代: +150万円 ← あなたの年代'}
                </li>
                <li>• 50代: +100万円</li>
                <li className={ageGroup === '50代' ? 'font-bold text-green-700' : ''}>
                  {ageGroup === '50代' && '• 50代: +100万円 ← あなたの年代'}
                </li>
                {ageGroup === '60代以上' && (
                  <li className="font-bold text-green-700">
                    • 60代以上: +80万円 ← あなたの年代
                  </li>
                )}
              </ul>
            </div>
            
          </div>
        )}
      </div>
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
              <Link href="/">ホーム</Link> {'>'} <Link href="/">計算ツール</Link> {'>'} 新卒向け手取り計算
            </nav>
            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
              新卒・就活生向け 手取り計算
            </h1>
            {calculatorSection}
          </main>
          <PcAdSidebar />
        </div>
      </div>
    </div>
  );
}
