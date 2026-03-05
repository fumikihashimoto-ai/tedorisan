---
name: add-parts-block
description: |
  microCMSに新しいパーツタイプ（partsBlock）が追加された際に、
  表示側のNext.jsコードを実装する。
  「新しいパーツを追加」「partsBlock対応」「CMSに新しいブロックを追加した」
  「新しいコンポーネントをCMSに対応させて」「microCMSを拡張した」と言われたら使う。
---

# partsBlock 拡張スキル

## 概要
microCMSに新しいパーツタイプが追加された際に、Next.js側の表示コードを実装する。
以下の作業を行う：
- TypeScript型定義の追加
- 表示用コンポーネントの作成
- partsBlockレンダリング部分への組み込み

## 作業前の確認事項（必ずユーザーに確認する）

1. **パーツの名前**: microCMSで設定したパーツタイプ名（APIフィールド名）
2. **パーツの用途**: 何を表示するパーツか（例: FAQセクション、料金表、ステップ説明 等）
3. **microCMSのスキーマ**: そのパーツに含まれるフィールドの構成
   - フィールド名、型（テキスト、リッチエディタ、画像、繰り返し等）
   - 必須/任意の区分
4. **デザイン要件**: 見た目の指定があるか（既存パーツに似せる、特定のデザイン等）
5. **参考パーツ**: 既存の実装済みpartsBlockで最も構造が近いもの

## 作業手順

### Step 1: 既存実装の確認
1. partsBlockレンダリング部分のコードを確認する：
   - **ファイル: `app/articles/[category]/[slug]/page.tsx`**
   - **関数: `renderBodyBlock`**
2. 既存パーツの実装パターンを把握する：
   - `resolveField` 関数で `partType` と `partCategory` を取得
   - `partType` の値で `if` 分岐してコンポーネントを返す
   - `partCategory` でサブカテゴリの判定（必要に応じて）
3. **既存パターンに合わせて実装する（独自の書き方をしない）**

### Step 2: 型定義の追加
1. microCMSのスキーマに基づいて TypeScript の型を定義する
   - **ファイル: `lib/microcms.ts`**
   - 既存の `ArticleBodyBlock` 型に新しいフィールドが必要であれば追加する
   - 必要に応じて新しい型を `lib/microcms.ts` に追加する
2. 既存の型定義と同じスタイル・命名規則に合わせる
3. フィールドの必須/任意を正しく反映する（任意フィールドは `?` をつける）

### Step 3: 表示コンポーネントの作成
1. 新しいパーツ用のコンポーネントを作成する
   - **配置先: `app/components/v2/common/`**
   - ファイル名は既存の命名規則（PascalCase）に従う
   - 例: `FaqSection.tsx`、`PriceTable.tsx`
2. 実装内容：
   - microCMSから受け取ったデータを表示する
   - v2カラー（`#1390c8`、`#3f3f3f`、`#e6e6e6` 等）を使用する
   - レスポンシブ対応（モバイル表示を考慮）
   - 画像がある場合は Next.js の `<Image>` を使用
   - アフィリエイトリンクがある場合は affiliate.md のルールに従う
3. **データが空・未設定の場合のフォールバック表示を実装する**

### Step 4: partsBlockレンダリングへの組み込み
1. `app/articles/[category]/[slug]/page.tsx` の `renderBodyBlock` 関数に新しい分岐を追加する
2. 以下のパターンに従う：
   ```typescript
   if (partType === '新しいパーツ名') {
     return <NewComponent key={index} /* props */ />;
   }
   ```
3. microCMSのAPIフィールド名と正確に一致させる（タイポ注意）
4. 必要に応じて `PART_CATEGORY_SITUATIONS` や `CTA_CONFIG` のマッピング定数を更新する
5. 既存パーツの表示に影響を与えていないことを確認する

### Step 5: 確認
1. `npm run dev` でローカル確認
   - 新しいパーツが正しく表示されるか
   - 既存のパーツが壊れていないか
   - レスポンシブ表示に問題がないか
   - パーツのデータが空の場合のフォールバック表示
2. `bash scripts/secret-check.sh` でシークレットチェック
3. `npm run build` でビルド確認
4. すべて成功したらユーザーに報告する

### Step 6: 報告
以下の内容をユーザーに報告する：
- 追加・変更したファイルの一覧
- 新パーツの表示確認方法（どのページで確認できるか）
- 確認すべきポイント
- 注意事項やリスク（あれば）

## 既存パーツ一覧（参照用）
| partType | コンポーネント | 配置場所 |
|---|---|---|
| `calculator` | `TedoriCalculator` | `app/components/v2/common/TedoriCalculator.tsx` |
| `comparison` | `ComparisonTable` | `app/components/v2/common/ComparisonTable.tsx` |
| `cta` | `ArticleCTAButton` | `app/components/v2/common/ArticleCTAButton.tsx` |

## 関連ファイルまとめ
| 目的 | ファイルパス |
|---|---|
| partsBlockレンダリング | `app/articles/[category]/[slug]/page.tsx` → `renderBodyBlock` 関数 |
| 型定義 | `lib/microcms.ts` |
| 新コンポーネント配置先 | `app/components/v2/common/` |
| カテゴリマッピング定数 | `app/articles/[category]/[slug]/page.tsx` → `PART_CATEGORY_SITUATIONS`, `CTA_CONFIG` |
| アフィリエイトデータ | `lib/comparisonData.ts` |

## 注意事項
- 既存のコンポーネントやスタイルを極力再利用すること
- 新コンポーネントの命名は既存パターン（PascalCase）に従うこと
- **判断に迷ったら推測で進めず、ユーザーに確認すること**
- アフィリエイト要素を含むパーツは、affiliate.md のルールを必ず適用すること
- リッチテキストの表示に `dangerouslySetInnerHTML` を使用する場合は、既存の `richTextBlock` と同じパターンに従うこと
