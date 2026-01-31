# 全ページ SEO対策 情報まとめ

サイト全体のSEO現状と、ページごとに必要な対策をまとめました。

---

## 1. サイト全体の共通課題

### 1.1 緊急修正が必要な項目

| 項目 | 現状 | 推奨対応 |
|------|------|----------|
| **metadataBase の誤り** | `layout.tsx` で `https://tedorikun.jp` と設定 | `https://tedorisan.jp` に修正（サイトURLと不一致） |
| **OG画像の欠如** | `createPageMetadata` を使用するページは og:image なし | 共通OG画像を設定するか、`createPageMetadata` に images オプションを追加 |

### 1.2 createPageMetadata の現状

`app/lib/metadata.ts` の `createPageMetadata` が提供する項目：
- title, description, keywords
- canonical URL
- Open Graph（title, description, type, locale, siteName, url）※**images なし**
- Twitter Card（title, description）※**images なし**
- robots（index, follow）

**未提供の項目**（TOPページのみ個別実装済み）：
- og:image / twitter:image
- authors, creator, publisher
- formatDetection
- themeColor
- category
- googleBot 詳細設定

### 1.3 構造化データ（JSON-LD）

| ページ | 現状 | 推奨 |
|--------|------|------|
| TOP | WebSite, Organization, WebPage, SoftwareApplication, FAQPage, BreadcrumbList | 現状維持 |
| FAQ | なし | FAQPage スキーマを追加（リッチリザルト対象） |
| マガジン記事 | なし | Article スキーマを追加 |
| 計算ツール | なし | SoftwareApplication または HowTo を検討 |
| 早見表 | なし | Table または Dataset を検討 |

---

## 2. ページ別 SEO 情報一覧

### 2.1 TOPページ（/）

| 項目 | 現状 | 備考 |
|------|------|------|
| title | あり（長文・キーワード含む） | OK |
| description | あり | OK |
| keywords | あり（配列） | OK |
| canonical | https://tedorisan.jp/ | OK |
| robots | index, follow, googleBot 詳細 | OK |
| OG | type, locale, url, siteName, title, description, **images** | OK |
| Twitter | card, title, description, images | OK |
| その他 | authors, creator, publisher, formatDetection, icons, themeColor, category | OK |
| 構造化データ | WebSite, Organization, WebPage, SoftwareApplication, FAQPage, BreadcrumbList | OK |

**必要な対策**: 特になし（metadataBase の継承元修正のみ）

---

### 2.2 計算ツール

| ページ | パス | title | description | keywords | canonical | OG画像 |
|--------|------|-------|--------------|----------|-----------|--------|
| 新卒向け | /tools/fresh-graduate | ○ | ○ | ○ | ○ | × |
| 転職向け | /tools/job-change | ○ | ○ | ○ | ○ | × |
| 副業向け | /tools/side-business | ○ | ○ | ○ | ○ | × |

**必要な対策**:
- OG画像の追加（共通または個別）
- 構造化データ（SoftwareApplication / HowTo）の検討

---

### 2.3 マガジン（職種別年収）

| ページ | パス | title | description | keywords | canonical | OG画像 |
|--------|------|-------|--------------|----------|-----------|--------|
| ITエンジニア | /magazine/job-salary/it-engineer | ○ | ○ | ○ | ○ | × |
| 保育士 | /magazine/job-salary/nursery | ○ | ○ | ○ | ○ | × |
| 営業職 | /magazine/job-salary/sales | ○ | ○ | ○ | ○ | × |
| 薬剤師 | /magazine/job-salary/pharmacist | ○ | ○ | ○ | ○ | × |
| 臨床検査技師 | /magazine/job-salary/medical-tech | ○ | ○ | ○ | ○ | × |
| 不動産業界 | /magazine/job-salary/real-estate | ○ | ○ | ○ | ○ | × |
| 建設業界 | /magazine/job-salary/construction | ○ | ○ | ○ | ○ | × |

**必要な対策**:
- OG画像の追加
- Article 構造化データ（headline, datePublished, author 等）

---

### 2.4 マガジン（未経験者の就職・転職）

| ページ | パス | title | description | keywords | canonical | OG画像 |
|--------|------|-------|--------------|----------|-----------|--------|
| 20代未経験者 | /magazine/inexperienced/20s | ○ | ○ | ○ | ○ | × |
| 20代女性未経験者 | /magazine/inexperienced/20s-women | ○ | ○ | ○ | ○ | × |
| 30代未経験者 | /magazine/inexperienced/30s | ○ | ○ | ○ | ○ | × |
| 30代女性未経験者 | /magazine/inexperienced/30s-women | ○ | ○ | ○ | ○ | × |
| 40代未経験者 | /magazine/inexperienced/40s | ○ | ○ | ○ | ○ | × |
| 40代女性未経験者 | /magazine/inexperienced/40s-women | ○ | ○ | ○ | ○ | × |
| 高卒・高校中退 | /magazine/high-school | ○ | ○ | ○ | ○ | × |
| 高卒女性 | /magazine/inexperienced/high-school-women | ○ | ○ | ○ | ○ | × |

**必要な対策**:
- OG画像の追加
- Article 構造化データ

---

### 2.5 早見表

| ページ | パス | title | description | keywords | canonical | OG画像 |
|--------|------|-------|--------------|----------|-----------|--------|
| 早見表トップ | /tables | ○ | ○ | ○ | /tables | × |
| 年収→手取り（動的） | /tables/annual-income/[amount] | ○ | ○ | ○ | ○ | × |
| 手取り→年収（動的） | /tables/monthly-takehome/[amount] | ○ | ○ | ○ | ○ | × |

**備考**:
- 早見表トップの canonicalPath は `/tables`（末尾スラッシュなし）
- 動的ページは generateMetadata で適切に生成

**必要な対策**:
- OG画像の追加
- 動的ページ用の構造化データ（金額ごとの Table 等）は検討段階

---

### 2.6 FAQ（/faq）

| 項目 | 現状 |
|------|------|
| title | ○ |
| description | ○ |
| keywords | ○ |
| canonical | /faq |
| OG画像 | × |

**必要な対策**:
- OG画像の追加
- **FAQPage 構造化データ**（リッチリザルト表示のため重要）

---

### 2.7 キャリア（オーファンページ・サイトマップ未登録）

| ページ | パス | サイトマップ | メニュー |
|--------|------|-------------|----------|
| 20代転職の年収相場 | /career/career-change-20s | × | × |
| 年収1000万超えの手取り | /career/high-income | × | × |

**必要な対策**:
- サイトマップへの追加 または 301リダイレクトでマガジンへ統合
- メニューから削除済みのため、SEO上どう扱うか方針決定が必要

---

## 3. 技術的SEO

| 項目 | 現状 |
|------|------|
| robots.txt | ○（SITE_URL 参照、sitemap 記載） |
| sitemap.xml | ○（TOP, ツール, マガジン, 早見表, FAQ 含む） |
| 言語指定 | ○（html lang="ja"） |
| レスポンシブ | ○（viewport 設定） |
| 正規URL | 各ページで canonical 設定済み |

---

## 4. 推奨実施順序

1. ~~**layout.tsx**: metadataBase を `https://tedorisan.jp` に修正~~ ✅ 完了
2. ~~**createPageMetadata**: OG画像オプションを追加し、全ページで共通OG画像を設定~~ ✅ 完了
3. ~~**FAQページ**: FAQPage 構造化データを追加~~ ✅ 既存実装あり
4. ~~**マガジン記事**: Article 構造化データを追加（テンプレート化）~~ ✅ 完了
5. ~~**キャリアページ**: サイトマップ追加 or リダイレクト方針の決定~~ ✅ サイトマップに追加
6. **og-image.png**: `public/og-image.png` を配置（1200×630px推奨）※未作成の場合は404

---

## 5. 参考：OG画像の推奨仕様

- サイズ: 1200 × 630 px
- 形式: PNG または JPG
- 配置: `public/og-image.png`（共通）またはページ別

---

## 6. 補足：未作成アセット

| ファイル | 参照元 | 状態 |
|----------|--------|------|
| og-image.png | app/page.tsx（TOP） | **未作成**（SNSシェア時に画像が表示されない可能性） |
| icon-192.png, icon-512.png | app/page.tsx | **未作成** |
| apple-touch-icon.png | app/page.tsx | **未作成** |

※ layout.tsx の metadataBase が `tedorikun.jp` のままのため、相対パス解決が誤る可能性あり
