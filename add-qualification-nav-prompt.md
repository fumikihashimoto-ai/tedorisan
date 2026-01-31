# ヘッダーナビに「資格」を追加するプロンプト

マガジンの右に「資格」ナビゲーションを追加するためのプロンプトです。

---

## 変更概要

| 項目 | 内容 |
|------|------|
| 追加位置 | ヘッダーナビの「マガジン」の右 |
| 表示順 | 計算ツール → マガジン → **資格** → 早見表 → FAQ |
| 対象 | PCヘッダー、スマホメニュー、フッター |

---

## パート1: ナビゲーションの修正

### 1.1 対象ファイル
`app/lib/navigation.ts`

### 1.2 変更内容

**NAV_ITEMS に「資格」を追加**

- **変更前:**
```typescript
export const NAV_ITEMS: NavItem[] = [
  { type: 'dropdown', id: 'tools', ... },
  { type: 'dropdown', id: 'magazine', ... },
  { type: 'link', label: '早見表', href: '/tables/', ... },
  { type: 'link', label: 'FAQ', href: '/faq', ... },
];
```

- **変更後:**
```typescript
export const NAV_ITEMS: NavItem[] = [
  { type: 'dropdown', id: 'tools', ... },
  { type: 'dropdown', id: 'magazine', ... },
  { type: 'link', label: '資格', href: '/qualifications', mobileLabel: '資格' },
  { type: 'link', label: '早見表', href: '/tables/', ... },
  { type: 'link', label: 'FAQ', href: '/faq', ... },
];
```

※ `href` は `/qualifications` を想定。資格ページのパスに応じて変更すること。

### 1.3 リンク種別の選択

**A. 単一リンク（推奨・初期実装）**
- `type: 'link'`
- 資格一覧・トップページ（例: `/qualifications`）への直リンク

**B. ドロップダウン（将来拡張時）**
- `type: 'dropdown'`
- 資格種別ごとのサブメニュー（例: 国家資格、民間資格、職種別資格）
- その場合は `QUALIFICATION_MENU_ITEMS` を新規定義し、`id: 'qualifications'` を追加

---

## パート2: フッターの修正

### 2.1 対象ファイル
`app/lib/navigation.ts` の `FOOTER_SECTIONS`

### 2.2 変更内容

**「その他」セクションに「資格」を追加**

- **変更前:**
```typescript
{
  title: 'その他',
  links: [
    { href: '/tables/', label: '早見表' },
    { href: '/faq', label: 'よくある質問（FAQ）' },
  ],
},
```

- **変更後:**
```typescript
{
  title: 'その他',
  links: [
    { href: '/qualifications', label: '資格' },
    { href: '/tables/', label: '早見表' },
    { href: '/faq', label: 'よくある質問（FAQ）' },
  ],
},
```

※ 資格を独立セクションにする場合は、`title: '資格'` のセクションを新規追加。

---

## パート3: Header コンポーネントの修正

### 3.1 対象ファイル
`app/components/Header.tsx`

### 3.2 変更内容

**active 判定の追加（資格がリンクの場合）**

- `type: 'link'` のため、既存の `isActiveHref(pathname, item.href)` で判定される
- 追加のロジック変更は不要（NAV_ITEMS を map しているため、自動で表示される）

**資格がドロップダウンの場合のみ:**
- `openSection` の型に `'qualifications'` を追加
- `pathname.startsWith('/qualifications')` の active 判定を追加

---

## パート4: 資格ページの作成（任意）

資格ナビを有効にするには、リンク先ページが必要です。

### 4.1 作成ファイル（例）
- `app/qualifications/page.tsx` … 資格一覧・トップページ

### 4.2 最低限の実装例
```tsx
// app/qualifications/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata = createPageMetadata({
  title: '資格一覧｜手取りアップに役立つ資格 | テドリさん',
  description: '年収・手取りアップに役立つ資格を一覧で紹介。国家資格、民間資格、職種別のおすすめ資格を解説。',
  canonicalPath: '/qualifications',
  openGraphType: 'website',
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} 資格
        </nav>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">資格一覧</h1>
        <p>（コンテンツは後から追加）</p>
      </div>
    </div>
  );
}
```

### 4.3 サイトマップへの追加
`app/sitemap.ts` に `/qualifications` を追加する。

---

## 実行順序

1. **パート1** … `navigation.ts` の `NAV_ITEMS` に「資格」を追加
2. **パート2** … `FOOTER_SECTIONS` の「その他」に「資格」を追加
3. **パート3** … Header は `type: 'link'` のため、通常は修正不要
4. **パート4** … 資格ページを作成し、サイトマップに登録（任意）

---

## 補足

### 資格の href について
- 仮で `/qualifications` を想定
- 既存の資格関連ページがある場合は、そのパスに合わせて変更

### スマホメニュー
- `NAV_ITEMS` に追加すれば、既存のスマホメニュー描画ロジックで自動表示される
- `mobileLabel` を指定しない場合は `label` が使われる
