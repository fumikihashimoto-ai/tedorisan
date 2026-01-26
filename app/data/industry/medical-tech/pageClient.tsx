'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateTakeHome } from '@/lib/salaryCalculator';
import PcAdSidebar from '@/app/components/PcAdSidebar';
import { Card, H2, InputField, PrimaryButton, ResultAmount, ResultRow } from '@/app/components/ui';

type AgeRow = {
  age: string;
  salary: number; // 万円
  takeHome: number; // 万円
};

const AGE_TABLE: AgeRow[] = [
  { age: '20代前半', salary: 350, takeHome: 285 },
  { age: '20代後半', salary: 400, takeHome: 320 },
  { age: '30代', salary: 460, takeHome: 365 },
  { age: '40代', salary: 540, takeHome: 420 },
  { age: '50代', salary: 620, takeHome: 480 },
];

type WorkplaceRow = {
  name: string;
  range: string;
  description: string;
};

const WORKPLACE_DATA: WorkplaceRow[] = [
  {
    name: '大学病院・公立病院',
    range: '500〜700万円',
    description: '福利厚生充実、昇給安定。夜勤・当直手当で上振れしやすい',
  },
  {
    name: '民間総合病院',
    range: '400〜550万円',
    description: '規模や地域により差が出やすい',
  },
  {
    name: 'クリニック・診療所',
    range: '350〜500万円',
    description: '日勤中心で働きやすい。専門性で差がつく',
  },
  {
    name: '検査センター・企業',
    range: '400〜600万円',
    description: '臨床検査技師等に多い。土日休みが多い',
  },
];

type JobTypeRow = {
  name: string;
  salary: number; // 万円
};

const JOB_TYPE_DATA: JobTypeRow[] = [
  { name: '診療放射線技師', salary: 550 },
  { name: '臨床検査技師', salary: 508 },
  { name: '理学療法士', salary: 444 },
  { name: '作業療法士', salary: 440 },
  { name: '臨床工学技士', salary: 430 },
  { name: '言語聴覚士', salary: 430 },
];

type FaqRow = {
  question: string;
  answer: string;
};

const FAQ_DATA: FaqRow[] = [
  {
    question: '医療技術職の年収は他の職種と比べて高い？',
    answer:
      '医療技術職の平均年収は約480万円で、全職種平均（約426万円）より約54万円高いです。国家資格が必要で専門性が高く、医療現場で欠かせない存在のため、安定した収入が見込めます。',
  },
  {
    question: '職種によって年収は違う？',
    answer:
      '診療放射線技師が約550万円と最も高く、臨床検査技師（約508万円）、理学療法士（約444万円）と続きます。夜勤や当直の有無、勤務先の規模によっても差が出ます。',
  },
  {
    question: '年収を上げるにはどうすればいい？',
    answer:
      '主な方法は3つあります。①認定資格（超音波検査士、認定理学療法士等）の取得、②大学病院・公立病院など規模の大きい施設への転職、③管理職へのキャリアアップです。エコーやMRIなど専門スキルの習得も評価されやすいです。',
  },
];

export default function MedicalTechClient() {
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
            <Link href="/">ホーム</Link> {'>'} 業種別 {'>'} 医療技術職
          </nav>
          <h1 className="page-title">医療技術職の年収・手取り計算</h1>

          {/* 平均年収サマリー */}
          <Card>
            <H2>📌 医療技術職の平均年収サマリー</H2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">平均年収</p>
                <p className="text-3xl font-black text-[#0a57d1]">約480万円</p>
              </div>
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">全職種平均（約426万円）との差</p>
                <p className="text-3xl font-black text-[#0a57d1]">約54万円 高い</p>
              </div>
            </div>

            <p className="text-small mt-4">出典: 厚生労働省「令和6年賃金構造基本統計調査」</p>
            <p className="text-small mt-2">
              ※ 診療放射線技師・臨床検査技師・理学療法士・作業療法士・臨床工学技士・言語聴覚士等の中央値
            </p>
          </Card>

          {/* 手取り計算フォーム */}
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
                    placeholder="400"
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
                    placeholder="480"
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
            <H2>📊 年代別年収テーブル（目安）</H2>
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

          {/* 職種別 平均年収一覧（新規） */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>📊 職種別 平均年収一覧</H2>
            <div className="grid sm:grid-cols-2 gap-4">
              {JOB_TYPE_DATA.map((row) => (
                <div key={row.name} className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4 shadow-lg">
                  <div className="font-bold text-[#1a1a1a]">{row.name}</div>
                  <div className="mt-1 text-[#333333] font-semibold">{row.salary}万円</div>
                </div>
              ))}
            </div>
          </section>

          {/* 勤務先タイプ別 年収比較 */}
          <section className="space-y-4">
            <H2>🏷️ 勤務先タイプ別 年収比較</H2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WORKPLACE_DATA.map((item) => (
                <div key={item.name} className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-5 shadow-lg">
                  <div className="font-bold text-[#1a1a1a] mb-1">{item.name}</div>
                  <div className="text-[#333333] font-semibold">{item.range}</div>
                  <div className="text-small mt-2">{item.description}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ（3問） */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>❓ よくある質問（FAQ）</H2>
            <div className="space-y-4">
              {FAQ_DATA.map((item, idx) => (
                <div key={item.question} className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                  <p className="font-semibold text-[#1a1a1a] mb-2">
                    Q{idx + 1}. {item.question}
                  </p>
                  <p className="text-body leading-relaxed">A. {item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <PcAdSidebar />
      </div>
    </div>
  );
}

