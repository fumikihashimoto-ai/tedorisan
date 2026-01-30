'use client';

import { useState } from 'react';
import { calculateTakeHome } from '../../lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '../../lib/ageIncomeData';
import Link from 'next/link';
import PcAdSidebar from './PcAdSidebar';
import AnimatedSelect, { type AnimatedSelectOption } from './AnimatedSelect';
import { ResultAmount } from './ui';

const AGE_OPTIONS: AgeGroup[] = ['20代', '30代', '40代', '50代', '60代以上'];
const AGE_SELECT_OPTIONS: AnimatedSelectOption[] = AGE_OPTIONS.map((v) => ({ value: v, label: v }));

type JobChangeClientProps = {
  embedded?: boolean;
};

export default function JobChangeClient({ embedded = false }: JobChangeClientProps) {
  const [currentSalary, setCurrentSalary] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [dependents, setDependents] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');
  const [results, setResults] = useState<{
    current: ReturnType<typeof calculateTakeHome> | null;
    new: ReturnType<typeof calculateTakeHome> | null;
  }>({ current: null, new: null });
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculate = () => {
    const current = parseFloat(currentSalary);
    const newSalaryValue = parseFloat(newSalary);
    const dependentsValue = parseInt(dependents) || 0;

    if (current && newSalaryValue) {
      setResults({
        current: calculateTakeHome(current * 10000, dependentsValue),
        new: calculateTakeHome(newSalaryValue * 10000, dependentsValue),
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

  const formatJPY = (value: number): string => {
    return Math.round(value).toLocaleString('ja-JP');
  };

  const increase = results.current && results.new
    ? results.new.takeHome - results.current.takeHome
    : 0;
  const monthlyIncrease = increase / 12;

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
          <div id="results" className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* 結果ヘッダー */}
              <div className="text-center">
                <div className="text-sm text-gray-600">転職後の年間手取り増加額は…</div>
                <ResultAmount tone={increase >= 0 ? 'positive' : 'negative'} className="mt-2">
                  約 {increase >= 0 ? '+' : ''}
                  {Math.round(increase / 10000)}
                  <span className="text-base font-normal ml-1">万円</span>
                </ResultAmount>
              </div>

              {/* トグル */}
              <div
                className="text-center text-blue-600 cursor-pointer py-2 mt-4"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? '[-] 詳細を閉じる' : '[+] 詳細を見る'}
              </div>

              {/* 内訳テーブル */}
              {showDetails && (
                <div className="overflow-x-auto mt-4">
                  <table className="w-full border-collapse text-sm sm:text-base">
                    <thead>
                      <tr>
                        <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                        <th className="bg-gray-50 text-gray-700 p-3 text-right font-semibold border-b border-gray-100">金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b border-gray-100">現在の年収</td>
                        <td className="p-3 border-b border-gray-100 text-right tabular-nums">{formatJPY((parseFloat(currentSalary) || 0) * 10000)}円</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-gray-100">現在の手取り</td>
                        <td className="p-3 border-b border-gray-100 text-right tabular-nums">{formatJPY(results.current.takeHome)}円</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-gray-100">転職後の年収</td>
                        <td className="p-3 border-b border-gray-100 text-right tabular-nums">{formatJPY((parseFloat(newSalary) || 0) * 10000)}円</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-gray-100">転職後の手取り</td>
                        <td className="p-3 border-b border-gray-100 text-right tabular-nums">{formatJPY(results.new.takeHome)}円</td>
                      </tr>
                      <tr className="bg-amber-50 font-bold">
                        <td className="p-3 border-b border-gray-100">年間増加額</td>
                        <td className="p-3 border-b border-gray-100 text-right tabular-nums">{increase >= 0 ? '+' : '-'}{formatJPY(Math.abs(increase))}円</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* できることリスト */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">この増加額でできること</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {monthlyIncrease >= 5 && <li>• 毎月5万円の投資信託を始められる</li>}
                  {monthlyIncrease >= 3 && <li>• 月3万円の習い事や自己投資ができる</li>}
                  {monthlyIncrease >= 2 && <li>• 月2万円の外食やレジャー費に回せる</li>}
                  {monthlyIncrease >= 1 && <li>• 月1万円の貯蓄が増える</li>}
                  {monthlyIncrease < 1 && <li>• 少しずつでも生活の余裕が生まれる</li>}
                </ul>
              </div>
            </div>
        )}

        {/* パーセンタイル表示セクション */}
        {results.current && results.new && (() => {
          const incomeManEn = parseFloat(newSalary);
          const percentiles = percentileByAge[ageGroup];
          const average = averageIncomeByAge[ageGroup];
          
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
          
          return (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📈 あなたの年収レベル</h3>
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
              <div className="text-gray-700 mt-2">{message}</div>
            </div>
          );
        })()}

        {/* 訴求テキストセクション */}
        {results.current && results.new && (
          <div className="card-base mt-6">
            <h3 className="text-xl font-bold mb-4">💡 今すぐ行動すべき理由</h3>
            
            <div className="bg-white border-l-4 border-[#e0e0e0] p-4 mb-3">
              <p className="font-bold mb-2">⏰ 転職市場は今がチャンス</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 求人倍率: 1.5倍（過去最高水準）</li>
                <li>• 人手不足で企業が高待遇提示</li>
                <li>• 2025年は転職好機</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-3">
              <p className="font-bold mb-2">💰 1年遅れると...</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 年収UP機会を逃す: -100万円/年</li>
                <li>• 生涯年収の損失: -1000万円以上</li>
                <li>• スキルアップの機会も逃す</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="font-bold mb-2">📊 転職成功者の平均UP額</p>
              <ul className="text-sm text-gray-700 space-y-1">
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

    </section>
  );

  if (embedded) {
    return calculatorSection;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] container-main">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-start md:gap-8">
          <div className="md:max-w-[800px] md:w-full">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} 転職検討者向け
            </nav>
            <h1 className="page-title">転職検討者向け 手取り計算</h1>
            {calculatorSection}
          </div>
          <PcAdSidebar />
        </div>
      </div>
    </div>
  );
}
