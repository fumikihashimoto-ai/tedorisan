# v2コンポーネント 余白ルール

## 原則

1. **コンポーネントは下マージンを持つ** … 小=16px(mb-4)、中=24px(mb-6)、大=32px(mb-8)
2. **コンテナは子要素間を space-y-* で管理**
3. **最後の要素は noMargin で余白を消す**

## 余白ルール一覧表

| コンポーネント | デフォルト余白 | サイズ | 用途 |
|--------------|-------------|--------|------|
| SectionBar | mb-4 / mb-6 + pb-[10px] | 16px / 24px（withPadding はバー内も pb-[10px]） | セクションタイトル |
| ArticleSectionHeading | mb-4 | 16px | 記事見出し |
| ArticleSubHeading | mb-4 | 16px | 記事サブ見出し |
| ArticleHeroSection | pb-6 | 24px | ヒーロー画像 |
| PointHeaderBox | mb-6 | 24px | 編集部コメント |
| RecommendBlockHeading | mb-4 | 16px | おすすめ見出し |
| ArticleBodySection | mb-8, space-y-6 | 32px, 24px | 記事本文 |
| TedoriCalculator | mb-6 | 24px | 手取り計算 |
| ArticleCTAButton | なし | - | flex/grid内で使用 |
| CategoryLinkCard | なし | - | grid内で使用 |

## noMargin プロップ

余白を付けない場合は `noMargin` を指定する。

```tsx
<ArticleHeroSection noMargin />
<TedoriCalculator noMargin />
<SectionBar title="..." noMargin />
```

## 使用例

### 通常（余白はコンポーネントに任せる）

```tsx
<ArticleHeroSection src="..." alt="..." />
<TedoriCalculator />
<PointHeaderBox title="編集部のコメント" bodyVariant="highlight">...</PointHeaderBox>
```

### 余白を消す

```tsx
<ArticleBodySection noMargin>...</ArticleBodySection>
```

### ArticleBodySection の子要素間余白

```tsx
<ArticleBodySection spacing={6}>...</ArticleBodySection>  {/* デフォルト 24px */}
<ArticleBodySection spacing={4}>...</ArticleBodySection>  {/* 16px */}
<ArticleBodySection spacing={8}>...</ArticleBodySection>  {/* 32px */}
```
