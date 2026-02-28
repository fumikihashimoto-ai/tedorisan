# TOPページ PC最適化 工程表（完全版）

**作成日**: 2025年2月16日  
**対象**: app/components/v2/TopPageClient.tsx およびTOPページ関連コンポーネント  
**目的**: モバイルファーストを維持しつつ、PC表示の最適化を図る

---

## 前提条件

### 現状
- モバイルファースト設計（`max-w-md` / 448px中心）
- v2コンポーネントシステム導入済み
- 余白ルール統一済み（mb-4/mb-6/mb-8システム）

### 制約
- モバイル表示は現状を維持すること
- 既存の`LAYOUT` / `BREAKPOINTS`を活用すること
- v2コンポーネントとの整合性を保つこと
- コンポーネント単位で変更し、差分を明確にすること

### ブレークポイント
```typescript
BREAKPOINTS = {
  sm: '640px',   // 使用しない（モバイル基準）
  md: '768px',   // タブレット
  lg: '1024px',  // PC
  xl: '1280px',  // 大画面PC
}
```

---

## Phase 0: 現状分析と準備

**目的**: 実装前の現状把握と設計の整理

| Step | 内容 | 担当 | 完了基準 |
|------|------|------|---------|
| 0.1 | TopPageClient.tsxの現在の構成を文書化 | 開発者 | コンポーネントツリー図の作成 |
| 0.2 | ブレークポイント戦略の確認 | 開発者 | md/lg/xlの使い分けルール決定 |
| 0.3 | PageLayoutとの関係性の整理 | 開発者 | maxWidth設定の方針決定 |
| 0.4 | デザインの方向性確認 | PM/デザイナー | PC表示の目標イメージ合意 |
| 0.5 | v2コンポーネントへの影響範囲調査 | 開発者 | 影響を受けるコンポーネントリスト作成 |

### 完了基準
- ✅ TopPageClient.tsxの構成が文書化されている
- ✅ ブレークポイント戦略が明確
- ✅ PageLayoutの扱いが決定
- ✅ デザイン方向性が合意されている
- ✅ 影響範囲が把握されている

---

## Phase 1: コンテナ幅の段階的拡張

**目的**: 横余白を減らし、PCでの可読性を高める

| Step | 内容 |
|------|------|
| 1.1 | TOP用の共通コンテナクラスを定義 |
| 1.1.1 | ブレークポイント別の幅を決定 |
| 1.1.2 | PageLayoutのmaxWidth設定との整合性を確認 |
| 1.2 | TopPageClient内の各セクションの`max-w-md mx-auto`を共通クラスに置き換え |
| 1.3 | HeroSectionの高さや余白をmd:以上で調整 |
| 1.4 | SectionBar等のパディングをPC用に増やす |
| 1.5 | セクション間余白をレスポンシブ対応 |

### 1.1.1 コンテナ幅の詳細仕様
```typescript
// 共通コンテナクラス（推奨）
const TOP_CONTAINER = 'max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-[10px]'

// 具体的なpx値
// モバイル:   max-w-md    (448px)
// タブレット: md:max-w-2xl (672px)
// PC:        lg:max-w-4xl (896px)
// 大画面:    xl:max-w-5xl (1024px)
```

### 1.5 セクション間余白の仕様
```typescript
// v2余白ルールとの整合性を保つ
const SECTION_SPACING = 'py-4 md:py-6 lg:py-8'

// 具体的なpx値
// モバイル:   py-4  (16px)
// タブレット: md:py-6 (24px)
// PC:        lg:py-8 (32px)
```

### 対象コンポーネント
- TopPageClient
- HeroSection
- RecommendSection
- CategoryLinkGrid の親
- その他全セクション

### 完了基準
- ✅ 全セクションが共通コンテナクラスを使用
- ✅ モバイル表示が崩れていない
- ✅ md/lg/xlの各ブレークポイントで適切な幅
- ✅ 横余白が適切（左右均等）
- ✅ セクション間余白がレスポンシブ対応
- ✅ TypeScriptエラーなし

---

## Phase 2: グリッド・カードの列数調整

**目的**: PCで情報を横に並べて一覧性を上げる

| Step | 内容 |
|------|------|
| 2.1 | CategoryLinkGridを`grid-cols-2 md:grid-cols-3 lg:grid-cols-4`に変更 |
| 2.2 | RecommendSectionのArticleCardを`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`に変更 |
| 2.3 | TopServiceCardを横並びにする場合、`md:grid md:grid-cols-2`などで2カラム表示を検討 |
| 2.4 | TabSwitchをPCでは横並び・横スクロールなしで表示するよう調整 |
| 2.5 | 各カードコンポーネントのホバーエフェクトをPC用に追加/調整 |
| 2.6 | CategoryLinkCard / ArticleCardのサイズ調整（高さ統一など） |

### 2.5 ホバーエフェクトの仕様
```typescript
// CategoryLinkCard
'hover:bg-gray-50 transition-colors duration-200'

// ArticleCard
'hover:shadow-md transition-shadow duration-200'

// TopServiceCard
'hover:border-[#1390c8] transition-colors duration-200'
```

### 2.6 カードサイズの統一
```typescript
// CategoryLinkCard
'h-24 md:h-28 lg:h-32' // 高さをレスポンシブ対応

// ArticleCard
// 画像アスペクト比を維持しつつ、カード全体の高さを揃える
```

### 完了基準
- ✅ CategoryLinkGridが3〜4列表示（PC）
- ✅ ArticleCardが2〜3列表示（PC）
- ✅ TabSwitchが横スクロール不要（PC）
- ✅ 全カードにホバーエフェクト実装
- ✅ カードの高さが統一されている
- ✅ モバイル表示が維持されている

---

## Phase 3: 2カラムレイアウトの導入（オプション）

**目的**: メイン＋サイドバーでコンテンツとCTAを整理する

**注意**: このPhaseは最後に実施。Phase 1-2, 4-6が完了し、安定してから検討する。

| Step | 内容 |
|------|------|
| 3.1 | 2カラムレイアウトの仕様決定 |
| 3.2 | メインエリアの配置内容を確定 |
| 3.3 | サイドバーの配置内容を確定 |
| 3.4 | モバイル表示の順序を決定 |
| 3.5 | 比較表の配置戦略を決定 |
| 3.6 | 実装とテスト |

### 3.1 2カラムレイアウトの仕様
```typescript
// ラッパー
<div className="lg:flex lg:gap-8">
  {/* メインエリア */}
  <main className="lg:w-2/3">...</main>
  
  {/* サイドバー */}
  <aside className="lg:w-1/3">
    <div className="lg:sticky lg:top-4">...</div>
  </aside>
</div>

// 幅の配分
// メイン: lg:w-2/3（約66%）
// サイドバー: lg:w-1/3（約33%）
// gap: lg:gap-8（32px）
```

### 3.2 メインエリアの配置内容

1. HeroSection
2. CategoryButtons（目的選択）
3. TabSwitch（カテゴリタブ）
4. TopServiceCard
5. ComparisonTable
6. 年代・業種から探す（CategoryLinkGrid）

### 3.3 サイドバーの配置内容

1. おすすめコンテンツ（ArticleCard × 3）
2. CTA（手取り計算など）
3. 広告枠（将来用）

**sticky設定:**
```typescript
'lg:sticky lg:top-4'
// スクロールに追従、親要素の下部で停止
```

### 3.4 モバイル表示の順序

全て縦並び維持、サイドバー内容は最下部に配置:

1. HeroSection
2. CategoryButtons
3. TabSwitch
4. TopServiceCard
5. ComparisonTable
6. CategoryLinkGrid
7. おすすめコンテンツ（サイドバーから移動）
8. CTA（サイドバーから移動）

### 3.5 比較表の配置戦略

**Option A**: メインのみに配置（推奨）
- メリット: シンプル、実装が容易
- デメリット: サイドバーが寂しい

**Option B**: サイドバーに簡易版、メインに完全版
- メリット: 常に目に入る位置にCTA
- デメリット: 重複感、実装が複雑

→ **Option Aを推奨**

### 完了基準
- ✅ PC（lg以上）で2カラム表示
- ✅ モバイルは1カラム維持
- ✅ サイドバーがstickyで追従
- ✅ コンテンツの配置が適切
- ✅ スクロール体験が良好

---

## Phase 4: ヒーロー・CTAのPC調整

**目的**: PCでの見た目と余白を整える

| Step | 内容 |
|------|------|
| 4.1 | HeroSectionの高さを拡張 |
| 4.2 | ヒーロー内のキャッチコピーやフォントサイズを拡大 |
| 4.3 | CategoryButtonsのボタンサイズと余白を拡大 |
| 4.4 | CTAボタンのクリック領域をPCで44px以上に確保 |
| 4.5 | CategoryButtonsのレイアウト調整 |
| 4.6 | ボタン内のテキストサイズとアイコンサイズの調整 |

### 4.1 HeroSectionの高さ仕様
```typescript
// 現在: h-64（256px）
// 修正後:
'h-64 md:h-80 lg:h-96'

// 具体的なpx値
// モバイル:   h-64  (256px)
// タブレット: md:h-80 (320px)
// PC:        lg:h-96 (384px)
```

### 4.2 キャッチコピーのフォントサイズ
```typescript
// 見出し
'text-2xl md:text-3xl lg:text-4xl'

// サブタイトル
'text-base md:text-lg lg:text-xl'
```

### 4.5 CategoryButtonsのレイアウト
```typescript
// 現在: grid-cols-2
// 修正後:
'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'
```

### 4.6 ボタン内のテキストとアイコン
```typescript
// テキスト
'text-sm md:text-base'

// アイコン
'w-5 h-5 md:w-6 md:h-6'
```

### 完了基準
- ✅ HeroSectionの高さがレスポンシブ対応
- ✅ キャッチコピーが読みやすいサイズ
- ✅ CategoryButtonsが3〜4列表示（PC）
- ✅ 全ボタンのクリック領域が44px以上
- ✅ モバイル表示が維持されている

---

## Phase 5: 比較表のPC最適化

**目的**: 表の見やすさと利用しやすさを高める

| Step | 内容 |
|------|------|
| 5.1 | ComparisonTableのセルpaddingを調整 |
| 5.2 | 表のmin-widthを確認し、PCでoverflow-x-autoを外して常に表示する検討 |
| 5.3 | PCでは比較表をサイドバーにも配置する案を検討（Phase 3と連携） |
| 5.4 | ComparisonTableのレスポンシブ戦略を決定 |
| 5.5 | 「公式サイト」ボタンのサイズ調整 |

### 5.1 セルpaddingの仕様
```typescript
// 現在: py-2 px-3
// 修正後:
'py-2 px-3 md:py-3 md:px-4'

// 具体的なpx値
// モバイル:   py-2 px-3  (8px 12px)
// タブレット: md:py-3 md:px-4 (12px 16px)
```

### 5.4 レスポンシブ戦略

**モバイル（〜767px）:**
- 横スクロール維持
- 最低3サービス表示
- overflow-x-auto

**タブレット（768px〜1023px）:**
- 3カラム表示
- 一部情報を省略（「備考」など）
- 横スクロール不要

**PC（1024px〜）:**
- 4カラム表示
- 全情報表示
- 横スクロール不要

### 5.5 ボタンサイズ調整
```typescript
// 現在: h-10
// 修正後:
'h-10 md:h-12'

// 具体的なpx値
// モバイル:   h-10 (40px)
// タブレット: md:h-12 (48px)
```

### 完了基準
- ✅ セルpaddingがレスポンシブ対応
- ✅ PCで横スクロール不要
- ✅ 各ブレークポイントで適切な表示
- ✅ ボタンのクリック領域が十分
- ✅ モバイル表示が維持されている

---

## Phase 6: 細部の調整・検証

**目的**: デザインの一貫性と品質を揃える

| Step | 内容 |
|------|------|
| 6.1 | セクション間の余白をレスポンシブ調整 |
| 6.2 | フォントサイズ・行間のmd:調整 |
| 6.3 | 画面チェック（768px / 1024px / 1280px） |
| 6.4 | 縦長ページでのスクロール量・体験の確認 |
| 6.5 | アクセシビリティチェック |
| 6.6 | パフォーマンスチェック |
| 6.7 | 実機テスト |
| 6.8 | ブラウザ互換性チェック |

### 6.1 セクション間余白の仕様
```typescript
// v2余白ルールと統一
'py-4 md:py-6 lg:py-8'

// または
'mb-4 md:mb-6 lg:mb-8'
```

### 6.2 フォントサイズ調整基準

| 要素 | モバイル | タブレット(md) | PC(lg) |
|------|---------|---------------|--------|
| 本文 | 14px (text-sm) | 14px | 16px (text-base) |
| 小見出し | 16px (text-base) | 18px (text-lg) | 20px (text-xl) |
| 大見出し | 20px (text-xl) | 24px (text-2xl) | 28px (text-3xl) |
| ボタンテキスト | 14px (text-sm) | 14px | 16px (text-base) |
| キャプション | 12px (text-xs) | 12px | 14px (text-sm) |

### 6.5 アクセシビリティチェック

- [ ] **タッチターゲット**: 最小44px×44px
- [ ] **キーボードナビゲーション**: Tab/Shift+Tabで全要素にアクセス可能
- [ ] **フォーカス表示**: :focus-visibleで明確なアウトライン
- [ ] **カラーコントラスト比**: WCAG AA準拠（4.5:1以上）
- [ ] **代替テキスト**: 全画像にalt属性
- [ ] **見出し階層**: h1→h2→h3の順序を守る

### 6.6 パフォーマンスチェック

- [ ] **画像最適化**: Next.js Image使用、適切なサイズ
- [ ] **遅延読み込み**: loading="lazy"またはpriority設定
- [ ] **レスポンシブ画像**: srcset/sizes属性
- [ ] **不要なリレンダリング**: React DevToolsで確認
- [ ] **Lighthouse スコア**: Performance 90以上

### 6.7 実機テスト

- [ ] **iPad** (768px): Safari
- [ ] **MacBook Air** (1280px): Chrome, Safari
- [ ] **外部モニター** (1920px): Chrome
- [ ] **Windows PC** (1366px): Edge

### 6.8 ブラウザ互換性チェック

- [ ] **Chrome** (最新版)
- [ ] **Safari** (最新版)
- [ ] **Firefox** (最新版)
- [ ] **Edge** (最新版)

### 完了基準
- ✅ 全セクションの余白が統一されている
- ✅ フォントサイズが適切に調整されている
- ✅ 768px/1024px/1280pxで正しく表示
- ✅ スクロール体験が良好
- ✅ アクセシビリティチェック全項目クリア
- ✅ パフォーマンスチェック全項目クリア
- ✅ 実機テスト全項目クリア
- ✅ ブラウザ互換性チェック全項目クリア

---

## 余白システムとの整合性

今日作成したv2コンポーネントの余白ルールとの統一性を保つ:

### コンポーネント間余白
```typescript
// 小: mb-4 (16px) → md:mb-6 (24px)
// 中: mb-6 (24px) → md:mb-8 (32px)
// 大: mb-8 (32px) → md:mb-10 (40px)
```

### セクション間余白
```typescript
// py-4 (16px) → md:py-6 (24px) → lg:py-8 (32px)
```

### 内部余白
```typescript
// p-4 (16px) → md:p-6 (24px)
```

---

## v2コンポーネントへの影響確認

以下のv2コンポーネントへの影響を確認・対応:

| コンポーネント | 影響内容 | 対応 |
|--------------|---------|------|
| **ArticleCard** | グリッド表示時のサイズ調整 | 高さの統一、ホバーエフェクト追加 |
| **CategoryLinkCard** | PC用のホバーエフェクト | transition効果の追加 |
| **ComparisonTable** | PC用のpadding調整 | md:py-3 md:px-4の追加 |
| **SectionBar** | PC用のpadding調整 | md:py-3の追加 |
| **TedoriCalculator** | レスポンシブ対応 | 特に変更不要（既に対応済み） |

### 記事ページへの影響

IT記事など、既存の記事ページにv2コンポーネントのレスポンシブ対応を追加する場合:

- [ ] IT記事（it-engineer）で表示確認
- [ ] 薬剤師記事（作成予定）で表示確認
- [ ] 新卒記事（fresh-graduate）で表示確認

---

## デザイントークンの活用

マジックナンバーを避けるため、以下を活用:
```typescript
// LAYOUT定数
LAYOUT.containerMaxWidth

// BREAKPOINTS定数
BREAKPOINTS.md  // 768px
BREAKPOINTS.lg  // 1024px
BREAKPOINTS.xl  // 1280px

// Tailwind余白トークン
space-y-4  // 16px
space-y-6  // 24px
space-y-8  // 32px

gap-3      // 12px
gap-4      // 16px
gap-6      // 24px
```

---

## 推奨実施順序

Phase 0（現状分析と準備）         ← まず最初に実施
Phase 1（コンテナ幅）             ← 影響範囲が広く、効果も大きい
Phase 2（グリッド・カード）        ← 既存コンポーネントのクラス追加で対応可能
Phase 4（ヒーロー・CTA）          ← Phase 1の結果を見て調整
Phase 5（比較表）                 ← 表の利用頻度に応じて優先度を調整
Phase 6（細部調整・検証）         ← 各Phaseの完了時にも実施
Phase 3（2カラム）                ← 最後にオプションとして検討


**Phase 6は各Phaseの完了時にも実施:**
- Phase 1完了後 → 画面チェック、余白確認
- Phase 2完了後 → グリッド表示確認、カード統一性確認
- Phase 4完了後 → ヒーロー表示確認
- Phase 5完了後 → 比較表表示確認
- 全Phase完了後 → 総合的な検証

---

## 留意点

### 必須事項
- ✅ モバイル表示は現状を維持すること
- ✅ コンポーネント単位で変更し、差分が分かるようコミット単位を小さくする
- ✅ `LAYOUT` / `BREAKPOINTS`を活用し、マジックナンバーを避ける
- ✅ v2コンポーネントの余白ルールと統一性を保つ

### 推奨事項
- ✅ 各Phase完了時にスクリーンショットを保存
- ✅ 変更前後の比較を記録
- ✅ 問題が発生した場合は即座に報告・相談
- ✅ 不明点はPhase開始前に確認

---

## 完了確認チェックリスト

### Phase 0
- [ ] TopPageClient.tsxの構成が文書化されている
- [ ] ブレークポイント戦略が明確
- [ ] PageLayoutの扱いが決定
- [ ] デザイン方向性が合意されている
- [ ] 影響範囲が把握されている

### Phase 1
- [ ] 全セクションが共通コンテナクラスを使用
- [ ] モバイル表示が崩れていない
- [ ] md/lg/xlの各ブレークポイントで適切な幅
- [ ] 横余白が適切（左右均等）
- [ ] セクション間余白がレスポンシブ対応
- [ ] TypeScriptエラーなし

### Phase 2
- [ ] CategoryLinkGridが3〜4列表示（PC）
- [ ] ArticleCardが2〜3列表示（PC）
- [ ] TabSwitchが横スクロール不要（PC）
- [ ] 全カードにホバーエフェクト実装
- [ ] カードの高さが統一されている
- [ ] モバイル表示が維持されている

### Phase 4
- [ ] HeroSectionの高さがレスポンシブ対応
- [ ] キャッチコピーが読みやすいサイズ
- [ ] CategoryButtonsが3〜4列表示（PC）
- [ ] 全ボタンのクリック領域が44px以上
- [ ] モバイル表示が維持されている

### Phase 5
- [ ] セルpaddingがレスポンシブ対応
- [ ] PCで横スクロール不要
- [ ] 各ブレークポイントで適切な表示
- [ ] ボタンのクリック領域が十分
- [ ] モバイル表示が維持されている

### Phase 6
- [ ] 全セクションの余白が統一されている
- [ ] フォントサイズが適切に調整されている
- [ ] 768px/1024px/1280pxで正しく表示
- [ ] スクロール体験が良好
- [ ] アクセシビリティチェック全項目クリア
- [ ] パフォーマンスチェック全項目クリア
- [ ] 実機テスト全項目クリア
- [ ] ブラウザ互換性チェック全項目クリア

### Phase 3（オプション）
- [ ] PC（lg以上）で2カラム表示
- [ ] モバイルは1カラム維持
- [ ] サイドバーがstickyで追従
- [ ] コンテンツの配置が適切
- [ ] スクロール体験が良好

---

## 関連ドキュメント

- `docs/v2-component-usage-report.md` - v2コンポーネント使用状況
- `docs/v2-spacing-rules.md` - 余白ルール
- `docs/v2-spacing-verification-report.md` - 余白検証結果

---

**作成者**: Kuma  
**最終更新**: 2025年2月16日
