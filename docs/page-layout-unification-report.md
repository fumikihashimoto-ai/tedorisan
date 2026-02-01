# ページレイアウト統一調査レポート

fresh-graduate をベースとした統一候補をまとめました。

---

## 1. 背景色（bg）

| パターン | 使用箇所 | 備考 |
|----------|----------|------|
| **bg-white** | tools/*, magazine/*, qualifications/*, qualifications/page | fresh-graduate ベース |
| **bg-[#F8FAFC]** | TOP, FAQ, ComparisonList, career/*, tables/annual-income, tables/monthly-takehome, JobChangeClient, SideBusinessClient, FreshGraduateClient（standalone）, AnnualIncomeClient | ブランド背景色 |

**統一案**: どちらかに統一する。fresh-graduate ベースなら `bg-white` に寄せる。

---

## 2. コンテナ幅・パディング（重要）

| パターン | 使用箇所 | スマホ時の影響 |
|----------|----------|----------------|
| **max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8** | fresh-graduate, tools/*, magazine/*, qualifications/*, TOP, FAQ, ComparisonList | 左右 16px の余白あり |
| **max-w-7xl mx-auto**（パディングなし） | JobChangeClient, SideBusinessClient, FreshGraduateClient（standalone）, career/high-income, career/career-change-20s, AnnualIncomePageClient, MonthlyTakeHomePageClient | スマホで端まで伸びる可能性 |
| **max-w-7xl mx-auto md:flex md:gap-8** | 上記の career, tables 系 | 同上 |
| **max-w-4xl mx-auto** | AnnualIncomeClient | 幅 896px で狭い |
| **max-w-7xl mx-auto px-4 py-8** | Footer | パディングはあるが max-w が 1280px |

**統一案**: fresh-graduate に合わせて `max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8` に統一。

**対象ファイル**:
- `app/components/JobChangeClient.tsx`
- `app/components/SideBusinessClient.tsx`
- `app/components/FreshGraduateClient.tsx`
- `app/career/high-income/pageClient.tsx`
- `app/career/career-change-20s/pageClient.tsx`
- `app/tables/annual-income/[amount]/AnnualIncomePageClient.tsx`
- `app/tables/monthly-takehome/[amount]/MonthlyTakeHomePageClient.tsx`
- `app/components/AnnualIncomeClient.tsx`
- `app/components/Footer.tsx`（max-w を 1440px に合わせる場合）

---

## 3. 2カラムレイアウト（main + sidebar）

| パターン | 使用箇所 | ブレークポイント |
|----------|----------|------------------|
| **lg:flex lg:gap-10 xl:gap-12** | fresh-graduate, tools/*, magazine/*, qualifications/*, TOP, FAQ, ComparisonList | 1024px 以上で 2 カラム |
| **md:flex md:gap-8** | career/*, AnnualIncomePageClient, MonthlyTakeHomePageClient, JobChangeClient（standalone） | 768px 以上で 2 カラム |

**統一案**: `lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible` に統一。

**main の幅**:
- fresh-graduate: `w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0`
- career/tables 系: `md:max-w-[800px] md:w-full`（親 div に指定）

---

## 4. H1 スタイル

| パターン | 使用箇所 |
|----------|----------|
| **page-title クラス** | career/*, AnnualIncomePageClient, MonthlyTakeHomePageClient, JobChangeClient, SideBusinessClient, FreshGraduateClient（standalone） |
| **text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-gray-800 mb-6** | fresh-graduate, tools/*, magazine/*, qualifications/*, FAQ, ComparisonList |
| **text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6** | TOP, FAQ, ComparisonList |

**page-title の特徴**: `margin-top: 40px`（PC）, `24px`（SP）が入る。fresh-graduate は `mb-6` のみ。

**統一案**: `text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6` に統一（`text-gray-800` と `text-[#1E293B]` はほぼ同色）。

---

## 5. テキスト色（H1・見出し）

| 色 | 使用箇所 |
|----|----------|
| **text-[#1E293B]** | TOP, FAQ, ComparisonList |
| **text-gray-800** | fresh-graduate, tools/*, magazine/*, qualifications/* |

**統一案**: ブランド色に合わせて `text-[#1E293B]` に統一。

---

## 6. qualifications/page のレイアウト

- 2 カラムなし（サイドバーなし）
- `max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8` を使用
- fresh-graduate とコンテナは同じ

---

## 7. Footer

- `max-w-7xl`（1280px）を使用
- 他は `max-w-[1440px]` が主流

**統一案**: `max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8` に合わせる。

---

## 8. 優先度別まとめ

### 高優先度（コンテンツ幅・スマホ表示に影響）

1. **コンテナ**: `max-w-7xl` かつパディングなしのページを `max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8` に統一
2. **2 カラム**: `md:flex` を `lg:flex lg:gap-10 xl:gap-12` に統一

### 中優先度（見た目の統一）

3. **背景色**: `bg-white` か `bg-[#F8FAFC]` のどちらかに統一
4. **H1**: `page-title` を廃止し、インライン Tailwind に統一
5. **テキスト色**: `text-gray-800` → `text-[#1E293B]` に統一

### 低優先度

6. **Footer**: `max-w-7xl` → `max-w-[1440px]` に変更
