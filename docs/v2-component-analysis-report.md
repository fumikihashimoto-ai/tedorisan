# v2コンポーネント化分析レポート（最新UI限定）

分析対象: TOPページ（TopPageClient）、IT記事ページ（it-engineer）、既存 v2 コンポーネント

---

## 優先度「高」

### 発見1: SectionBar（水色タイトルバー）

**出現箇所:**
- TOPページ: TopPageClient.tsx 93行目、143行目、158行目（ご自身の目的を〜、転職サイト簡単比較表、年代・業種から探す）
- TOPページ: RecommendSection.tsx 13行目（おすすめコンテンツ）
- IT記事: it-engineer/page.tsx 96行目、162行目、222行目（手取り計算シミュレーション、年収・スキルアップをしたい方、成功への第一歩）
- 既存コンポーネント: なし（SectionTitle は見出しタグ＋色・サイズのみでバー表現なし）

**重複しているコード例:**
```tsx
// 共通パターン（TOP・IT記事・RecommendSection・ComparisonTable で同一）
<div className="bg-[#79ccf1] text-white text-center py-1.5 rounded-sm mb-2 relative">
  <p className="font-extrabold text-sm">手取り計算シミュレーション</p>
</div>
// または font-bold / mb-4 / pb-[10px] などのバリエーション
```

**推奨コンポーネント:**
- コンポーネント名: SectionBar
- ファイルパス: app/components/v2/common/SectionBar.tsx
- Props: `title: string`, `className?: string`, `variant?: 'default' | 'withPadding'`（mb-2 / mb-4, pb の違い用）
- 使用例:
```tsx
<SectionBar title="手取り計算シミュレーション" />
<SectionBar title="転職サイト簡単比較表" variant="withPadding" />
```

**優先度:** 高

**理由:** 両ページ＋RecommendSection・ComparisonTable で同一パターンが 10 箇所以上。今後の記事でも「セクション見出し」として必須。1ファイル変更で全ページのバーを統一できる。

**実装の難易度:** 簡単

---

### 発見2: ArticleHeroSection（記事用ヒーロー画像）

**出現箇所:**
- TOPページ: HeroSection.tsx（画像固定、全幅セクション）
- IT記事: it-engineer/page.tsx 80〜92行目（同構造・画像とaltのみ異なる）
- 既存コンポーネント: HeroSection あり（TOP専用で src/alt 固定）

**重複しているコード例:**
```tsx
// IT記事
<div className="w-screen relative left-1/2 -translate-x-1/2 pb-0">
  <section className="relative w-full h-64 overflow-hidden">
    <Image src="/images/v2/hero_it-engineer.png" alt="..." fill className="object-cover" sizes="100vw" priority />
  </section>
</div>
// HeroSection は section + Image のみで、外側の全幅ラッパーなし
```

**推奨コンポーネント:**
- コンポーネント名: ArticleHeroSection（または HeroSection の拡張）
- ファイルパス: app/components/v2/common/ArticleHeroSection.tsx または HeroSection に props 追加
- Props: `src: string`, `alt: string`, `priority?: boolean`, `fullWidth?: boolean`（記事は fullWidth true）
- 使用例:
```tsx
<ArticleHeroSection src="/images/v2/hero_it-engineer.png" alt="ITエンジニアの年収（年収・手取りのイメージ）" priority fullWidth />
```

**優先度:** 高

**理由:** 記事テンプレートで毎回同じラッパー＋Image を書く必要がなくなる。TOP は従来どおり HeroSection、記事は ArticleHeroSection で統一可能。

**実装の難易度:** 簡単

---

### 発見3: PointHeaderBox（青ヘッダー＋アイコン＋ボディ）

**出現箇所:**
- IT記事: it-engineer/page.tsx 200〜218行目（編集部のコメント）、234〜252行目（とにかく情報収集が大事）
- 既存コンポーネント: TopServiceCard.tsx / ServiceCard.tsx 内で同様の「青ヘッダー＋point-icon」あり。EditorComment は左ボーダー＋ベージュで別スタイル。

**重複しているコード例:**
```tsx
// 編集部のコメント / とにかく情報収集が大事 で同じヘッダー構造
<div className="bg-[#1390c8] text-white text-sm font-medium py-2 px-4 rounded-t-md flex items-center gap-2">
  <Image src="/images/v2/point-icon.png" alt="" width={9} height={18} className="flex-shrink-0" />
  <span>編集部のコメント</span>
</div>
<div className="bg-[#fff9ed] p-4 space-y-3">...</div>
// 2つ目は body が bg-white border border-[#1390c8]
```

**推奨コンポーネント:**
- コンポーネント名: PointHeaderBox
- ファイルパス: app/components/v2/article/PointHeaderBox.tsx
- Props: `title: string`, `children: React.ReactNode`, `bodyVariant?: 'highlight' | 'bordered'`（#fff9ed / 白＋青枠）
- 使用例:
```tsx
<PointHeaderBox title="編集部のコメント" bodyVariant="highlight">...</PointHeaderBox>
<PointHeaderBox title="とにかく情報収集が大事" bodyVariant="bordered">...</PointHeaderBox>
```

**優先度:** 高

**理由:** IT記事内で2回同一パターン。既存 EditorComment はデザインが異なるため、v2 用の「青ヘッダー＋アイコン＋ボディ」を共通化すると記事テンプレートの再利用性が上がる。

**実装の難易度:** 普通

---

### 発見4: ArticleSectionHeading（記事見出し h2＋下線）

**出現箇所:**
- IT記事: it-engineer/page.tsx 284〜287行目（ITエンジニアの平均年収）
- 既存コンポーネント: SectionDivider はタイトル＋短い線（50px）のみ。SectionTitle はサイズ・色のみで下線なし。

**重複しているコード例:**
```tsx
<h2 className="font-['Noto_Sans_JP'] font-bold text-[16px] text-black mb-2 relative pb-2">
  ITエンジニアの平均年収
  <div className="absolute bottom-0 left-0 w-[75px] h-[3px] bg-[#1390c8]" />
</h2>
```

**推奨コンポーネント:**
- コンポーネント名: ArticleSectionHeading
- ファイルパス: app/components/v2/article/ArticleSectionHeading.tsx
- Props: `children: React.ReactNode`, `lineColor?: string`（デフォルト #1390c8）, `className?: string`
- 使用例:
```tsx
<ArticleSectionHeading>ITエンジニアの平均年収</ArticleSectionHeading>
```

**優先度:** 高

**理由:** 記事本文の見出しは今後の記事でも必ず使う。下線付き h2 を共通化すればデザイン統一と修正が容易になる。

**実装の難易度:** 簡単

---

### 発見5: ArticleCTAButton（ピンク・影・右矢印アイコン）

**出現箇所:**
- IT記事: it-engineer/page.tsx 168〜196行目（転職して年収UP / スキルアップを目指す方の2ボタン）
- 既存コンポーネント: CTAButton あり（primary/secondary/outline、影・アイコンなし）

**重複しているコード例:**
```tsx
<button className="flex-1 bg-[#ff677e] text-white font-['Noto_Sans_JP'] font-bold text-[14px] h-[60px] rounded-[2px] shadow-[0px_3px_0px_0px_#c41e37] hover:shadow-[0px_1px_0px_0px_#c41e37] active:shadow-none active:translate-y-[2px] transition-all relative">
  <div><p className="leading-tight">転職して<br />年収UPしたい方</p></div>
  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-[13px] h-[13px] ...">
    <svg>...</svg>
  </div>
</button>
```

**推奨コンポーネント:**
- コンポーネント名: ArticleCTAButton（または CTAButton の variant 拡張）
- ファイルパス: app/components/v2/common/ArticleCTAButton.tsx
- Props: `children: React.ReactNode`, `onClick?: () => void`, `href?: string`, `className?: string`
- 使用例:
```tsx
<ArticleCTAButton href="/job-change">転職して<br />年収UPしたい方</ArticleCTAButton>
```

**優先度:** 高

**理由:** 記事内のCTAが2つ完全同一構造。今後の記事でも「転職」「スキルアップ」など複数CTAを並べるパターンが続く。既存 CTAButton と役割が近いが、デザイン（ピンク・影・アイコン）が v2 記事専用のため、ArticleCTAButton として分離するか、CTAButton に variant='articlePink' を追加する選択肢あり。

**実装の難易度:** 普通

---

## 優先度「中」

### 発見6: CategoryLinkCard（白背景・枠・右丸アイコン）

**出現箇所:**
- TOPページ: TopPageClient.tsx 103〜114行目、164〜175行目（目的選択後・年代・業種から探すの2ブロック）
- 既存コンポーネント: CategoryButtons はタブ風の切り替え。こちらはリンクカードのグリッド。

**重複しているコード例:**
```tsx
<Link href={category.href} className="bg-white border border-[#3f3f3f] rounded-sm py-2.5 px-4 font-extrabold text-[16px] text-[#3f3f3f] hover:bg-gray-50 transition-colors relative block">
  {category.label}
  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#ff677e] border border-[#3f3f3f] rounded-full flex items-center justify-center">
    <ChevronDown className="w-2 h-2 text-white rotate-[-90deg]" />
  </div>
</Link>
```

**推奨コンポーネント:**
- コンポーネント名: CategoryLinkCard
- ファイルパス: app/components/v2/common/CategoryLinkCard.tsx
- Props: `href: string`, `label: string`, `className?: string`
- 使用例:
```tsx
{categories.map((c) => <CategoryLinkCard key={c.id} href={c.href} label={c.label} />)}
```

**優先度:** 中

**理由:** TOP 内で2回同じブロック。デザインが完全一致。既存 CategoryButtons とは別用途（リンクカード単体）。

**実装の難易度:** 簡単

---

### 発見7: RecommendBlockHeading（RECOMMEND ＋ ラベル ＋ 線）

**出現箇所:**
- IT記事: it-engineer/page.tsx 299〜306行目（おすすめ記事セクション）
- 既存コンポーネント: SectionDivider は 1 行タイトル＋線。こちらは「RECOMMEND」＋「おすすめ記事」＋下線の2要素。

**重複しているコード例:**
```tsx
<div className="mb-4">
  <h3 className="font-['Noto_Sans_JP'] font-bold text-[16px] text-[#3f3f3f] inline">RECOMMEND</h3>
  <span className="font-['Noto_Sans_JP'] font-bold text-[10px] text-[#3f3f3f] ml-2">おすすめ記事</span>
  <div className="w-[50px] h-[1px] bg-[#1390c8] mt-2" />
</div>
```

**推奨コンポーネント:**
- コンポーネント名: RecommendBlockHeading
- ファイルパス: app/components/v2/common/RecommendBlockHeading.tsx
- Props: `subLabel?: string`（おすすめ記事など）, `lineColor?: string`, `className?: string`
- 使用例:
```tsx
<RecommendBlockHeading subLabel="おすすめ記事" />
```

**優先度:** 中

**理由:** 記事のおすすめブロックで使う見出し。他記事でも「おすすめ記事」「関連記事」で流用しやすい。SectionDivider とは構成が異なる。

**実装の難易度:** 簡単

---

### 発見8: 手取り計算フォーム（TedoriCalculator への置き換え）

**出現箇所:**
- IT記事: it-engineer/page.tsx 94〜159行目（手取り計算シミュレーション＋結果表）
- 既存コンポーネント: 既存「TedoriCalculator（手取り計算）」が作成済みとの前提

**重複しているコード例:**
- セクション全体（SectionBar ＋ AnimatedSelect ＋ 月収 input ＋ ボタン ＋ ResultTableAnnualMonthly）がページに直書き。

**推奨:** 既存の **TedoriCalculator** が v2 の見た目・仕様を満たすなら、it-engineer ではそのコンポーネントを利用するように差し替える。TedoriCalculator が存在しない、または仕様が違う場合は、今回のフォーム＋結果表を **TedoriCalculatorSection** として共通化する。

**優先度:** 中

**理由:** 手取り計算は記事・TOP 両方で需要がある。1箇所にまとめると仕様変更時の修正が1ファイルで済む。既存コンポーネントとの重複チェック必須。

**実装の難易度:** 普通（既存があれば差し替えのみで簡単）

---

### 発見9: 記事本文コンテナ（白背景・余白・見出し＋本文）

**出現箇所:**
- IT記事: it-engineer/page.tsx 281〜297行目（記事本文ブロック）
- 既存コンポーネント: ArticleSection は別スタイル（border-b 見出しなど）。ContentWrapper / SectionContainer はレイアウト用。

**重複しているコード例:**
```tsx
<div className="mb-8 space-y-6 bg-white -mx-[10px] px-[10px] py-5">
  <h2 ...>ITエンジニアの平均年収</h2>
  <p ...>...</p>
  <SalaryTable ... />
</div>
```

**推奨コンポーネント:**
- コンポーネント名: ArticleBodySection
- ファイルパス: app/components/v2/article/ArticleBodySection.tsx
- Props: `children: React.ReactNode`, `className?: string`
- 使用例: 記事本文を包むだけのラッパー。見出し・表は children で渡す。

**優先度:** 中

**理由:** 今後の記事でも「白背景・-mx-[10px] px-[10px] py-5」の本文エリアを繰り返す可能性が高い。既存 ArticleSection は見出しスタイルが違うため、記事専用の Body コンテナとして分離する価値あり。

**実装の難易度:** 簡単

---

### 発見10: おすすめ記事セクションラッパー

**出現箇所:**
- IT記事: it-engineer/page.tsx 297〜322行目（bg-[#f5f5f5] ＋ RecommendBlockHeading ＋ ArticleCard 一覧）
- TOP: RecommendSection は「おすすめコンテンツ」で別レイアウト（タイトルバー＋横並びカード）

**重複しているコード例:**
```tsx
<div className="bg-[#f5f5f5] -mx-[10px] px-[10px] py-6">
  <div className="mb-4">...RECOMMEND見出し...</div>
  <div className="space-y-4">{ArticleCard x3}</div>
</div>
```

**推奨:** RecommendBlockHeading と ArticleCard は既に存在。この「グレー背景＋見出し＋カード一覧」を **RelatedArticleSection** や **RecommendArticleSection** として 1 コンポーネントにまとめると、記事テンプレートが簡潔になる。既存の RecommendSection（TOP用）とはデータ構造が違うため、記事用は別コンポーネント推奨。

**優先度:** 中

**理由:** 記事ごとにおすすめ記事ブロックを同じスタイルで出す場合の再利用性が高い。

**実装の難易度:** 簡単

---

## 優先度「低」

### 発見11: NumberInputWithSuffix（入力＋右側単位表示）

**出現箇所:**
- IT記事: it-engineer/page.tsx 110〜122行目（月収入力＋「万円」）
- 既存コンポーネント: なし

**重複しているコード例:**
```tsx
<div className="relative">
  <input ... className="... pr-12" value={monthlySalary} onChange={...} />
  <span className="absolute right-4 top-1/2 -translate-y-1/2 ...">万円</span>
</div>
```

**推奨コンポーネント:**
- コンポーネント名: NumberInputWithSuffix
- ファイルパス: app/components/v2/common/NumberInputWithSuffix.tsx
- Props: value, onChange, placeholder, suffix（例: '万円'）, inputClassName など
- 使用例: 手取り計算や他ツールで「〇〇万円」「〇〇歳」など単位付き入力に流用可能。

**優先度:** 低

**理由:** 現状は1箇所のみ。ただしフォーム系ツールが増えると再利用性が出る。TedoriCalculator を共通化する際にその中で使うと効果的。

**実装の難易度:** 簡単

---

### 発見12: 青枠の説明ボックス（白背景＋border-[#1390c8]）

**出現箇所:**
- IT記事: it-engineer/page.tsx 244〜251行目（「とにかく情報収集が大事」の下のボディ）
- 既存コンポーネント: AppealBox が border-2 border-[#1390c8] で類似。スタイルが近い。

**推奨:** 既存 **AppealBox** のスタイル（白背景・青枠・タイトル＋本文）をそのまま使うか、PointHeaderBox の bodyVariant='bordered' の実装で AppealBox を利用する形で統一。新規コンポーネントより「既存 AppealBox と PointHeaderBox の組み合わせ」で対応するのがよい。

**優先度:** 低

**理由:** 1箇所かつ既存 AppealBox と類似。改善提案として明記する程度で十分。

**実装の難易度:** 不要（既存で足りる）

---

## 既存コンポーネントとの対応まとめ

| 既存コンポーネント | 分析結果 |
|-------------------|----------|
| ComparisonTable   | 使用箇所で SectionBar を共通化すると、タイトルバー部分の重複が消える |
| FreeConsultationCTA | 重複なし。そのまま利用で問題なし |
| PageLayout        | 重複なし。そのまま利用で問題なし |
| SectionDivider    | 記事の「h2＋下線」とは別パターン。ArticleSectionHeading は新規推奨 |
| EditorComment     | v2 の「青ヘッダー＋point icon＋ボディ」とは別デザイン。PointHeaderBox は新規推奨 |
| AppealBox         | 青枠ボックスとして記事内の説明ブロックに流用可能。PointHeaderBox の body に組み合わせ可 |
| ArticleCard       | 重複なし。おすすめ記事でそのまま利用 |
| CTAButton         | 記事のピンク・影・アイコンCTAとは別。ArticleCTAButton は新規または variant 追加 |
| SectionTitle      | バーや下線なし。ArticleSectionHeading / SectionBar は別用途 |
| CategoryButtons   | タブ風UI。CategoryLinkCard はリンクカード単体で別コンポーネント |

---

## 実装順序の提案

1. **SectionBar** … 出現箇所が最も多く、即効性が高い  
2. **ArticleSectionHeading** … 記事見出しの共通化、実装が軽い  
3. **ArticleHeroSection** … 記事テンプレートの冒頭を統一  
4. **PointHeaderBox** … 編集部コメント・ポイントブロックの共通化  
5. **ArticleCTAButton** … 記事CTAの共通化  
6. **CategoryLinkCard** … TOP の2ブロックを整理  
7. **RecommendBlockHeading / おすすめ記事セクション** … 記事フッター周りの統一  
8. **TedoriCalculator の利用 or TedoriCalculatorSection の新規** … 手取り計算の一元化  
9. **NumberInputWithSuffix** … 必要に応じて（TedoriCalculator 共通化時など）

以上で v2 に限定したコンポーネント化の分析と推奨を完了します。
