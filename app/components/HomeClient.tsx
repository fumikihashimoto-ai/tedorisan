'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateTakeHome } from '../../lib/salaryCalculator';
import { averageIncomeByAge, percentileByAge, type AgeGroup } from '../../lib/ageIncomeData';
import { Card, H2, InputField, PrimaryButton, ResultAmount, ResultRow } from './ui';
import CustomSelect, { type CustomSelectOption } from './CustomSelect';
import RakutenWidgetAd from './RakutenWidgetAd';
import SalaryAssessmentCta from './SalaryAssessmentCta';
import CtaSection from './CtaSection';

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
    <div className="container-main pb-20">
      <div className="space-y-8 md:space-y-12">
        {/* リード文セクション */}
        <section className="py-8 mb-8">
          <p className="text-base leading-[1.8] text-gray-700 mb-8">
            「年収は高いはずなのに、手取りが少ないのはなぜ？」その疑問、この記事で解決します。あなたの年収から手取り額がいくらになるか、シミュレーションで最速チェック。額面と手取りの違いから、社会保険料（健康保険、厚生年金など）や税金（所得税、住民税など）がどのように差し引かれるのかを初心者にも分かりやすく徹底解説します。年収300万円から700万円の具体的なシミュレーション例で仕組みを理解し、さらに手取り額を増やすための具体的な方法までご紹介。この記事を読めば、手取りの全貌が明らかになり、賢い家計管理の第一歩を踏み出せます。
          </p>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">今すぐ手取り額を計算したい方はこちら</p>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-[length:var(--font-size-button-mobile)] sm:text-[length:var(--font-size-button)] hover:bg-blue-700 transition-colors"
            >
              ▼ 手取り計算シミュレーションを使う
            </a>
          </div>
        </section>

        {/* セクション1 */}
        <section id="section-1" className="py-6 mb-8 scroll-mt-6">
          <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            1. 年収の手取り額を最速で知りたいあなたへ
          </h2>
          <p className="text-base leading-[1.8] mb-4">
            会社から提示される年収の金額を見て、「実際にはどれくらい手元に残るのだろう？」と疑問に感じたことはありませんか？提示された年収（額面）と、実際に銀行口座に振り込まれる金額（手取り額）には、意外と大きな差があります。
          </p>
          <p className="text-base leading-[1.8] mb-4">
            この<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">「手取り額」は、税金や社会保険料が差し引かれた後の、あなたが自由に使えるお金</mark></strong>を指します。日々の生活費や貯蓄、将来設計を考える上で、この手取り額を正確に把握することは非常に重要です。
          </p>
          <p className="text-base leading-[1.8] mb-4">
            「自分の年収だと、毎月いくら使えるのか知りたい」<br />
            「転職を検討中で、新しい会社の年収で手取りがどう変わるか知りたい」
          </p>
          <p className="text-base leading-[1.8]">
            このような疑問を持つ方は多いでしょう。本記事は、そうしたあなたの疑問を解消し、年収の手取り額の計算方法や仕組みを、初心者の方にも分かりやすく解説することを目的としています。
          </p>
        </section>

        {/* セクション2 */}
        <section id="section-2" className="py-6 mb-8 scroll-mt-6">
          <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            2. 年収の手取り計算とは？額面と手取りの違いを理解しよう
          </h2>
          <p className="text-base leading-[1.8] mb-4">
            「年収」という言葉はよく耳にしますが、実際に手元に残る金額、つまり<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">「手取り額」は、年収そのままではありません</mark></strong>。年収の手取り計算を理解することは、自身の家計を管理し、将来のライフプランを立てる上で非常に重要です。
          </p>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">年収の額面とは？</h3>
          <p className="text-base leading-[1.8] mb-4">
            年収の<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">「額面」とは、会社から支払われる給与や賞与など、税金や社会保険料が差し引かれる前の総支給額</mark></strong>を指します。一般的に「年収〇〇万円」という場合、この額面年収を指すことがほとんどです。
          </p>
          <p className="text-base leading-[1.8] mb-4">額面年収には、主に以下の項目が含まれます。</p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-base leading-[1.8]">
            <li><strong>基本給：</strong>毎月固定で支払われる賃金です。</li>
            <li><strong>各種手当：</strong>通勤手当、残業手当、役職手当、住宅手当など、会社によって様々な手当があります。</li>
            <li><strong>賞与（ボーナス）：</strong>年に数回支給される特別な給与です。</li>
          </ul>
          <p className="text-base leading-[1.8] mb-4">これらの合計が、あなたの年収の「額面」となります。給与明細では、「総支給額」として記載されている部分がこれに該当します。</p>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">手取り額とは？何が差し引かれるのか</h3>
          <p className="text-base leading-[1.8] mb-4">
            一方、<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">「手取り額」とは、額面年収から社会保険料や税金などが差し引かれた後、実際にあなたの銀行口座に振り込まれる金額</mark></strong>のことです。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-5 text-sm sm:text-base leading-[1.5]">
              <thead>
                <tr>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">控除の種類</th>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">概要</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100 font-bold text-blue-700">社会保険料</td>
                  <td className="p-3 border-b border-gray-100">健康保険料、厚生年金保険料、雇用保険料、介護保険料（40歳以上）の総称です。病気や怪我、老後の生活、失業時などに備えるための公的な保険制度の費用です。</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100 font-bold text-blue-700">税金</td>
                  <td className="p-3 border-b border-gray-100">主に所得税と住民税があります。所得税は国に納める税金、住民税は居住する都道府県と市区町村に納める税金です。</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100 font-bold text-blue-700">その他</td>
                  <td className="p-3 border-b border-gray-100">会社によっては、財形貯蓄や社員持株会費、社内預金、労働組合費などが給与から天引きされる場合もあります。</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-base leading-[1.8]">
            これらの控除項目は、法律によって定められており、原則としてすべての人に適用されます。特に社会保険料と税金は、年収が高くなるほどその負担も大きくなる傾向があります。<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">手取り額を正確に把握することは、毎月の生活費や貯蓄計画を立てる上で不可欠</mark></strong>です。
          </p>
        </section>

        {/* セクション3 */}
        <section id="section-3" className="py-6 mb-8 scroll-mt-6">
          <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            3. 年収から差し引かれる社会保険料の種類と計算方法
          </h2>
          <p className="text-base leading-[1.8] mb-4">
            年収から手取り額を計算する上で、まず理解しておくべきなのが社会保険料です。社会保険料は、病気や怪我、失業、老後の生活など、私たちの生活に起こりうる様々なリスクに備えるための重要な費用であり、<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">額面給与から差し引かれることで、手取り額が決定されます</mark></strong>。
          </p>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">健康保険料</h3>
          <p className="text-base leading-[1.8] mb-4">
            健康保険料は、病気や怪我で医療機関を受診した際の医療費負担を軽減するための保険料です。<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">標準報酬月額に健康保険料率を乗じて計算されます</mark></strong>。この健康保険料は、<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">原則として事業主と従業員が折半して負担します</mark></strong>。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-5 text-sm sm:text-base leading-[1.5]">
              <thead>
                <tr>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">概要</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">目的</td>
                  <td className="p-3 border-b border-gray-100">医療費負担の軽減</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">計算方法</td>
                  <td className="p-3 border-b border-gray-100">標準報酬月額 × 健康保険料率</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">料率</td>
                  <td className="p-3 border-b border-gray-100">協会けんぽ：都道府県ごとに異なる / 健康保険組合：組合ごとに異なる</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">負担割合</td>
                  <td className="p-3 border-b border-gray-100">原則として事業主と従業員で折半</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">厚生年金保険料</h3>
          <p className="text-base leading-[1.8] mb-4">
            厚生年金保険料は、老後の生活を支える年金制度の費用となる保険料です。<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">標準報酬月額に厚生年金保険料率を乗じて計算されます</mark></strong>。厚生年金保険料率は全国一律（2026年1月現在18.3%）で定められています。
          </p>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">雇用保険料</h3>
          <p className="text-base leading-[1.8] mb-4">
            雇用保険料は、失業した際の生活や再就職を支援するための保険料です。<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">毎月の給与総額（賞与を含む）に雇用保険料率を乗じて計算されます</mark></strong>。
          </p>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">介護保険料（該当者のみ）</h3>
          <p className="text-base leading-[1.8]">
            介護保険料は、<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">40歳以上の健康保険加入者に義務付けられており</mark></strong>、健康保険料と一体で徴収されます。
          </p>
        </section>

        {/* セクション4 */}
        <section id="section-4" className="py-6 mb-8 scroll-mt-6">
          <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            4. 年収から差し引かれる税金の種類と計算方法
          </h2>
          <p className="text-base leading-[1.8] mb-4">
            年収から手取り額を計算する上で、社会保険料と並んで大きな割合を占めるのが税金です。ここでは、給与所得者が主に負担する<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">所得税と住民税</mark></strong>、そして<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">税額を軽減するための控除</mark></strong>について詳しく解説します。
          </p>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">所得税</h3>
          <p className="text-base leading-[1.8] mb-4">
            所得税は、<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">個人の所得に対して国が課す税金</mark></strong>です。日本の所得税は、所得が多いほど税率が高くなる「累進課税制度」を採用しています。
          </p>
          <h4 className="text-[length:var(--font-size-h4-mobile)] sm:text-[length:var(--font-size-h4)] font-bold text-gray-800 mt-5 mb-2 leading-tight">所得税の計算方法</h4>
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-base leading-[1.8]">
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">所得金額の算出</mark></strong>：年収から給与所得控除を差し引いたものが給与所得金額です。</li>
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">課税所得の算出</mark></strong>：給与所得金額から、社会保険料控除、基礎控除、扶養控除などの所得控除を差し引いたものが課税所得金額です。</li>
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">所得税額の算出</mark></strong>：課税所得金額に、国税庁が定める所得税の税率を掛け、そこから控除額を差し引くと所得税額が算出されます。</li>
          </ol>
          <p className="text-base leading-[1.8] mb-4">所得税の税率は、課税所得に応じて5%から45%まで段階的に設定されています。</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-5 text-sm sm:text-base leading-[1.5]">
              <thead>
                <tr>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">課税される所得金額</th>
                  <th className="bg-gray-50 text-gray-700 p-3 text-center font-semibold border-b border-gray-100">税率</th>
                  <th className="bg-gray-50 text-gray-700 p-3 text-right font-semibold border-b border-gray-100">控除額</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">1,000円 〜 1,949,000円</td>
                  <td className="p-3 border-b border-gray-100 text-center">5%</td>
                  <td className="p-3 border-b border-gray-100 text-right">0円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">1,950,000円 〜 3,299,000円</td>
                  <td className="p-3 border-b border-gray-100 text-center">10%</td>
                  <td className="p-3 border-b border-gray-100 text-right">97,500円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">3,300,000円 〜 6,949,000円</td>
                  <td className="p-3 border-b border-gray-100 text-center">20%</td>
                  <td className="p-3 border-b border-gray-100 text-right">427,500円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">6,950,000円 〜 8,999,000円</td>
                  <td className="p-3 border-b border-gray-100 text-center">23%</td>
                  <td className="p-3 border-b border-gray-100 text-right">636,000円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">9,000,000円 〜 17,999,000円</td>
                  <td className="p-3 border-b border-gray-100 text-center">33%</td>
                  <td className="p-3 border-b border-gray-100 text-right">1,536,000円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">18,000,000円 〜 39,999,000円</td>
                  <td className="p-3 border-b border-gray-100 text-center">40%</td>
                  <td className="p-3 border-b border-gray-100 text-right">2,796,000円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">40,000,000円以上</td>
                  <td className="p-3 border-b border-gray-100 text-center">45%</td>
                  <td className="p-3 border-b border-gray-100 text-right">4,796,000円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-[1.5] text-gray-500 mb-4">
            出典：<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2260.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">国税庁「所得税の速算表」</a>
          </p>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">住民税</h3>
          <p className="text-base leading-[1.8] mb-4">
            住民税は、<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">居住している都道府県と市区町村に納める地方税</mark></strong>です。所得税とは異なり、原則として前年の所得に基づいて課税されます。
          </p>
          <h4 className="text-[length:var(--font-size-h4-mobile)] sm:text-[length:var(--font-size-h4)] font-bold text-gray-800 mt-5 mb-2 leading-tight">住民税の計算方法</h4>
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-base leading-[1.8]">
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">均等割</mark></strong>：所得金額にかかわらず、一定の金額が課税される部分です。一般的に年間5,000円程度。</li>
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">所得割</mark></strong>：前年の課税所得金額に応じて課税される部分です。標準税率は<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">一律10%</mark></strong>。</li>
          </ol>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">所得控除の種類</h3>
          <p className="text-base leading-[1.8] mb-4">
            <strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">税額を計算する上で重要な役割を果たすのが「控除」</mark></strong>です。これらを活用することで課税所得や税額を減らし、結果的に手取り額を増やすことができます。
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-base leading-[1.8]">
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">基礎控除</mark></strong>：納税者すべてに適用される控除</li>
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">社会保険料控除</mark></strong>：支払った社会保険料の全額が所得から控除</li>
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">生命保険料控除</mark></strong>：生命保険や医療保険などの保険料に応じて控除</li>
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">医療費控除</mark></strong>：1年間で支払った医療費が一定額を超えた場合に適用</li>
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">扶養控除</mark></strong>：扶養している親族がいる場合に適用</li>
            <li><strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">iDeCo（個人型確定拠出年金）の掛金</mark></strong>：全額が所得控除の対象</li>
          </ul>
        </section>

        {/* セクション5 */}
        <section id="section-5" className="py-6 mb-8 scroll-mt-6">
          <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            5. 具体的な年収手取り計算シミュレーション例
          </h2>
          <p className="text-base leading-[1.8] mb-4">
            ここでは、年収が異なる場合の具体的な手取り額のシミュレーションをご紹介します。これらの計算は、以下の一般的な条件に基づいています。
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1 text-sm sm:text-base leading-[1.6]">
            <li>年齢：40歳未満（介護保険料は考慮しない）</li>
            <li>扶養家族：なし（独身）</li>
            <li>居住地：東京都内</li>
            <li>控除：基礎控除、社会保険料控除、給与所得控除のみを適用</li>
          </ul>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">年収300万円の場合の手取り額</h3>
          <p className="text-base leading-[1.8] mb-4">年収300万円の手取り額は、<mark className="bg-amber-100 px-1 rounded font-bold">年収の約78%〜82%程度</mark>になることが多いです。</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-5 text-sm sm:text-base leading-[1.5]">
              <thead>
                <tr>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                  <th className="bg-gray-50 text-gray-700 p-3 text-right font-semibold border-b border-gray-100">金額（年間概算）</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">年収（額面）</td>
                  <td className="p-3 border-b border-gray-100 text-right">3,000,000円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">社会保険料合計</td>
                  <td className="p-3 border-b border-gray-100 text-right">約442,200円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">税金合計</td>
                  <td className="p-3 border-b border-gray-100 text-right">約176,000円</td>
                </tr>
                <tr className="bg-amber-100">
                  <td className="p-3 border-b border-gray-100 font-bold">手取り額（概算）</td>
                  <td className="p-3 border-b border-gray-100 text-right font-bold">約2,381,800円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">年収500万円の場合の手取り額</h3>
          <p className="text-base leading-[1.8] mb-4">年収500万円の手取り額は、<mark className="bg-amber-100 px-1 rounded font-bold">年収の約75%〜79%程度</mark>が目安となります。</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-5 text-sm sm:text-base leading-[1.5]">
              <thead>
                <tr>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                  <th className="bg-gray-50 text-gray-700 p-3 text-right font-semibold border-b border-gray-100">金額（年間概算）</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">年収（額面）</td>
                  <td className="p-3 border-b border-gray-100 text-right">5,000,000円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">社会保険料合計</td>
                  <td className="p-3 border-b border-gray-100 text-right">約737,000円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">税金合計</td>
                  <td className="p-3 border-b border-gray-100 text-right">約475,000円</td>
                </tr>
                <tr className="bg-amber-100">
                  <td className="p-3 border-b border-gray-100 font-bold">手取り額（概算）</td>
                  <td className="p-3 border-b border-gray-100 text-right font-bold">約3,788,000円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">年収700万円の場合の手取り額</h3>
          <p className="text-base leading-[1.8] mb-4">年収700万円の手取り額は、<mark className="bg-amber-100 px-1 rounded font-bold">年収の約70%〜74%程度</mark>が目安となります。</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-5 text-sm sm:text-base leading-[1.5]">
              <thead>
                <tr>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                  <th className="bg-gray-50 text-gray-700 p-3 text-right font-semibold border-b border-gray-100">金額（年間概算）</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">年収（額面）</td>
                  <td className="p-3 border-b border-gray-100 text-right">7,000,000円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">社会保険料合計</td>
                  <td className="p-3 border-b border-gray-100 text-right">約1,049,300円</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100">税金合計</td>
                  <td className="p-3 border-b border-gray-100 text-right">約880,000円</td>
                </tr>
                <tr className="bg-amber-100">
                  <td className="p-3 border-b border-gray-100 font-bold">手取り額（概算）</td>
                  <td className="p-3 border-b border-gray-100 text-right font-bold">約5,070,700円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 border-l-2 border-blue-400 p-5 mt-6">
            <p className="m-0 text-base leading-[1.8]">
              これらのシミュレーションはあくまで一例です。ご自身の正確な手取り額を知りたい場合は、ページ下部の<a href="#calculator" className="text-blue-600 underline hover:text-blue-800">手取り計算シミュレーション</a>をご活用ください。
            </p>
          </div>
        </section>

        {/* セクション6 */}
        <section id="section-6" className="py-6 mb-8 scroll-mt-6">
          <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            6. 手取り額を増やすためにできること
          </h2>
          <p className="text-base leading-[1.8] mb-4">
            年収の手取り額を増やすためには、単に額面年収を上げるだけでなく、税金や社会保険料の負担を軽減する工夫も重要です。ここでは、<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">合法的に手取り額を最大化するための具体的な方法</mark></strong>を解説します。
          </p>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">控除を最大限活用する</h3>
          <p className="text-base leading-[1.8] mb-4">
            <strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">利用できる控除を最大限に活用することで、課税所得を減らし、結果として手取り額を増やすことが可能</mark></strong>です。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-5 text-sm sm:text-base leading-[1.5]">
              <thead>
                <tr>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">控除の種類</th>
                  <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">概要と活用ポイント</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100 font-bold text-blue-700">社会保険料控除</td>
                  <td className="p-3 border-b border-gray-100">支払った社会保険料の全額が所得から控除されます。</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100 font-bold text-blue-700">生命保険料控除</td>
                  <td className="p-3 border-b border-gray-100"><mark className="bg-amber-100 px-1 rounded">最大で所得税から12万円、住民税から7万円の控除</mark>が受けられます。</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100 font-bold text-blue-700">医療費控除</td>
                  <td className="p-3 border-b border-gray-100"><mark className="bg-amber-100 px-1 rounded">生計を一にする配偶者や親族の医療費も合算</mark>できます。</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100 font-bold text-blue-700">寄付金控除（ふるさと納税）</td>
                  <td className="p-3 border-b border-gray-100"><mark className="bg-amber-100 px-1 rounded">実質2,000円の自己負担で返礼品を受け取りながら、所得税の還付や住民税の控除</mark>が受けられます。</td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="p-3 border-b border-gray-100 font-bold text-blue-700">住宅ローン控除</td>
                  <td className="p-3 border-b border-gray-100"><mark className="bg-amber-100 px-1 rounded">控除期間は最大10年または13年</mark>に及びます。</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">iDeCoやNISAなどの制度を利用する</h3>
          <h4 className="text-[length:var(--font-size-h4-mobile)] sm:text-[length:var(--font-size-h4)] font-bold text-gray-800 mt-5 mb-2 leading-tight">iDeCo（個人型確定拠出年金）</h4>
          <p className="text-base leading-[1.8] mb-4">
            iDeCoは、自分で掛金を拠出し、自分で運用する私的年金制度です。<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">掛金が全額所得控除の対象となるため、所得税と住民税が軽減</mark></strong>されます。
          </p>
          <h4 className="text-[length:var(--font-size-h4-mobile)] sm:text-[length:var(--font-size-h4)] font-bold text-gray-800 mt-5 mb-2 leading-tight">NISA（少額投資非課税制度）</h4>
          <p className="text-base leading-[1.8] mb-4">
            NISAは、株式や投資信託などの金融商品から得られる運用益が非課税になる制度です。<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">つみたて投資枠と成長投資枠を併用できる</mark></strong>ため、目的に合わせて柔軟な資産形成が可能です。
          </p>
          <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400 leading-tight">副業や転職で年収アップを目指す</h3>
          <h4 className="text-[length:var(--font-size-h4-mobile)] sm:text-[length:var(--font-size-h4)] font-bold text-gray-800 mt-5 mb-2 leading-tight">副業で収入源を増やす</h4>
          <p className="text-base leading-[1.8] mb-4">
            本業以外の時間を利用して副業を行うことで、収入源を増やし、額面年収を向上させることができます。
          </p>
          <h4 className="text-[length:var(--font-size-h4-mobile)] sm:text-[length:var(--font-size-h4)] font-bold text-gray-800 mt-5 mb-2 leading-tight">転職で年収を大幅にアップさせる</h4>
          <p className="text-base leading-[1.8]">
            現在の職場で年収アップが見込めない場合は、転職も有力な選択肢です。特に、<strong className="text-blue-700"><mark className="bg-amber-100 px-1 rounded">成長産業や需要の高い職種への転職</mark></strong>は、大幅な年収アップに繋がりやすい傾向があります。
          </p>
        </section>

        {/* セクション7 */}
        <section id="section-7" className="py-6 mb-8 scroll-mt-6">
          <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            7. まとめ
          </h2>
          <p className="text-base leading-[1.8] mb-4">
            年収の手取り額を正確に把握することは、日々の家計管理や将来のライフプランを立てる上で非常に重要です。本記事では、額面と手取りの違いから、社会保険料や税金の種類と計算方法、具体的なシミュレーションまでを解説しました。
          </p>
          <div className="bg-gray-50 border-l-2 border-amber-400 p-6 my-6">
            <p className="font-bold text-amber-800 mb-3">📝 この記事のポイント</p>
            <ul className="list-none m-0 p-0 space-y-2">
              <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">手取り額は、額面から社会保険料と税金を差し引いた金額</li>
              <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">手取りは額面の<strong>約75〜85%</strong>が目安（年収により変動）</li>
              <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">控除を活用することで、課税所得を減らし手取りを増やせる</li>
              <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">iDeCo・NISAは資産形成と節税を同時に実現できる</li>
              <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">副業や転職で年収アップを目指すことも有効</li>
            </ul>
          </div>
          <p className="text-base leading-[1.8]">
            さらに、控除の最大限の活用やiDeCo、NISAといった制度の利用、あるいはキャリアアップを通じて年収そのものを増やすことで、手取り額を増やすことは十分に可能です。この知識を活かし、より豊かな生活設計を実現するための一歩を踏み出しましょう。
          </p>
        </section>

        {/* 計算シミュレーションセクション */}
        <section id="calculator" className="scroll-mt-6 py-12">
          <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            手取り計算シミュレーション
          </h2>
          <div className="bg-gray-50 rounded-xl p-6">

            <Card>
              <H2>🎯 まずは簡単計算</H2>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block font-semibold text-gray-900 text-base leading-[1.5] mb-1.5 md:mb-2">
                    あなたの年収
                  </label>
                  <p className="text-sm leading-[1.5] text-gray-600 mb-2 hidden md:block">
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

                <div>
                  <label className="block font-semibold text-gray-900 text-base leading-[1.5] mb-1.5 md:mb-2">
                    あなたの年代
                  </label>
                  <p className="text-sm leading-[1.5] text-gray-600 mb-2 hidden md:block">
                    年代別の正確な比較をお見せします
                  </p>
                  <CustomSelect
                    options={AGE_OPTIONS}
                    value={ageGroup}
                    onChange={(v) => setAgeGroup(v as AgeGroup)}
                    placeholder="年代を選択"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-900 text-base leading-[1.5] mb-1.5 md:mb-2">
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

                <PrimaryButton onClick={handleCalculate}>すぐ計算する</PrimaryButton>
              </div>
            </Card>

            {showResults && results && (
              <Card id="results" className="section-gap animate-fade-in mt-6">
                <div className="text-center">
                  <div className="text-gray-600">あなたの年間手取り額は…</div>
                  <ResultAmount>
                    約 {formatYen(results.takeHome)}
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
                            value={<>{formatJPY(annualSalaryYen)}<span className="ml-1 font-normal">円</span></>}
                            valueClassName="text-right"
                          />
                          <ResultRow
                            label="所得税"
                            value={<>- {formatJPY(incomeTax)}<span className="ml-1 font-normal">円</span></>}
                            valueClassName="text-right"
                          />
                          <ResultRow
                            label="住民税"
                            value={<>- {formatJPY(residentTax)}<span className="ml-1 font-normal">円</span></>}
                            valueClassName="text-right"
                          />
                          <ResultRow
                            label="社会保険料"
                            value={<>- {formatJPY(socialInsurance)}<span className="ml-1 font-normal">円</span></>}
                            valueClassName="text-right"
                          />
                          <ResultRow
                            label="控除合計額"
                            value={<>- {formatJPY(deductionTotal)}<span className="ml-1 font-normal">円</span></>}
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

            {showResults && results && (
              <div className="md:hidden flex justify-center mt-6">
                <RakutenWidgetAd />
              </div>
            )}

            {showResults && results && percentileData && (
              <Card className="section-gap mt-6">
                <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold mb-4 leading-tight">あなたの年収レベル</h3>
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
                <div className="my-4 flex justify-center">
                  <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4ASQ2A+3IZO+I1NCH" rel="nofollow">
                    <img
                      width={300}
                      height={250}
                      alt=""
                      src="https://www28.a8.net/svt/bgt?aid=260126641260&wid=001&eno=01&mid=s00000016458003031000&mc=1"
                      className="border-0"
                    />
                  </a>
                  <img width={1} height={1} src="https://www17.a8.net/0.gif?a8mat=4AVF01+4ASQ2A+3IZO+I1NCH" alt="" className="border-0" />
                </div>
              </Card>
            )}

            {showResults && results && percentileData && (
              <Card className="section-gap mt-6">
                <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold mb-4 leading-tight">今すぐ行動すべき理由</h3>
                <div className="bg-white border-l-4 border-[#e0e0e0] p-4 mb-3">
                  <p className="font-bold mb-2">転職市場は今がチャンス</p>
                  <ul className="text-sm sm:text-base leading-[1.6] text-gray-700 space-y-1">
                    <li>• 求人倍率: 1.5倍（過去最高水準）</li>
                    <li>• 人手不足で企業が高待遇提示</li>
                    <li>• 2025年は転職好機</li>
                  </ul>
                </div>
                <div className="bg-white border-l-4 border-[#e0e0e0] p-4 mb-3">
                  <p className="font-bold mb-2">1年遅れると...</p>
                  <ul className="text-sm sm:text-base leading-[1.6] text-gray-700 space-y-1">
                    <li>• 年収UP機会を逃す: -100万円/年</li>
                    <li>• 生涯年収の損失: -1000万円以上</li>
                    <li>• スキルアップの機会も逃す</li>
                  </ul>
                </div>
                <div className="bg-white border-l-4 border-[#e0e0e0] p-4">
                  <p className="font-bold mb-2">転職成功者の平均UP額</p>
                  <ul className="text-sm sm:text-base leading-[1.6] text-gray-700 space-y-1">
                    <li>• 20代: +80万円</li>
                    <li className={ageGroup === '30代' ? 'font-bold text-green-700' : ''}>• 30代: +120万円 {ageGroup === '30代' && '← あなたの年代'}</li>
                    <li className={ageGroup === '40代' ? 'font-bold text-green-700' : ''}>• 40代: +150万円 {ageGroup === '40代' && '← あなたの年代'}</li>
                    <li className={ageGroup === '50代' ? 'font-bold text-green-700' : ''}>• 50代: +100万円 {ageGroup === '50代' && '← あなたの年代'}</li>
                    {ageGroup === '20代' && <li className="font-bold text-green-700">• 20代: +80万円 ← あなたの年代</li>}
                    {ageGroup === '60代以上' && <li className="font-bold text-green-700">• 60代以上: +80万円 ← あなたの年代</li>}
                  </ul>
                </div>
                <div className="md:hidden mt-6 flex justify-center">
                  <RakutenWidgetAd />
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* === 「手取りを増やすための次のステップ」セクション（一時的にコメントアウト） === */}
        {/*
        {showResults && results && <CtaSection />}
        */}
        {/* === /「手取りを増やすための次のステップ」セクション === */}

        {/* セクション3: 詳細計算へのリンク */}
        <div>
          <H2>あなたに合った詳細計算ツールを選ぼう</H2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* カード1: 転職検討者向け */}
            <Link href="/tools/job-change" className="block h-full">
              <Card
                as="div"
                className="transition-all duration-300 hover:shadow-sm hover:scale-[1.01] cursor-pointer h-full"
              >
                <div className="text-4xl mb-4 text-center">💼</div>
                <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-900 mb-2 text-center leading-tight">
                  転職を検討中
                </h3>
                <p className="text-sm sm:text-base leading-[1.6] text-gray-600 text-center">
                  現在の年収と転職先の年収を比較。増加額が一目でわかります。
                </p>
              </Card>
            </Link>

            {/* カード2: 新卒・就活生向け */}
            <Link href="/tools/fresh-graduate" className="block h-full">
              <Card
                as="div"
                className="transition-all duration-300 hover:shadow-sm hover:scale-[1.01] cursor-pointer h-full"
              >
                <div className="text-4xl mb-4 text-center">🎓</div>
                <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-900 mb-2 text-center leading-tight">
                  就活中・新卒
                </h3>
                <p className="text-sm sm:text-base leading-[1.6] text-gray-600 text-center">
                  内定先の年収から手取りを計算。生活費シミュレーション付き。
                </p>
              </Card>
            </Link>

            {/* カード3: 副業検討者向け */}
            <Link href="/tools/side-business" className="block h-full">
              <Card
                as="div"
                className="transition-all duration-300 hover:shadow-sm hover:scale-[1.01] cursor-pointer h-full"
              >
                <div className="text-4xl mb-4 text-center">💰</div>
                <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-900 mb-2 text-center leading-tight">
                  副業を検討中
                </h3>
                <p className="text-sm sm:text-base leading-[1.6] text-gray-600 text-center">
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
            <Link href="/tables" className="block">
              <Card as="div" className="hover:shadow-sm transition-all">
                <div className="flex items-start mb-3">
                  <span className="text-3xl mr-3">📊</span>
                  <div>
                    <h3 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-2 leading-tight">
                      年代・年収別 手取り一覧表
                    </h3>
                    <p className="text-sm sm:text-base leading-[1.6] text-gray-600">
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
              <Card as="div" className="hover:shadow-sm transition-all">
                <div className="flex items-start mb-3">
                  <span className="text-3xl mr-3">❓</span>
                  <div>
                    <h3 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mb-2 leading-tight">よくある質問（FAQ）</h3>
                    <p className="text-sm sm:text-base leading-[1.6] text-gray-600">
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

      {/* 広告3: ページ下部に固定表示 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4ASQ2A+3IZO+I0SHD" rel="nofollow">
          <img
            width={468}
            height={60}
            alt=""
            src="https://www28.a8.net/svt/bgt?aid=260126641260&wid=001&eno=01&mid=s00000016458003027000&mc=1"
            className="border-0 max-w-full h-auto"
          />
        </a>
        <img
          width={1}
          height={1}
          src="https://www17.a8.net/0.gif?a8mat=4AVF01+4ASQ2A+3IZO+I0SHD"
          alt=""
          className="border-0"
        />
      </div>
    </div>
  );
}
