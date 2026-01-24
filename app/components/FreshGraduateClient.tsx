'use client';

import { useState } from 'react';
import { calculateTakeHome } from '../../lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '../../lib/ageIncomeData';
import Link from 'next/link';

export default function FreshGraduateClient() {
  const [salary, setSalary] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('20代');
  const [results, setResults] = useState<ReturnType<typeof calculateTakeHome> | null>(null);

  const handleCalculate = () => {
    const salaryValue = parseFloat(salary);
    if (salaryValue) {
      setResults(calculateTakeHome(salaryValue * 10000, 0));
    }
  };

  const formatYen = (value: number): string => {
    return (value / 10000).toFixed(1);
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

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          新卒・就活生向け 手取り計算
        </h1>

        {/* 入力フォーム */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* 内定先の年収 */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-900 text-base mb-2">
              内定先の年収
            </label>
            <p className="text-sm text-gray-600 mb-2">
              内定先から提示された年収を入力してください
            </p>
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-base pr-12"
                placeholder="300"
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

          {/* 計算ボタン */}
          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] mt-6"
          >
            計算する
          </button>
        </div>

        {/* 計算結果 */}
        {results && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">計算結果</h2>

            {/* 手取り */}
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">手取り（年間）</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(results.takeHome)}万円
                </span>
              </div>
            </div>
            <div className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">手取り（月額）</span>
                <span className="text-gray-900 font-semibold text-right">
                  {formatYen(results.monthlyTakeHome)}万円
                </span>
              </div>
            </div>

            {/* 生活費シミュレーション（黄色背景で強調） */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-3">生活費シミュレーション（一人暮らし）</h3>
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
                <div className="flex justify-between text-sm pt-2 border-t border-yellow-200">
                  <span className="text-gray-700 font-semibold">合計</span>
                  <span className="text-gray-900 font-semibold">{formatYen(totalExpenses)}万円</span>
                </div>
              </div>
            </div>

            {/* 月の余剰金 */}
            <div className="py-2 border-b border-gray-200 mt-4">
              <div className="flex justify-between">
                <span className="text-gray-700">月の余剰金</span>
                <span className={`font-semibold text-right ${surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatYen(surplus)}万円
                </span>
              </div>
            </div>

            {/* 一人暮らし可否判定 */}
            <div className="mt-4 p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">一人暮らし可否</span>
                <span className={`font-bold ${canLiveAlone ? 'text-green-600' : 'text-red-600'}`}>
                  {canLiveAlone ? '✓ 可能' : '✗ 難しい'}
                </span>
              </div>
            </div>

            {/* おすすめの使い道 */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">おすすめの使い道</h3>
              <ul className="space-y-2 text-sm text-gray-600">
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
        {results && (
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
            
            <p className="text-center font-bold text-lg mt-4 text-orange-600">
              👉 無料相談は今すぐ！
            </p>
          </div>
        )}

        {/* アフィリエイトバナーセクション */}
        {results && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🎯 新社会人の第一歩
            </h3>

            {/* バナー1: 楽天カード */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-xl p-6 mb-4">
              <div className="text-lg font-bold text-gray-900 mb-2">
                💳 楽天カード
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>✓ 年会費永久無料</div>
                <div>✓ 楽天ポイントが貯まる</div>
                <div>✓ 新社会人におすすめ</div>
              </div>
              <a
                href="#"
                className="block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg w-full mt-4 text-center transition-colors"
              >
                無料で申し込む &gt;
              </a>
            </div>

            {/* バナー2: 三井住友カード */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 mb-4 shadow-lg">
              <div className="text-lg font-bold text-gray-900 mb-2">
                💳 三井住友カード
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>✓ 年会費無料（条件あり）</div>
                <div>✓ 国際ブランド対応</div>
                <div>✓ 信頼性の高いカード</div>
              </div>
              <a
                href="#"
                className="block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg w-full mt-4 text-center transition-all hover:shadow-xl hover:scale-[1.01]"
              >
                詳しく見る &gt;
              </a>
            </div>

            {/* バナー3: OfferBox */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <div className="text-lg font-bold text-gray-900 mb-2">
                🎓 OfferBox
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>✓ 就活エージェント</div>
                <div>✓ 内定獲得まで徹底サポート</div>
                <div>✓ 完全無料</div>
              </div>
              <a
                href="#"
                className="block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg w-full mt-4 text-center transition-colors"
              >
                無料で登録する &gt;
              </a>
            </div>
          </div>
        )}

        {/* CTAボタン */}
        {results && (
          <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-full mt-8 transition-all hover:shadow-xl hover:scale-[1.01]">
            就活エージェントに相談する
          </button>
        )}
      </div>
    </div>
  );
}
