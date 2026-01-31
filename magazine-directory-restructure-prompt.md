# マガジン配下ディレクトリ再構成・コンテンツ移動プロンプト

マガジン配下に3つのカテゴリディレクトリを作成し、既存コンテンツを移動するためのプロンプトです。

---

## 変更概要

| 変更内容 | 詳細 |
|----------|------|
| ディレクトリ作成 | マガジン配下に「職種別年収」「未経験の転職」「高卒の就職」の3カテゴリを作成 |
| コンテンツ移動 | `/data/industry/*` と `/career/inexperienced*` をマガジン配下へ移動 |
| リダイレクト | 旧URLから新URLへ301リダイレクトを設定（SEO対策） |

---

## 目標ディレクトリ構造

```
app/magazine/
├── job-salary/           # 職種別年収
│   ├── it-engineer/
│   ├── pharmacist/
│   ├── nursery/
│   ├── medical-tech/
│   ├── real-estate/
│   ├── construction/
│   └── sales/
├── inexperienced/        # 未経験の転職
│   ├── 20s/
│   ├── 20s-women/
│   ├── 30s/
│   ├── 30s-women/
│   ├── 40s/
│   └── 40s-women/
└── high-school/          # 高卒の就職（既存）
```

---

## パート1: ディレクトリ作成とコンテンツ移動

### 1.1 職種別年収（job-salary）

| 移動元 | 移動先 | コンテンツ |
|--------|--------|------------|
| `app/data/industry/it-engineer/` | `app/magazine/job-salary/it-engineer/` | ITエンジニア |
| `app/data/industry/pharmacist/` | `app/magazine/job-salary/pharmacist/` | 薬剤師 |
| `app/data/industry/nursery/` | `app/magazine/job-salary/nursery/` | 保育士 |
| `app/data/industry/medical-tech/` | `app/magazine/job-salary/medical-tech/` | 臨床検査技師 |
| `app/data/industry/real-estate/` | `app/magazine/job-salary/real-estate/` | 不動産営業 |
| `app/data/industry/construction/` | `app/magazine/job-salary/construction/` | 建設業 |
| `app/data/industry/sales/` | `app/magazine/job-salary/sales/` | 営業職 |

**各ページの修正内容:**
- `canonicalPath`: `/data/industry/xxx` → `/magazine/job-salary/xxx`
- パンくず: `ホーム > 業種別 > XXX` → `ホーム > マガジン > 職種別年収 > XXX`
- 相対import: 同一ディレクトリ内のArticleコンポーネントはそのまま

### 1.2 未経験の転職（inexperienced）

| 移動元 | 移動先 | コンテンツ |
|--------|--------|------------|
| `app/career/inexperienced/` | `app/magazine/inexperienced/20s/` | 20代未経験者の転職 |
| `app/career/inexperienced-women/` | `app/magazine/inexperienced/20s-women/` | 20代女性未経験者の転職 |
| `app/career/inexperienced-30s/` | `app/magazine/inexperienced/30s/` | 30代未経験者の転職 |
| `app/career/inexperienced-30s-women/` | `app/magazine/inexperienced/30s-women/` | 30代女性未経験者の転職 |
| `app/career/inexperienced-40s/` | `app/magazine/inexperienced/40s/` | 40代未経験者の転職 |
| `app/career/inexperienced-40s-women/` | `app/magazine/inexperienced/40s-women/` | 40代女性未経験者の転職 |

**各ページの修正内容:**
- `canonicalPath`: `/career/xxx` → `/magazine/inexperienced/xxx`
- パンくず: `ホーム > 未経験者の転職 > XXX` → `ホーム > マガジン > 未経験の転職 > XXX`
- 記事内の相互リンク: `/career/inexperienced` 等を `/magazine/inexperienced/20s` 等に更新

### 1.3 高卒の就職（high-school）

- **現状:** `app/magazine/high-school/` に既に存在
- **対応:** パンくずを `ホーム > マガジン > 高卒の就職 > 高卒・高校中退の就職` に統一（必要に応じて）

### 1.4 移動しないコンテンツ

以下は `/career/` に残す（マガジンメニューには含まれていない）:
- `app/career/career-change-20s/` — 20代の転職
- `app/career/high-income/` — 年収1000万超えの手取り

---

## パート2: リダイレクト設定

### 2.1 対象ファイル
`next.config.ts`

### 2.2 追加するリダイレクト

```typescript
// 職種別年収（旧 /data/industry/* → 新 /magazine/job-salary/*）
{
  source: '/data/industry/it-engineer',
  destination: '/magazine/job-salary/it-engineer',
  permanent: true,
},
{
  source: '/data/industry/pharmacist',
  destination: '/magazine/job-salary/pharmacist',
  permanent: true,
},
{
  source: '/data/industry/nursery',
  destination: '/magazine/job-salary/nursery',
  permanent: true,
},
{
  source: '/data/industry/medical-tech',
  destination: '/magazine/job-salary/medical-tech',
  permanent: true,
},
{
  source: '/data/industry/real-estate',
  destination: '/magazine/job-salary/real-estate',
  permanent: true,
},
{
  source: '/data/industry/construction',
  destination: '/magazine/job-salary/construction',
  permanent: true,
},
{
  source: '/data/industry/sales',
  destination: '/magazine/job-salary/sales',
  permanent: true,
},
// 未経験の転職（旧 /career/inexperienced* → 新 /magazine/inexperienced/*）
{
  source: '/career/inexperienced',
  destination: '/magazine/inexperienced/20s',
  permanent: true,
},
{
  source: '/career/inexperienced-women',
  destination: '/magazine/inexperienced/20s-women',
  permanent: true,
},
{
  source: '/career/inexperienced-30s',
  destination: '/magazine/inexperienced/30s',
  permanent: true,
},
{
  source: '/career/inexperienced-30s-women',
  destination: '/magazine/inexperienced/30s-women',
  permanent: true,
},
{
  source: '/career/inexperienced-40s',
  destination: '/magazine/inexperienced/40s',
  permanent: true,
},
{
  source: '/career/inexperienced-40s-women',
  destination: '/magazine/inexperienced/40s-women',
  permanent: true,
},
```

### 2.3 既存リダイレクトの更新

`/industry/:path*` → `/data/industry/:path*` を、`/industry/:path*` → `/magazine/job-salary/:path*` に変更する（`/industry/it-engineer` 等が新URLへ飛ぶように）。

---

## パート3: navigation.ts の更新

### 3.1 対象ファイル
`app/lib/navigation.ts`

### 3.2 変更内容

**DATA_MENU_ITEMS（職種別年収）の href を更新:**

```typescript
export const DATA_MENU_ITEMS: NavMenuItem[] = [
  { label: 'ITエンジニア', href: '/magazine/job-salary/it-engineer', footerLabel: 'ITエンジニアの年収・手取り' },
  { label: '保育士', href: '/magazine/job-salary/nursery', footerLabel: '保育士の年収・手取り' },
  { label: '営業職', href: '/magazine/job-salary/sales', footerLabel: '営業職の年収・手取り' },
  { label: '薬剤師', href: '/magazine/job-salary/pharmacist', footerLabel: '薬剤師の年収・手取り' },
  { label: '臨床検査技師', href: '/magazine/job-salary/medical-tech', footerLabel: '臨床検査技師の年収・手取り' },
  { label: '不動産業界', href: '/magazine/job-salary/real-estate', footerLabel: '不動産業界の年収・手取り' },
  { label: '建設業界', href: '/magazine/job-salary/construction', footerLabel: '建設業界の年収・手取り' },
];
```

**CAREER_MENU_ITEMS（未経験の転職）の href を更新:**

```typescript
export const CAREER_MENU_ITEMS: NavMenuItem[] = [
  { label: '20代未経験者の転職', href: '/magazine/inexperienced/20s' },
  { label: '20代女性未経験者の転職', href: '/magazine/inexperienced/20s-women' },
  { label: '30代未経験者の転職', href: '/magazine/inexperienced/30s' },
  { label: '30代女性未経験者の転職', href: '/magazine/inexperienced/30s-women' },
  { label: '40代未経験者の転職', href: '/magazine/inexperienced/40s' },
  { label: '40代女性未経験者の転職', href: '/magazine/inexperienced/40s-women' },
];
```

**MAGAZINE_MENU_ITEMS:** DATA_MENU_ITEMS と CAREER_MENU_ITEMS を参照しているため、上記変更で自動的に新URLになる。

---

## パート4: Header の active 判定の簡素化

### 4.1 対象ファイル
`app/components/Header.tsx`

### 4.2 変更内容

移動後はすべて `/magazine/*` 配下になるため、active 判定を以下に簡素化できる:

```typescript
// 変更前
pathname.startsWith('/data/industry') || pathname.startsWith('/career') || pathname.startsWith('/magazine')

// 変更後
pathname.startsWith('/magazine')
```

---

## パート5: 記事内リンク・パンくずの更新

### 5.1 記事コンポーネント内の相互リンク

各 InexperiencedArticle 等で、他ページへのリンクが `/career/inexperienced` 等を参照している場合は、新URLに更新する。

**検索対象:** `href="/career/` または `href='/career/'``

### 5.2 パンくずの親リンク

- 職種別年収: `マガジン` のリンク先を `/magazine/job-salary/it-engineer`（または一覧ページがあればそれ）に統一
- 未経験の転職: `マガジン` のリンク先を `/magazine/inexperienced/20s` 等に統一

---

## パート6: sitemap・robots の確認

### 6.1 sitemap.ts

MAGAZINE_MENU_ITEMS を参照しているため、navigation.ts の href 更新で自動的に新URLがサイトマップに反映される。追加対応は不要。

### 6.2 robots.ts

特段の変更は不要（パス指定がなければ）。

---

## パート7: 旧ディレクトリの削除

移動完了後、以下を削除:

- `app/data/industry/` 配下の全フォルダ（it-engineer, pharmacist, nursery, medical-tech, real-estate, construction, sales）
- `app/career/inexperienced/`
- `app/career/inexperienced-women/`
- `app/career/inexperienced-30s/`
- `app/career/inexperienced-30s-women/`
- `app/career/inexperienced-40s/`
- `app/career/inexperienced-40s-women/`

**注意:** `app/data/` が空になる場合は `app/data/` 自体も削除可能。`app/career/career-change-20s/` と `app/career/high-income/` は残す。

---

## 実行順序

1. **パート1** — 新ディレクトリ作成、ファイル移動、各 page.tsx の canonicalPath・パンくず修正
2. **パート2** — next.config.ts にリダイレクト追加
3. **パート3** — navigation.ts の href 更新
4. **パート4** — Header.tsx の active 判定簡素化
5. **パート5** — 記事内リンク・パンくずの最終確認
6. **パート6** — sitemap の動作確認
7. **パート7** — 旧ディレクトリ削除

---

## 補足

### 職種別年収のラベル表記

ユーザー指定では「不動産営業」「建設業」だが、現行は「不動産業界」「建設業界」。必要に応じてラベルを統一する。

### 高卒の就職のパンくず

`app/magazine/high-school/` のパンくずは `ホーム > マガジン > 高卒の就職` または `ホーム > マガジン > 高卒の就職 > 高卒・高校中退の就職` のいずれかに統一する。
