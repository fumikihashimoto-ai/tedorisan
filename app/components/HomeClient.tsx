'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { calculateTakeHome } from '../../lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '../../lib/ageIncomeData';
import PcAdSidebar from './PcAdSidebar';
import { Card, H2, InputField, PrimaryButton, ResultAmount, ResultRow } from './ui';
import CustomSelect, { type CustomSelectOption } from './CustomSelect';
import RakutenWidgetAd from './RakutenWidgetAd';

const AGE_OPTIONS: CustomSelectOption[] = [
  { value: '20代', label: '20代' },
  { value: '30代', label: '30代' },
  { value: '40代', label: '40代' },
  { value: '50代', label: '50代' },
  { value: '60代以上', label: '60代以上' },
];

export default function HomeClient() {
  const [annualSalary, setAnnualSalary] = useState('');
  const [dependents, setDependents] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('30代');
  const [results, setResults] = useState<ReturnType<typeof calculateTakeHome> | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
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

      // 結果表示後にスクロール
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const formatYen = (value: number): string => {
    return (value / 10000).toFixed(1);
  };

  const formatJPY = (value: number): string => {
    return Math.round(value).toLocaleString('ja-JP');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] container-main">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-start md:gap-8">
          <div className="space-y-8 md:space-y-12 md:max-w-[800px] md:w-full">
            {/* セクション1: ヒーローエリア */}
            <section className="mb-12">
              <nav className="breadcrumb">
                <Link href="/">ホーム</Link> {'>'} 手取り計算
              </nav>

              {/* 見出し */}
              <div>
                <h1 className="page-title">手取り計算ツール</h1>
              </div>

              {/* テドリさんとテキスト - 横並び（全デバイス共通） */}
              <div className="flex items-center gap-4 mt-6 mb-8">
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

              {/* 信頼性バッジ（削除） */}
            </section>

        {/* 計算フォーム */}
        <Card>
          <H2>🎯 まずは簡単計算</H2>

          <div className="space-y-4 md:space-y-6">
            {/* 年収入力 */}
            <div>
              <label className="block font-semibold text-gray-900 text-base mb-1.5 md:mb-2">
                あなたの年収
              </label>
              <p className="text-sm text-gray-600 mb-2 hidden md:block">
                額面の年収を入力してください
              </p>
              <div className="relative">
                <InputField
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(e.target.value)}
                  className="pr-12"
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
              <CustomSelect
                options={AGE_OPTIONS}
                value={ageGroup}
                onChange={(v) => setAgeGroup(v as AgeGroup)}
                placeholder="年代を選択"
              />
            </div>

            {/* 扶養人数入力 */}
            <div>
              <label className="block font-semibold text-gray-900 text-base mb-1.5 md:mb-2">
                扶養している家族の人数
              </label>
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
            <PrimaryButton onClick={handleCalculate}>すぐ計算する</PrimaryButton>
          </div>
        </Card>

        {/* 計算結果（別ブロック） */}
        {showResults && results && (
          <Card id="results" className="section-gap animate-fade-in">
            {/* 結果ヘッダー */}
            <div className="text-center">
              <div className="text-gray-600">あなたの年間手取り額は…</div>
              <ResultAmount>
                約 {formatYen(results.takeHome)}
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
              <div className="mt-4 space-y-0">
                {(() => {
                  const annualSalaryYen = Math.round((parseFloat(annualSalary) || 0) * 10000);
                  const incomeTax = results.breakdown?.incomeTax ?? 0;
                  const residentTax = results.breakdown?.residentTax ?? 0;
                  const socialInsurance = results.breakdown?.socialInsurance ?? 0;
                  const deductionTotal = incomeTax + residentTax + socialInsurance;

                  return (
                    <>
                      <ResultRow
                        label="年収（額面）"
                        value={
                          <>
                            {formatJPY(annualSalaryYen)}
                            <span className="ml-1 font-normal">円</span>
                          </>
                        }
                        valueClassName="text-right"
                      />

                      <ResultRow
                        label="所得税"
                        value={
                          <>
                            - {formatJPY(incomeTax)}
                            <span className="ml-1 font-normal">円</span>
                          </>
                        }
                        valueClassName="text-right"
                      />

                      <ResultRow
                        label="住民税"
                        value={
                          <>
                            - {formatJPY(residentTax)}
                            <span className="ml-1 font-normal">円</span>
                          </>
                        }
                        valueClassName="text-right"
                      />

                      <ResultRow
                        label="社会保険料"
                        value={
                          <>
                            - {formatJPY(socialInsurance)}
                            <span className="ml-1 font-normal">円</span>
                          </>
                        }
                        valueClassName="text-right"
                      />

                      <ResultRow
                        label="控除合計額"
                        value={
                          <>
                            - {formatJPY(deductionTotal)}
                            <span className="ml-1 font-normal">円</span>
                          </>
                        }
                        className="font-bold border-t-2 border-[#e0e0e0]"
                        valueClassName="text-right"
                      />
                    </>
                  );
                })()}
              </div>
            )}
          </Card>
        )}

        {/* 計算後に表示される広告（スマホのみ） */}
        {showResults && results && (
          <div className="md:hidden flex justify-center">
            <RakutenWidgetAd />
          </div>
        )}

        {/* 📈 あなたの年収レベル（独立ブロック） */}
        {showResults && results && percentileData && (
          <Card className="section-gap">
            <h3 className="text-xl font-bold mb-4">📈 あなたの年収レベル</h3>

            <div className="text-left mb-4">
              <p className="text-sm text-gray-600 mb-2">日本の</p>
              <p className="text-4xl font-black text-[#0a57d1]">上位 {percentileData.percentile}%</p>
            </div>

            <div className="mb-4">
              <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-[#0a57d1] h-full rounded-full transition-all duration-500"
                  style={{ width: `${100 - percentileData.percentile}%` }}
                />
              </div>
            </div>

            <p className="text-left text-gray-700">
              {percentileData.averageDiff > 0
                ? `${ageGroup}の平均より ${percentileData.averageDiff}万円 高い収入です`
                : `${ageGroup}の平均より ${Math.abs(percentileData.averageDiff)}万円 低い収入です`}
            </p>

            <p className="text-left text-sm text-gray-600 mt-2">{percentileData.message}</p>
          </Card>
        )}

        {/* 💡 今すぐ行動すべき理由（独立ブロック） */}
        {showResults && results && percentileData && (
          <Card className="section-gap">
            <h3 className="text-xl font-bold mb-4">💡 今すぐ行動すべき理由</h3>

            <div className="bg-white border-l-4 border-[#e0e0e0] p-4 mb-3">
              <p className="font-bold mb-2">⏰ 転職市場は今がチャンス</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 求人倍率: 1.5倍（過去最高水準）</li>
                <li>• 人手不足で企業が高待遇提示</li>
                <li>• 2025年は転職好機</li>
              </ul>
            </div>

            <div className="bg-white border-l-4 border-[#e0e0e0] p-4 mb-3">
              <p className="font-bold mb-2">💰 1年遅れると...</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 年収UP機会を逃す: -100万円/年</li>
                <li>• 生涯年収の損失: -1000万円以上</li>
                <li>• スキルアップの機会も逃す</li>
              </ul>
            </div>

            <div className="bg-white border-l-4 border-[#e0e0e0] p-4">
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
                  <li className="font-bold text-green-700">• 20代: +80万円 ← あなたの年代</li>
                )}
                {ageGroup === '60代以上' && (
                  <li className="font-bold text-green-700">• 60代以上: +80万円 ← あなたの年代</li>
                )}
              </ul>
            </div>

            {/* 💡 今すぐ行動すべき理由の下部に広告（スマホのみ） */}
            <div className="md:hidden mt-6 flex justify-center">
              <RakutenWidgetAd />
            </div>
          </Card>
        )}

        {/* セクション3: 詳細計算へのリンク */}
        <div>
          <H2>あなたに合った詳細計算ツールを選ぼう</H2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* カード1: 転職検討者向け */}
            <Link href="/job-change" className="block h-full">
              <Card
                as="div"
                className="transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer h-full"
              >
                <div className="text-4xl mb-4 text-center">💼</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                  転職を検討中
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  現在の年収と転職先の年収を比較。増加額が一目でわかります。
                </p>
              </Card>
            </Link>

            {/* カード2: 新卒・就活生向け */}
            <Link href="/fresh-graduate" className="block h-full">
              <Card
                as="div"
                className="transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer h-full"
              >
                <div className="text-4xl mb-4 text-center">🎓</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                  就活中・新卒
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  内定先の年収から手取りを計算。生活費シミュレーション付き。
                </p>
              </Card>
            </Link>

            {/* カード3: 副業検討者向け */}
            <Link href="/side-business" className="block h-full">
              <Card
                as="div"
                className="transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer h-full"
              >
                <div className="text-4xl mb-4 text-center">💰</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                  副業を検討中
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  本業と副業の合計から手取りを計算。確定申告の注意点もチェック。
                </p>
              </Card>
            </Link>
          </div>
        </div>

        {/* 新規追加: その他の便利なツール */}
        <div className="mb-16 mt-16">
          <H2>その他の便利なツール</H2>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* 年代・年収別 手取り一覧表 */}
            <Link href="/comparison/list" className="block">
              <Card as="div" className="hover:shadow-xl transition-all">
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
                  <span className="text-[#0a57d1] font-semibold text-sm">一覧表を見る →</span>
                </div>
              </Card>
            </Link>

            {/* よくある質問（FAQ） */}
            <Link href="/faq" className="block">
              <Card as="div" className="hover:shadow-xl transition-all">
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
                  <span className="text-[#0a57d1] font-semibold text-sm">FAQを見る →</span>
                </div>
              </Card>
            </Link>
          </div>
        </div>

          </div>

          <PcAdSidebar />
        </div>
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
