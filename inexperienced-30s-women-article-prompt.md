# 30代女性未経験者の転職コンテンツ追加プロンプト

未経験者の転職に「30代女性未経験者の転職」のコンテンツを追加するためのプロンプトです。

---

## パート1: メニュー・ナビゲーションの修正

### 1.1 対象ファイル
`app/lib/navigation.ts`

### 1.2 変更内容

**CAREER_MENU_ITEMS に項目を追加**

- **変更前:**
```typescript
export const CAREER_MENU_ITEMS: NavMenuItem[] = [
  { label: '20代未経験者の転職', href: '/career/inexperienced' },
  { label: '20代女性未経験者の転職', href: '/career/inexperienced-women' },
  { label: '30代未経験者の転職', href: '/career/inexperienced-30s' },
];
```

- **変更後:**
```typescript
export const CAREER_MENU_ITEMS: NavMenuItem[] = [
  { label: '20代未経験者の転職', href: '/career/inexperienced' },
  { label: '20代女性未経験者の転職', href: '/career/inexperienced-women' },
  { label: '30代未経験者の転職', href: '/career/inexperienced-30s' },
  { label: '30代女性未経験者の転職', href: '/career/inexperienced-30s-women' },
];
```

### 1.3 影響範囲
- Header（PC・スマホ）: 「未経験者の転職」ドロップダウンに「30代女性未経験者の転職」が追加される
- Footer: 「キャリア・その他」セクションに自動反映
- sitemap: 自動的に `/career/inexperienced-30s-women` が含まれる

---

## パート2: 記事ページの追加

### 2.1 前提条件
- 計算ツールは使用しない（記事のみ）
- 参考: `app/career/inexperienced-women/` または `app/career/inexperienced-30s/` の構成・スタイル

### 2.2 作業内容

#### 2.2.1 フォルダ・ファイルの作成

| パス | 説明 |
|------|------|
| `app/career/inexperienced-30s-women/page.tsx` | ページコンポーネント |
| `app/career/inexperienced-30s-women/Inexperienced30sWomenArticle.tsx` | 記事コンポーネント |

#### 2.2.2 記事のスタイルルール
- 記事全体: `<article className="pb-20">`
- リード文: `p className="text-base leading-[1.8] mb-4"`
- h2（大見出し）: `border-l-4 border-amber-500` の左縦線スタイル
- h3（中見出し）: `border-l-2 border-blue-400` の左縦線スタイル
- 各セクションに `id="section-N"` と `scroll-mt-6` を付与
- 主要セクションの直後に `<InlineAd />` を配置
- 外部リンクには `target="_blank" rel="noopener noreferrer"` を付与

#### 2.2.3 page.tsx の構成
- レイアウト参考: `app/career/inexperienced-women/page.tsx` または `app/career/inexperienced-30s/page.tsx`
- 背景: `bg-white`、コンテナ: `max-w-[1440px]`、2カラムレイアウト
- パンくず: `ホーム > 未経験者の転職 > 30代女性未経験者の転職`
- 右カラム広告: `/career/inexperienced` と同じ固定バナー2つを使用

#### 2.2.4 メタデータ（例）
- **title:** 30代女性の未経験転職｜成功のポイントとおすすめ業界・職種
- **description:** 30代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。
- **canonicalPath:** `/career/inexperienced-30s-women`
- **keywords:** 30代, 女性, 未経験, 転職, キャリアチェンジ, ワークライフバランス, ポータブルスキル

### 2.3 記事の構成（例）

1. **リード文**（導入・結論の要約）
2. **セクション1:** 30代女性の未経験転職の現状と概要（20代女性との違い、即戦力への期待など）
3. **セクション2:** 30代女性が活かせるポータブルスキルとおすすめ業界・職種
4. **セクション3:** 30代女性が転職を成功させるポイント（ワークライフバランス、ライフイベントとの両立、資格取得など）
5. **セクション4:** FAQ

### 2.4 記事のベースデータ（参考）

- 30代女性の未経験転職は、20代女性と比較すると難易度は上がるが、十分に可能
- 30代では即戦力を求められることが多い
- ポータブルスキル（マネジメント経験、数字管理能力、コミュニケーション力など）を強くアピールすることが重要
- ワークライフバランス、出産・育児との両立を考慮した転職が重要
- 女性に人気の業界・職種: 事務・アシスタント、医療・介護、保育、Web・クリエイター、人材サービスなど
- FAQ例: 30代女性の未経験転職は不利？、出産・育児を考慮した転職のタイミングは？、30代女性におすすめの職種は？、年収を維持するコツは？

### 2.5 記事本文
（ここに記事本文を貼り付ける。未指定の場合は上記ベースデータを元に記事形式で作成する）

---

## 実行順序

1. **パート1** を実行（メニューに「30代女性未経験者の転職」を追加）
2. **パート2** を実行（`app/career/inexperienced-30s-women/` フォルダを作成し、page.tsx と Inexperienced30sWomenArticle.tsx を実装）
