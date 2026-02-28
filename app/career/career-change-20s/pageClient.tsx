'use client';

import { useMemo, useState } from 'react';
import { Card, FaqAccordion, InputField, PrimaryButton, ResultAmount, ResultRow } from '@/app/components/ui';
import ArticleBodySection from '@/app/components/v2/article/ArticleBodySection';
import ArticleSectionHeading from '@/app/components/v2/article/ArticleSectionHeading';
import ArticleParagraph from '@/app/components/v2/article/ArticleParagraph';
import ArticleTable from '@/app/components/v2/article/ArticleTable';
import PointHeaderBox from '@/app/components/v2/article/PointHeaderBox';
import { calculateTakeHome } from '@/lib/salaryCalculator';
import CustomSelect, { type CustomSelectOption } from '@/app/components/CustomSelect';

const CONTENT_LAYOUT = true;

type AvgIncomeRow = { label: string; average: string; median: string };
const AVG_INCOME_TABLE: AvgIncomeRow[] = [
  { label: '20代全体', average: '365万円', median: '350万円' },
  { label: '20代前半（20〜24歳）', average: '267万円', median: '280万円' },
  { label: '20代後半（25〜29歳）', average: '394万円', median: '400万円' },
  { label: '20代男性', average: '392万円', median: '360万円' },
  { label: '20代女性', average: '341万円', median: '300万円' },
];

type ChangeRow = { label: string; value: string };
const CHANGE_TABLE: ChangeRow[] = [
  { label: '転職で年収アップした割合', value: '約40〜45%' },
  { label: '転職で年収維持の割合', value: '約35%' },
  { label: '転職で年収ダウンした割合', value: '約20〜25%' },
  { label: '転職による平均年収増加額', value: '+17〜22万円' },
  { label: '転職前の平均年収（20代）', value: '約415万円' },
  { label: '転職後の平均年収（20代）', value: '約432万円' },
];

type AgeQuickRow = { age: number; salary: number; takeHome: number; monthly: number };
const AGE_QUICK_TABLE: AgeQuickRow[] = [
  { age: 22, salary: 280, takeHome: 230, monthly: 19 },
  { age: 23, salary: 300, takeHome: 245, monthly: 20 },
  { age: 24, salary: 320, takeHome: 260, monthly: 22 },
  { age: 25, salary: 350, takeHome: 285, monthly: 24 },
  { age: 26, salary: 370, takeHome: 300, monthly: 25 },
  { age: 27, salary: 390, takeHome: 315, monthly: 26 },
  { age: 28, salary: 410, takeHome: 330, monthly: 28 },
  { age: 29, salary: 430, takeHome: 345, monthly: 29 },
];

type TopIndustryRow = { rank: string; name: string; salary: string };
const TOP_INDUSTRY_TABLE: TopIndustryRow[] = [
  { rank: '1位', name: '金融（投資・証券）', salary: '450〜550万円' },
  { rank: '2位', name: 'コンサルティング', salary: '450〜600万円' },
  { rank: '3位', name: 'IT・通信', salary: '380〜480万円' },
  { rank: '4位', name: '総合商社', salary: '400〜500万円' },
  { rank: '5位', name: 'メーカー（電機・自動車）', salary: '380〜450万円' },
  { rank: '6位', name: '不動産', salary: '350〜450万円' },
  { rank: '7位', name: '広告・メディア', salary: '350〜420万円' },
  { rank: '8位', name: '建設・プラント', salary: '340〜420万円' },
  { rank: '9位', name: '医療・製薬', salary: '350〜450万円' },
  { rank: '10位', name: '人材サービス', salary: '330〜400万円' },
];

type FaqRow = { question: string; answer: string };
const FAQ_DATA: FaqRow[] = [
  {
    question: '20代で転職すると年収は下がる？',
    answer:
      'いいえ、約40〜45%の人が年収アップに成功しています。20代は転職市場で需要が高く、特に25〜29歳で転職した人の約46%が年収アップしているデータがあります。ただし、未経験業界へのキャリアチェンジでは一時的に下がることもあります。',
  },
  {
    question: '20代前半と後半、転職に有利なのは？',
    answer:
      '採用企業の需要という観点では、どちらも高いです。20代前半はポテンシャルとして将来性を評価されやすく、20代後半は即戦力として経験・スキルを評価されやすい傾向があります。年収アップ幅は20代後半の方が大きくなりやすいです。',
  },
  {
    question: '第二新卒でも年収アップできる？',
    answer:
      '可能です。第二新卒（新卒入社後1〜3年程度）でも、業界・企業選びによって年収アップは十分可能です。特に、年収水準の低い業界から高い業界（IT、コンサル、金融など）への転職は効果的です。',
  },
  {
    question: '20代で年収500万円は可能？',
    answer:
      '可能です。20代で年収500万円以上の人は全体の約15%程度存在します。コンサル、金融、IT（外資系含む）などの業界、または営業職で成果を出すことで到達可能です。',
  },
  {
    question: '転職回数が多いと年収に影響する？',
    answer:
      '2〜3回程度であれば大きな影響はありません。ただし、短期間（1年未満）での転職を繰り返すと定着しない人材と見なされ、年収交渉で不利になる可能性があります。転職理由をポジティブに説明できることが重要です。',
  },
];

const AGE_OPTIONS: CustomSelectOption[] = Array.from({ length: 8 }).map((_, i) => {
  const age = 22 + i;
  return { value: String(age), label: `${age}歳` };
});

const DEPENDENTS_OPTIONS: CustomSelectOption[] = [
  { value: '0', label: '0人' },
  { value: '1', label: '1人' },
  { value: '2', label: '2人' },
  { value: '3', label: '3人' },
];

export default function CareerChange20sClient() {
  const [currentSalaryMan, setCurrentSalaryMan] = useState<string>('350');
  const [newSalaryMan, setNewSalaryMan] = useState<string>('400');
  const [age, setAge] = useState<string>('25');
  const [dependents, setDependents] = useState<string>('0');
  const [result, setResult] = useState<{
    current: ReturnType<typeof calculateTakeHome> | null;
    next: ReturnType<typeof calculateTakeHome> | null;
  }>({ current: null, next: null });
  const [showDetails, setShowDetails] = useState(false);

  const onCalculate = () => {
    const current = parseFloat(currentSalaryMan);
    const next = parseFloat(newSalaryMan);
    const dep = Math.max(0, parseInt(dependents, 10) || 0);
    if (!Number.isFinite(current) || !Number.isFinite(next) || current <= 0 || next <= 0) return;

    setResult({
      current: calculateTakeHome(Math.round(current * 10000), dep),
      next: calculateTakeHome(Math.round(next * 10000), dep),
    });
  };

  const diffYen = result.current && result.next ? result.next.takeHome - result.current.takeHome : 0;
  const diffMan = Math.round(diffYen / 10000);

  const currentMan = useMemo(() => (result.current ? Math.round(result.current.takeHome / 10000) : 0), [result.current]);
  const nextMan = useMemo(() => (result.next ? Math.round(result.next.takeHome / 10000) : 0), [result.next]);
  const currentMonthlyMan = useMemo(
    () => (result.current ? Math.round(result.current.monthlyTakeHome / 10000) : 0),
    [result.current],
  );
  const nextMonthlyMan = useMemo(
    () => (result.next ? Math.round(result.next.monthlyTakeHome / 10000) : 0),
    [result.next],
  );

  return (
    <div className="space-y-8 md:space-y-12">
      <PointHeaderBox title="20代の平均年収と、転職でどれくらい変わる？" bodyVariant="highlight">
        <ArticleParagraph className="mb-0">
          20代の平均年収は365万円です。転職では約40%が年収アップに成功している一方、職種・業界チェンジの内容によっては一時的に下がるケースもあります。まずは転職前後の手取りを比較して、現実的な目標を作りましょう。
        </ArticleParagraph>
        <p className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] text-[var(--color-v2-text)] mt-3 mb-0">出典: doda平均年収ランキング2025 / 国税庁 民間給与実態統計調査 / マイナビ転職動向調査2024年版</p>
      </PointHeaderBox>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>20代の平均年収データ（2025年版）</ArticleSectionHeading>
        <ArticleTable
          headers={['区分', '平均年収', '中央値']}
          data={AVG_INCOME_TABLE.map((r) => [r.label, r.average, r.median])}
          headerAlign="left"
          dataAlign="left"
          contentLayout={CONTENT_LAYOUT}
          noMargin
        />
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>転職前後の手取り比較シミュレーター</ArticleSectionHeading>

            <Card as="div" className="mb-6">
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 text-base mb-2">現在の年収</label>
                <p className="font-['Noto_Sans_JP'] text-[14px] leading-[25px] mb-2">万円単位で入力</p>
                <div className="relative">
                  <InputField
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={currentSalaryMan}
                    onChange={(e) => setCurrentSalaryMan(e.target.value)}
                    className="pr-12"
                    placeholder="350"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">万円</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-semibold text-gray-900 text-base mb-2">転職後の希望年収</label>
                <p className="font-['Noto_Sans_JP'] text-[14px] leading-[25px] mb-2">万円単位で入力</p>
                <div className="relative">
                  <InputField
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={newSalaryMan}
                    onChange={(e) => setNewSalaryMan(e.target.value)}
                    className="pr-12"
                    placeholder="400"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">万円</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-900 text-base mb-2">年齢</label>
                  <p className="font-['Noto_Sans_JP'] text-[14px] leading-[25px] mb-2">22〜29歳</p>
                  <CustomSelect options={AGE_OPTIONS} value={age} onChange={setAge} placeholder="年齢を選択" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-900 text-base mb-2">扶養人数</label>
                  <p className="font-['Noto_Sans_JP'] text-[14px] leading-[25px] mb-2">0〜3人</p>
                  <CustomSelect options={DEPENDENTS_OPTIONS} value={dependents} onChange={setDependents} placeholder="扶養人数を選択" />
                </div>
              </div>

              <PrimaryButton type="button" onClick={onCalculate} className="mt-6">
                計算する
              </PrimaryButton>
              <p className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] mt-3 mb-0">※ 年齢は目安の文脈表示用です。手取り計算は概算（扶養人数のみ反映）です。</p>
            </Card>

            {result.current && result.next && (
              <Card as="div" className="mt-6">
                <div className="text-center">
                  <div className="result-label">転職後の年間手取り差額は…</div>
                  <ResultAmount tone={diffMan >= 0 ? 'positive' : 'negative'} className="mt-2">
                    約 {diffMan >= 0 ? '+' : ''}
                    {diffMan}
                    <span className="text-base font-normal ml-1">万円</span>
                  </ResultAmount>
                  <p className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] mt-2 mb-0">年齢: {age}歳 / 扶養人数: {dependents}人</p>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-6">
                  <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-[#F8FAFC]">
                    <div className="font-['Noto_Sans_JP'] text-[12px] leading-[25px]">転職前（年間手取り）</div>
                    <div className="mt-1 font-black text-[#1E293B] text-2xl">{currentMan}万円</div>
                    <div className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] mt-1">月 {currentMonthlyMan}万円</div>
                  </div>
                  <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-[#e8f0fe]">
                    <div className="font-['Noto_Sans_JP'] text-[12px] leading-[25px]">転職後（年間手取り）</div>
                    <div className="mt-1 font-black text-[#2563EB] text-2xl">{nextMan}万円</div>
                    <div className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] mt-1">月 {nextMonthlyMan}万円</div>
                  </div>
                  <div
                    className={`border-2 border-[#E2E8F0] rounded-2xl p-4 ${
                      diffMan >= 0 ? 'bg-[#ecfdf5]' : 'bg-[#fef2f2]'
                    }`}
                  >
                    <div className="font-['Noto_Sans_JP'] text-[12px] leading-[25px]">差額（年間）</div>
                    <div className={`mt-1 font-black text-2xl ${diffMan >= 0 ? 'text-[#2563EB]' : 'text-[#dc2626]'}`}>
                      {diffMan >= 0 ? '+' : ''}
                      {diffMan}万円
                    </div>
                    <div className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] mt-1">目安（概算）</div>
                  </div>
                </div>

                <div
                  className="text-center text-blue-600 cursor-pointer py-2 mt-4"
                  onClick={() => setShowDetails((v) => !v)}
                >
                  {showDetails ? '[-] 内訳を閉じる' : '[+] 税金・社保の内訳（概算）を見る'}
                </div>

                {showDetails && (
                  <div className="mt-4 space-y-0">
                    <ResultRow
                      label="転職前：所得税（概算）"
                      value={`${Math.round(result.current.breakdown.incomeTax / 10000)}万円`}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="転職前：住民税（概算）"
                      value={`${Math.round(result.current.breakdown.residentTax / 10000)}万円`}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="転職前：社会保険料（概算）"
                      value={`${Math.round(result.current.breakdown.socialInsurance / 10000)}万円`}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="転職後：所得税（概算）"
                      value={`${Math.round(result.next.breakdown.incomeTax / 10000)}万円`}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="転職後：住民税（概算）"
                      value={`${Math.round(result.next.breakdown.residentTax / 10000)}万円`}
                      valueClassName="text-right"
                    />
                    <ResultRow
                      label="転職後：社会保険料（概算）"
                      value={`${Math.round(result.next.breakdown.socialInsurance / 10000)}万円`}
                      valueClassName="text-right"
                    />
                  </div>
                )}
              </Card>
            )}
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>20代 年齢別の平均年収・手取り早見表</ArticleSectionHeading>
        <ArticleTable
          headers={['年齢', '平均年収', '手取り目安', '月収手取り']}
          data={AGE_QUICK_TABLE.map((r) => [`${r.age}歳`, `${r.salary}万円`, `約${r.takeHome}万円`, `約${r.monthly}万円`])}
          headerAlign="right"
          dataAlign="right"
          contentLayout={CONTENT_LAYOUT}
          noMargin
        />
        <p className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] text-[var(--color-v2-text)] mt-3 mb-0">※ 手取りは概算の目安です（扶養/地域等で変動します）。</p>
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>20代転職者の年収変化データ</ArticleSectionHeading>
        <ArticleTable
          headers={['項目', '数値']}
          data={CHANGE_TABLE.map((r) => [r.label, r.value])}
          headerAlign="left"
          dataAlign="right"
          contentLayout={CONTENT_LAYOUT}
          noMargin
        />
        <p className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] text-[var(--color-v2-text)] mt-3 mb-0">出典: マイナビ転職動向調査 2024年版</p>
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>20代で年収が高い業界 TOP10</ArticleSectionHeading>
        <ArticleTable
          headers={['順位', '業界', '20代平均年収']}
          data={TOP_INDUSTRY_TABLE.map((r) => [r.rank, r.name, r.salary])}
          headerAlign="left"
          dataAlign="right"
          contentLayout={CONTENT_LAYOUT}
          noMargin
        />
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>20代で年収アップしやすい転職パターン</ArticleSectionHeading>
        <div className="space-y-3 font-['Noto_Sans_JP'] text-[14px] leading-[25px]">
          <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-white">
            <p className="font-semibold text-[#1E293B] mb-2">同業界×同職種（組織チェンジ）</p>
            <ArticleParagraph className="mb-0">経験・スキルをそのまま活かしやすく、年収アップ率が最も高い傾向です。大手企業や成長企業への転職が狙い目です。</ArticleParagraph>
          </div>
          <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-white">
            <p className="font-semibold text-[#1E293B] mb-2">同職種×異業界（業種チェンジ）</p>
            <ArticleParagraph className="mb-0">スキルを活かしつつ、年収水準の高い業界へ移る形です。例：小売営業→IT営業、事務→金融事務。</ArticleParagraph>
          </div>
          <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-white">
            <p className="font-semibold text-[#1E293B] mb-2">異職種×同業界（職種チェンジ）</p>
            <ArticleParagraph className="mb-0">業界知識を活かしながらキャリアチェンジ。例：営業→マーケティング、SE→PM。</ArticleParagraph>
          </div>
          <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-white">
            <p className="font-semibold text-[#1E293B] mb-2">異職種×異業界（フルチェンジ）</p>
            <ArticleParagraph className="mb-0">将来性を見据えた挑戦。短期的に年収が下がることもありますが、成長産業への未経験転職で伸びしろを狙えます。</ArticleParagraph>
          </div>
        </div>
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>20代転職の年収交渉ポイント</ArticleSectionHeading>
        <ol className="list-decimal pl-5 space-y-2 font-['Noto_Sans_JP'] text-[14px] leading-[25px]">
          <li>市場相場を把握する（同年代・同職種の相場を調査し、自分の市場価値を確認）</li>
          <li>希望年収は現年収の+10〜20%を目安に（20代なら+30〜50万円アップが現実的）</li>
          <li>交渉タイミングは内定後（選考中は避け、内定後に条件交渉）</li>
          <li>転職エージェントを活用（交渉代行・企業の予算感の把握がしやすい）</li>
        </ol>
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>よくある質問（FAQ）</ArticleSectionHeading>
        <FaqAccordion items={FAQ_DATA} />
      </ArticleBodySection>
    </div>
  );
}

