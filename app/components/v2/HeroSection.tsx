'use client';

import { useState } from 'react';
import Link from 'next/link';

/** 年代別の平均手取り（万円） */
const AVG_TEDORI: Record<string, number> = {
  '20': 21,
  '30': 24,
  '40': 26,
};

/** 年代ラベル */
const AGE_LABELS: Record<string, string> = {
  '20': '20代',
  '30': '30代',
  '40': '40代以上',
};

export function HeroSection() {
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [result, setResult] = useState<{
    tedori: number;
    age: string;
    diff: number;
  } | null>(null);

  const handleCalc = () => {
    if (!age || !salary) return;
    const num = parseFloat(salary);
    if (isNaN(num) || num <= 0) return;
    const tedori = Math.round(num * 0.78);
    const avg = AVG_TEDORI[age] ?? 21;
    setResult({ tedori, age, diff: tedori - avg });
  };

  return (
    <section
      className="w-full"
      style={{ backgroundColor: '#1390c8', padding: '40px 24px' }}
    >
      {/* タイトル */}
      <p
        className="font-['Noto_Sans_JP'] text-center mb-5"
        style={{
          color: '#ffffff',
          fontSize: '18px',
          fontWeight: 700,
        }}
      >
        <span className="sm:text-[22px]">＼手取り額を今すぐチェック／</span>
      </p>

      {/* フォームカード */}
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: '560px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '24px',
        }}
      >
        {/* 年代セレクト */}
        <label className="block font-['Noto_Sans_JP'] text-[14px] font-bold text-[#3f3f3f] mb-2">
          年代を選択してください
        </label>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="block w-full font-['Noto_Sans_JP'] text-[14px] text-[#3f3f3f] mb-4"
          style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="">選択してください</option>
          <option value="20">20代</option>
          <option value="30">30代</option>
          <option value="40">40代以上</option>
        </select>

        {/* 月収入力 */}
        <label className="block font-['Noto_Sans_JP'] text-[14px] font-bold text-[#3f3f3f] mb-2">
          月収（万円）を入力してください。
        </label>
        <input
          type="number"
          inputMode="decimal"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="例：25"
          className="block w-full font-['Noto_Sans_JP'] text-[14px] text-[#3f3f3f] mb-5"
          style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        {/* 計算ボタン */}
        <button
          type="button"
          onClick={handleCalc}
          className="block w-full font-['Noto_Sans_JP'] cursor-pointer"
          style={{
            backgroundColor: '#FF677E',
            color: '#ffffff',
            padding: '14px',
            fontSize: '16px',
            fontWeight: 700,
            borderRadius: '8px',
            border: 'none',
          }}
        >
          手取りを確認する
        </button>

        {/* 結果エリア */}
        {result && (
          <div
            style={{
              border: '2px solid #FF677E',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              padding: '20px',
              marginTop: '16px',
            }}
          >
            {/* 推定手取り額 */}
            <p className="font-['Noto_Sans_JP'] text-[18px] text-[#3f3f3f] text-center">
              推定手取り額は…
              <br />
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#1390c8',
                  textDecoration: 'underline',
                }}
              >
                約{result.tedori}万円
              </span>
              です。
            </p>

            {/* 平均比較テキスト */}
            <p
              className="font-['Noto_Sans_JP'] text-center mt-2"
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: result.diff >= 0 ? '#FF677E' : '#348BC6',
              }}
            >
              {result.diff > 0
                ? `【${AGE_LABELS[result.age]}平均より${result.diff}万円高い！】`
                : result.diff === 0
                  ? `【${AGE_LABELS[result.age]}の平均水準です】`
                  : `【${AGE_LABELS[result.age]}平均より${Math.abs(result.diff)}万円低い】`}
            </p>

            {/* お役立ち情報 */}
            <p
              className="font-['Noto_Sans_JP'] text-center"
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3f3f3f',
                margin: '16px 0 12px',
              }}
            >
              手取りアップのお役立ち情報はこちら！
            </p>

            {/* 3つのボタン */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '転職する', href: '/articles/career-change' },
                { label: '資格取得', href: '/articles/skill-up' },
                { label: '節税する', href: '/articles/salary-basics' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-center font-['Noto_Sans_JP']"
                  style={{
                    backgroundColor: '#FF677E',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '8px',
                    padding: '10px 0',
                    fontSize: '14px',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
