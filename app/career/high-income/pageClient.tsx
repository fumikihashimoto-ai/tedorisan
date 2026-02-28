'use client';

import { useMemo, useState } from 'react';
import { Card, FaqAccordion, InputField, PrimaryButton, ResultAmount, ResultRow } from '@/app/components/ui';
import ArticleBodySection from '@/app/components/v2/article/ArticleBodySection';
import ArticleSectionHeading from '@/app/components/v2/article/ArticleSectionHeading';
import ArticleParagraph from '@/app/components/v2/article/ArticleParagraph';
import ArticleTable from '@/app/components/v2/article/ArticleTable';
import PointHeaderBox from '@/app/components/v2/article/PointHeaderBox';
import { calculateTakeHome } from '@/lib/salaryCalculator';

const CONTENT_LAYOUT = true;

type QuickRow = {
  annualMan: number;
  takeHomeMan: number;
  rate: string;
  taxAndSocialMan: number;
};

const QUICK_TABLE: QuickRow[] = [
  { annualMan: 1000, takeHomeMan: 720, rate: '72%', taxAndSocialMan: 280 },
  { annualMan: 1100, takeHomeMan: 775, rate: '70%', taxAndSocialMan: 325 },
  { annualMan: 1200, takeHomeMan: 830, rate: '69%', taxAndSocialMan: 370 },
  { annualMan: 1300, takeHomeMan: 880, rate: '68%', taxAndSocialMan: 420 },
  { annualMan: 1400, takeHomeMan: 930, rate: '66%', taxAndSocialMan: 470 },
  { annualMan: 1500, takeHomeMan: 1000, rate: '67%', taxAndSocialMan: 500 },
  { annualMan: 1800, takeHomeMan: 1150, rate: '64%', taxAndSocialMan: 650 },
  { annualMan: 2000, takeHomeMan: 1270, rate: '64%', taxAndSocialMan: 730 },
  { annualMan: 2500, takeHomeMan: 1530, rate: '61%', taxAndSocialMan: 970 },
  { annualMan: 3000, takeHomeMan: 1800, rate: '60%', taxAndSocialMan: 1200 },
];

type BreakdownRow = { label: string; annualMan: string; rate: string };

const EXAMPLE_BREAKDOWN_1000: BreakdownRow[] = [
  { label: '所得税', annualMan: '約85万円', rate: '8.5%' },
  { label: '住民税', annualMan: '約61万円', rate: '6.1%' },
  { label: '健康保険料', annualMan: '約50万円', rate: '5.0%' },
  { label: '厚生年金保険料', annualMan: '約71万円', rate: '7.1%' },
  { label: '雇用保険料', annualMan: '約6万円', rate: '0.6%' },
];

type ProgressiveRow = { range: string; rate: string; deduction: string };

const PROGRESSIVE_TAX_TABLE: ProgressiveRow[] = [
  { range: '195万円以下', rate: '5%', deduction: '0円' },
  { range: '195〜330万円', rate: '10%', deduction: '97,500円' },
  { range: '330〜695万円', rate: '20%', deduction: '427,500円' },
  { range: '695〜900万円', rate: '23%', deduction: '636,000円' },
  { range: '900〜1,800万円', rate: '33%', deduction: '1,536,000円' },
  { range: '1,800〜4,000万円', rate: '40%', deduction: '2,796,000円' },
  { range: '4,000万円超', rate: '45%', deduction: '4,796,000円' },
];

const TOP10 = [
  'M&A仲介 - 平均1,200〜2,000万円',
  '外資系金融 - 平均1,000〜2,000万円',
  '総合商社 - 平均1,200〜1,500万円',
  'コンサルティング - 平均800〜1,500万円',
  '大手デベロッパー - 平均1,000〜1,500万円',
  'MR（医薬品営業） - 平均800〜1,200万円',
  'IT企業（外資系） - 平均800〜1,500万円',
  '医師 - 平均1,000〜2,000万円',
  'パイロット - 平均1,500〜2,000万円',
  '弁護士（大手事務所） - 平均1,000〜1,500万円',
];

type FaqRow = { question: string; answer: string };

const FAQ_DATA: FaqRow[] = [
  {
    question: '年収1000万円でも生活が苦しいって本当？',
    answer:
      '手取りは約720万円（月60万円）で、決して少なくありません。ただし、高収入になると児童手当の所得制限、配偶者控除の適用外、高額療養費の自己負担増など、様々な「壁」があります。また、生活水準を上げすぎると余裕がなくなるケースもあります。',
  },
  {
    question: '年収が100万円上がると手取りはいくら増える？',
    answer:
      '年収1000万円帯では、100万円増えても手取りは約50〜60万円程度しか増えません。累進課税により、稼いだ分の約40〜50%が税金・社保で引かれるためです。',
  },
  {
    question: '年収1000万円超えの人は日本に何%いる？',
    answer:
      '国税庁の調査によると、給与所得者で年収1000万円超は全体の約5.4%です。年収2000万円超は約0.5%とさらに少数派になります。',
  },
  {
    question: '年収1000万円を目指すにはどうすれば？',
    answer:
      '主なルートは3つあります。①高年収業界への転職（金融、コンサル、IT外資など）②専門性を高めて昇進（管理職、スペシャリスト）③副業・起業で収入源を増やす',
  },
];

function formatJPY(value: number) {
  return new Intl.NumberFormat('ja-JP').format(value);
}

export default function HighIncomeClient() {
  const [annualSalaryMan, setAnnualSalaryMan] = useState<string>('1000');
  const [dependents, setDependents] = useState<string>('0');
  const [result, setResult] = useState<ReturnType<typeof calculateTakeHome> | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const onCalculate = () => {
    const man = parseFloat(annualSalaryMan);
    const dep = Math.max(0, parseInt(dependents, 10) || 0);
    if (!Number.isFinite(man) || man <= 0) return;

    setResult(calculateTakeHome(Math.round(man * 10000), dep));
  };

  const calcSummary = useMemo(() => {
    if (!result) return null;
    const takeHomeMan = Math.round(result.takeHome / 10000);
    const monthlyMan = Math.round(result.monthlyTakeHome / 10000);
    const incomeTaxMan = Math.round(result.breakdown.incomeTax / 10000);
    const residentTaxMan = Math.round(result.breakdown.residentTax / 10000);
    const socialMan = Math.round(result.breakdown.socialInsurance / 10000);
    const totalMan = incomeTaxMan + residentTaxMan + socialMan;
    return { takeHomeMan, monthlyMan, incomeTaxMan, residentTaxMan, socialMan, totalMan, effectiveTaxRate: result.effectiveTaxRate };
  }, [result]);

  return (
    <div className="space-y-8 md:space-y-12">
      <PointHeaderBox title="年収1000万円を超えても、どれだけ引かれる？" bodyVariant="highlight">
        <ArticleParagraph className="mb-0">
          年収1000万円でも手取りは約720万円（目安）です。高年収帯は累進課税と社会保険料の影響が大きく、「上がった年収ほど手取りが増えにくい」状態になりやすいのが現実です。
        </ArticleParagraph>
      </PointHeaderBox>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>手取りシミュレーター（高年収向け）</ArticleSectionHeading>

            <Card as="div" className="mb-6">
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 text-base mb-2">年収</label>
                <p className="font-['Noto_Sans_JP'] text-[14px] leading-[25px] mb-2">1000〜5000万円を想定（概算）</p>
                <div className="relative">
                  <InputField
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={annualSalaryMan}
                    onChange={(e) => setAnnualSalaryMan(e.target.value)}
                    className="pr-12"
                    placeholder="1000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">万円</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-semibold text-gray-900 text-base mb-2">扶養人数</label>
                <p className="font-['Noto_Sans_JP'] text-[14px] leading-[25px] mb-2">扶養している家族の人数を入力してください</p>
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

              <PrimaryButton type="button" onClick={onCalculate} className="mt-2">
                計算する
              </PrimaryButton>
            </Card>

            {result && calcSummary && (
              <Card as="div" className="mt-6">
                <div className="text-center">
                  <div className="result-label">あなたの年間手取り額は…</div>
                  <ResultAmount className="mt-2">約 {calcSummary.takeHomeMan}<span className="text-base font-normal ml-1">万円</span></ResultAmount>
                  <p className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] mt-2 mb-0">月の手取り目安: 約 {calcSummary.monthlyMan}万円</p>
                  <p className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] mt-1 mb-0">実効負担率（税金＋社保）: {calcSummary.effectiveTaxRate}</p>
                </div>

                <div
                  className="text-center text-blue-600 cursor-pointer py-2 mt-4"
                  onClick={() => setShowDetails((v) => !v)}
                >
                  {showDetails ? '[-] 内訳を閉じる' : '[+] 税金・社保の内訳を見る'}
                </div>

                {showDetails && (
                  <div className="mt-4 space-y-0">
                    <ResultRow label="所得税（概算）" value={`${calcSummary.incomeTaxMan}万円`} valueClassName="text-right" />
                    <ResultRow label="住民税（概算）" value={`${calcSummary.residentTaxMan}万円`} valueClassName="text-right" />
                    <ResultRow label="社会保険料（概算）" value={`${calcSummary.socialMan}万円`} valueClassName="text-right" />
                    <ResultRow
                      label="合計（税金＋社保）"
                      value={`${calcSummary.totalMan}万円`}
                      className="font-bold border-t-2 border-[#E2E8F0]"
                      valueClassName="text-right"
                    />
                  </div>
                )}
              </Card>
            )}
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>年収別 手取り早見表（目安）</ArticleSectionHeading>
        <p className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] mb-3">※ 40歳未満、扶養なし、東京都の場合の目安</p>
        <ArticleTable
          headers={['年収', '手取り目安', '手取り率', '税金+社保']}
          data={QUICK_TABLE.map((r) => [`${formatJPY(r.annualMan)}万円`, `約${formatJPY(r.takeHomeMan)}万円`, r.rate, `約${formatJPY(r.taxAndSocialMan)}万円`])}
          headerAlign="right"
          dataAlign="right"
          contentLayout={CONTENT_LAYOUT}
          noMargin
        />
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>🧾 税金・社会保険料の内訳（年収1000万円の例）</ArticleSectionHeading>
        <ArticleTable
          headers={['項目', '金額（年間）', '割合']}
          data={[...EXAMPLE_BREAKDOWN_1000.map((r) => [r.label, r.annualMan, r.rate]), ['合計', '約273万円', '27.3%']]}
          headerAlign="left"
          dataAlign="right"
          contentLayout={CONTENT_LAYOUT}
          noMargin
        />
        <p className="font-['Noto_Sans_JP'] text-[12px] leading-[25px] mt-3 mb-0">※ あくまで目安です（控除・地域・年齢・加入保険で変動します）。</p>
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>累進課税（所得税）の仕組み</ArticleSectionHeading>
        <ArticleParagraph className="mb-3">
          「年収が上がるほど全部が高い税率になる」わけではなく、課税所得のレンジごとに税率が段階的に上がります。結果として高年収帯は手取りの伸びが鈍くなりやすいです。
        </ArticleParagraph>
        <ArticleTable
          headers={['課税所得', '税率', '控除額']}
          data={PROGRESSIVE_TAX_TABLE.map((r) => [r.range, r.rate, r.deduction])}
          headerAlign="left"
          dataAlign="right"
          contentLayout={CONTENT_LAYOUT}
          noMargin
        />
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>年収1000万円を超える職業・業界 TOP10</ArticleSectionHeading>
        <ol className="list-decimal pl-5 space-y-2 font-['Noto_Sans_JP'] text-[14px] leading-[25px]">
          {TOP10.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>高年収者向け 節税対策（具体例）</ArticleSectionHeading>
        <div className="space-y-4 font-['Noto_Sans_JP'] text-[14px] leading-[25px]">
          <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-white">
            <p className="font-semibold text-[#1E293B] mb-2">iDeCo（個人型確定拠出年金）</p>
            <ArticleParagraph className="mb-0">年間最大27.6万円の所得控除。年収1000万円なら年間約8〜11万円の節税効果が目安です。</ArticleParagraph>
          </div>
          <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-white">
            <p className="font-semibold text-[#1E293B] mb-2">ふるさと納税</p>
            <ArticleParagraph className="mb-0">年収1000万円なら上限約18万円。実質2,000円で返礼品を受け取れます。</ArticleParagraph>
          </div>
          <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-white">
            <p className="font-semibold text-[#1E293B] mb-2">住宅ローン控除</p>
            <ArticleParagraph className="mb-0">年間最大35万円の税額控除（新築の場合）。13年間適用可能です。</ArticleParagraph>
          </div>
          <div className="border-2 border-[#E2E8F0] rounded-2xl p-4 bg-white">
            <p className="font-semibold text-[#1E293B] mb-2">生命保険料控除</p>
            <ArticleParagraph className="mb-0">年間最大12万円の所得控除。家計の保障と合わせて検討しやすいです。</ArticleParagraph>
          </div>
        </div>
      </ArticleBodySection>

      <ArticleBodySection contentLayout={CONTENT_LAYOUT}>
        <ArticleSectionHeading>よくある質問（FAQ）</ArticleSectionHeading>
        <FaqAccordion items={FAQ_DATA} />
      </ArticleBodySection>
    </div>
  );
}

