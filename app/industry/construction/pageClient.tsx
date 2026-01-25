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
  { age: '20代前半', salary: 280, takeHome: 230 },
  { age: '20代後半', salary: 350, takeHome: 285 },
  { age: '30代', salary: 420, takeHome: 335 },
  { age: '40代', salary: 500, takeHome: 395 },
  { age: '50代', salary: 520, takeHome: 405 },
];

type WorkplaceRow = {
  name: string;
  range: string;
  description: string;
};

const WORKPLACE_DATA: WorkplaceRow[] = [
  {
    name: 'スーパーゼネコン',
    range: '900〜1,100万円',
    description: '大規模プロジェクト中心。福利厚生が充実。高い技術力と実績が求められる。',
  },
  {
    name: '準大手・中堅ゼネコン',
    range: '600〜900万円',
    description: '地域の大規模案件が多く、昇給は比較的安定。特定分野の専門性を磨きやすい。',
  },
  {
    name: '地場中小建設会社',
    range: '400〜550万円',
    description: '地域密着で働きやすい一方、待遇は企業ごとの差が大きい。',
  },
  {
    name: '専門工事会社（電気・設備・とび等）',
    range: '350〜550万円',
    description: '資格で年収アップしやすい。独立すれば高年収を狙えるケースもある。',
  },
];

type JobRow = {
  name: string;
  range: string;
};

const JOB_DATA: JobRow[] = [
  { name: '一級建築士', range: '650〜800万円' },
  { name: '施工管理技士', range: '500〜700万円' },
  { name: '電気工事士', range: '450〜600万円' },
  { name: '測量技術者', range: '400〜500万円' },
  { name: '重機オペレーター', range: '400〜550万円' },
  { name: 'とび職・鉄筋工', range: '350〜500万円' },
  { name: '現場作業員', range: '300〜450万円' },
];

type FaqRow = {
  question: string;
  answer: string;
};

const FAQ_DATA: FaqRow[] = [
  {
    question: '建設業界の年収は他業界と比べて高い？',
    answer:
      '全産業平均より約87万円高く、比較的高い水準です。ただし、企業規模による差が大きく、スーパーゼネコンと中小企業では年収差が200万円以上になることもあります。',
  },
  {
    question: '建設業界で年収を上げるには？',
    answer:
      '主な方法は3つあります。①資格取得（1級施工管理技士、一級建築士等で手当や昇給につながる）②大手企業への転職（規模が大きいほど年収が高い傾向）③独立・起業（とび職や電気工事士は独立で1,000万円以上も可能）',
  },
  {
    question: '未経験からでも稼げる？',
    answer:
      '未経験の初任給は月収20〜25万円程度が目安ですが、資格取得と経験を積むことで着実に年収アップできます。特に施工管理や重機オペレーターは、数年かけて年収500万円以上を目指しやすい職種です。',
  },
];

export default function ConstructionClient() {
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
            <Link href="/">ホーム</Link> {'>'} 業種別 {'>'} 建設業界の年収・手取り
          </nav>
          <h1 className="page-title">建設業界の年収・手取り計算</h1>

          {/* リード文 */}
          <Card>
            <H2>📌 まずは平均年収の目安</H2>
            <p className="text-body leading-relaxed">
              建設業界の平均年収は約565万円で、全産業平均より高水準です。一方で、企業規模や職種による差が非常に大きいのが特徴です。資格取得やキャリアの選び方次第で年収アップを狙いやすい業界でもあります。
            </p>
            <p className="text-small mt-3">出典: 厚生労働省「賃金構造基本統計調査」（2024年度）/ 国税庁「民間給与実態統計調査」</p>
          </Card>

          {/* 平均年収サマリー */}
          <Card>
            <H2>📌 建設業界の平均年収サマリー</H2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">平均年収</p>
                <p className="text-3xl font-black text-[#0a57d1]">約565万円</p>
                <p className="text-small mt-2">月給 38.4万円</p>
                <p className="text-small mt-1">賞与 104.6万円</p>
              </div>
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">全産業平均（約478万円）との差</p>
                <p className="text-3xl font-black text-[#0a57d1]">約87万円 高い</p>
                <p className="text-small mt-2">企業規模・職種による差が非常に大きい</p>
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
                    placeholder="500"
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

          {/* 企業規模別 年収比較 */}
          <section className="space-y-4">
            <H2>🏷️ 企業規模・勤務先別 年収比較</H2>
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
              ※ 建設業界は企業規模・職種による年収差が非常に大きいのが特徴です。待遇は「会社×職種×地域」で変わります。
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
              ※ 資格（建築士・施工管理技士など）は手当や転職時の評価につながりやすく、年収アップの近道になりやすいです。
            </p>
          </section>

          {/* FAQ（アコーディオン） */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>❓ よくある質問（FAQ）</H2>
            <FaqAccordion items={FAQ_DATA} />
            <p className="text-small mt-3">
              ※ いわゆる「2024年問題」（残業規制）を背景に、働き方改革が進んでいます。会社によって残業・手当の設計が異なるため、求人票の条件確認が重要です。
            </p>
          </section>
        </div>

        <PcAdSidebar />
      </div>
    </div>
  );
}

