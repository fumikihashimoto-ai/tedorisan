# RECOMMENDおすすめ記事 コンポーネント差異調査

## 現状の違い

| 項目 | TOP（RecommendSection） | IT記事（it-engineer） |
|------|-------------------------|------------------------|
| **見出し** | SectionBar「おすすめコンテンツ」（水色バー） | RecommendBlockHeading「RECOMMEND」+「おすすめ記事」+ 青下線 |
| **カード** | 独自レイアウト（横並びサムネ 96×64 + カテゴリバッジ + タグ + タイトル） | ArticleCard（サムネ 100×75 + タイトル + タグ） |
| **画像** | 全件同じ recommend-banner.png | 各カードで imageUrl 指定 |
| **データ** | RecommendArticle[]（id, title, href, imageUrl, category, tags） | ArticleCard を3件ハードコード |
| **ラッパー** | section bg-[#f5f5f5] py-[16px]、max-w-md mx-auto px-[10px] | div bg-[#f5f5f5] -mx-[10px] px-[10px] py-6 |
| **余白** | space-y-3 | space-y-4 |

## 統一方針

- **見出し**: 両方で **RecommendBlockHeading** を使用（「RECOMMEND」+ サブラベル + 下線）。
  - TOP: subLabel="おすすめコンテンツ"
  - IT記事: subLabel="おすすめ記事"（現状維持）
- **カード**: 両方で **ArticleCard** を使用。TOP の RecommendSection 内の独自リストを ArticleCard の map に変更。
- **ラッパー**: セクションの余白を統一（py-6、記事側に合わせる）。

## 変更対象

- `app/components/v2/RecommendSection.tsx`: SectionBar → RecommendBlockHeading、リスト → ArticleCard。
