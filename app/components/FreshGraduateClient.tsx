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

type FreshGraduateClientProps = {
  embedded?: boolean;
};

export default function FreshGraduateClient({ embedded = false }: FreshGraduateClientProps) {
  const [salary, setSalary] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('20代');
  const [results, setResults] = useState<ReturnType<typeof calculateTakeHome> | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculate = () => {
    const salaryValue = parseFloat(salary);
    if (salaryValue) {
      setResults(calculateTakeHome(salaryValue * 10000, 0));

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

  // 生活費シミュレーション
  const monthlyTakeHome = results ? results.monthlyTakeHome : 0;
  const rent = 70000; // 家賃7万円
  const utilities = 15000; // 光熱費1.5万円
  const food = 40000; // 食費4万円
  const transport = 10000; // 交通費1万円
  const phone = 3000; // 通信費3千円
  const other = 20000; // その他2万円
  const totalExpenses = rent + utilities + food + transport + phone + other;
  const surplus = monthlyTakeHome - totalExpenses;
  const canLiveAlone = surplus >= 0;

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
          <div id="results" className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* 結果ヘッダー */}
              <div className="text-center">
                <div className="text-sm text-gray-600">あなたの手取り月収（目安）は…</div>
                <ResultAmount className="mt-2">
                  約 {formatJPY(results.monthlyTakeHome)}
                  <span className="text-base font-normal ml-1">円</span>
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
              {showDetails && (() => {
                const annualYen = Math.round((parseFloat(salary) || 0) * 10000);
                const monthlyGross = Math.round(annualYen / 12);

                const health = Math.round((annualYen * 0.05) / 12);
                const pension = Math.round((annualYen * 0.09) / 12);
                const employment = Math.round((annualYen * 0.006) / 12);
                const nursing = Math.max(0, Math.round((annualYen * 0.004) / 12));

                const incomeTax = Math.round((results.breakdown?.incomeTax ?? 0) / 12);
                const residentTax = Math.round((results.breakdown?.residentTax ?? 0) / 12);
                const deductionTotal = Math.max(0, monthlyGross - results.monthlyTakeHome);

                const rows = [
                  { label: '額面月収', value: formatJPY(monthlyGross), highlight: false },
                  { label: '健康保険料', value: `- ${formatJPY(health)}`, highlight: false },
                  { label: '厚生年金保険料', value: `- ${formatJPY(pension)}`, highlight: false },
                  { label: '雇用保険料', value: `- ${formatJPY(employment)}`, highlight: false },
                  { label: '介護保険料', value: `- ${formatJPY(nursing)}`, highlight: false },
                  { label: '所得税', value: `- ${formatJPY(incomeTax)}`, highlight: false },
                  { label: '住民税', value: `- ${formatJPY(residentTax)}`, highlight: false },
                  { label: '控除合計額', value: `- ${formatJPY(deductionTotal)}`, highlight: true },
                ];

                return (
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse text-sm sm:text-base">
                      <thead>
                        <tr>
                          <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                          <th className="bg-gray-50 text-gray-700 p-3 text-right font-semibold border-b border-gray-100">金額</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row) => (
                          <tr key={row.label} className={row.highlight ? 'bg-amber-50 font-bold' : ''}>
                            <td className="p-3 border-b border-gray-100">{row.label}</td>
                            <td className="p-3 border-b border-gray-100 text-right tabular-nums">{row.value}円</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })()}

            {/* 一人暮らしの支出の目安 */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
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
                <div className="flex justify-between text-sm pt-2 border-t border-[#e0e0e0]">
                  <span className="text-gray-700 font-semibold">合計</span>
                  <span className="text-gray-900 font-semibold">{formatYen(totalExpenses)}万円</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#e0e0e0]">
                  <span className="text-gray-700 font-semibold">月の余剰金の目安</span>
                  <span className={`font-semibold text-right ${surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatYen(surplus)}万円
                  </span>
                </div>
              </div>
            </div>
            </div>

            {/* 一人暮らし可否判定（削除） */}

            {/* おすすめの使い道 */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">おすすめの使い道</h3>
              <ul className="space-y-2 text-caption">
                {surplus >= 3 && (
                  <>
                    <li>• 月3万円の投資信託で資産形成を始める</li>
                    <li>• 資格取得やスキルアップのための自己投資</li>
                  </>
                )}
                {surplus >= 1 && surplus < 3 && (
                  <>
                    <li>• 月1万円の貯蓄で緊急時の備えを作る</li>
                    <li>• 趣味やレジャーでリフレッシュ</li>
                  </>
                )}
                {surplus < 1 && surplus >= 0 && (
                  <>
                    <li>• 少しずつでも貯蓄を心がける</li>
                    <li>• 生活費の見直しを検討する</li>
                  </>
                )}
                {surplus < 0 && (
                  <>
                    <li>• 家賃や生活費の見直しが必要です</li>
                    <li>• 実家から通える範囲の会社を検討する</li>
                  </>
                )}
              </ul>
            </div>

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
          </div>
        )}

        {/* パーセンタイル表示セクション */}
        {results && (() => {
          const incomeManEn = parseFloat(salary);
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📈 あなたの年収レベル
              </h3>
              <div className="text-3xl font-black text-[#0a57d1] mb-4">
                日本の上位 {percentile}%
              </div>
              
              {/* ビジュアルバー */}
              <div className="bg-gray-200 h-3 rounded-full mb-4">
                <div
                  className="bg-[#0a57d1] h-3 rounded-full transition-all duration-500"
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

        {/* 訴求テキストセクション（埋め込み時は非表示・CTA設定しない） */}
        {!embedded && results && (
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
    <div className="min-h-screen bg-[#f5f5f5] container-main">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-start md:gap-8">
          <div className="md:max-w-[800px] md:w-full">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} 新卒・就活生向け
            </nav>
            <h1 className="page-title">新卒・就活生向け 手取り計算</h1>
            {calculatorSection}
          </div>
          <PcAdSidebar />
        </div>
      </div>
    </div>
  );
}
