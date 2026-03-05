# microCMS 連携ルール

## 基本構成
- microCMSクライアント: `lib/microcms.ts`
- SDK: `microcms-js-sdk`
- サービスドメイン: `tedorisan`
- APIキーは環境変数 `MICROCMS_API_KEY` で管理（ハードコード禁止）

## 型定義

### 記事（Article）
```typescript
type Article = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string[];
  thumbnail: ArticleThumbnail | null;
  bodyBlocks: ArticleBodyBlock[];
};
```

### 記事本文ブロック（ArticleBodyBlock）
```typescript
type ArticleBodyBlock = {
  fieldId: string;       // 'richTextBlock' or 'partsBlock'
  richText?: string;     // fieldId === 'richTextBlock' の場合
  partType?: string | string[];   // fieldId === 'partsBlock' の場合
  partCategory?: string | string[];  // パーツのカテゴリ指定
};
```

### サムネイル（ArticleThumbnail）
```typescript
type ArticleThumbnail = {
  url: string;
  width: number;
  height: number;
};
```

## データ取得パターン

### 記事一覧
```typescript
import { getArticles } from '@/lib/microcms';
const { contents: articles } = await getArticles({
  fields: ['id', 'title', 'slug', 'description', 'category', 'thumbnail'],
  orders: '-publishedAt',
});
```

### カテゴリ別一覧
```typescript
import { getArticlesByCategory } from '@/lib/microcms';
const { contents: articles } = await getArticlesByCategory(category, {
  fields: ['id', 'title', 'slug', 'description', 'category', 'thumbnail'],
  orders: '-publishedAt',
});
```

### 記事詳細（slugで取得）
```typescript
import { getArticleBySlug } from '@/lib/microcms';
const article = await getArticleBySlug(slug);
if (!article) { notFound(); }
```

## bodyBlocksのレンダリング

記事詳細ページ（`app/articles/[category]/[slug]/page.tsx`）の `renderBodyBlock` 関数がパターン。

### 判定ロジック
- `block.fieldId === 'richTextBlock'` → リッチテキスト表示（`dangerouslySetInnerHTML`）
- `block.fieldId === 'partsBlock'` → partTypeで分岐：
  - `calculator` → `TedoriCalculator` コンポーネント
  - `comparison` → `ComparisonTable` コンポーネント
  - `cta` → `ArticleCTAButton` コンポーネント
  - 未知のpartType → プレースホルダー表示

### microCMSセレクトフィールドの注意
microCMSのセレクトフィールドは配列で返る場合がある。値を取得する際は `resolveField` 関数を使用する：
```typescript
function resolveField(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return (value[0] ?? '').trim().toLowerCase();
  return (value ?? '').trim().toLowerCase();
}
```

## 新しいAPIエンドポイント追加時のルール
- 型定義は `lib/microcms.ts` に追加する
- 取得関数も `lib/microcms.ts` に追加する
- 既存の `getArticles` / `getArticlesByCategory` / `getArticleBySlug` のパターンに合わせる
- APIキーは必ず `process.env.MICROCMS_API_KEY` から取得（ハードコード禁止）

## カテゴリ管理
- カテゴリ定数: `lib/articleCategories.ts`（`ARTICLE_CATEGORIES`）
- バリデーション: `isValidCategory()` 関数を使用
- ラベル取得: `getCategoryLabel()` 関数を使用
- 無効なカテゴリの場合は `notFound()` を返す

## メタデータ
- `app/lib/metadata.ts` の `createPageMetadata` 関数を使用する
- 記事ページのtitle: `${article.title} | 手取りのミカタ`
- description: `article.description` を使用
- canonicalPath: `/articles/${category}/${article.slug}`

## 禁止事項
- `lib/microcms.ts` のクライアント初期化部分を変更しない
- APIキーをコード内にハードコードしない
- 既存の型定義を破壊的に変更しない（フィールド追加はOK）
- microCMSの管理画面で設定すべき値（title、description等）をコード内にハードコードしない
