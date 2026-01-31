# マガジンコンテンツ追加・ナビゲーション再構成プロンプト

ナビゲーションに「マガジン」を追加し、既存コンテンツを再構成するためのプロンプトです。

---

## 変更概要

| 変更内容 | 詳細 |
|----------|------|
| マガジンの追加 | 新規ドロップダウン「マガジン」をナビゲーションに追加 |
| 職種・年齢別 年収 | ラベルを「職種別年収」に変更し、マガジン内に移動 |
| 未経験者の転職 | マガジン内に移動 |
| 高卒・高校中退の就職 | マガジン内に新規追加 |

---

## パート1: ナビゲーション構造の変更

### 1.1 対象ファイル
`app/lib/navigation.ts`

### 1.2 変更内容

#### 1.2.1 NavItem の型定義を拡張

- **変更前:** `id: 'tools' | 'data' | 'career'`
- **変更後:** `id: 'tools' | 'data' | 'career' | 'magazine'`

※ マガジン追加に伴い、`magazine` を id に追加

#### 1.2.2 マガジン用メニュー項目の定義

マガジンは以下の3つのカテゴリを統合したドロップダウンとする。

1. **職種別年収**（旧：職種・年齢別 年収）— DATA_MENU_ITEMS を流用
2. **未経験者の転職** — CAREER_MENU_ITEMS を流用
3. **高卒・高校中退の就職** — 新規追加

**MAGAZINE_MENU_ITEMS の構成（案）:**

```typescript
// 職種別年収 + 未経験者の転職 + 高卒・高校中退の就職 を統合
// DATA_MENU_ITEMS と CAREER_MENU_ITEMS は sitemap 等で参照するため残す
export const MAGAZINE_MENU_ITEMS: NavMenuItem[] = [
  ...DATA_MENU_ITEMS,
  ...CAREER_MENU_ITEMS,
  { label: '高卒・高校中退の就職', href: '/magazine/high-school' },
];
```

※ DATA_MENU_ITEMS と CAREER_MENU_ITEMS は、MAGAZINE_MENU_ITEMS の構成要素として残す。sitemap は MAGAZINE_MENU_ITEMS を参照して magazinePages を生成する。

#### 1.2.3 NAV_ITEMS の変更

- **削除:** 「職種・年齢別 年収」ドロップダウン（id: data）
- **削除:** 「未経験者の転職」ドロップダウン（id: career）
- **追加:** 「マガジン」ドロップダウン（id: magazine）

**変更後の NAV_ITEMS（案）:**

```typescript
export const NAV_ITEMS: NavItem[] = [
  {
    type: 'dropdown',
    id: 'tools',
    label: '計算ツール',
    items: TOOLS_MENU_ITEMS,
    activePrefix: '/tools',
    mobileLabel: '計算ツール',
  },
  {
    type: 'dropdown',
    id: 'magazine',
    label: 'マガジン',
    items: MAGAZINE_MENU_ITEMS,
    activePrefix: '/magazine', // /data/industry, /career も active にしたい場合は Header のロジック要修正
    mobileLabel: 'マガジン',
  },
  {
    type: 'link',
    label: '早見表',
    href: '/tables/',
    mobileLabel: '早見表',
  },
  { type: 'link', label: 'FAQ', href: '/faq', mobileLabel: 'よくあるご質問', footerLabel: 'よくある質問（FAQ）' },
];
```

#### 1.2.4 activePrefix の扱い

マガジンには `/data/industry/*`、`/career/*`、`/magazine/*` の3系統が含まれる。  
`pathname.startsWith(activePrefix)` で active 判定する場合、`activePrefix: '/magazine'` だけでは `/data/industry/*` と `/career/*` が active にならない。

**対応案:**
- Header の active 判定を拡張し、`magazine` のときは `pathname.startsWith('/data/industry') || pathname.startsWith('/career') || pathname.startsWith('/magazine')` で判定する
- または `activePrefix` を配列で持てるように型とロジックを拡張する

#### 1.2.5 FOOTER_SECTIONS の変更

**変更前:**
- 計算ツール
- 職種・年齢別 年収
- キャリア・その他（未経験者の転職 + 早見表 + FAQ）

**変更後（案）:**
- 計算ツール
- マガジン（職種別年収 + 未経験者の転職 + 高卒・高校中退の就職）
- その他（早見表 + FAQ）

```typescript
export const FOOTER_SECTIONS = [
  {
    title: '計算ツール',
    links: TOOLS_MENU_ITEMS.map((i) => ({
      href: i.href,
      label: i.footerLabel ?? i.label,
    })),
  },
  {
    title: 'マガジン',
    links: MAGAZINE_MENU_ITEMS.map((i) => ({
      href: i.href,
      label: i.footerLabel ?? i.label,
    })),
  },
  {
    title: 'その他',
    links: [
      { href: '/tables/', label: '早見表' },
      { href: '/faq', label: 'よくある質問（FAQ）' },
    ],
  },
] as const;
```

---

## パート2: Header コンポーネントの修正

### 2.1 対象ファイル
`app/components/Header.tsx`

### 2.2 変更内容

- **openSection の型:** `'tools' | 'data' | 'career' | null` → `'tools' | 'data' | 'career' | 'magazine' | null`
- **magazine の active 判定:** `/data/industry`、`/career`、`/magazine` のいずれかで始まるパスを active とする

---

## パート3: 高卒・高校中退の就職ページの追加

### 3.1 前提
- 高卒・高校中退の就職は新規コンテンツ
- パス: `/magazine/high-school`
- 参考: `app/career/inexperienced/` の構成・スタイル

### 3.2 作成ファイル

| パス | 説明 |
|------|------|
| `app/magazine/high-school/page.tsx` | ページコンポーネント |
| `app/magazine/high-school/HighSchoolArticle.tsx` | 記事コンポーネント（記事形式の場合） |

### 3.3 メタデータ（例）
- **title:** 高卒・高校中退の就職｜成功のポイントとおすすめ業界・職種
- **description:** 高卒・高校中退者の就職の現状、未経験から挑戦できる業界・職種、就職活動のコツを解説。
- **canonicalPath:** `/magazine/high-school`
- **keywords:** 高卒, 高校中退, 就職, 未経験, キャリア

### 3.4 パンくず（例）
`ホーム > マガジン > 高卒・高校中退の就職`

---

## パート4: sitemap の更新

### 4.1 対象ファイル
`app/sitemap.ts`

### 4.2 変更内容

- **industryPages / careerPages の統合:** `DATA_MENU_ITEMS` と `CAREER_MENU_ITEMS` を個別に参照している箇所を、`MAGAZINE_MENU_ITEMS` に置き換える（重複URLを避けるため）
- **変更前:** `industryPages`（DATA_MENU_ITEMS）、`careerPages`（CAREER_MENU_ITEMS）を別々に生成
- **変更後:** `magazinePages`（MAGAZINE_MENU_ITEMS）を1つ生成し、`industryPages` と `careerPages` を削除

```typescript
// 変更後
const magazinePages: MetadataRoute.Sitemap = MAGAZINE_MENU_ITEMS.map((i) => ({
  url: `${SITE_URL}${i.href}`,
  lastModified: now,
  changeFrequency: 'weekly',
  priority: 0.7,
}));

// return の配列で ...industryPages, ...careerPages を ...magazinePages に置換
```

---

## 補足・検討事項

### 1. グループ表示（職種別年収 / 未経験者の転職 / 高卒・高校中退）

マガジン内で「職種別年収」「未経験者の転職」「高卒・高校中退の就職」をグループ分けして表示したい場合、以下が必要になる。

- NavMenuItem に `group?: string` などを追加
- Header / Footer でグループごとに見出しを表示するロジックを追加

グループ表示が不要であれば、フラットなリストで問題ない。

### 2. DATA_MENU_ITEMS / CAREER_MENU_ITEMS の扱い

- **残す場合:** sitemap や他モジュールで参照しているため、そのまま残し、MAGAZINE_MENU_ITEMS は `[...DATA_MENU_ITEMS, ...CAREER_MENU_ITEMS, 高卒・高校中退]` で構成する
- **削除する場合:** 参照箇所を MAGAZINE_MENU_ITEMS に置き換えてから削除する

### 3. 影響範囲
- Header（PC・スマホ）
- Footer
- sitemap（MAGAZINE_MENU_ITEMS または既存定数の参照変更時）

---

## 実行順序

1. **パート1** を実行（navigation.ts の変更）
2. **パート2** を実行（Header.tsx の修正）
3. **パート3** を実行（`/magazine/high-school` ページの作成）
4. **パート4** を実行（sitemap の更新）
