# SEO対策：サイト名「手取りのミカタ」への変更一覧

サイト名を「手取り計算シミュレーションツール テドリさん」から「手取りのミカタ」に変更する際の、SEO関連の修正対象と推奨内容です。

---

## 1. 優先度：高（全ページに影響）

### 1-1. `app/layout.tsx`
**役割**: デフォルトメタデータ、OG、Twitterカード

| 項目 | 現在 | 推奨 |
|------|------|------|
| `metadata.title.default` | 手取り計算シミュレーションツール テドリさん \| 年収から手取り額を自動計算 | 手取りのミカタ \| 年収から手取り額を自動計算 |
| `metadata.title.template` | %s｜テドリさん | %s｜手取りのミカタ |
| `metadata.description` | テドリさんがあなたの手取り額を計算します... | 手取りのミカタがあなたの手取り額を計算します。年収・扶養人数を入力するだけで... |
| `metadata.keywords` | ..., テドリさん | ..., 手取りのミカタ |
| `metadata.applicationName` | 手取り計算シミュレーションツール テドリさん | 手取りのミカタ |
| `metadata.openGraph.title` | 手取り計算シミュレーションツール テドリさん | 手取りのミカタ |
| `metadata.openGraph.description` | テドリさんがあなたの手取り額を計算します | 手取りのミカタがあなたの手取り額を計算します |
| `metadata.openGraph.siteName` | 手取り計算シミュレーションツール テドリさん | 手取りのミカタ |

---

### 1-2. `app/lib/metadata.ts`
**役割**: 共通メタデータ生成（createPageMetadata / createArticleMetadata で使用）

| 項目 | 現在 | 推奨 |
|------|------|------|
| `SITE_NAME` | 手取り計算シミュレーションツール テドリさん | 手取りのミカタ |

**効果**: この定数を変更すると、`createPageMetadata` / `createArticleMetadata` を使う全ページの OG `siteName` が一括で更新されます。

---

## 2. 優先度：高（構造化データ・リッチリザルト）

### 2-1. `app/components/StructuredData.tsx`
**役割**: TOPページ用 JSON-LD（WebSite, Organization, WebPage など）

| 箇所 | 現在 | 推奨 |
|------|------|------|
| WebSite.name | テドリさん | 手取りのミカタ |
| Organization.name | テドリさん | 手取りのミカタ |
| Organization.logo.caption | テドリさん | 手取りのミカタ |
| WebPage.name | ... \| テドリさん | ... \| 手取りのミカタ |
| SoftwareApplication.name | テドリさん - 手取り計算シミュレーション | 手取りのミカタ - 手取り計算シミュレーション |

---

### 2-2. `app/components/ArticleStructuredData.tsx`
**役割**: マガジン記事用 Article 構造化データ

| 箇所 | 現在 | 推奨 |
|------|------|------|
| author.name | テドリさん | 手取りのミカタ |
| publisher.name | テドリさん | 手取りのミカタ |

---

## 3. 優先度：中（個別ページメタデータ）

### 3-1. `app/page.tsx`（TOP）
| 項目 | 現在 | 推奨 |
|------|------|------|
| title | 【手取り計算シミュレーションツール付き】... \| 手取り計算シミュレーションツール テドリさん | 【手取り計算シミュレーション付き】... \| 手取りのミカタ |
| openGraph.siteName | 手取り計算シミュレーションツール テドリさん | 手取りのミカタ |
| openGraph.images.alt | テドリさん - 年収手取りシミュレーション | 手取りのミカタ - 年収手取りシミュレーション |
| authors / creator / publisher | テドリさん | 手取りのミカタ |

---

### 3-2. 各ページの title / openGraphTitle

**置換ルール**:  
- `｜テドリさん` → `｜手取りのミカタ`  
- `｜手取り計算シミュレーションツール テドリさん` → `｜手取りのミカタ`

**対象ファイル（33ファイル）**:
- `app/tables/page.tsx`
- `app/tables/annual-income/[amount]/page.tsx`
- `app/tables/monthly-takehome/[amount]/page.tsx`
- `app/faq/page.tsx`
- `app/tools/job-change/page.tsx`
- `app/tools/fresh-graduate/page.tsx`
- `app/tools/side-business/page.tsx`
- `app/qualifications/page.tsx`
- `app/qualifications/araforty-engineer/page.tsx`
- `app/qualifications/40s-women-restart/page.tsx`
- `app/qualifications/stable-career/page.tsx`
- `app/qualifications/high-income/page.tsx`
- `app/qualifications/no-entry-requirement/page.tsx`
- `app/qualifications/no-work-experience/page.tsx`
- `app/magazine/job-salary/it-engineer/page.tsx`
- `app/magazine/job-salary/nursery/page.tsx`
- `app/magazine/job-salary/sales/page.tsx`
- `app/magazine/job-salary/pharmacist/page.tsx`
- `app/magazine/job-salary/medical-tech/page.tsx`
- `app/magazine/job-salary/real-estate/page.tsx`
- `app/magazine/job-salary/construction/page.tsx`
- `app/magazine/inexperienced/20s/page.tsx`
- `app/magazine/inexperienced/20s-women/page.tsx`
- `app/magazine/inexperienced/30s/page.tsx`
- `app/magazine/inexperienced/30s-women/page.tsx`
- `app/magazine/inexperienced/40s/page.tsx`
- `app/magazine/inexperienced/40s-women/page.tsx`
- `app/magazine/high-school/page.tsx`
- `app/magazine/inexperienced/high-school-women/page.tsx`
- `app/career/high-income/page.tsx`（createPageMetadata 使用）
- `app/career/career-change-20s/page.tsx`（createPageMetadata 使用）

※ `createPageMetadata` / `createArticleMetadata` を使うページは、`lib/metadata.ts` の `SITE_NAME` 変更で OG `siteName` は自動更新されます。  
※ 各ページの `title` と `openGraphTitle` に含まれる「テドリさん」「手取り計算シミュレーションツール テドリさん」は、上記置換ルールで個別に修正が必要です。

---

## 4. 優先度：低（UI・アクセシビリティ）

### 4-1. `app/components/Header.tsx`
| 項目 | 現在 | 推奨 |
|------|------|------|
| aria-label（PCロゴ） | 手取り計算シミュレーションツール テドリさん | 手取りのミカタ - 手取り計算・年収シミュレーション・転職の無料ツール |
| aria-label（スマホロゴ） | 同上 | 同上 |

---

### 4-2. CTAボタン文言（SEO影響は小）
| ファイル | 現在 | 推奨（任意） |
|----------|------|--------------|
| ComparisonListClient.tsx | 手取り計算シミュレーションツールを使う | 手取りのミカタを使う |
| AnnualIncomeClient.tsx | 同上 | 同上 |
| MonthlyTakeHomePageClient.tsx | 同上 | 同上 |
| AnnualIncomePageClient.tsx | 同上 | 同上 |

---

## 5. 参考・ドキュメント

### 5-1. `seo-audit-report.md`
- サイト名の記述を「手取りのミカタ」に合わせて更新

---

## 6. 一括置換の例

```bash
# テドリさん → 手取りのミカタ（タイトル・OG用）
# 手取り計算シミュレーションツール テドリさん → 手取りのミカタ
```

※ 一括置換する場合は、文脈に応じて個別に確認してください。

---

## 7. 実施順序の推奨

1. `app/lib/metadata.ts` の `SITE_NAME` を変更
2. `app/layout.tsx` のメタデータを変更
3. `app/page.tsx` のメタデータを変更
4. `app/components/StructuredData.tsx` を変更
5. `app/components/ArticleStructuredData.tsx` を変更
6. 各ページの `title` / `openGraphTitle` を変更（必要に応じて一括置換）
7. `app/components/Header.tsx` の aria-label を変更
8. CTAボタン文言を変更（任意）
