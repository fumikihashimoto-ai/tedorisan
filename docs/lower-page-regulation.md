# 下層ページレギュレーション（フォント・フォントサイズ）

下層ページ（記事ページ・資格ページなど）におけるフォントおよびフォントサイズの共通仕様です。

**ベース**: `magazine/job-salary/it-engineer`  
**適用先**: `/qualifications/*`, `/magazine/*`, `/career/*`, `/tables`, `/tools/*`, `/faq`

---

## 1. フォント

- **基本フォント**: Noto Sans JP（`font-['Noto_Sans_JP']` または `font-family: 'Noto Sans JP', sans-serif`）
- body でサイト全体に指定済みのため、多くの要素は継承で適用

---

## 2. フォントサイズ

| 要素 | サイズ | 使用コンポーネント / クラス |
|------|--------|------------------------------|
| 本文（パラグラフ） | 14px | `ArticleParagraph` / `text-[14px]` |
| 本文行間 | 25px | `leading-[25px]` |
| 見出し h2（セクション） | 16px | `ArticleSectionHeading` / `text-[16px]` |
| 見出し h3（サブセクション） | 14px | `ArticleSubHeading` / `text-[14px]` |
| 見出し h4（小見出し） | 14px | `ArticleSubHeading` / `text-[14px]` |
| キャプション・補足 | 14px | `text-sm` / `text-[14px]` |
| 注釈・最小サイズ | 12px | `text-[12px]` |
| 編集部コメント内文 | 14px | `text-sm` / `text-[var(--color-v2-text)]` |

---

## 3. 記事内広告

記事コンポーネント（`*Article.tsx`）には **InlineAd やその他の記事内広告を用いない**。v2 移行時は既存の `<InlineAd />` を削除すること。

## 4. 使用コンポーネント

下層ページでは以下の v2 コンポーネントを利用すること。

| コンポーネント | 用途 |
|----------------|------|
| `TedoriCalculator` | ヒーロー直下の手取り計算シミュレーション |
| `ArticleParagraph` | 本文パラグラフ（14px, leading-[25px]） |
| `ArticleSectionHeading` | セクション見出し h2（16px, 下線付き） |
| `ArticleSubHeading` | サブ見出し h3 / h4（14px, 下線付き） |
| `ArticleBodySection` | セクションラッパー（余白・contentLayout 対応） |
| `ArticleTable` | 表組 |
| `PointHeaderBox` | 編集部コメント・FAQ などの囲み枠 |

---

## 5. ヒーロー直下の手取り計算シミュレーション

下層ページのヒーローセクションの直下に、`/magazine/job-salary/it-engineer` で使用している**手取り計算シミュレーション（TedoriCalculator）**を表示すること。

```tsx
<TedoriCalculator noMargin contentLayout={CONTENT_LAYOUT} />
```

- **コンポーネント**: `TedoriCalculator`
- **props**: `noMargin`, `contentLayout={true}`（750px幅の場合）
- **参照**: `app/magazine/job-salary/it-engineer/page.tsx`

---

## 6. レイアウト

- **コンテンツ幅**: 750px（`contentLayout={true}` / `maxWidth="content"`）
- **セクション**: `ArticleBodySection` でラップし、`id` でアンカーリンク対応
- **編集部コメント等**: `PointHeaderBox` の `bodyVariant="highlight"` を使用

---

## 7. 参照ファイル

- ベース実装: `app/magazine/job-salary/it-engineer/page.tsx`
- 適用例: `app/qualifications/araforty-engineer/ArafortyEngineerArticle.tsx`
- コンポーネント: `app/components/v2/article/` 配下
