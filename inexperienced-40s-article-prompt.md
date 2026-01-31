# 40代未経験者の転職コンテンツ追加プロンプト

未経験者の転職に「40代未経験者の転職」のコンテンツを追加するためのプロンプトです。

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
];
```

### 1.3 影響範囲
- Header（PC・スマホ）: 「未経験者の転職」ドロップダウンに「40代未経験者の転職」が追加される
- Footer: 「キャリア・その他」セクションに自動反映
- sitemap: 自動的に `/career/inexperienced-40s` が含まれる

---

## パート2: 記事ページの追加

### 2.1 前提条件
- 計算ツールは使用しない（記事のみ）
- 参考: `app/career/inexperienced-30s/` または `app/career/inexperienced/` の構成・スタイル

### 2.2 作業内容

#### 2.2.1 フォルダ・ファイルの作成

| パス | 説明 |
|------|------|
| `app/career/inexperienced-40s/page.tsx` | ページコンポーネント |
| `app/career/inexperienced-40s/Inexperienced40sArticle.tsx` | 記事コンポーネント |

#### 2.2.2 記事のスタイルルール
- 記事全体: `<article className="pb-20">`
- リード文: `p className="text-base leading-[1.8] mb-4"`
- h2（大見出し）: `border-l-4 border-amber-500` の左縦線スタイル
- h3（中見出し）: `border-l-2 border-blue-400` の左縦線スタイル
- 各セクションに `id="section-N"` と `scroll-mt-6` を付与
- 主要セクションの直後に `<InlineAd />` を配置
- 外部リンクには `target="_blank" rel="noopener noreferrer"` を付与

#### 2.2.3 page.tsx の構成
- レイアウト参考: `app/career/inexperienced-30s/page.tsx` または `app/career/inexperienced/page.tsx`
- 背景: `bg-white`、コンテナ: `max-w-[1440px]`、2カラムレイアウト
- パンくず: `ホーム > 未経験者の転職 > 40代未経験者の転職`
- 右カラム広告: `/career/inexperienced` と同じ固定バナー2つを使用

#### 2.2.4 メタデータ（例）
- **title:** 40代の未経験転職｜成功のポイントとおすすめ業界・職種
- **description:** 40代の未経験転職の現状、豊富な社会人経験の活かし方、即戦力として評価される転職のコツを解説。
- **canonicalPath:** `/career/inexperienced-40s`
- **keywords:** 40代, 未経験, 転職, キャリアチェンジ, ポータブルスキル, 即戦力, ミドルキャリア

### 2.3 記事の構成（例）

1. **リード文**（導入・結論の要約）
2. **セクション1:** 40代の未経験転職の現状と概要（30代との違い、企業が求める人材像、年齢を強みに変える考え方など）
3. **セクション2:** 40代未経験者が活かせるポータブルスキルと業界・職種（豊富な社会人経験、マネジメント経験、業界知識の活かし方など）
4. **セクション3:** 40代が転職を成功させるポイント（即戦力アピール、履歴書・職務経歴書の書き方、面接対策、転職エージェント活用など）
5. **セクション4:** 40代の転職成功事例と失敗から学ぶ教訓
6. **セクション5:** 転職後のキャリアプランと働き方（定年までを見据えたキャリア設計など）
7. **セクション6:** まとめ

### 2.4 記事のベースデータ（参考）

- 40代の未経験転職は30代と比較すると難易度は上がるが、十分に可能
- 40代では豊富な社会人経験やマネジメント経験を即戦力としてアピールすることが重要
- ポータブルスキル（課題解決能力、調整力、リーダーシップ、業界知識など）を強くアピールすることが鍵
- 未経験歓迎の求人は少なめだが、経験を活かせる関連職種や業界知識を活かせる職種を狙うと有利
- 定年までのキャリア設計、ワークライフバランス、家族の理解と協力が重要なテーマ
- FAQ例: 40代の未経験転職は不利？、40代で活かせるポータブルスキルは？、40代におすすめの業界・職種は？、年収を維持するコツは？

### 2.5 記事本文
（ここに記事本文を貼り付ける。未指定の場合は上記ベースデータを元に記事形式で作成する）

---

## 実行順序

1. **パート1** を実行（メニューに「40代未経験者の転職」を追加）
2. **パート2** を実行（`app/career/inexperienced-40s/` フォルダを作成し、page.tsx と Inexperienced40sArticle.tsx を実装）
