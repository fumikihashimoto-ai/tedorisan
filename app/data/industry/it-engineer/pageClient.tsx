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
  { age: '20代後半', salary: 420, takeHome: 340 },
  { age: '30代', salary: 500, takeHome: 395 },
  { age: '40代', salary: 620, takeHome: 480 },
  { age: '50代', salary: 685, takeHome: 525 },
];

type WorkplaceRow = {
  name: string;
  range: string;
  description: string;
};

const WORKPLACE_DATA: WorkplaceRow[] = [
  {
    name: '外資系IT企業',
    range: '700〜1,500万円',
    description: '成果主義で高年収。英語力や専門性が求められる',
  },
  {
    name: '大手SIer・自社開発',
    range: '550〜800万円',
    description: '上流工程・マネジメントで上振れしやすい',
  },
  {
    name: '中堅SIer・受託開発',
    range: '400〜600万円',
    description: '案件や商流（元請け/下請け）により差が出やすい',
  },
  {
    name: 'SES',
    range: '300〜500万円',
    description: '未経験からの入口。スキル次第でキャリアアップ可能',
  },
];

type FaqRow = {
  question: string;
  answer: string;
};

const FAQ_DATA: FaqRow[] = [
  {
    question: 'ITエンジニアの年収は他の職種と比べて高い？',
    answer:
      'ITエンジニアの平均年収は約462万円で、全職種平均（約426万円）より約36万円高いです。IT人材不足を背景に、スキルや経験次第でさらに高い年収を目指せる職種です。',
  },
  {
    question: '年収を上げるにはどうすればいい？',
    answer:
      '主な方法は3つあります。①上流工程（設計・PM）へのキャリアアップ、②クラウド・AI・セキュリティなど高需要スキルの習得、③大手SIerや外資系企業への転職です。特に外資系IT企業では年収1,000万円以上も珍しくありません。',
  },
  {
    question: 'SESと自社開発、どちらが年収が高い？',
    answer:
      '一般的に自社開発企業や大手SIerの方が年収は高い傾向にあります。ただし、SESでも商流の上位（元請けに近い）で働いたり、専門スキルを磨くことで500万円以上の年収は十分可能です。',
  },
];

export default function ItEngineerClient() {
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
    <div className="min-h-screen bg-[#f5f5f5] container-main pb-20">
      <div className="max-w-7xl mx-auto md:flex md:items-start md:gap-8">
        <div className="space-y-8 md:space-y-12 md:max-w-[800px] md:w-full">
          <nav className="breadcrumb mb-3">
            <Link href="/">ホーム</Link> {'>'} 業種別 {'>'} ITエンジニア
          </nav>
          <h1 className="page-title">ITエンジニアの年収・手取り計算</h1>

          {/* 平均年収サマリー */}
          <Card>
            <H2>📌 ITエンジニアの平均年収サマリー</H2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">平均年収</p>
                <p className="text-3xl font-black text-[#0a57d1]">約462万円</p>
              </div>
              <div className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-4">
                <p className="text-caption mb-1">全職種平均（約426万円）との差</p>
                <p className="text-3xl font-black text-[#0a57d1]">約36万円 高い</p>
              </div>
            </div>

            <p className="text-small mt-4">出典: doda「平均年収ランキング」2024年版</p>
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
                    placeholder="500"
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

          {/* 広告1: あなたの年収レベルの最下部に表示（年代別年収テーブルの下部） */}
          <div className="my-4 flex justify-center">
            <a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4ASQ2A+3IZO+I1NCH" rel="nofollow">
              <img
                width={300}
                height={250}
                alt=""
                src="https://www27.a8.net/svt/bgt?aid=260126641260&wid=001&eno=01&mid=s00000016458003031000&mc=1"
                className="border-0"
              />
            </a>
            <img
              width={1}
              height={1}
              src="https://www17.a8.net/0.gif?a8mat=4AVF01+4ASQ2A+3IZO+I1NCH"
              alt=""
              className="border-0"
            />
          </div>

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

