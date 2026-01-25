'use client';

import { useState } from 'react';
import { calculateTakeHome } from '../../lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '../../lib/ageIncomeData';
import Link from 'next/link';
import PcAdSidebar from './PcAdSidebar';
import { Card, InputField, PrimaryButton, ResultAmount, ResultRow } from './ui';
import CustomSelect, { type CustomSelectOption } from './CustomSelect';

const AGE_OPTIONS: CustomSelectOption[] = [
  { value: '20代', label: '20代' },
  { value: '30代', label: '30代' },
  { value: '40代', label: '40代' },
  { value: '50代', label: '50代' },
  { value: '60代以上', label: '60代以上' },
];

export default function SideBusinessClient() {
  const [salary, setSalary] = useState('');
  const [sideIncome, setSideIncome] = useState('');
  const [sideExpenses, setSideExpenses] = useState('');
  const [dependents, setDependents] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');
  const [results, setResults] = useState<{
    salary: ReturnType<typeof calculateTakeHome> | null;
    withSideBusiness: {
      totalIncome: number;
      taxableIncome: number;
      incomeTax: number;
      residentTax: number;
      socialInsurance: number;
      takeHome: number;
      monthlyTakeHome: number;
    } | null;
  }>({ salary: null, withSideBusiness: null });
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculate = () => {
    const salaryValue = parseFloat(salary);
    const sideIncomeValue = parseFloat(sideIncome) || 0;
    const sideExpensesValue = parseFloat(sideExpenses) || 0;
    const dependentsValue = parseInt(dependents) || 0;

    if (salaryValue) {
      const salaryResult = calculateTakeHome(salaryValue * 10000, dependentsValue);
      
      // 副業を含む計算
      const totalIncome = salaryValue * 10000 + sideIncomeValue * 10000;
      
      // 雑所得として計算（簡易版）
      const totalResult = calculateTakeHome(totalIncome, dependentsValue);

      setResults({
        salary: salaryResult,
        withSideBusiness: {
          totalIncome,
          taxableIncome: totalResult.breakdown.incomeTax > 0 ? totalIncome : 0,
          incomeTax: totalResult.breakdown.incomeTax,
          residentTax: totalResult.breakdown.residentTax,
          socialInsurance: salaryResult.breakdown.socialInsurance, // 副業分は社会保険に含まれない
          takeHome: totalResult.takeHome,
          monthlyTakeHome: totalResult.monthlyTakeHome,
        },
      });

      // 計算結果へスムーズスクロール
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  const formatYen = (value: number): string => {
    return (value / 10000).toFixed(1);
  };

  const difference = results.salary && results.withSideBusiness
    ? results.withSideBusiness.takeHome - results.salary.takeHome
    : 0;

  return (
    <div className="min-h-screen bg-[#f5f5f5] container-main">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-start md:gap-8">
          <div className="md:max-w-[800px] md:w-full">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} 副業検討者向け
            </nav>
            <h1 className="page-title">副業検討者向け 手取り計算</h1>

        {/* 入力フォーム */}
        <Card as="div" className="mb-6">
          {/* 会社員としての収入 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              会社員としての収入
            </label>
            <p className="text-caption mb-2">
              本業の年収を入力してください
            </p>
            <div className="relative">
              <InputField
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="pr-12"
                placeholder="400"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                万円
              </span>
            </div>
          </div>

          {/* 副業としての収入 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              副業としての収入
            </label>
            <p className="text-caption mb-2">
              副業の年間収入を入力してください
            </p>
            <div className="relative">
              <InputField
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={sideIncome}
                onChange={(e) => setSideIncome(e.target.value)}
                className="pr-12"
                placeholder="50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                万円
              </span>
            </div>
          </div>

          {/* 副業の費用/経費 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              副業の費用/経費
            </label>
            <p className="text-caption mb-2">
              副業にかかる経費を入力してください
            </p>
            <div className="relative">
              <InputField
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={sideExpenses}
                onChange={(e) => setSideExpenses(e.target.value)}
                className="pr-12"
                placeholder="10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                万円
              </span>
            </div>
          </div>

          {/* 年代選択 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              あなたの年代
            </label>
            <p className="text-caption mb-2">
              年代別の正確な比較をお見せします
            </p>
            <CustomSelect
              options={AGE_OPTIONS}
              value={ageGroup}
              onChange={(v) => setAgeGroup(v as AgeGroup)}
              placeholder="年代を選択"
            />
          </div>

          {/* 扶養人数 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              扶養人数
            </label>
            <p className="text-caption mb-2">
              扶養している家族の人数を入力してください
            </p>
            <div className="relative">
              <InputField
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                className="pr-12"
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                人
              </span>
            </div>
          </div>

          {/* 計算ボタン */}
          <PrimaryButton onClick={handleCalculate} className="mt-6">
            計算する
          </PrimaryButton>
        </Card>

        {/* 計算結果 */}
        {results.salary && results.withSideBusiness && (
          <Card as="div" id="results" className="mb-6">
            {/* 結果ヘッダー（このページは既存構成を保つため、ヘッダー＋トグルのみ追加） */}
            <div className="text-center">
              <div className="result-label">青色申告で年間お得になる額は…</div>
              <ResultAmount tone={difference >= 0 ? 'positive' : 'negative'} className="mt-2">
                約 {difference >= 0 ? '+' : ''}
                {Math.round(difference / 10000)}
                <span className="text-base font-normal ml-1">万円</span>
              </ResultAmount>
            </div>

            <div
              className="text-center text-blue-600 cursor-pointer py-2 mt-4"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? '[-] 詳細を閉じる' : '[+] 詳細を見る'}
            </div>

            {showDetails && (
              <div className="mt-4">
                {/* 入力内容サマリー */}
                <div className="mb-4 bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                  <div className="text-body space-y-1">
                    <ResultRow
                      label="本業年収"
                      value={Number.isFinite(parseFloat(salary)) ? `${parseFloat(salary)}万円` : '-'}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="副業収入"
                      value={Number.isFinite(parseFloat(sideIncome)) ? `${parseFloat(sideIncome)}万円` : '0万円'}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="合計年収（本業+副業）"
                      value={
                        Number.isFinite(parseFloat(salary))
                          ? `${(parseFloat(salary) + (parseFloat(sideIncome) || 0)).toFixed(1)}万円`
                          : '-'
                      }
                      className="pt-2 border-t border-[#e0e0e0]"
                      labelClassName="font-semibold text-[#333333]"
                      valueClassName="text-right font-semibold text-[#333333]"
                    />
                  </div>
                </div>

                {/* 雑所得ケース */}
                <div className="mt-4 p-4 bg-white border-2 border-[#e0e0e0] rounded-2xl">
                  <h3 className="font-semibold text-gray-900 mb-3">雑所得ケース</h3>
                  <div className="space-y-2">
                    <ResultRow
                      label="所得税"
                      value={`${formatYen(results.withSideBusiness.incomeTax)}万円`}
                    />
                    <ResultRow
                      label="住民税"
                      value={`${formatYen(results.withSideBusiness.residentTax)}万円`}
                    />
                    <ResultRow
                      label="可処分所得"
                      value={`${formatYen(results.withSideBusiness.takeHome)}万円`}
                      className="pt-2 border-t border-[#e0e0e0]"
                      labelClassName="font-semibold text-[#333333]"
                      valueClassName="font-semibold text-[#333333]"
                    />
                  </div>
                </div>

                {/* 青色申告ケース */}
                <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4 mt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">青色申告ケース（65万円控除）</h3>
                  <div className="space-y-2">
                    <ResultRow label="控除額" value="65万円" />
                    <ResultRow
                      label="節税効果"
                      value={`約${formatYen(650000 * 0.33)}万円`}
                      className="pt-2 border-t border-[#e0e0e0]"
                      labelClassName="font-semibold text-[#333333]"
                      valueClassName="font-semibold text-[#333333]"
                    />
                    <ResultRow
                      label="可処分所得"
                      value={`${formatYen(results.withSideBusiness.takeHome)}万円`}
                      className="pt-2 border-t border-[#e0e0e0]"
                      labelClassName="font-semibold text-[#333333]"
                      valueClassName="font-semibold text-[#333333]"
                    />
                  </div>
                </div>

                {/* 可処分所得の差（削除） */}
              </div>
            )}
          </Card>
        )}

        {/* パーセンタイル表示セクション */}
        {results.salary && results.withSideBusiness && (() => {
          const totalIncomeManEn = parseFloat(salary) + (parseFloat(sideIncome) || 0);
          const percentiles = percentileByAge[ageGroup];
          const average = averageIncomeByAge[ageGroup];
          
          let percentile = 50;
          let averageDiff = Math.round(totalIncomeManEn - average);
          let message = "";
          
          if (totalIncomeManEn >= percentiles.top5) {
            percentile = 5;
            message = "高収入層です。さらに上を目指せます。";
          } else if (totalIncomeManEn >= percentiles.top10) {
            percentile = 10;
            message = "高収入層です。さらに上を目指せます。";
          } else if (totalIncomeManEn >= percentiles.top25) {
            percentile = 25;
            message = "高収入層です。さらに上を目指せます。";
          } else if (totalIncomeManEn >= percentiles.top50) {
            percentile = 50;
            message = "平均以上の収入です。転職で大きく伸ばせる可能性があります。";
          } else if (totalIncomeManEn >= percentiles.top75) {
            percentile = 75;
            message = "転職で収入UPのチャンスが大きいです。";
          } else {
            percentile = 90;
            message = "転職で大きく収入を伸ばせる可能性があります。";
          }
          
          return (
            <div className="card-base mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📈 あなたの年収レベル
              </h3>
              <div className="text-3xl font-black text-[#0a57d1] mb-4">
                日本の上位 {percentile}%
              </div>
              
              {/* ビジュアルバー */}
              <div className="bg-gray-200 h-3 rounded-full mb-4">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${100 - percentile}%` }}
                />
              </div>

              <div className="text-lg mt-4 text-gray-700">
                {ageGroup}の平均より {Math.abs(averageDiff)}万円{' '}
                {averageDiff >= 0 ? '高い' : '低い'}
              </div>
              <div className="text-body mt-2">{message}</div>
            </div>
          );
        })()}

        {/* 訴求テキストセクション */}
        {results.salary && results.withSideBusiness && (
          <div className="card-base mt-6">
            <h3 className="text-xl font-bold mb-4">💡 今すぐ行動すべき理由</h3>
            
            <div className="bg-white border-l-4 border-[#e0e0e0] p-4 mb-3">
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
                <li>• 20代: +80万円</li>
                <li className={ageGroup === '30代' ? 'font-bold text-green-700' : ''}>
                  • 30代: +120万円 {ageGroup === '30代' && '← あなたの年代'}
                </li>
                <li className={ageGroup === '40代' ? 'font-bold text-green-700' : ''}>
                  • 40代: +150万円 {ageGroup === '40代' && '← あなたの年代'}
                </li>
                <li className={ageGroup === '50代' ? 'font-bold text-green-700' : ''}>
                  • 50代: +100万円 {ageGroup === '50代' && '← あなたの年代'}
                </li>
                {ageGroup === '20代' && (
                  <li className="font-bold text-green-700">
                    • 20代: +80万円 ← あなたの年代
                  </li>
                )}
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

          <PcAdSidebar />
        </div>
      </div>
    </div>
  );
}
