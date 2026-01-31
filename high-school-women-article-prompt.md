# 高卒女性の就職コンテンツ追加プロンプト

未経験者の就職・転職に「高卒女性の就職」を追加し、記事ページを作成するためのプロンプトです。

---

## 変更概要

| 変更内容 | 詳細 |
|----------|------|
| メニュー追加 | 未経験者の就職・転職に「高卒女性の就職」を追加 |
| ページ作成 | `/magazine/inexperienced/high-school-women` に記事ページを作成 |
| 記事追加 | 高卒女性の就職に特化した記事コンテンツを実装 |

---

## パート1: メニュー・ナビゲーションの修正

### 1.1 対象ファイル
`app/lib/navigation.ts`

### 1.2 変更内容

**MAGAZINE_MENU_ITEMS に項目を追加**

- **変更前:**
```typescript
export const MAGAZINE_MENU_ITEMS: NavMenuItem[] = [
  ...DATA_MENU_ITEMS,
  ...CAREER_MENU_ITEMS,
  { label: '高卒・高校中退の就職', href: '/magazine/high-school', group: '未経験者の就職・転職' },
];
```

- **変更後:**
```typescript
export const MAGAZINE_MENU_ITEMS: NavMenuItem[] = [
  ...DATA_MENU_ITEMS,
  ...CAREER_MENU_ITEMS,
  { label: '高卒・高校中退の就職', href: '/magazine/high-school', group: '未経験者の就職・転職' },
  { label: '高卒女性の就職', href: '/magazine/inexperienced/high-school-women', group: '未経験者の就職・転職' },
];
```

※ CAREER_MENU_ITEMS は変更しない（高卒女性は MAGAZINE_MENU_ITEMS に直接追加）

### 1.3 影響範囲
- Header（PC・スマホ）: マガジンドロップダウンの「未経験者の就職・転職」グループに「高卒女性の就職」が追加される
- Footer: マガジンセクションに自動反映
- sitemap: MAGAZINE_MENU_ITEMS を参照しているため、自動的に `/magazine/inexperienced/high-school-women` が含まれる

---

## パート2: 記事ページの追加

### 2.1 前提条件
- 計算ツールは使用しない（記事のみ）
- 参考: `app/magazine/inexperienced/20s-women/` または `app/magazine/high-school/` の構成・スタイル

### 2.2 作成ファイル

| パス | 説明 |
|------|------|
| `app/magazine/inexperienced/high-school-women/page.tsx` | ページコンポーネント |
| `app/magazine/inexperienced/high-school-women/HighSchoolWomenArticle.tsx` | 記事コンポーネント |

### 2.3 page.tsx の構成

- **レイアウト:** `app/magazine/inexperienced/20s-women/page.tsx` を参考
- **背景:** `bg-white`、コンテナ: `max-w-[1440px]`、2カラムレイアウト
- **パンくず:** `ホーム > マガジン > 未経験者の就職・転職 > 高卒女性の就職`
- **マガジンリンク:** `/magazine/inexperienced/20s`
- **右カラム広告:** 他マガジンページと同じ固定バナー2つを使用

### 2.4 メタデータ（例）

- **title:** 高卒女性の就職｜成功のポイントとおすすめ業界・職種 | 手取り計算シミュレーションツール テドリさん
- **description:** 高卒女性の就職の現状、女性に人気の業界・職種、ワークライフバランスを重視した就職のコツを解説。
- **canonicalPath:** `/magazine/inexperienced/high-school-women`
- **keywords:** 高卒, 女性, 就職, 未経験, キャリア, ワークライフバランス

### 2.5 記事のスタイルルール

- 記事全体: `<article className="pb-20">`
- リード文: `p className="text-base leading-[1.8] mb-4"`
- h2（大見出し）: `border-l-4 border-amber-500` の左縦線スタイル
- h3（中見出し）: `border-l-2 border-blue-400` の左縦線スタイル
- 各セクションに `id="section-N"` と `scroll-mt-6` を付与
- 主要セクションの直後に `<InlineAd />` を配置
- 外部リンクには `target="_blank" rel="noopener noreferrer"` を付与

---

## パート3: 記事の構成

### 3.1 推奨セクション構成

1. **リード文**（導入・結論の要約）
2. **セクション1:** 高卒女性の就職の現状と概要
3. **セクション2:** 高卒女性におすすめの業界・職種
4. **セクション3:** 高卒女性が就職を成功させるポイント
5. **セクション4:** FAQ

### 3.2 記事のベースデータ（参考）

- 高卒女性の就職は、人手不足の業界を中心に採用機会が増加
- 女性に人気の業界・職種: 介護・福祉、保育、医療事務、美容・エステ、サービス業、事務職など
- ワークライフバランスを重視: 時短勤務、シフト制、資格取得支援制度が充実した企業を選ぶ
- 高卒女性の強み: 若さ、柔軟性、コミュニケーション能力、丁寧な対応力
- FAQ例: 高卒女性の就職で不利になることはある？、資格は必要？、正社員とパートどちらがおすすめ？

### 3.3 関連ページへのリンク

記事内で以下の関連ページへリンクを張ることを推奨:

- 高卒・高校中退の就職: `/magazine/high-school`
- 20代女性未経験者の転職: `/magazine/inexperienced/20s-women`
- 30代女性未経験者の転職: `/magazine/inexperienced/30s-women`

---

## パート4: リダイレクト（任意）

旧URLからのアクセスを想定する場合、`next.config.ts` にリダイレクトを追加:

```typescript
{
  source: '/career/high-school-women',
  destination: '/magazine/inexperienced/high-school-women',
  permanent: true,
},
```

※ 新規ページのため、既存の旧URLがなければ不要

---

## 実行順序

1. **パート1** を実行（navigation.ts に「高卒女性の就職」を追加）
2. **パート2** を実行（`app/magazine/inexperienced/high-school-women/` フォルダを作成し、page.tsx と HighSchoolWomenArticle.tsx を実装）
3. **パート3** に従い、記事本文を作成・実装
4. **パート4** は必要に応じて実行

---

## 補足

### 高卒・高校中退の就職との違い

- **高卒・高校中退の就職** (`/magazine/high-school`): 男女共通の一般的な内容
- **高卒女性の就職** (`/magazine/inexperienced/high-school-women`): 女性に特化した内容（ワークライフバランス、女性に人気の業界・職種、出産・育児を考慮したキャリアなど）

### 記事のトーン

- 20代女性未経験者の転職記事と同様に、読者に寄り添う温かみのあるトーン
- 不安を和らげ、具体的な行動につながる情報を提供
