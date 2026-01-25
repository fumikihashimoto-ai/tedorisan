'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateTakeHome } from '@/lib/salaryCalculator';
import PcAdSidebar from '@/app/components/PcAdSidebar';
import { Card, FaqAccordion, H2, InputField, PrimaryButton, ResultAmount, ResultRow } from '@/app/components/ui';

type AgeRow = {
  age: string;
  salary: number; // 万円
  takeHome: number; // 万円
};

const AGE_TABLE: AgeRow[] = [
  { age: '20代前半', salary: 320, takeHome: 260 },
  { age: '20代後半', salary: 380, takeHome: 305 },
  { age: '30代', salary: 520, takeHome: 410 },
  { age: '40代', salary: 620, takeHome: 480 },
  { age: '50代', salary: 680, takeHome: 520 },
];

type IndustryRow = {
  name: string;
  range: string;
  description: string;
};

const INDUSTRY_DATA: IndustryRow[] = [
  {
    name: '高収入業界（金融・医療・M&A）',
    range: '600〜1,500万円',
    description:
      '専門知識や資格が求められ、成果報酬の比重が大きい。代表例はMR（803万円）、金融営業（636万円）、M&A仲介（1,000万円超）。',
  },
  {
    name: '中〜高収入業界（IT・不動産・メーカー）',
    range: '450〜800万円',
    description: 'インセンティブで大きく変動しやすい。IT営業、不動産営業、機械メーカー営業など。',
  },
  {
    name: '安定収入業界（商社・インフラ・保険）',
    range: '400〜600万円',
    description: '基本給重視で福利厚生が手厚い傾向。ルート営業や代理店営業など。',
  },
  {
    name: '成長業界（SaaS・人材・広告）',
    range: '350〜600万円',
    description: '成長企業でキャリアアップの機会が多い。インサイドセールスや法人営業など。',
  },
];

type SalesTypeRow = {
  name: string;
  range: string;
};

const SALES_TYPE_DATA: SalesTypeRow[] = [
  { name: 'M&A仲介営業', range: '800〜2,000万円' },
  { name: 'MR（医薬品営業）', range: '600〜900万円' },
  { name: '金融営業（銀行・証券）', range: '500〜800万円' },
  { name: '不動産売買営業', range: '400〜1,000万円' },
  { name: 'IT・SaaS営業', range: '450〜700万円' },
  { name: 'メーカー営業', range: '400〜600万円' },
  { name: '人材営業', range: '350〜550万円' },
  { name: 'ルート営業', range: '350〜500万円' },
  { name: '賃貸仲介営業', range: '300〜450万円' },
];

type FaqRow = {
  question: string;
  answer: string;
};

const FAQ_DATA: FaqRow[] = [
  {
    question: '営業職の年収は他職種と比べて高い？',
    answer:
      '全職種平均より約47万円高く、比較的高水準です。特にMR（803万円）や金融営業（636万円）は高収入です。ただし、インセンティブ次第で同じ営業職でも年収差が200〜300万円以上開くことがあり、成果が直接年収に反映される職種です。',
  },
  {
    question: '営業職で年収を上げるには？',
    answer:
      '主な方法は3つあります。①高単価商材の業界へ転職（不動産→M&A、ルート→金融など）②インセンティブ比率の高い企業を選ぶ（成果報酬型）③マネージャー・管理職へキャリアアップ（年収100〜200万円アップ）',
  },
  {
    question: '未経験から年収1,000万円は可能？',
    answer:
      '可能です。営業職は実力主義の側面が強く、業界選びとスキル次第で20代でも年収1,000万円を達成する人がいます。特にM&A仲介、投資用不動産、外資系IT営業では、成果に応じた高インセンティブにより若手でも高収入が狙えます。',
  },
];

export default function SalesClient() {
  const [currentSalary, setCurrentSalary] = useState<string>('');
  const [newSalary, setNewSalary] = useState<string>('');
  const [dependents, setDependents] = useState<string>('0');
  const [results, setResults] = useState<{
    current: ReturnType<typeof calculateTakeHome> | null;
    new: ReturnType<typeof calculateTakeHome> | null;
  }>({ current: null, new: null });
  const [showDetails, setShowDetails] = useState(false);

  const onCalculate = () => {
    const currentMan = parseFloat(currentSalary);
    const newMan = parseFloat(newSalary);
    const dep = Math.max(0, parseInt(dependents, 10) || 0);
    if (!Number.isFinite(currentMan) || !Number.isFinite(newMan) || currentMan <= 0 || newMan <= 0) return;

    setResults({
      current: calculateTakeHome(Math.round(currentMan * 10000), dep),
      new: calculateTakeHome(Math.round(newMan * 10000), dep),
    });
  };

  const increase = results.current && results.new ? results.new.takeHome - results.current.takeHome : 0;

  return (
    <div className="min-h-screen bg-[#f5f5f5] container-main">
      <div className="max-w-7xl mx-auto md:flex md:items-start md:gap-8">
        <div className="space-y-8 md:space-y-12 md:max-w-[800px] md:w-full">
          <nav className="breadcrumb mb-3">
            <Link href="/">ホーム</Link> {'>'} 業種別 {'>'} 営業職の年収・手取り
          </nav>
          <h1 className="page-title">営業職の年収・手取り計算</h1>

          {/* リード文 */}
          <Card>
            <H2>📌 まずは平均年収の目安</H2>
            <p className="text-body leading-relaxed">
              営業職の平均年収は約476万円で、全産業平均より高水準です。基本給（目安: 月給30〜40万円）に加えて、インセンティブや賞与の影響が大きく、業界・企業・個人の成果によって年収の幅が大きいのが特徴です。
            </p>
            <p className="text-small mt-3">出典: doda（2025年調査）/ 厚生労働省「賃金構造基本統計調査」</p>
          </Card>

          {/* 平均年収サマリー */}
          <Card>
            <H2>📌 営業職の平均年収サマリー</H2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">平均年収</p>
                <p className="text-3xl font-black text-[#0a57d1]">約476万円</p>
                <p className="text-small mt-2">月給 30〜40万円（基本給）</p>
                <p className="text-small mt-1">インセンティブ・賞与が大きく影響</p>
              </div>
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">全産業平均（約429万円）との差</p>
                <p className="text-3xl font-black text-[#0a57d1]">約47万円 高い</p>
                <p className="text-small mt-2">業界・成果により年収の幅が非常に大きい</p>
              </div>
            </div>
          </Card>

          {/* 手取り計算フォーム（転職比較） */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 md:p-8 shadow-lg">
            <H2>🧮 手取り計算フォーム（転職比較）</H2>

            <Card as="div" className="mb-6">
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 text-base mb-2">現在の年収</label>
                <p className="text-caption mb-2">現在の年収を入力してください</p>
                <div className="relative">
                  <InputField
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(e.target.value)}
                    className="pr-12"
                    placeholder="450"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">万円</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-semibold text-gray-900 text-base mb-2">転職先の年収</label>
                <p className="text-caption mb-2">転職先の年収を入力してください</p>
                <div className="relative">
                  <InputField
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="pr-12"
                    placeholder="600"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">万円</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-semibold text-gray-900 text-base mb-2">扶養人数</label>
                <p className="text-caption mb-2">扶養している家族の人数を入力してください</p>
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
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">人</span>
                </div>
              </div>

              <PrimaryButton type="button" onClick={onCalculate} className="mt-6">
                計算する
              </PrimaryButton>
            </Card>

            {results.current && results.new && (
              <Card as="div" className="mt-6">
                <div className="text-center">
                  <div className="result-label">転職後の年間手取り増加額は…</div>
                  <ResultAmount tone={increase >= 0 ? 'positive' : 'negative'} className="mt-2">
                    約 {increase >= 0 ? '+' : ''}
                    {Math.round(increase / 10000)}
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
                    <ResultRow
                      label="現在の年収"
                      value={Number.isFinite(parseFloat(currentSalary)) ? `${parseFloat(currentSalary)}万円` : '-'}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="現在の手取り"
                      value={`${Math.round(results.current.takeHome / 10000)}万円`}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="転職後の年収"
                      value={Number.isFinite(parseFloat(newSalary)) ? `${parseFloat(newSalary)}万円` : '-'}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="転職後の手取り"
                      value={`${Math.round(results.new.takeHome / 10000)}万円`}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="年間増加額"
                      value={`${increase >= 0 ? '+' : ''}${Math.round(increase / 10000)}万円`}
                      className="font-bold border-t-2 border-[#e0e0e0]"
                      valueClassName="text-right"
                    />
                  </div>
                )}
              </Card>
            )}
          </section>

          {/* 年代別年収テーブル */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>📊 年代別平均年収（目安）</H2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#e0e0e0] bg-white">
                <thead>
                  <tr className="bg-[#0a57d1] text-white">
                    <th className="border border-[#e0e0e0] px-4 py-3 text-left">年代</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-right">年収</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-right">手取り</th>
                  </tr>
                </thead>
                <tbody>
                  {AGE_TABLE.map((row) => (
                    <tr key={row.age} className="border-b border-[#e0e0e0]">
                      <td className="px-4 py-3 text-[#333333]">{row.age}</td>
                      <td className="px-4 py-3 text-right text-[#333333]">{row.salary}万円</td>
                      <td className="px-4 py-3 text-right font-semibold text-[#333333]">{row.takeHome}万円</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-small mt-3">※ 表の手取りは概算の目安です。</p>
          </section>

          {/* 業界別 年収比較 */}
          <section className="space-y-4">
            <H2>🏷️ 業界別 年収比較</H2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {INDUSTRY_DATA.map((item) => (
                <div key={item.name} className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-5 shadow-lg">
                  <div className="font-bold text-[#1a1a1a] mb-1">{item.name}</div>
                  <div className="text-[#333333] font-semibold">{item.range}</div>
                  <div className="text-small mt-2">{item.description}</div>
                </div>
              ))}
            </div>
            <p className="text-small">
              ※ 営業職は「業界」「企業」「個人の成果」で年収が大きく変わります。固定給とインセンティブの設計を確認すると、ミスマッチを減らせます。
            </p>
          </section>

          {/* 営業タイプ別 年収一覧 */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>📊 営業タイプ別 年収目安</H2>
            <div className="grid sm:grid-cols-2 gap-4">
              {SALES_TYPE_DATA.map((row) => (
                <div key={row.name} className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4 shadow-lg">
                  <div className="font-bold text-[#1a1a1a]">{row.name}</div>
                  <div className="mt-1 text-[#333333] font-semibold">{row.range}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ（アコーディオン） */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>❓ よくある質問（FAQ）</H2>
            <FaqAccordion items={FAQ_DATA} />
          </section>
        </div>

        <PcAdSidebar />
      </div>
    </div>
  );
}

