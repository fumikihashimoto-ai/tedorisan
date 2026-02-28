# 下層ページ v2 移行チェックリスト

下層ページをコーディングルール準拠に統一するための移行チェックリストです。

**進め方**: パターンA（段階移行・1〜3ページずつ）  
**広告**: PC サイドバー・固定下部バナーは廃止

---

## 1. 対象ページ一覧

### 1.1 移行優先度とステータス

| 優先度 | カテゴリ | パス | ステータス |
|--------|----------|------|------------|
| 基準 | magazine/job-salary | it-engineer | ✅ v2準拠 |
| 基準 | qualifications | araforty-engineer | ✅ v2準拠 |
| 1 | magazine/job-salary | pharmacist | ✅ 完了 |
| 1 | magazine/job-salary | construction | ✅ 完了 |
| 1 | magazine/job-salary | medical-tech | ✅ 完了 |
| 1 | magazine/job-salary | nursery | ✅ 完了 |
| 1 | magazine/job-salary | real-estate | ✅ 完了 |
| 1 | magazine/job-salary | sales | ✅ 完了 |
| 2 | qualifications | stable-career | ✅ 完了 |
| 2 | qualifications | high-income | ✅ 完了 |
| 2 | qualifications | no-entry-requirement | ✅ 完了 |
| 2 | qualifications | no-work-experience | ✅ 完了 |
| 2 | qualifications | 40s-women-restart | ✅ 完了 |
| 3 | magazine/inexperienced | 20s | ✅ 完了 |
| 3 | magazine/inexperienced | 20s-women | ✅ 完了 |
| 3 | magazine/inexperienced | 30s | ✅ 完了 |
| 3 | magazine/inexperienced | 30s-women | ✅ 完了 |
| 3 | magazine/inexperienced | 40s | ✅ 完了 |
| 3 | magazine/inexperienced | 40s-women | ✅ 完了 |
| 3 | magazine/inexperienced | high-school-women | ✅ 完了 |
| 4 | magazine | high-school | ✅ 完了 |
| 5 | career | career-change-20s | ✅ 完了 |
| 5 | career | high-income | ✅ 完了 |
| 6 | tools | fresh-graduate | ✅ v2 UI適用 |
| 6 | tools | job-change | ✅ v2 UI適用 |
| 6 | tools | side-business | ✅ v2 UI適用 |
| 7 | その他 | tables | ✅ v2 UI適用 |
| 7 | その他 | faq | ✅ v2 UI適用 |

---

## 2. ページごと移行チェックリスト

各ページ移行時に、以下を順に実施・確認する。

### 2.1 page.tsx の変更

| # | 項目 | 確認 | 備考 |
|---|------|------|------|
| 1 | `ArticlePageLayout` でラップする | ⬜ | 旧: `div.min-h-screen` + 独自レイアウト |
| 2 | `TedoriCalculator` をヒーロー直下に配置 | ⬜ | `<TedoriCalculator noMargin contentLayout={true} />` |
| 3 | パンくずリストを配置 | ⬜ | `breadcrumb` クラス使用 |
| 4 | h1 を配置 | ⬜ | `text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)]` |
| 5 | PC サイドバー広告を削除 | ⬜ | `aside` および `ArticleSidebarAd` 等 |
| 6 | 固定下部バナーを削除 | ⬜ | `fixed bottom-0` の広告ブロック |
| 7 | `ArticleStructuredData` は維持 | ⬜ | 既存のまま |
| 8 | metadata は維持 | ⬜ | 既存のまま |

### 2.2 記事コンポーネント（XXXArticle.tsx）の変更

| # | 項目 | 確認 | 備考 |
|---|------|------|------|
| 9 | `ArticleBodySection` でセクションをラップ | ⬜ | `contentLayout={CONTENT_LAYOUT}` |
| 10 | `ArticleSectionHeading` で h2 を置換 | ⬜ | 16px・下線付き |
| 11 | `ArticleSubHeading` で h3/h4 を置換 | ⬜ | 14px・下線付き |
| 12 | `ArticleParagraph` で本文を置換 | ⬜ | 14px / leading-[25px] |
| 13 | `ArticleTable` で表組を置換 | ⬜ | 既存の `<table>` を置換 |
| 14 | `PointHeaderBox` で囲み枠を置換 | ⬜ | 編集部コメント等は `bodyVariant="highlight"` |
| 15 | インラインの `<p>`, `<li>` にフォント指定 | ⬜ | `font-['Noto_Sans_JP'] text-[14px] leading-[25px]` |
| 16 | 注釈・補足は 12px | ⬜ | `text-[12px]` |
| 17 | キャプションは 14px | ⬜ | `text-[14px]` または `text-sm` |

### 2.3 その他

| # | 項目 | 確認 | 備考 |
|---|------|------|------|
| 18 | ヒーロー画像の扱い | ⬜ | ArticlePageLayout の HeroSection は汎用。ページ固有ヒーローが必要なら要検討 |
| 19 | Client Component の要否 | ⬜ | イベントハンドラ使用時は `'use client'` |
| 20 | ビルドエラーなし | ⬜ | `npm run build` で確認 |
| 21 | 表示確認（PC/SP） | ⬜ | レイアウト・フォント・余白 |

---

## 3. フォント・サイズ早見表

| 要素 | 仕様 | コンポーネント / クラス |
|------|------|--------------------------|
| 本文 | 14px / 25px 行間 | `ArticleParagraph` / `text-[14px] leading-[25px]` |
| 見出し h2 | 16px | `ArticleSectionHeading` |
| 見出し h3/h4 | 14px | `ArticleSubHeading` |
| キャプション | 14px | `text-[14px]` / `text-sm` |
| 注釈 | 12px | `text-[12px]` |
| フォント | Noto Sans JP | `font-['Noto_Sans_JP']` |

---

## 4. 参照ファイル

| 用途 | パス |
|------|------|
| ベース実装 | `app/magazine/job-salary/it-engineer/page.tsx` |
| 資格ページ適用例 | `app/qualifications/araforty-engineer/` |
| レイアウト | `app/components/v2/layouts/ArticlePageLayout.tsx` |
| v2 記事コンポーネント | `app/components/v2/article/` |
| ルール詳細 | `docs/lower-page-regulation.md` |
| Cursor ルール | `.cursor/rules/lower-page-ui.mdc` |

---

## 5. Client Component の注意

イベントハンドラ（`onClick` 等）を使用するコンポーネントは `'use client'` が必要。

- `FreeConsultationCTA` … 既に `'use client'`
- 外部リンク＋ gtag 計測 … 親コンポーネントを Client にするか、リンク部分を Client コンポーネントに分離

---

## 6. 移行後のステータス更新

ページ移行完了時、本ドキュメントの「1.1 移行優先度とステータス」で該当行のステータスを `✅ 完了` に更新する。
