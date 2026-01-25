'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PcAdSidebar from '@/app/components/PcAdSidebar';
import { Card, FaqAccordion, H2, InputField, PrimaryButton, ResultAmount, ResultRow } from '@/app/components/ui';
import { calculateTakeHome } from '@/lib/salaryCalculator';
import CustomSelect, { type CustomSelectOption } from '@/app/components/CustomSelect';

type StatRow = { label: string; value: string };
const STAT_TABLE: StatRow[] = [
  { label: '未経験転職で年収アップした割合（20代）', value: '約60%' },
  { label: '未経験転職の平均決定年収（20代）', value: '384万円' },
  { label: '5年前からの決定年収増加額', value: '+26万円' },
  { label: '未経験可求人の増加率（5年間）', value: '約4倍' },
];

type StartRow = { name: string; start: string; after3: string; after5: string };
const START_TABLE: StartRow[] = [
  { name: 'ITエンジニア', start: '300〜350万円', after3: '400〜450万円', after5: '500〜600万円' },
  { name: 'IT営業（SaaS等）', start: '350〜400万円', after3: '450〜550万円', after5: '550〜700万円' },
  { name: '一般営業職', start: '300〜380万円', after3: '380〜450万円', after5: '450〜550万円' },
  { name: '不動産営業', start: '300〜350万円', after3: '400〜600万円', after5: '500〜800万円+' },
  { name: '事務・アシスタント', start: '280〜320万円', after3: '320〜360万円', after5: '350〜400万円' },
  { name: '介護職', start: '280〜320万円', after3: '320〜380万円', after5: '380〜450万円' },
  { name: '建設・施工管理', start: '350〜400万円', after3: '450〜550万円', after5: '550〜700万円' },
  { name: '物流・ドライバー', start: '300〜380万円', after3: '380〜450万円', after5: '450〜550万円' },
  { name: '販売・サービス', start: '280〜320万円', after3: '320〜380万円', after5: '380〜450万円' },
  { name: 'クリエイター', start: '300〜350万円', after3: '380〜450万円', after5: '450〜550万円' },
];

type Top5Row = { rank: string; job: string; rate: string; note: string };
const TOP5_TABLE: Top5Row[] = [
  { rank: '1位', job: 'クリエイター・クリエイティブ職', rate: '高', note: '5年で平均決定年収+47万円' },
  { rank: '2位', job: '営業職', rate: '高', note: 'インセンティブで青天井も可能' },
  { rank: '3位', job: '事務・アシスタント職', rate: '中〜高', note: '安定した需要、スキルアップで昇給' },
  { rank: '4位', job: 'ITエンジニア', rate: '中〜高', note: '人材不足で需要高、スキル次第で急成長' },
  { rank: '5位', job: '施工管理', rate: '中', note: '資格取得で年収大幅アップ' },
];

type ToleranceRow = { range: string; level: string; idea: string };
const TOLERANCE_TABLE: ToleranceRow[] = [
  { range: '〜10%（30〜50万円）', level: '許容しやすい', idea: '生活水準を大きく変えずに済む' },
  { range: '10〜20%（50〜100万円）', level: '要検討', idea: '将来の年収成長見込みとの比較' },
  { range: '20%以上（100万円+）', level: '慎重に', idea: '3年後に元の年収を超えられるか' },
];

type FaqRow = { question: string; answer: string };
const FAQ_DATA: FaqRow[] = [
  {
    question: '未経験転職だと年収はどのくらい下がる？',
    answer:
      '一概には言えませんが、20代の未経験転職では約60%が年収アップに成功しています。下がる場合でも10〜20%程度が一般的です。ただし、これは選ぶ業界・職種によって大きく異なります。成長業界を選べば、未経験でも年収維持・アップは十分可能です。',
  },
  {
    question: '未経験転職で年収を下げないためにはどうすれば？',
    answer:
      '業界は変えても職種は活かす、または職種は変えても業界は活かすのどちらかを意識しましょう。完全に異業界・異職種への転職（フルチェンジ）は年収が下がりやすいですが、どちらかを軸にすれば年収を維持しやすくなります。',
  },
  {
    question: '30代でも未経験転職で年収アップできる？',
    answer:
      '可能ですが、20代と比較すると難易度は上がります。30代では即戦力を求められることが多いため、ポータブルスキル（マネジメント経験、数字管理能力など）を強くアピールすることが重要です。また、業界知識がある場合は、それを活かせる職種を選ぶと有利です。',
  },
  {
    question: '未経験でも高年収を狙える業界は？',
    answer:
      'IT業界、不動産営業、建設（施工管理）、金融（営業）が挙げられます。特にIT業界は人材不足で未経験採用に積極的であり、スキルを身につければ3〜5年で年収500万円以上も現実的です。不動産営業はインセンティブ次第で年収1000万円超えも可能です。',
  },
  {
    question: '未経験転職でどのくらい年収が下がったら危険？',
    answer:
      '一般的に20%以上（100万円以上）のダウンは慎重に検討すべきです。判断基準は3年後に元の年収を超えられるかです。成長性のある業界・職種であれば一時的なダウンは投資と考えられますが、年収が上がる見込みがない場合は再考が必要です。',
  },
];

const AGE_GROUP_OPTIONS: CustomSelectOption[] = [
  { value: '20s-early', label: '20代前半' },
  { value: '20s-late', label: '20代後半' },
  { value: '30s-early', label: '30代前半' },
  { value: '30s-late', label: '30代後半' },
  { value: '40plus', label: '40代以上' },
];

const DEPENDENTS_OPTIONS: CustomSelectOption[] = [
  { value: '0', label: '0人' },
  { value: '1', label: '1人' },
  { value: '2', label: '2人' },
  { value: '3', label: '3人' },
];

function clampNonNegativeInt(value: string) {
  return Math.max(0, parseInt(value, 10) || 0);
}

export default function InexperiencedClient() {
  const [currentSalaryMan, setCurrentSalaryMan] = useState<string>('350');
  const [newSalaryMan, setNewSalaryMan] = useState<string>('380');
  const [ageGroup, setAgeGroup] = useState<string>('20s-late');
  const [dependents, setDependents] = useState<string>('0');
  const [result, setResult] = useState<{
    current: ReturnType<typeof calculateTakeHome> | null;
    next: ReturnType<typeof calculateTakeHome> | null;
  }>({ current: null, next: null });
  const [showDetails, setShowDetails] = useState(false);

  const onCalculate = () => {
    const current = parseFloat(currentSalaryMan);
    const next = parseFloat(newSalaryMan);
    const dep = clampNonNegativeInt(dependents);
    if (!Number.isFinite(current) || !Number.isFinite(next) || current <= 0 || next <= 0) return;

    setResult({
      current: calculateTakeHome(Math.round(current * 10000), dep),
      next: calculateTakeHome(Math.round(next * 10000), dep),
    });
  };

  const diffYen = result.current && result.next ? result.next.takeHome - result.current.takeHome : 0;
  const diffMan = Math.round(diffYen / 10000);

  const currentTakeHomeMan = useMemo(
    () => (result.current ? Math.round(result.current.takeHome / 10000) : 0),
    [result.current],
  );
  const nextTakeHomeMan = useMemo(
    () => (result.next ? Math.round(result.next.takeHome / 10000) : 0),
    [result.next],
  );
  const currentMonthlyMan = useMemo(
    () => (result.current ? Math.round(result.current.monthlyTakeHome / 10000) : 0),
    [result.current],
  );
  const nextMonthlyMan = useMemo(
    () => (result.next ? Math.round(result.next.monthlyTakeHome / 10000) : 0),
    [result.next],
  );

  const diffRate = useMemo(() => {
    const current = parseFloat(currentSalaryMan);
    const next = parseFloat(newSalaryMan);
    if (!Number.isFinite(current) || !Number.isFinite(next) || current <= 0) return null;
    return ((next - current) / current) * 100;
  }, [currentSalaryMan, newSalaryMan]);

  const diffBadge = useMemo(() => {
    if (diffRate === null) return { label: '—', bg: 'bg-[#f5f5f5]', text: 'text-[#333333]' };
    if (Math.abs(diffRate) < 1) return { label: '維持', bg: 'bg-[#f5f5f5]', text: 'text-[#333333]' };
    if (diffRate > 0) return { label: 'アップ', bg: 'bg-[#ecfdf5]', text: 'text-[#0a57d1]' };
    return { label: 'ダウン', bg: 'bg-[#fef2f2]', text: 'text-[#dc2626]' };
  }, [diffRate]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] container-main">
      <div className="max-w-7xl mx-auto md:flex md:items-start md:gap-8">
        <div className="space-y-8 md:space-y-12 md:max-w-[800px] md:w-full">
          <nav className="breadcrumb mb-3">
            <Link href="/">ホーム</Link> {'>'} キャリアステージ別 {'>'} 未経験転職の年収目安
          </nav>
          <h1 className="page-title">未経験転職の年収目安と手取り計算</h1>

          <Card>
            <H2>📌 未経験でも年収アップは狙える</H2>
            <p className="text-body leading-relaxed">
              「未経験転職だと年収が下がるのでは？」という不安は多いですが、20代の未経験転職では約60%が年収アップに成功しているデータがあります。
              成長業界を選び、ポータブルスキルと資格を組み合わせることで、未経験でも年収維持・アップは十分可能です。
            </p>
            <p className="text-small mt-3">出典: doda「20代 未経験職種への転職時 決定年収レポート」2024年</p>
          </Card>

          {/* 統計 */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>📊 未経験転職の年収変動データ</H2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#e0e0e0] bg-white table-zebra">
                <thead>
                  <tr className="bg-[#0a57d1] text-white">
                    <th className="border border-[#e0e0e0] px-4 py-3 text-left">項目</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-right">数値</th>
                  </tr>
                </thead>
                <tbody>
                  {STAT_TABLE.map((row) => (
                    <tr key={row.label} className="border-b border-[#e0e0e0]">
                      <td className="px-4 py-3 text-[#333333]">{row.label}</td>
                      <td className="px-4 py-3 text-right text-[#333333]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* シミュレーター */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 md:p-8 shadow-lg">
            <H2>🧮 未経験転職の手取り比較シミュレーター</H2>

            <Card as="div" className="mb-6">
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 text-base mb-2">現在の年収</label>
                <p className="text-caption mb-2">万円単位で入力</p>
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
                <p className="text-caption mb-2">万円単位で入力</p>
                <div className="relative">
                  <InputField
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={newSalaryMan}
                    onChange={(e) => setNewSalaryMan(e.target.value)}
                    className="pr-12"
                    placeholder="380"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">万円</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-900 text-base mb-2">年齢</label>
                  <p className="text-caption mb-2">目安（表示用）</p>
                  <CustomSelect options={AGE_GROUP_OPTIONS} value={ageGroup} onChange={setAgeGroup} placeholder="年齢を選択" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-900 text-base mb-2">扶養人数</label>
                  <p className="text-caption mb-2">0〜3人</p>
                  <CustomSelect options={DEPENDENTS_OPTIONS} value={dependents} onChange={setDependents} placeholder="扶養人数を選択" />
                </div>
              </div>

              <PrimaryButton type="button" onClick={onCalculate} className="mt-6">
                計算する
              </PrimaryButton>
              <p className="text-small mt-3">※ 手取り計算は概算（扶養人数のみ反映）です。</p>
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
                  <p className="text-small mt-2">年齢: {AGE_GROUP_OPTIONS.find((o) => o.value === ageGroup)?.label} / 扶養人数: {dependents}人</p>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-6">
                  <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-[#f5f5f5]">
                    <div className="text-small">転職前（年間手取り）</div>
                    <div className="mt-1 font-black text-[#333333] text-2xl">{currentTakeHomeMan}万円</div>
                    <div className="text-small mt-1">月 {currentMonthlyMan}万円</div>
                  </div>
                  <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-[#e8f0fe]">
                    <div className="text-small">転職後（年間手取り）</div>
                    <div className="mt-1 font-black text-[#0a57d1] text-2xl">{nextTakeHomeMan}万円</div>
                    <div className="text-small mt-1">月 {nextMonthlyMan}万円</div>
                  </div>
                  <div className={`border-2 border-[#e0e0e0] rounded-2xl p-4 ${diffBadge.bg}`}>
                    <div className="text-small">年収の増減率</div>
                    <div className={`mt-1 font-black text-2xl ${diffBadge.text}`}>
                      {diffRate === null ? '—' : `${diffRate > 0 ? '+' : ''}${diffRate.toFixed(1)}%`}
                    </div>
                    <div className="text-small mt-1">判定: {diffBadge.label}</div>
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
          </section>

          {/* 業界・職種別 */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>📊 業界・職種別 未経験スタート年収の目安</H2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#e0e0e0] bg-white table-zebra">
                <thead>
                  <tr className="bg-[#0a57d1] text-white">
                    <th className="border border-[#e0e0e0] px-4 py-3 text-left">業界・職種</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-right">未経験スタート</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-right">3年後</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-right">5年後</th>
                  </tr>
                </thead>
                <tbody>
                  {START_TABLE.map((row) => (
                    <tr key={row.name} className="border-b border-[#e0e0e0]">
                      <td className="px-4 py-3 text-[#333333]">{row.name}</td>
                      <td className="px-4 py-3 text-right text-[#333333]">{row.start}</td>
                      <td className="px-4 py-3 text-right text-[#333333]">{row.after3}</td>
                      <td className="px-4 py-3 text-right text-[#333333]">{row.after5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* TOP5 */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>🏆 未経験転職で年収アップしやすい職種 TOP5</H2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#e0e0e0] bg-white table-zebra">
                <thead>
                  <tr className="bg-[#0a57d1] text-white">
                    <th className="border border-[#e0e0e0] px-4 py-3 text-right">順位</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-left">職種</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-right">年収アップ率</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-left">特徴</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP5_TABLE.map((row) => (
                    <tr key={row.rank} className="border-b border-[#e0e0e0]">
                      <td className="px-4 py-3 text-right text-[#333333]">{row.rank}</td>
                      <td className="px-4 py-3 text-[#333333]">{row.job}</td>
                      <td className="px-4 py-3 text-right text-[#333333]">{row.rate}</td>
                      <td className="px-4 py-3 text-[#333333]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-small mt-3">出典: doda「20代 未経験職種への転職時 決定年収レポート」</p>
          </section>

          {/* 業界5選 */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>🚀 未経験でも年収が上がりやすい業界5選</H2>
            <div className="space-y-3">
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">IT・Web業界</p>
                <p className="text-body leading-relaxed">人材不足で未経験採用に積極的。スキル習得で年収が急上昇しやすい。</p>
                <p className="text-small mt-2">未経験: 300〜380万円 / 3年後: 450〜550万円も可能</p>
              </div>
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">不動産業界</p>
                <p className="text-body leading-relaxed">営業職はインセンティブ次第で高収入。宅建取得で年収アップが狙える。</p>
                <p className="text-small mt-2">未経験: 300〜350万円 / 実績次第: 600〜1000万円+</p>
              </div>
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">建設・プラント業界</p>
                <p className="text-body leading-relaxed">施工管理は慢性的な人材不足。資格取得で市場価値が上がりやすい。</p>
                <p className="text-small mt-2">未経験: 350〜400万円 / 資格取得後: 500〜700万円</p>
              </div>
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">人材サービス業界</p>
                <p className="text-body leading-relaxed">営業・キャリアアドバイザーなど。コミュニケーション力重視で未経験OK。</p>
                <p className="text-small mt-2">未経験: 320〜380万円 / 3年後: 400〜500万円</p>
              </div>
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">物流業界</p>
                <p className="text-body leading-relaxed">EC拡大で需要増。管理職へのキャリアパスが作りやすい。</p>
                <p className="text-small mt-2">未経験: 300〜380万円 / 管理職: 450〜600万円</p>
              </div>
            </div>
          </section>

          {/* 下がるケース */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>⚠️ 未経験転職で年収が下がるケース</H2>
            <ol className="list-decimal pl-5 space-y-2 text-body">
              <li>年収水準の低い業界への転職（金融→サービス業など）</li>
              <li>専門職から一般職への転職（エンジニア→事務職など）</li>
              <li>大手企業から中小企業への転職（福利厚生込みの総合待遇が下がる）</li>
              <li>30代以上での未経験転職（ポテンシャル採用の対象外になりやすい）</li>
            </ol>
          </section>

          {/* 許容範囲 */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>📉 年収ダウンの許容範囲の考え方</H2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#e0e0e0] bg-white table-zebra">
                <thead>
                  <tr className="bg-[#0a57d1] text-white">
                    <th className="border border-[#e0e0e0] px-4 py-3 text-left">年収ダウン幅</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-left">許容度</th>
                    <th className="border border-[#e0e0e0] px-4 py-3 text-left">考え方</th>
                  </tr>
                </thead>
                <tbody>
                  {TOLERANCE_TABLE.map((row) => (
                    <tr key={row.range} className="border-b border-[#e0e0e0]">
                      <td className="px-4 py-3 text-[#333333]">{row.range}</td>
                      <td className="px-4 py-3 text-[#333333]">{row.level}</td>
                      <td className="px-4 py-3 text-[#333333]">{row.idea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* コツ */}
          <section className="bg-white border-2 border-[#e0e0e0] rounded-2xl p-6 shadow-lg">
            <H2>🧠 未経験転職で年収を維持・アップするコツ</H2>
            <div className="space-y-3">
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">ポータブルスキルをアピール</p>
                <p className="text-body leading-relaxed">コミュニケーション力、マネジメント経験、数字を扱う力（売上管理など）を具体例で示します。</p>
              </div>
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">業界は変えても職種は活かす</p>
                <p className="text-body leading-relaxed">営業→営業、経理→経理など、職種経験を活かすと年収維持しやすいです。</p>
              </div>
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">成長業界を選ぶ</p>
                <p className="text-body leading-relaxed">IT、DX関連、再生可能エネルギー、ヘルスケア・医療など、伸びる市場は未経験でも伸びやすいです。</p>
              </div>
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">資格を先に取得しておく</p>
                <p className="text-body leading-relaxed">ITパスポート、基本情報技術者、宅建、簿記2級など。資格手当が付く企業も多いです。</p>
              </div>
              <div className="border-2 border-[#e0e0e0] rounded-2xl p-4 bg-white">
                <p className="font-semibold text-[#1a1a1a] mb-2">転職エージェントを活用</p>
                <p className="text-body leading-relaxed">年収交渉を代行してもらえるため、未経験でも条件を引き上げやすくなります。</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
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

