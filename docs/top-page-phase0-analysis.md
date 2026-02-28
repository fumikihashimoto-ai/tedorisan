# Phase 0: 現状分析と準備 - 完了報告

**実施日**: 2025年2月16日  
**対象**: app/components/v2/TopPageClient.tsx  
**目的**: Phase 1以降の実装準備

---

## Step 0.1: TopPageClient.tsx の構成文書化

### コンポーネントツリー

app/components/v2/TopPageClient.tsx を分析し、以下の形式でまとめました:

```
TopPageClient
├── HeroSection
│   └── 現在のクラス: relative w-full h-64 overflow-hidden
│   └── max-width: なし（w-fullで親に依存、TopPageClient自体にコンテナなし）
│   └── 高さ: h-64 (256px)
│
├── 目的選択セクション (section)
│   ├── SectionBar
│   ├── TabSwitch (カテゴリタブ: 転職/スキルアップ)
│   │   └── 現在のクラス: w-full mb-4, 内部は flex gap-0
│   │   └── 横スクロール: なし（2ボタン固定）
│   └── CategoryLinkGrid (カテゴリボタン)
│       └── 現在のクラス: grid grid-cols-2 gap-3
│       └── グリッド: 2列
│
├── CategoryButtons (おすすめサービスのカテゴリタブ)
│   └── 現在のクラス: flex gap-0 my-0 pb-0
│   └── グリッド: flex（横並び、2〜5ボタン）
│
├── TopServiceCard
│   └── 現在のクラス: bg-white border border-[#e9e9e9] rounded mt-4 mb-4 mx-0 overflow-hidden
│   └── レイアウト: 縦並び（最大3件）
│
├── ComparisonTable
│   └── 現在のクラス: 親セクションが max-w-md mx-auto px-[10px]、表自体は border rounded overflow-hidden
│   └── 表示件数: maxItems=5
│
├── CategoryLinkGrid (年代・業種から探す)
│   └── 現在のクラス: grid grid-cols-2 gap-3
│   └── グリッド: 2列
│
└── RecommendSection
    └── 現在のクラス: section=bg-[var(--color-v2-bg)] py-6、内部div=max-w-md mx-auto px-[10px]
    └── ArticleCardの配置: space-y-4 で縦並び（1列）
```

### 各セクションの詳細

| セクション | max-width | 余白(margin/padding) | グリッド | 備考 |
|-----------|-----------|---------------------|---------|------|
| HeroSection | なし | なし（親がコンテナなし） | - | w-full h-64、画像fill |
| 目的選択セクション | max-w-md | py-[16px], px-[10px], mb-4 | CategoryLinkGrid: 2列 | SectionBar, TabSwitch, CategoryLinkGrid を含む |
| CategoryButtons | max-w-md | pt-[16px], pb-0, px-[10px] | flex横並び | 転職3種/スキルアップ2種のタブ |
| TopServiceCard | max-w-md | mt-4 mb-4 mx-0, px-[10px] | 縦並び | 最大3件表示 |
| ComparisonTable | max-w-md | pt-[16px] pb-[16px], px-[10px] | 表: grid-cols-4 | maxItems=5, fullWidth=false |
| CategoryLinkGrid | max-w-md | py-[16px], px-[10px] | 2列 (grid-cols-2 gap-3) | 年代・業種から探す |
| RecommendSection | max-w-md | py-6, px-[10px] | 1列 (space-y-4) | ArticleCard 縦並び |

### 現状の課題

TopPageClient.tsxの分析から見つかった課題をリストアップ:

- [ ] 課題1: 全セクションが max-w-md (448px) で統一されており、PC表示で左右に大きな余白が発生する
- [ ] 課題2: グリッドがモバイル専用で、CategoryLinkGrid・ArticleCard が PC でも2列/1列のまま
- [ ] 課題3: HeroSection にコンテナがなく、高さも h-64 固定で PC では小さく見える
- [ ] 課題4: セクション間余白が py-[16px] 固定で、PC 向けの段階的拡大がない
- [ ] 課題5: CategoryButtons が flex 横並びのため、タブ数が多い場合に PC でも伸びてしまう
- [ ] 課題6: TopPageClient は PageLayout を使っておらず、各セクションが独自に max-w-md を指定している

---

## Step 0.2: ブレークポイント戦略の決定

### 使い分けルール

| ブレークポイント | 幅 | 主な用途 | 適用対象 |
|----------------|-----|---------|---------|
| **md** (768px) | タブレット | • グリッド2〜3列<br>• フォント微調整<br>• padding拡大 | CategoryButtons, CategoryLinkGrid, ArticleCard |
| **lg** (1024px) | PC | • グリッド3〜4列<br>• コンテナ幅拡大<br>• レイアウト変更 | 全セクション |
| **xl** (1280px) | 大画面PC | • コンテナ幅最大化<br>• フォント最大化 | 全セクション |

### ブレークポイント別の目標

**モバイル（〜767px）:**
- 現状維持
- max-w-md (448px)
- グリッド: 2列

**タブレット（768px〜1023px）:**
- max-w-2xl (672px)
- グリッド: 2〜3列
- padding拡大

**PC（1024px〜1279px）:**
- max-w-4xl (896px)
- グリッド: 3〜4列
- 比較表の横スクロール解消

**大画面PC（1280px〜）:**
- max-w-5xl (1024px)
- フォント最大化

---

## Step 0.3: PageLayoutとの関係性の整理

### PageLayoutの現状

app/components/v2/layouts/PageLayout.tsx の現在の設定を確認:

- 現在のmaxWidth設定: mobile / tablet / desktop / wide の4種（mobile: 448px, tablet: 672px, desktop: 896px, wide: 1152px）
- TopPageClientでの使用状況: **使用していない**。app/page.tsx は TopPageClient を直接レンダリングし、PageLayout でラップしていない。

### 方針決定

**決定事項:**

- ☑ **Option A**: PageLayoutは"full"のまま、TopPageClient内で独自にコンテナ幅を管理（推奨）
- ☐ **Option B**: PageLayoutに新しいmaxWidthオプションを追加
- ☐ **Option C**: その他

**選択したOption**: Option A

**理由**: 
- TOPページは PageLayout を使っていないため、現状のまま TopPageClient 内でレスポンシブなコンテナクラスを適用する方が一貫性がある
- 記事ページは PageLayout を利用しており、TOP だけ特別な扱いにする必要がある
- 共通コンテナクラスを TopPageClient 内で定義・適用することで、他のページへの影響を避けられる

### 共通コンテナクラスの定義
```typescript
// TOP用の共通コンテナクラス（推奨案）
const TOP_CONTAINER = 'max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-[10px]'

// または個別に定義
const containerClasses = {
  mobile: 'max-w-md',
  tablet: 'md:max-w-2xl',
  pc: 'lg:max-w-4xl',
  xlarge: 'xl:max-w-5xl',
  common: 'mx-auto px-[10px]'
}
```

---

## Step 0.4: デザイン方向性の確認

### PC表示の目標イメージ

**1. コンテナ幅の拡大**
- モバイル: 448px（現状維持）
- タブレット: 672px（+224px）
- PC: 896px（+448px）
- 大画面: 1024px（+576px）

**2. グリッド列数の増加**
- CategoryButtons: 2列 → 3〜4列
- CategoryLinkGrid: 2列 → 3〜4列
- ArticleCard: 1列 → 2〜3列

**3. 余白の拡大**
- セクション間: 16px → 24px → 32px（v2ルール準拠）
- 内部padding: 12px → 16px → 24px

**4. フォントサイズの調整**
- 見出し: 20px → 24px → 28px
- 本文: 14px → 14px → 16px
- ボタン: 14px → 14px → 16px

**5. 2カラムレイアウト（オプション）**
- Phase 3で検討
- メイン（66%）+ サイドバー（33%）

### デザイン原則

- ✅ モバイルファースト維持
- ✅ v2余白ルールとの統一
- ✅ 段階的な拡張（md → lg → xl）
- ✅ アクセシビリティ確保（44px以上のタッチターゲット）

---

## Step 0.5: v2コンポーネントへの影響範囲調査

### 影響を受けるコンポーネント

| コンポーネント | 影響レベル | 対応内容 | Phase |
|--------------|-----------|---------|-------|
| **ArticleCard** | 高 | • ホバーエフェクト追加<br>• グリッド表示時の高さ統一<br>• レスポンシブ対応 | Phase 2 |
| **CategoryLinkCard** | 高 | • ホバーエフェクト追加<br>• 高さのレスポンシブ対応<br>• PC用padding調整 | Phase 2 |
| **ComparisonTable** | 中 | • セルpaddingの調整（md:py-3 md:px-4）<br>• ボタンサイズ調整（md:h-12） | Phase 5 |
| **SectionBar** | 中 | • padding調整（md:py-3）<br>• フォントサイズ調整 | Phase 1 |
| **TedoriCalculator** | 低 | • 表示確認のみ（TOPページでは未使用） | Phase 1 |
| **HeroSection** | 高 | • 高さ調整（md:h-80 lg:h-96）<br>• キャッチコピーサイズ調整 | Phase 4 |
| **CategoryButtons** | 高 | • グリッド調整（md:grid-cols-3 lg:grid-cols-4）<br>• ボタンサイズ調整 | Phase 4 |
| **TabSwitch** | 中 | • 横スクロール解消（PC）<br>• 横並び表示（現状2ボタンのみで問題なし） | Phase 2 |

### 記事ページへの影響

v2コンポーネントのレスポンシブ対応を追加する場合、以下の記事ページへの影響を確認:

**確認が必要なページ:**
- [ ] IT記事（app/magazine/job-salary/it-engineer/page.tsx）
- [ ] 新卒記事（app/tools/fresh-graduate/page.tsx）
- [ ] 薬剤師記事（作成予定）

**影響の内容:**
- ArticleTable: PC用padding調整の影響
- ArticleList: 表示確認
- ArticleBodySection: 幅の確認

**対応方針:**
- TOP用の調整は、記事ページには影響しないようにする
- コンポーネント側にレスポンシブ対応を追加する場合は、記事ページでも表示確認

---

## Phase 0完了基準チェック

以下の全項目が完了していることを確認:

- [x] TopPageClient.tsxの構成が文書化されている
- [x] ブレークポイント戦略が明確
- [x] PageLayoutの扱いが決定（Option A: TopPageClient内で独自管理）
- [x] デザイン方向性が合意されている（目標イメージが明確）
- [x] v2コンポーネントへの影響範囲が把握されている

---
