'use client';

import { useMemo, useState } from 'react';
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
  { age: '20代前半', salary: 260, takeHome: 215 },
  { age: '20代後半', salary: 300, takeHome: 245 },
  { age: '30代', salary: 370, takeHome: 300 },
  { age: '40代', salary: 430, takeHome: 340 },
  { age: '50代', salary: 450, takeHome: 355 },
];

type WorkplaceRow = {
  name: string;
  range: string;
  description: string;
};

const WORKPLACE_DATA: WorkplaceRow[] = [
  {
    name: '公立保育園（地方公務員）',
    range: '450〜650万円',
    description: '給与は安定し、昇給も見込みやすい。福利厚生が充実。役職手当で大きく上がることもある。',
  },
  {
    name: '私立認可保育園（大規模法人）',
    range: '380〜500万円',
    description: '処遇改善加算があり、研修制度も整っていることが多い。施設長クラスで高年収を狙える。',
  },
  {
    name: '私立認可保育園（中小規模）',
    range: '320〜420万円',
    description: '園による差が大きい一方、働きやすさを重視しやすい。借り上げ社宅制度で実質負担を下げられる。',
  },
  {
    name: '小規模保育園・企業内保育',
    range: '300〜400万円',
    description: '少人数で業務負荷が抑えられる傾向。残業が少なめな職場も多い。企業内は福利厚生が手厚い場合がある。',
  },
];

type FaqRow = {
  question: string;
  answer: string;
};

const FAQ_DATA: FaqRow[] = [
  {
    question: '保育士の年収は他職種と比べて低い？',
    answer:
      '全職種平均より約19万円低いですが、処遇改善により10年間で約25%上昇しています。2024年度は人件費が10.7%引き上げられ、今後も改善が期待されます。',
  },
  {
    question: '保育士の年収を上げるには？',
    answer:
      '主な方法は3つあります。①キャリアアップ研修を受講し役職（副主任・専門リーダー等）を目指す（月額5千円〜4万円の手当）②公立保育園への転職（地方公務員として安定昇給）③借り上げ社宅制度の活用（東京都は最大月8.2万円補助＝年間約100万円相当）',
  },
  {
    question: '公立と私立、どちらが年収が高い？',
    answer:
      '長期的には公立が高くなる傾向です。公立は地方公務員のため昇給が見込め、役職が付くと私立より70〜100万円高くなることもあります。ただし採用試験があり、公立保育園の民営化も進んでいます。',
  },
];

export default function NurseryClient() {
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

  const summary = useMemo(() => {
    return {
      averageAnnual: '約407万円',
      monthly: '月給 27万7,200円',
      bonus: '賞与 74万1,700円',
      diff: '約19万円 低い',
      allJobs: '全職種平均（426万円）との差',
      note: '処遇改善により10年間で約25%上昇',
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] container-main">
      <div className="max-w-7xl mx-auto md:flex md:items-start md:gap-8">
        <div className="space-y-8 md:space-y-12 md:max-w-[800px] md:w-full">
          <nav className="breadcrumb mb-3">
            <Link href="/">ホーム</Link> {'>'} 業種別 {'>'} 保育士の年収・手取り
          </nav>
          <h1 className="page-title">保育士の年収・手取り計算</h1>

          {/* リード文 */}
          <Card>
            <H2>📌 まずは平均年収の目安</H2>
            <p className="text-body leading-relaxed">
              保育士の平均年収は{summary.averageAnnual}です。処遇改善により年収は上昇傾向にあり、借り上げ社宅制度などの支援策を活用すると実質負担を抑えやすくなります。
            </p>
            <p className="text-small mt-3">出典: 厚生労働省「賃金構造基本統計調査」（2024年度）</p>
          </Card>

          {/* 平均年収サマリー */}
          <Card>
            <H2>📌 保育士の平均年収サマリー</H2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">平均年収</p>
                <p className="text-3xl font-black text-[#0a57d1]">{summary.averageAnnual}</p>
                <p className="text-small mt-2">{summary.monthly}</p>
                <p className="text-small mt-1">{summary.bonus}</p>
              </div>
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">{summary.allJobs}</p>
                <p className="text-3xl font-black text-[#0a57d1]">{summary.diff}</p>
                <p className="text-small mt-2">{summary.note}</p>
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
                    placeholder="350"
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
                    placeholder="450"
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

          {/* 勤務先別年収比較 */}
          <section className="space-y-4">
            <H2>🏷️ 勤務先別 年収比較</H2>
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

