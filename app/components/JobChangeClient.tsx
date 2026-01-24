'use client';

import { useState } from 'react';
import { calculateTakeHome } from '../../lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '../../lib/ageIncomeData';
import Link from 'next/link';

export default function JobChangeClient() {
  const [currentSalary, setCurrentSalary] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [dependents, setDependents] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');
  const [results, setResults] = useState<{
    current: ReturnType<typeof calculateTakeHome> | null;
    new: ReturnType<typeof calculateTakeHome> | null;
  }>({ current: null, new: null });

  const handleCalculate = () => {
    const current = parseFloat(currentSalary);
    const newSalaryValue = parseFloat(newSalary);
    const dependentsValue = parseInt(dependents) || 0;

    if (current && newSalaryValue) {
      setResults({
        current: calculateTakeHome(current * 10000, dependentsValue),
        new: calculateTakeHome(newSalaryValue * 10000, dependentsValue),
      });
    }
  };

  const formatYen = (value: number): string => {
    return (value / 10000).toFixed(1);
  };

  const increase = results.current && results.new
    ? results.new.takeHome - results.current.takeHome
    : 0;
  const monthlyIncrease = increase / 12;

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          転職検討者向け 手取り計算
        </h1>

        {/* 入力フォーム */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* 現在の年収 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              現在の年収
            </label>
            <p className="text-sm text-gray-600 mb-2">
              現在の年収を入力してください
            </p>
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-base pr-12"
                placeholder="400"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                万円
              </span>
            </div>
          </div>

          {/* 転職先の年収 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              転職先の年収
            </label>
            <p className="text-sm text-gray-600 mb-2">
              転職先の年収を入力してください
            </p>
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-base pr-12"
                placeholder="500"
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
            className="w-full bg-[#ff4f42] hover:bg-[#e5463b] text-white font-semibold py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] mt-6"
          >
            計算する
          </button>
        </div>

        {/* 計算結果 */}
        {results.current && results.new && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">計算結果</h2>

            {/* 現在の手取り */}
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">現在の手取り（年間）</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(results.current.takeHome)}万円
                </span>
              </div>
            </div>
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">現在の手取り（月額）</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(results.current.monthlyTakeHome)}万円
                </span>
              </div>
            </div>

            {/* 転職後の手取り */}
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">転職後の手取り（年間）</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(results.new.takeHome)}万円
                </span>
              </div>
            </div>
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">転職後の手取り（月額）</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(results.new.monthlyTakeHome)}万円
                </span>
              </div>
            </div>

            {/* 増加額（黄色背景で強調） */}
            <div className="bg-white border border-[#e0e0e0] rounded-lg p-4 mt-4">
              <div className="py-2 border-b border-[#e0e0e0]">
                <div className="flex justify-between">
                  <span className="text-gray-700">増加額（年間）</span>
                  <span className="text-gray-900 font-semibold text-right">
                    {formatYen(increase)}万円
                  </span>
                </div>
              </div>
              <div className="py-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">増加額（月額）</span>
                  <span className="text-gray-900 font-semibold text-right">
                    {formatYen(monthlyIncrease)}万円
                  </span>
                </div>
              </div>
            </div>

            {/* できることリスト */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">この増加額でできること</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {monthlyIncrease >= 5 && (
                  <li>• 毎月5万円の投資信託を始められる</li>
                )}
                {monthlyIncrease >= 3 && (
                  <li>• 月3万円の習い事や自己投資ができる</li>
                )}
                {monthlyIncrease >= 2 && (
                  <li>• 月2万円の外食やレジャー費に回せる</li>
                )}
                {monthlyIncrease >= 1 && (
                  <li>• 月1万円の貯蓄が増える</li>
                )}
                {monthlyIncrease < 1 && (
                  <li>• 少しずつでも生活の余裕が生まれる</li>
                )}
              </ul>
            </div>

            {/* A8.net 転職検討者向け広告 */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              {/* 左 */}
              <div
                dangerouslySetInnerHTML={{
                  __html: `
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVDG5+9RV7AQ+3SPO+CEKE01" target="_blank" rel="nofollow noopener noreferrer">
          <img border="0" width="300" height="250" alt="" src="https://www24.a8.net/svt/bgt?aid=260124629591&wid=001&eno=01&mid=s00000017718075006000&mc=1">
        </a>
        <img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4AVDG5+9RV7AQ+3SPO+CEKE01" alt="">
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
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-2xl p-6 mt-6 shadow-lg">
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
              <div className="text-gray-700 mt-2">{message}</div>
            </div>
          );
        })()}

        {/* 訴求テキストセクション */}
        {results.current && results.new && (
          <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 mt-6 shadow-lg">
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
            
            <p className="text-center font-bold text-lg mt-4 text-[#0a57d1]">
              👉 無料相談は今すぐ！
            </p>
          </div>
        )}

        {/* アフィリエイトバナーセクション */}
        {results.current && results.new && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🎯 年収UPの第一歩
            </h3>

            {/* バナー1: リクルートエージェント */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6 mb-4">
              <div className="text-lg font-bold text-gray-900 mb-2">
                💼 リクルートエージェント
              </div>
              <div className="text-sm text-gray-700 mt-2 space-y-1">
                <div>✓ 非公開求人10万件以上</div>
                <div>✓ 年収交渉を徹底サポート</div>
                <div>✓ 完全無料・登録3分</div>
              </div>
              <a
                href="#"
                className="block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg w-full mt-4 text-center transition-colors"
              >
                無料で求人を見る &gt;
              </a>
            </div>

            {/* バナー2: ビズリーチ */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 mb-4 shadow-lg">
              <div className="text-lg font-bold text-gray-900 mb-1">
                💼 ビズリーチ
              </div>
              <div className="text-sm text-gray-600 mb-2">ハイクラス転職</div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>✓ 年収1000万円以上の求人多数</div>
                <div>✓ 優良企業からスカウト</div>
                <div>✓ 登録無料</div>
              </div>
              <a
                href="#"
                className="block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg w-full mt-4 text-center transition-all hover:shadow-xl hover:scale-[1.01]"
              >
                無料登録する &gt;
              </a>
            </div>

            {/* バナー3: doda */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <div className="text-lg font-bold text-gray-900 mb-2">
                💼 doda
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>✓ 求人数20万件以上</div>
                <div>✓ 転職のプロが徹底サポート</div>
                <div>✓ 書類・面接対策も万全</div>
              </div>
              <a
                href="#"
                className="block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg w-full mt-4 text-center transition-colors"
              >
                無料で相談する &gt;
              </a>
            </div>
          </div>
        )}

        {/* CTAボタン */}
        {results.current && results.new && (
          <button className="w-full bg-[#ff4f42] hover:bg-[#e5463b] text-white font-bold py-4 rounded-full mt-8 transition-all hover:shadow-xl hover:scale-[1.01]">
            転職エージェントに相談する
          </button>
        )}
      </div>
    </div>
  );
}
