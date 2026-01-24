'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { calculateTakeHome } from '../../lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '../../lib/ageIncomeData';

export default function HomeClient() {
  const [annualSalary, setAnnualSalary] = useState('');
  const [dependents, setDependents] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');
  const [results, setResults] = useState<ReturnType<typeof calculateTakeHome> | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [percentileData, setPercentileData] = useState<{
    percentile: number;
    averageDiff: number;
    message: string;
  } | null>(null);

  const calculatePercentile = (income: number, age: AgeGroup) => {
    const incomeManEn = income / 10000; // 万円に変換
    const percentiles = percentileByAge[age];
    const average = averageIncomeByAge[age];
    
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
    
    return { percentile, averageDiff, message };
  };

  const handleCalculate = () => {
    const salaryValue = parseFloat(annualSalary);
    const dependentsValue = parseInt(dependents) || 0;

    if (salaryValue) {
      const yearlyIncome = salaryValue * 10000;
      const calculated = calculateTakeHome(yearlyIncome, dependentsValue);
      const pData = calculatePercentile(yearlyIncome, ageGroup);
      setResults(calculated);
      setPercentileData(pData);
      setShowResults(true);
    }
  };

  const formatYen = (value: number): string => {
    return (value / 10000).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-[#FFFEF9] px-4 pt-6 pb-10 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        {/* セクション1: ヒーローエリア */}
        <section className="mb-12">
          {/* 見出し - 中央揃え */}
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
              手取り計算ツール
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              年収から手取り額を自動計算
            </p>
          </div>

          {/* テドリさんとテキスト - 横並び（全デバイス共通） */}
          <div className="flex items-center gap-4 mb-8 px-4 md:px-0">
            {/* テドリさん画像 - 全デバイスで120x120 */}
            <div className="flex-shrink-0">
              <Image
                src="/images/tedori.png"
                alt="テドリさん - 手取り計算をサポートする秘書キャラクター"
                width={120}
                height={120}
                className="drop-shadow-lg"
                priority
              />
            </div>

            {/* テキスト - 全デバイスで左寄せ */}
            <div className="text-left flex-1">
              <p className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">
                テドリさんがあなたの手取り額を計算します
              </p>
              <p className="text-sm md:text-base text-gray-700">
                年収・扶養人数を入力するだけで、所得税・住民税・社会保険料を自動計算
              </p>
            </div>
          </div>

          {/* 信頼性バッジ */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 text-sm text-gray-600 mt-2">
            <span className="text-orange-600 font-medium">📊 2025年度の税率で算出</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="text-green-600 font-medium">✅ 個人情報不要・完全無料</span>
          </div>
        </section>

        {/* セクション2: 簡単計算（メイン機能） */}
        <div className="bg-white border-2 border-yellow-200 rounded-2xl shadow-lg p-4 md:p-8">
          <h2 className="text-xl md:text-3xl font-bold text-center text-gray-900 mb-4 md:mb-8">
            🎯 まずは簡単計算
          </h2>

          <div className="max-w-md mx-auto space-y-4 md:space-y-6">
            {/* 年収入力 */}
            <div>
              <label className="block font-semibold text-gray-900 text-base mb-1.5 md:mb-2">
                あなたの年収
              </label>
              <p className="text-sm text-gray-600 mb-2 hidden md:block">
                額面の年収を入力してください
              </p>
              <div className="relative">
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-base pr-12"
                  placeholder="400"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                  万円
                </span>
              </div>
            </div>

            {/* 年代選択 */}
            <div>
              <label className="block font-semibold text-gray-900 text-base mb-1.5 md:mb-2">
                あなたの年代
              </label>
              <p className="text-sm text-gray-600 mb-2 hidden md:block">
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

            {/* 扶養人数入力 */}
            <div>
              <label className="block font-semibold text-gray-900 text-base mb-1.5 md:mb-2">
                扶養している家族の人数
              </label>
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
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.01]"
            >
              すぐ計算する
            </button>

            {/* 結果表示エリア */}
            {showResults && results && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 shadow-lg animate-fade-in">
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600 mb-2">
                    {formatYen(results.takeHome)}万円
                  </div>
                  <div className="text-xl text-gray-700">
                    手取り月額: {formatYen(results.monthlyTakeHome)}万円
                  </div>
                </div>
              </div>
            )}

            {/* パーセンタイル表示セクション */}
            {showResults && results && percentileData && (
              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">📈 あなたの年収レベル</h3>
                
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-2">日本の</p>
                  <p className="text-4xl font-black text-orange-600">上位 {percentileData.percentile}%</p>
                </div>
                
                <div className="mb-4">
                  <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${100 - percentileData.percentile}%` }}
                    />
                  </div>
                </div>
                
                <p className="text-center text-gray-700">
                  {percentileData.averageDiff > 0 
                    ? `${ageGroup}の平均より ${percentileData.averageDiff}万円 高い収入です`
                    : `${ageGroup}の平均より ${Math.abs(percentileData.averageDiff)}万円 低い収入です`
                  }
                </p>
                
                <p className="text-center text-sm text-gray-600 mt-2">
                  {percentileData.message}
                </p>

                {/* A8.net 転職広告 */}
                {percentileData.message.includes('転職で大きく収入を伸ばせる可能性があります。') && (
                  <div className="mt-6 flex justify-center">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVDG5+A1ZKKY+4LJQ+5Z6WX" rel="nofollow">
          <img border="0" width="300" height="250" alt="" src="https://www25.a8.net/svt/bgt?aid=260124629608&wid=001&eno=01&mid=s00000021455001004000&mc=1">
        </a>
        <img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4AVDG5+A1ZKKY+4LJQ+5Z6WX" alt="">
      `,
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 訴求テキストセクション */}
            {showResults && results && percentileData && (
              <div className="mt-6 bg-white border-2 border-gray-200 rounded-xl p-6">
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
            {showResults && results && percentileData && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">🎯 年収UPの第一歩</h3>
                
                {/* バナー1: リクルートエージェント */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6 mb-4">
                  <p className="text-lg font-bold mb-2">💼 リクルートエージェント</p>
                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <p>✓ 非公開求人10万件以上</p>
                    <p>✓ 年収交渉を徹底サポート</p>
                    <p>✓ 完全無料・登録3分</p>
                  </div>
                  <a 
                    href="#" 
                    className="block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg text-center transition-colors"
                  >
                    無料で求人を見る &gt;
                  </a>
                </div>
                
                {/* バナー2: ビズリーチ */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 mb-4 shadow-lg">
                  <p className="text-lg font-bold mb-1">💼 ビズリーチ</p>
                  <p className="text-sm text-gray-600 mb-2">ハイクラス転職</p>
                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <p>✓ 年収1000万円以上の求人多数</p>
                    <p>✓ 優良企業からスカウト</p>
                    <p>✓ 登録無料</p>
                  </div>
                  <a 
                    href="#" 
                    className="block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:scale-[1.01]"
                  >
                    無料登録する &gt;
                  </a>
                </div>
                
                {/* バナー3: doda */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
                  <p className="text-lg font-bold mb-2">💼 doda</p>
                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <p>✓ 求人数20万件以上</p>
                    <p>✓ 転職のプロが徹底サポート</p>
                    <p>✓ 書類・面接対策も万全</p>
                  </div>
                  <a 
                    href="#" 
                    className="block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg text-center transition-colors"
                  >
                    無料で相談する &gt;
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* セクション3: 詳細計算へのリンク */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            あなたに合った詳細計算ツールを選ぼう
          </h2>
          <p className="text-center text-gray-600 mb-8">
            目的に合わせた計算で、より正確な手取り額を知ることができます
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* カード1: 転職検討者向け */}
            <Link href="/job-change">
              <div className="bg-white border-2 border-yellow-200 hover:border-orange-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer h-full">
                <div className="text-4xl mb-4 text-center">💼</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                  転職を検討中
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  現在の年収と転職先の年収を比較。増加額が一目でわかります。
                </p>
              </div>
            </Link>

            {/* カード2: 新卒・就活生向け */}
            <Link href="/fresh-graduate">
              <div className="bg-white border-2 border-yellow-200 hover:border-orange-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer h-full">
                <div className="text-4xl mb-4 text-center">🎓</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                  就活中・新卒
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  内定先の年収から手取りを計算。生活費シミュレーション付き。
                </p>
              </div>
            </Link>

            {/* カード3: 副業検討者向け */}
            <Link href="/side-business">
              <div className="bg-white border-2 border-yellow-200 hover:border-orange-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer h-full">
                <div className="text-4xl mb-4 text-center">💰</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                  副業を検討中
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  本業と副業の合計から手取りを計算。確定申告の注意点もチェック。
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* 新規追加: その他の便利なツール */}
        <div className="mb-16 mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">その他の便利なツール</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* 年代・年収別 手取り一覧表 */}
            <Link
              href="/comparison/list"
              className="block bg-white border-2 border-yellow-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-xl transition-all"
            >
              <div className="flex items-start mb-3">
                <span className="text-3xl mr-3">📊</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    年代・年収別 手取り一覧表
                  </h3>
                  <p className="text-sm text-gray-600">
                    年収200万〜1000万円の手取り額を一覧で確認。年代別の平均年収もチェックできます。
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-orange-600 font-semibold text-sm">一覧表を見る →</span>
              </div>
            </Link>

            {/* よくある質問（FAQ） */}
            <Link
              href="/faq"
              className="block bg-white border-2 border-yellow-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-xl transition-all"
            >
              <div className="flex items-start mb-3">
                <span className="text-3xl mr-3">❓</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">よくある質問（FAQ）</h3>
                  <p className="text-sm text-gray-600">
                    手取り計算の疑問を解決。税金・社会保険・転職・副業に関する質問に回答します。
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-orange-600 font-semibold text-sm">FAQを見る →</span>
              </div>
            </Link>
          </div>
        </div>

        {/* A8.net 副業広告 */}
        <div className="mt-6 flex justify-center">
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVDG5+9RV7AQ+3SPO+CEKTFL" rel="nofollow">
          <img border="0" width="468" height="60" alt="" src="https://www21.a8.net/svt/bgt?aid=260124629591&wid=001&eno=01&mid=s00000017718075008000&mc=1">
        </a>
        <img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4AVDG5+9RV7AQ+3SPO+CEKTFL" alt="">
      `,
            }}
          />
        </div>

        {/* セクション4: 控除の説明 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            給与から引かれるものの割合（目安）
          </h2>

          <div className="space-y-4 max-w-2xl mx-auto">
            {/* 社会保険料 */}
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🏥</span>
                <h3 className="font-bold text-lg text-gray-900">
                  社会保険料
                </h3>
              </div>
              <p className="text-gray-700 mb-3 font-semibold">
                合計: 給与の約15%
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• 健康保険料（約5%）</div>
                <div>• 厚生年金保険料（約9%）</div>
                <div>• 雇用保険料（約0.6%）</div>
              </div>
            </div>

            {/* 税金 */}
            <div className="bg-yellow-100 p-4 rounded-2xl">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">💰</span>
                <h3 className="font-bold text-lg text-gray-900">
                  税金
                </h3>
              </div>
              <p className="text-gray-700 mb-3 font-semibold">
                合計: 給与の約5〜10%
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• 所得税（約2〜5%）</div>
                <div>• 住民税（約3〜7%）</div>
              </div>
            </div>
          </div>
        </div>

        {/* セクション5: 免責事項 */}
        <p className="text-xs text-gray-500 text-center mt-8">
          ※計算結果は概算値です。実際の手取り額は各種控除により変動する場合があります。
        </p>
      </div>

      {/* アニメーション用のCSS（グローバルスタイルに追加する場合は globals.css に移動） */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
