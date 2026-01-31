# SEO対策 調査レポート

調査日: 2025年1月29日

---

## 1. 実施状況のサマリー

| 項目 | 状態 | 備考 |
|------|------|------|
| metadataBase | ✅ 適切 | `https://tedorisan.jp` に設定済み |
| カノニカルURL | ✅ 適切 | 全ページで設定 |
| robots.txt | ✅ 適切 | サイトマップURL記載 |
| サイトマップ | ✅ 適切 | 主要ページを網羅 |
| 構造化データ | ✅ 適切 | WebSite, Article, FAQPage 等 |
| OG画像 | ⚠️ 要対応 | 参照ファイルが存在しない |
| アイコン画像 | ⚠️ 要対応 | icon-192.png, icon-512.png が存在しない |
| サイト名の統一 | ✅ 対応済み | 「手取り計算シミュレーションツール テドリさん」に統一 |

---

## 2. 要対応事項（優先度順）

### 2.1 【高】OG画像の欠如

**現状:**
- `createPageMetadata`（`app/lib/metadata.ts`）で `DEFAULT_OG_IMAGE = https://tedorisan.jp/og-image.png` を参照
- TOPページ（`app/page.tsx`）でも `https://tedorisan.jp/og-image.png` を指定
- **`public/og-image.png` が存在しない**

**影響:**
- SNSシェア時（Facebook, X/Twitter, LINE等）でOG画像が表示されない
- クリック率・ブランディングに悪影響

**推奨対応:**
1. 1200×630px のOG画像を作成
2. `public/og-image.png` として配置

---

### 2.2 【高】アイコン画像の欠如

**現状:**
- TOPページの `icons` 設定で `/icon-192.png`, `/icon-512.png` を参照
- `StructuredData.tsx`, `ArticleStructuredData.tsx` で `icon-512.png` を publisher の logo として参照
- **`public/icon-192.png`, `public/icon-512.png` が存在しない**

**影響:**
- 構造化データの publisher.logo が 404
- PWA/ブックマーク時のアイコンが正しく表示されない可能性

**推奨対応:**
1. 192×192px, 512×512px のアイコン画像を作成
2. `public/icon-192.png`, `public/icon-512.png` として配置
3. または `app/icon.png` から Next.js が自動生成する場合、参照パスを確認

---

### 2.3 【中】サイト名の不統一 → ✅ 対応済み

**対応内容:**
- サイト全体で「手取り計算シミュレーションツール テドリさん」に統一済み

---

## 3. 適切に実装されている項目

### 3.1 メタデータ基盤

- **metadataBase**: `https://tedorisan.jp` に正しく設定
- **createPageMetadata**: title, description, keywords, canonical, OG, Twitter Card, robots を一括設定
- **記事ページ**: 全25ページ以上で `createPageMetadata` または `createArticleMetadata` を使用

### 3.2 カノニカルURL

- 全ページで `alternates.canonical` を設定
- 重複コンテンツのリスクを軽減

### 3.3 robots.txt

```typescript
// app/robots.ts
- allow: /
- disallow: /api/
- sitemap: https://tedorisan.jp/sitemap.xml
- host: https://tedorisan.jp
```

### 3.4 サイトマップ

- TOP、計算ツール、マガジン、資格、早見表、動的ページ、FAQ、キャリアページを網羅
- changeFrequency, priority を適切に設定

### 3.5 構造化データ

- **TOPページ**: WebSite, Organization, WebPage, SoftwareApplication, FAQPage, BreadcrumbList
- **記事ページ**: Article（headline, description, author, publisher, datePublished 等）

### 3.6 リダイレクト

- 旧URL（`/industry/*`, `/career/inexperienced*` 等）から新URLへの 301 リダイレクトを設定
- URL移行時のSEO評価の引き継ぎに対応

### 3.7 Google Tag Manager

- `NEXT_PUBLIC_GTM_ID` が設定されている場合、GTM を読み込み
- 分析・コンバージョン計測の基盤あり

### 3.8 Google Search Console 検証

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` で検証コードを設定可能

---

## 4. 確認推奨事項

1. **og-image.png**: 本番環境で 404 になっていないか確認
2. **icon-512.png**: Google のリッチリザルトテストで構造化データのエラーがないか確認
3. **サイトマップ**: Search Console で `https://tedorisan.jp/sitemap.xml` が正常に読み込まれているか確認
4. **メタタイトル・ディスクリプション**: 各ページで重複や類似が多すぎないか（過去の分析では未経験者マガジンで類似タイトルが指摘されていた）

---

## 5. 次のアクション

| 優先度 | アクション |
|--------|------------|
| 高 | `public/og-image.png`（1200×630）を作成・配置 |
| 高 | `public/icon-192.png`, `public/icon-512.png` を作成・配置 |
| 中 | ~~サイト名の表記を統一~~ → ✅ 対応済み |
| 低 | Search Console でサイトマップ・インデックス状況を確認 |
