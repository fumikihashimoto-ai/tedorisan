'use client';

import { useState } from 'react';
import { calculateTakeHome } from '../../lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '../../lib/ageIncomeData';
import Link from 'next/link';

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

  const handleCalculate = () => {
    const salaryValue = parseFloat(salary);
    const sideIncomeValue = parseFloat(sideIncome) || 0;
    const sideExpensesValue = parseFloat(sideExpenses) || 0;
    const dependentsValue = parseInt(dependents) || 0;

    if (salaryValue) {
      const salaryResult = calculateTakeHome(salaryValue * 10000, dependentsValue);
      
      // 副業を含む計算
      const totalIncome = salaryValue * 10000 + sideIncomeValue * 10000;
      const sideBusinessProfit = sideIncomeValue * 10000 - sideExpensesValue * 10000;
      
      // 雑所得として計算（簡易版）
      const totalResult = calculateTakeHome(totalIncome, dependentsValue);
      
      // 青色申告の場合（65万円控除）
      const blueReturnDeduction = 650000;
      const blueReturnTaxableIncome = Math.max(0, 
        totalResult.breakdown.incomeTax === 0 ? 0 : 
        (totalIncome - salaryResult.breakdown.socialInsurance - blueReturnDeduction) / 1.25
      );
      const blueReturnResult = calculateTakeHome(
        Math.floor(blueReturnTaxableIncome + salaryValue * 10000), 
        dependentsValue
      );

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
    }
  };

  const formatYen = (value: number): string => {
    return (value / 10000).toFixed(1);
  };

  const difference = results.salary && results.withSideBusiness
    ? results.withSideBusiness.takeHome - results.salary.takeHome
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          副業検討者向け 手取り計算
        </h1>

        {/* 入力フォーム */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* 会社員としての収入 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              会社員としての収入
            </label>
            <p className="text-sm text-gray-600 mb-2">
              本業の年収を入力してください
            </p>
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-base pr-12"
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
            <p className="text-sm text-gray-600 mb-2">
              副業の年間収入を入力してください
            </p>
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={sideIncome}
                onChange={(e) => setSideIncome(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-base pr-12"
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
            <p className="text-sm text-gray-600 mb-2">
              副業にかかる経費を入力してください
            </p>
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={sideExpenses}
                onChange={(e) => setSideExpenses(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-base pr-12"
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
            <p className="text-sm text-gray-600 mb-2">
              年代別の正確な比較をお見せします
            </p>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
              className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-base"
            >
              <option value="20代">20代</option>
              <option value="30代">30代</option>
              <option value="40代">40代</option>
              <option value="50代">50代</option>
              <option value="60代以上">60代以上</option>
            </select>
          </div>

          {/* 扶養人数 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              扶養人数
            </label>
            <p className="text-sm text-gray-600 mb-2">
              扶養している家族の人数を入力してください
            </p>
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-base pr-12"
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                人
              </span>
            </div>
          </div>

          {/* 計算ボタン */}
          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] mt-6"
          >
            計算する
          </button>
        </div>

        {/* 計算結果 */}
        {results.salary && results.withSideBusiness && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">計算結果</h2>

            {/* 給与額 */}
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">給与額</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(parseFloat(salary) * 10000)}万円
                </span>
              </div>
            </div>

            {/* 社会保険 */}
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">社会保険</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(results.withSideBusiness.socialInsurance)}万円
                </span>
              </div>
            </div>

            {/* 所得 */}
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">所得</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(results.withSideBusiness.totalIncome)}万円
                </span>
              </div>
            </div>

            {/* 雑所得ケース */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">雑所得ケース</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">所得税</span>
                  <span className="text-gray-900 font-semibold">
                    {formatYen(results.withSideBusiness.incomeTax)}万円
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">住民税</span>
                  <span className="text-gray-900 font-semibold">
                    {formatYen(results.withSideBusiness.residentTax)}万円
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-semibold">可処分所得</span>
                  <span className="text-gray-900 font-semibold">
                    {formatYen(results.withSideBusiness.takeHome)}万円
                  </span>
                </div>
              </div>
            </div>

            {/* 青色申告ケース（黄色背景で強調） */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-3">青色申告ケース（65万円控除）</h3>
              <p className="text-sm text-gray-600 mb-3">
                青色申告をすると65万円の控除が受けられます
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">控除額</span>
                  <span className="text-gray-900 font-semibold">65万円</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-yellow-200">
                  <span className="text-gray-700 font-semibold">節税効果</span>
                  <span className="text-gray-900 font-semibold">
                    約{formatYen(650000 * 0.33)}万円
                  </span>
                </div>
              </div>
            </div>

            {/* 可処分所得の差 */}
            <div className="py-2 border-b border-gray-200 mt-4">
              <div className="flex justify-between">
                <span className="text-gray-700">可処分所得の差（年間）</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(difference)}万円
                </span>
              </div>
            </div>
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">可処分所得の差（月額）</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(difference / 12)}万円
                </span>
              </div>
            </div>

            {/* 確定申告の注意 */}
            <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-2">確定申告の注意</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 副業収入が20万円を超える場合は確定申告が必要です</li>
                <li>• 青色申告をすると65万円の控除が受けられます</li>
                <li>• 経費をきちんと記録しておくことが重要です</li>
                <li>• 税理士に相談することをおすすめします</li>
              </ul>
            </div>

            {/* A8.net 副業検討者向け広告 */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              {/* 左 */}
              <div
                dangerouslySetInnerHTML={{
                  __html: `
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVDG5+A1ZKKY+4LJQ+5Z6WX" target="_blank" rel="nofollow noopener noreferrer">
          <img border="0" width="300" height="250" alt="" src="https://www25.a8.net/svt/bgt?aid=260124629608&wid=001&eno=01&mid=s00000021455001004000&mc=1">
        </a>
        <img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4AVDG5+A1ZKKY+4LJQ+5Z6WX" alt="">
      `,
                }}
              />

              {/* 右 */}
              <div
                dangerouslySetInnerHTML={{
                  __html: `
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVDG5+A36FSI+4N6C+631SX" target="_blank" rel="nofollow noopener noreferrer">
          <img border="0" width="300" height="250" alt="" src="https://www25.a8.net/svt/bgt?aid=260124629610&wid=001&eno=01&mid=s00000021666001022000&mc=1">
        </a>
        <img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4AVDG5+A36FSI+4N6C+631SX" alt="">
      `,
                }}
              />
            </div>
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
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-2xl p-6 mt-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📈 あなたの年収レベル
              </h3>
              <div className="text-3xl font-black text-orange-600 mb-4">
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
        {results.salary && results.withSideBusiness && (
          <div className="bg-white border-2 border-yellow-200 rounded-2xl p-6 mt-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">💡 今すぐ行動すべき理由</h3>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-3">
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
            
            <p className="text-center font-bold text-lg mt-4 text-orange-600">
              👉 無料相談は今すぐ！
            </p>
          </div>
        )}

        {/* アフィリエイトバナーセクション */}
        {results.salary && results.withSideBusiness && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🎯 副業を効率化する
            </h3>

            {/* バナー1: freee */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 mb-4 shadow-lg">
              <div className="text-lg font-bold text-gray-900 mb-2">
                📊 freee
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>✓ クラウド会計ソフト</div>
                <div>✓ 確定申告が簡単</div>
                <div>✓ 初年度無料プランあり</div>
              </div>
              <a
                href="#"
                className="block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg w-full mt-4 text-center transition-all hover:shadow-xl hover:scale-[1.01]"
              >
                無料で始める &gt;
              </a>
            </div>

            {/* バナー2: マネーフォワード */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 mb-4">
              <div className="text-lg font-bold text-gray-900 mb-2">
                📊 マネーフォワード
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>✓ 自動で経費を認識</div>
                <div>✓ 確定申告まで完結</div>
                <div>✓ 月額980円から</div>
              </div>
              <a
                href="#"
                className="block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg w-full mt-4 text-center transition-colors"
              >
                詳しく見る &gt;
              </a>
            </div>

            {/* バナー3: 税理士ドットコム */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-6">
              <div className="text-lg font-bold text-gray-900 mb-2">
                💼 税理士ドットコム
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>✓ 税理士を無料で紹介</div>
                <div>✓ 確定申告の相談が可能</div>
                <div>✓ 完全無料</div>
              </div>
              <a
                href="#"
                className="block bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-lg w-full mt-4 text-center transition-colors"
              >
                無料で相談する &gt;
              </a>
            </div>
          </div>
        )}

        {/* CTAボタン */}
        {results.salary && results.withSideBusiness && (
          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-full mt-8">
            副業の始め方を相談する
          </button>
        )}
      </div>
    </div>
  );
}
