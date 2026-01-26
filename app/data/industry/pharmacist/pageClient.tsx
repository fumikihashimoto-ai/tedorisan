'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateTakeHome } from '@/lib/salaryCalculator';
import PcAdSidebar from '@/app/components/PcAdSidebar';
import { Card, H2, InputField, PrimaryButton, ResultAmount, ResultRow } from '@/app/components/ui';

type AgeRow = {
  label: string;
  annualMan: number;
  takeHomeMan: number;
};

const AGE_TABLE: AgeRow[] = [
  { label: '20代前半', annualMan: 387, takeHomeMan: 310 },
  { label: '20代後半', annualMan: 440, takeHomeMan: 352 },
  { label: '30代', annualMan: 525, takeHomeMan: 415 },
  { label: '40代', annualMan: 625, takeHomeMan: 485 },
  { label: '50代', annualMan: 675, takeHomeMan: 520 },
];

export default function PharmacistClient() {
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

  const increase =
    results.current && results.new ? results.new.takeHome - results.current.takeHome : 0;

  return (
    <div className="min-h-screen bg-[#f5f5f5] container-main">
      <div className="max-w-7xl mx-auto md:flex md:items-start md:gap-8">
        <div className="space-y-8 md:space-y-12 md:max-w-[800px] md:w-full">
          <nav className="breadcrumb mb-3">
            <Link href="/">ホーム</Link> {'>'} 業種別 {'>'} 薬剤師
          </nav>
          <h1 className="page-title">薬剤師の年収・手取り計算</h1>

        {/* 2. 薬剤師の平均年収サマリー */}
        <Card>
          <H2>📌 薬剤師の平均年収サマリー</H2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
              <p className="text-caption mb-1">平均年収</p>
              <p className="text-3xl font-black text-[#0a57d1]">約583万円</p>
            </div>
            <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
              <p className="text-caption mb-1">全職種平均（約460万円）との差</p>
              <p className="text-3xl font-black text-[#0a57d1]">約120万円 高い</p>
            </div>
          </div>

          <p className="text-small mt-4">
            出典: 厚生労働省「令和6年賃金構造基本統計調査」
          </p>
        </Card>

        {/* 3. 手取り計算フォーム */}
        <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 md:p-8 shadow-lg">
          <H2>🧮 手取り計算フォーム（転職比較）</H2>

          {/* 入力フォーム（転職検討者向けと同じスタイル） */}
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
                  placeholder="550"
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
              {/* 結果ヘッダー */}
              <div className="text-center">
                <div className="result-label">転職後の年間手取り増加額は…</div>
                <ResultAmount tone={increase >= 0 ? 'positive' : 'negative'} className="mt-2">
                  約 {increase >= 0 ? '+' : ''}
                  {Math.round(increase / 10000)}
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

        {/* 5. 年代別年収テーブル */}
        <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
          <h2 className="heading-h2">📊 年代別年収テーブル（目安）</h2>
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
                  <tr key={row.label} className="border-b border-[#e0e0e0]">
                    <td className="px-4 py-3 text-[#333333]">{row.label}</td>
                    <td className="px-4 py-3 text-right text-[#333333]">{row.annualMan}万円</td>
                    <td className="px-4 py-3 text-right font-semibold text-[#333333]">
                      {row.takeHomeMan}万円
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-small mt-3">※ 表の手取りは概算の目安です。</p>
        </section>

        {/* 4. 勤務先別年収比較（カード形式） */}
        <section className="space-y-4">
          <h2 className="heading-h2">🏷️ 勤務先別 年収比較</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-5 shadow-lg">
              <div className="text-2xl mb-2">🏭</div>
              <div className="font-bold text-[#1a1a1a] mb-1">製薬会社</div>
              <div className="text-[#333333] font-semibold">700〜1000万円</div>
              <div className="text-small mt-2">MR/本社職など含め上振れしやすい</div>
            </div>
            <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-5 shadow-lg">
              <div className="text-2xl mb-2">🏪</div>
              <div className="font-bold text-[#1a1a1a] mb-1">ドラッグストア</div>
              <div className="text-[#333333] font-semibold">500〜700万円</div>
              <div className="text-small mt-2">管理薬剤師・店長で上がりやすい</div>
            </div>
            <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-5 shadow-lg">
              <div className="text-2xl mb-2">💊</div>
              <div className="font-bold text-[#1a1a1a] mb-1">調剤薬局</div>
              <div className="text-[#333333] font-semibold">450〜600万円</div>
              <div className="text-small mt-2">地域差が出やすい</div>
            </div>
            <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-5 shadow-lg">
              <div className="text-2xl mb-2">🏥</div>
              <div className="font-bold text-[#1a1a1a] mb-1">病院</div>
              <div className="text-[#333333] font-semibold">400〜550万円</div>
              <div className="text-small mt-2">経験・役職で差が出る</div>
            </div>
          </div>
        </section>

        {/* 7. FAQ（3問） */}
        <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
          <h2 className="heading-h2">❓ よくある質問（FAQ）</h2>
          <div className="space-y-4">
            <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
              <p className="font-semibold text-[#1a1a1a] mb-2">Q1. 薬剤師の年収は他の職種と比べて高い？</p>
              <p className="text-body leading-relaxed">
                A. はい。薬剤師の平均年収（約580万円）は、全職種平均（約460万円）より約120万円高い水準です。
              </p>
            </div>
            <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
              <p className="font-semibold text-[#1a1a1a] mb-2">Q2. 年収を上げるにはどうすれば良い？</p>
              <p className="text-body leading-relaxed">
                A. 管理薬剤師への昇進、専門資格の取得、ドラッグストアや製薬会社への転職、地方での勤務などがあります。
              </p>
            </div>
            <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
              <p className="font-semibold text-[#1a1a1a] mb-2">Q3. 地方と都市部、どちらが年収が高い？</p>
              <p className="text-body leading-relaxed">
                A. 意外にも地方の方が高い傾向。薬剤師不足により高給与の求人が多いためです。
              </p>
            </div>
          </div>
        </section>
        </div>

        <PcAdSidebar />
      </div>
    </div>
  );
}

