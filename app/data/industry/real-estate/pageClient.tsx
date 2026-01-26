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
  { age: '20代前半', salary: 300, takeHome: 245 },
  { age: '20代後半', salary: 380, takeHome: 305 },
  { age: '30代', salary: 480, takeHome: 380 },
  { age: '40代', salary: 580, takeHome: 450 },
  { age: '50代', salary: 620, takeHome: 480 },
];

type WorkplaceRow = {
  name: string;
  range: string;
  description: string;
};

const WORKPLACE_DATA: WorkplaceRow[] = [
  {
    name: '大手デベロッパー',
    range: '1,000〜1,500万円',
    description: '大規模再開発に携わる。福利厚生が充実。新卒・中途とも高倍率で狭き門。',
  },
  {
    name: '大手仲介・ハウスメーカー',
    range: '500〜800万円',
    description: '安定した基本給に加えインセンティブも期待できる。営業成績次第で高年収も可能。',
  },
  {
    name: '中小不動産会社（売買仲介）',
    range: '400〜600万円',
    description: 'インセンティブ比率が高い傾向。成果を出すほど年収が伸びやすい。',
  },
  {
    name: '中小不動産会社（賃貸仲介・管理）',
    range: '300〜450万円',
    description: '安定志向で働きやすい傾向。管理戸数に応じた安定収入を積み上げやすい。',
  },
];

type JobRow = {
  name: string;
  range: string;
};

const JOB_DATA: JobRow[] = [
  { name: '不動産デベロッパー', range: '800〜1,500万円' },
  { name: '投資用不動産営業', range: '500〜1,200万円' },
  { name: '売買仲介営業', range: '400〜800万円' },
  { name: '土地活用営業', range: '450〜700万円' },
  { name: '不動産企画・仕入れ', range: '500〜700万円' },
  { name: '賃貸仲介営業', range: '300〜500万円' },
  { name: '不動産管理', range: '350〜500万円' },
  { name: '不動産事務', range: '300〜400万円' },
];

type FaqRow = {
  question: string;
  answer: string;
};

const FAQ_DATA: FaqRow[] = [
  {
    question: '不動産業界の年収は他業界と比べて高い？',
    answer:
      '全産業平均より約64万円高く、比較的高水準です。特に大手デベロッパーは平均年収1,000万円超と業界トップクラスです。一方で、賃貸仲介など職種によっては平均以下の場合もあり、職種・企業による差が大きい業界です。',
  },
  {
    question: '不動産業界で年収を上げるには？',
    answer:
      '主な方法は3つあります。①営業成績を上げる（インセンティブ制度を活用）②高単価商材を扱う会社へ転職（賃貸→売買→投資用不動産）③宅建士など資格取得（月1〜3万円の資格手当やキャリアアップにつながりやすい）',
  },
  {
    question: '未経験から年収1,000万円は可能？',
    answer:
      '可能です。不動産業界は実力主義の側面が強く、営業成績次第で20代でも年収1,000万円を達成する人がいます。特に投資用不動産営業や売買仲介では、インセンティブ率が高いため、成果に応じた高収入が期待できます。',
  },
];

export default function RealEstateClient() {
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
            <Link href="/">ホーム</Link> {'>'} 業種別 {'>'} 不動産業界の年収・手取り
          </nav>
          <h1 className="page-title">不動産業界の年収・手取り計算</h1>

          {/* 平均年収サマリー */}
          <Card>
            <H2>📌 不動産業界の平均年収サマリー</H2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">平均年収</p>
                <p className="text-3xl font-black text-[#0a57d1]">約536万円</p>
                <p className="text-small mt-2">月給 34万800円</p>
                <p className="text-small mt-1">賞与 127万700円</p>
              </div>
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">全産業平均（約472万円）との差</p>
                <p className="text-3xl font-black text-[#0a57d1]">約64万円 高い</p>
                <p className="text-small mt-2">インセンティブ次第で年収が大きく変動</p>
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
                    placeholder="650"
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

          {/* 企業タイプ別 年収比較 */}
          <section className="space-y-4">
            <H2>🏷️ 企業タイプ・勤務先別 年収比較</H2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WORKPLACE_DATA.map((item) => (
                <div key={item.name} className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-5 shadow-lg">
                  <div className="font-bold text-[#1a1a1a] mb-1">{item.name}</div>
                  <div className="text-[#333333] font-semibold">{item.range}</div>
                  <div className="text-small mt-2">{item.description}</div>
                </div>
              ))}
            </div>
            <p className="text-small">
              ※ 不動産業界は「扱う商材の単価」と「インセンティブ設計」で年収が大きく変わります。求人票では固定給と歩合の割合を確認しましょう。
            </p>
          </section>

          {/* 職種別年収一覧 */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>📊 職種別 年収目安</H2>
            <div className="grid sm:grid-cols-2 gap-4">
              {JOB_DATA.map((row) => (
                <div key={row.name} className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4 shadow-lg">
                  <div className="font-bold text-[#1a1a1a]">{row.name}</div>
                  <div className="mt-1 text-[#333333] font-semibold">{row.range}</div>
                </div>
              ))}
            </div>
            <p className="text-small mt-3">
              ※ 宅建士は不動産業界で評価されやすく、資格手当（月1〜3万円）やキャリアアップにつながることが多いです。
            </p>
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

