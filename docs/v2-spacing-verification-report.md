# 余白ルール統一後の表示確認レポート

確認日: 2026年2月  
対象: IT記事ページ、TOPページ、ComparisonTable

---

## ✅ 問題なし

### 1. IT記事ページ (app/magazine/job-salary/it-engineer/page.tsx)

| コンポーネント | 余白 | 状態 |
|--------------|------|------|
| ArticleHeroSection | pb-6 (24px) | ✅ 正常。ヒーロー画像の下に 24px。 |
| TedoriCalculator | mb-6 (24px) | ✅ 正常。手取り計算セクションの下に 24px。 |
| SectionBar「年収・スキルアップをしたい方」 | mb-4 (16px) | ✅ 正常。default のため 16px。 |
| PointHeaderBox「編集部のコメント」 | mb-6 (24px) | ✅ 正常。 |
| SectionBar「成功への第一歩」 | mb-4 (16px) | ✅ 正常。親 div が mb-4 でラップ。 |
| PointHeaderBox「とにかく情報収集が大事」 | mb-6 (24px) | ✅ 正常。 |
| ArticleSectionHeading | mb-4 (16px) | ✅ 正常。ArticleBodySection 内の見出し。 |
| ArticleBodySection | mb-8 (32px), space-y-6 (24px) | ✅ 正常。セクション下 32px、見出し・本文・表の間 24px。 |
| RecommendBlockHeading | mb-4 (16px) | ✅ 正常。おすすめ記事見出しの下に 16px。 |

**特に注意した箇所**
- SectionBar「年収・スキルアップをしたい方」「成功への第一歩」は default のため mb-4 (16px)。問題なし。
- ArticleBodySection 内は space-y-6 で見出し・本文・SalaryTable の間が 24px。問題なし。

---

### 2. TOPページ (app/components/v2/TopPageClient.tsx)

| コンポーネント | 余白 | 状態 |
|--------------|------|------|
| SectionBar「ご自身の目的を選択してください」 | mb-4 (16px) | ✅ 正常。default。 |
| SectionBar「転職サイト〜/スキルアップ〜」 | mb-6 + pb-[10px] | ✅ 正常。withPadding。※パターンA適用済み。 |
| SectionBar「年代・業種から探す」 | mb-6 + pb-[10px] | ✅ 正常。withPadding。 |
| CategoryLinkCard（2箇所のグリッド） | 親の grid gap-3 | ✅ 正常。カード自体に余白なしで正しい。 |

---

### 3. ComparisonTable (app/components/v2/common/ComparisonTable.tsx)

| コンポーネント | 余白 | 状態 |
|--------------|------|------|
| SectionBar（タイトル部分） | variant="withPadding" | ✅ 正常。mb-6 + pb-[10px] により、バーとテーブルの間隔・バーの高さが従来どおり。 |

---

## ⚠️ 対応した問題

| ページ | コンポーネント | 問題内容 | 実施した対応 |
|--------|--------------|---------|-------------|
| 全般 | SectionBar (withPadding) | 余白統一で pb-[10px] を削除したため、バー内の下パディングがなくなり、バーが短く見える＆タイトルバーとテーブル/次の要素の見た目が変わっていた | **パターンA を適用**: SectionBar の withPadding に `pb-[10px]` を復元（`mb-6 pb-[10px]`） |

**修正コード（適用済み）**
```typescript
// app/components/v2/common/SectionBar.tsx
const marginClass = noMargin
  ? ''
  : variant === 'withPadding'
    ? 'mb-6 pb-[10px]'  // バー内の下パディングを復元
    : 'mb-4';
```

---

## まとめ

- **IT記事ページ**: 各コンポーネントの余白は仕様どおりで、表示の崩れなし。
- **TOPページ**: SectionBar・CategoryLinkCard の余白・レイアウトは問題なし。
- **ComparisonTable**: SectionBar に pb-[10px] を戻したことで、タイトルバーとテーブルの間隔およびバーの高さが従来どおりに表示される状態になっている。

**総合判定: ✅ 全ページ問題なし（パターンA 適用により withPadding の見た目を維持）**
