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
          <div id="results" className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* 結果ヘッダー */}
              <div className="text-center">
                <div className="text-sm text-gray-600">青色申告で年間お得になる額は…</div>
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

              {/* 広告1: PC・スマホ両方に表示（詳細を見るの下） */}
              <div className="my-4 flex justify-center">
              <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4WTRG2+3SPO+C8LMIP" rel="nofollow">
                <img
                  width={468}
                  height={60}
                  alt=""
                  src="https://www20.a8.net/svt/bgt?aid=260126641297&wid=001&eno=01&mid=s00000017718074004000&mc=1"
                  className="border-0 max-w-full h-auto mx-auto"
                />
              </a>
              <img
                width={1}
                height={1}
                src="https://www17.a8.net/0.gif?a8mat=4AVF01+4WTRG2+3SPO+C8LMIP"
                alt=""
                className="border-0"
              />
            </div>

            {showDetails && (
              <div className="mt-4 space-y-4">
                {/* 入力内容サマリー */}
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
                        <td className="p-3 border-b border-gray-100">本業年収</td>
                        <td className="p-3 border-b border-gray-100 text-right tabular-nums">{Number.isFinite(parseFloat(salary)) ? `${parseFloat(salary)}万円` : '-'}</td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-gray-100">副業収入</td>
                        <td className="p-3 border-b border-gray-100 text-right tabular-nums">{Number.isFinite(parseFloat(sideIncome)) ? `${parseFloat(sideIncome)}万円` : '0万円'}</td>
                      </tr>
                      <tr className="bg-amber-50 font-bold">
                        <td className="p-3 border-b border-gray-100">合計年収（本業+副業）</td>
                        <td className="p-3 border-b border-gray-100 text-right tabular-nums">
                          {Number.isFinite(parseFloat(salary))
                            ? `${(parseFloat(salary) + (parseFloat(sideIncome) || 0)).toFixed(1)}万円`
                            : '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 雑所得ケース */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">雑所得ケース</h3>
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
                          <td className="p-3 border-b border-gray-100">所得税</td>
                          <td className="p-3 border-b border-gray-100 text-right tabular-nums">{formatYen(results.withSideBusiness.incomeTax)}万円</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-b border-gray-100">住民税</td>
                          <td className="p-3 border-b border-gray-100 text-right tabular-nums">{formatYen(results.withSideBusiness.residentTax)}万円</td>
                        </tr>
                        <tr className="bg-amber-50 font-bold">
                          <td className="p-3 border-b border-gray-100">可処分所得</td>
                          <td className="p-3 border-b border-gray-100 text-right tabular-nums">{formatYen(results.withSideBusiness.takeHome)}万円</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 青色申告ケース */}
                <div>
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
                        <tr className="bg-amber-50 font-bold">
                          <td className="p-3 border-b border-gray-100">可処分所得</td>
                          <td className="p-3 border-b border-gray-100 text-right tabular-nums">{formatYen(results.withSideBusiness.takeHome)}万円</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
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
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📈 あなたの年収レベル
              </h3>
              <div className="text-3xl font-black text-[#2563EB] mb-4">
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

              {/* 広告2: スマホのみ表示（転職で大きく収入を伸ばせる可能性があります。の下） */}
              {message === "転職で大きく収入を伸ばせる可能性があります。" && (
                <div className="block md:hidden my-4">
                  <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4WTRG2+3SPO+C8MHDT" rel="nofollow">
                    <img
                      width={300}
                      height={250}
                      alt=""
                      src="https://www28.a8.net/svt/bgt?aid=260126641297&wid=001&eno=01&mid=s00000017718074008000&mc=1"
                      className="border-0 mx-auto"
                    />
                  </a>
                  <img
                    width={1}
                    height={1}
                    src="https://www15.a8.net/0.gif?a8mat=4AVF01+4WTRG2+3SPO+C8MHDT"
                    alt=""
                    className="border-0"
                  />
                </div>
              )}

              {/* 広告: スマホのみ表示（あなたの年収レベルブロックの下部） */}
              <div className="block md:hidden my-4">
                <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4V1GMQ+3SPO+9FFFOX" rel="nofollow">
                  <img
                    width={300}
                    height={250}
                    alt=""
                    src="https://www21.a8.net/svt/bgt?aid=260126641294&wid=001&eno=01&mid=s00000017718057011000&mc=1"
                    className="border-0 mx-auto"
                  />
                </a>
                <img
                  width={1}
                  height={1}
                  src="https://www10.a8.net/0.gif?a8mat=4AVF01+4V1GMQ+3SPO+9FFFOX"
                  alt=""
                  className="border-0"
                />
              </div>
            </div>
          );
        })()}

        {/* 訴求テキストセクション */}
        {results.salary && results.withSideBusiness && (
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
    <div className="min-h-screen bg-[#F8FAFC] container-main pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-start md:gap-8">
          <div className="md:max-w-[800px] md:w-full">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} <Link href="/">計算ツール</Link> {'>'} 副業向け手取り計算
            </nav>
            <h1 className="page-title">副業検討者向け 手取り計算</h1>
            {calculatorSection}
          </div>
          <PcAdSidebar />
        </div>
      </div>

      {/* 固定広告: スマホのみ・ページ下部固定表示 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden">
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4V1GMQ+3SPO+9FIFPT" rel="nofollow">
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
