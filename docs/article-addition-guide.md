# 記事追加ガイド

fresh-graduate ページと同じ形式で他ページに記事を追加する際の、AIへの指示方法と文章素材の提供方法です。

---

## 1. AIへの指示テンプレート

以下のテンプレートをコピーし、該当箇所を埋めて依頼してください。

```
【記事追加の依頼】

対象ページ: [例: /tools/job-change]
ページタイトル（h1）: [例: 転職年収シミュレーター - 手取り比較]
パンくずの表示名: [例: 転職検討者向け]
計算ツール: [例: JobChangeClient] ※計算ツールがない場合は「なし」
計算ツールの配置: [記事の上 / 記事の下] ※fresh-graduateは「記事の上」

以下の文章素材を fresh-graduate と同じ形式で XXXArticle.tsx として実装してください。
```

---

## 2. 文章素材の提供方法

### 方法A: マークダウン形式（推奨）

見出しレベルと構造が分かりやすい形式です。

```markdown
# リード文
[1〜3段落の導入文]

# 1. セクション1のタイトル
[本文...]

## 1.1 小見出し
[本文...]

### 1.1.1 さらに小見出し
[本文...]

**強調したい語句** ← マークダウンで強調指定

# 2. セクション2のタイトル
...
```

### 方法B: プレーンテキスト + 見出し指定

```
【リード文】
（ここにリード文を貼り付け）

【1. セクション1のタイトル】
（本文...）

【1.1 小見出し】
（本文...）

【強調】強調したい語句【/強調】
```

### 方法C: 既存記事の構造を指定して本文のみ

「fresh-graduate のセクション構成を参考に、以下の本文を XXXArticle.tsx に変換して」と依頼し、セクション番号付きで本文を提供。

---

## 3. 記事のスタイル仕様（fresh-graduate 準拠）

| 要素 | クラス・形式 |
|------|-------------|
| 記事全体 | `<article className="pb-20">` |
| リード文 | `<p className="text-base leading-[1.8] mb-4">` |
| h2（大見出し） | `pl-3 border-l-4 border-amber-500` |
| h3（中見出し） | `pl-3 border-l-2 border-blue-400` |
| h4（小見出し） | `text-base sm:text-lg font-bold` |
| 段落 | `text-base leading-[1.8] mb-4` |
| 強調 | `<mark className="bg-amber-100 px-1 rounded font-bold">` |
| 箇条書き | `list-disc pl-6 mb-4 space-y-2` |
| テーブル | `overflow-x-auto` + `min-w-[500px]` |
| セクション | `id="section-1"` など、`scroll-mt-6` |

---

## 4. ページ構成のパターン

### パターンA: 計算ツールあり（fresh-graduate 型）

- `page.tsx`: パンくず、h1、計算ツール、記事
- `XXXArticle.tsx`: 記事コンテンツ
- 計算ツール: `embedded` プロップで埋め込み

### パターンB: 計算ツールなし

- `page.tsx`: パンくず、h1、記事のみ
- `XXXArticle.tsx`: 記事コンテンツ

### パターンC: 既存ページに記事を追加（job-change, side-business など）

- 既存の `page.tsx` を fresh-graduate 型に変更
- 新規 `XXXArticle.tsx` を作成
- 計算ツールを `embedded` で埋め込み

---

## 5. ファイル配置

```
app/
  tools/
    [ページ名]/
      page.tsx          ← ページ本体（メタデータ、レイアウト）
      [ページ名]Article.tsx  ← 記事コンテンツ（新規作成）
  career/
    [ページ名]/
      page.tsx
      [ページ名]Article.tsx
  data/
    industry/
      [業界名]/
        page.tsx
        [業界名]Article.tsx
```

---

## 6. 外部リンクの指定

記事内に外部リンクを含める場合、`target="_blank"` と `rel="noopener noreferrer"` を付与します。
