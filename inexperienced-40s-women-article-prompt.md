# 40代女性未経験者の転職コンテンツ追加プロンプト

未経験者の転職に「40代女性未経験者の転職」のコンテンツを追加するためのプロンプトです。

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
  { label: '30代女性未経験者の転職', href: '/career/inexperienced-30s-women' },
  { label: '40代未経験者の転職', href: '/career/inexperienced-40s' },
];
```

- **変更後:**
```typescript
export const CAREER_MENU_ITEMS: NavMenuItem[] = [
  { label: '20代未経験者の転職', href: '/career/inexperienced' },
  { label: '20代女性未経験者の転職', href: '/career/inexperienced-women' },
  { label: '30代未経験者の転職', href: '/career/inexperienced-30s' },
  { label: '30代女性未経験者の転職', href: '/career/inexperienced-30s-women' },
  { label: '40代未経験者の転職', href: '/career/inexperienced-40s' },
  { label: '40代女性未経験者の転職', href: '/career/inexperienced-40s-women' },
];
```

### 1.3 影響範囲
- Header（PC・スマホ）: 「未経験者の転職」ドロップダウンに「40代女性未経験者の転職」が追加される
- Footer: 「キャリア・その他」セクションに自動反映
- sitemap: 自動的に `/career/inexperienced-40s-women` が含まれる

---

## パート2: 記事ページの追加

### 2.1 前提条件
- 計算ツールは使用しない（記事のみ）
- 参考: `app/career/inexperienced-30s-women/` または `app/career/inexperienced-40s/` の構成・スタイル

### 2.2 作業内容

#### 2.2.1 フォルダ・ファイルの作成

| パス | 説明 |
|------|------|
| `app/career/inexperienced-40s-women/page.tsx` | ページコンポーネント |
| `app/career/inexperienced-40s-women/Inexperienced40sWomenArticle.tsx` | 記事コンポーネント |

#### 2.2.2 記事のスタイルルール
- 記事全体: `<article className="pb-20">`
- リード文: `p className="text-base leading-[1.8] mb-4"`
- h2（大見出し）: `border-l-4 border-amber-500` の左縦線スタイル
- h3（中見出し）: `border-l-2 border-blue-400` の左縦線スタイル
- 各セクションに `id="section-N"` と `scroll-mt-6` を付与
- 主要セクションの直後に `<InlineAd />` を配置
- 外部リンクには `target="_blank" rel="noopener noreferrer"` を付与

#### 2.2.3 page.tsx の構成
- レイアウト参考: `app/career/inexperienced-30s-women/page.tsx` または `app/career/inexperienced-40s/page.tsx`
- 背景: `bg-white`、コンテナ: `max-w-[1440px]`、2カラムレイアウト
- パンくず: `ホーム > 未経験者の転職 > 40代女性未経験者の転職`
- 右カラム広告: `/career/inexperienced` と同じ固定バナー2つを使用

#### 2.2.4 メタデータ（例）
- **title:** 40代女性の未経験転職｜成功のポイントとおすすめ業界・職種
- **description:** 40代女性の未経験転職の現状、ワークライフバランスを重視した転職のコツ、ポータブルスキルの活かし方を解説。
- **canonicalPath:** `/career/inexperienced-40s-women`
- **keywords:** 40代, 女性, 未経験, 転職, キャリアチェンジ, ワークライフバランス, ポータブルスキル, ミドルキャリア

### 2.3 記事の構成（例）

1. **リード文**（導入・結論の要約）
2. **セクション1:** 40代女性の未経験転職の現状と概要（30代女性との違い、企業が求める人材像、年齢を強みに変える考え方など）
3. **セクション2:** 40代女性が活かせるポータブルスキルとおすすめ業界・職種（豊富な社会人経験、マネジメント経験、女性に人気の業界・職種など）
4. **セクション3:** 40代女性が転職を成功させるポイント（ワークライフバランス、ライフイベントとの両立、資格取得、履歴書・面接対策など）
5. **セクション4:** 40代女性の転職成功事例と失敗から学ぶ教訓
6. **セクション5:** 転職後のキャリアプランと働き方（定年までを見据えたキャリア設計、ワークライフバランスの実現など）
7. **セクション6:** まとめ

### 2.4 記事のベースデータ（参考）

- 40代女性の未経験転職は、30代女性と比較すると難易度は上がるが、十分に可能
- 40代では豊富な社会人経験やマネジメント経験を即戦力としてアピールすることが重要
- ポータブルスキル（課題解決能力、調整力、リーダーシップ、コミュニケーション力など）を強くアピールすることが鍵
- ワークライフバランス、育児・介護との両立を考慮した転職が40代女性にとって特に重要
- 女性に人気の業界・職種: 事務・アシスタント、医療・介護、保育、Web・クリエイター、人材サービス、介護業界など
- 定年までのキャリア設計、家族の理解と協力が重要なテーマ
- FAQ例: 40代女性の未経験転職は不利？、育児・介護を考慮した転職のタイミングは？、40代女性におすすめの職種は？、年収を維持するコツは？

### 2.5 記事本文
（ここに記事本文を貼り付ける。未指定の場合は上記ベースデータを元に記事形式で作成する）

---

## 実行順序

1. **パート1** を実行（メニューに「40代女性未経験者の転職」を追加）
2. **パート2** を実行（`app/career/inexperienced-40s-women/` フォルダを作成し、page.tsx と Inexperienced40sWomenArticle.tsx を実装）
