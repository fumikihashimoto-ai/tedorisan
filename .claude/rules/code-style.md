# コーディング・デザインルール

## ⚠️ 最重要原則
**既存のデザインを維持・踏襲すること。** 新しいデザイン要素を勝手に導入しない。
以下のルールは既存サイトから抽出したものであり、これに従えばサイト全体のトンマナが統一される。

---

## 技術構成
- フレームワーク: Next.js（App Router）
- 言語: TypeScript
- スタイリング: Tailwind CSS v4（`tailwind.config.*` なし、`globals.css` で `@theme inline` 使用）
- フォント: Noto Sans JP（Google Fonts）
- コンポーネント: `app/components/v2/` が現行デザインシステム

## ディレクトリ構成ルール
- ページコンポーネント: `app/[セクション]/page.tsx`
- 共通コンポーネント: `app/components/v2/common/`
- 記事専用コンポーネント: `app/components/v2/article/`
- レイアウト: `app/components/v2/layouts/`
- ヘッダー: `app/components/v2/header/`
- 型定義: `lib/microcms.ts`（microCMS関連）、`app/lib/types/`（その他）
- データ・ロジック: `lib/`
- メタデータ: `app/lib/metadata.ts`（`createPageMetadata` 関数を使用）

---

## カラーパレット

### ブランドカラー（静的ページ・計算ツール等）
| 用途 | 変数 / クラス | カラーコード |
|---|---|---|
| プライマリ（青） | `--color-primary` / `bg-primary` | `#2563EB` |
| プライマリhover | `--color-primary-hover` | `#1d4ed8` |
| プライマリ薄 | `--color-primary-light` | `#dbeafe` |
| アクセント（アンバー） | `--color-accent` / `bg-accent` | `#F59E0B` |
| アクセントhover | `--color-accent-hover` | `#d97706` |
| サブ（グリーン） | `--color-success` | `#10B981` |
| エラー（赤） | `--color-error` | `#dc2626` |

### v2カラー（記事ページ・TOP等）
| 用途 | 変数 / クラス | カラーコード |
|---|---|---|
| v2プライマリ（水色） | `--color-v2-primary` | `#1390c8` |
| v2アクセント（ピンク） | `--color-v2-accent` | `#ff677e` |
| v2テキスト | `--color-v2-text` | `#3f3f3f` |
| v2背景 | `--color-v2-bg` | `#f5f5f5` |
| v2ボーダー | `--color-v2-border` | `#e6e6e6` |

### テキスト・背景
| 用途 | 変数 | カラーコード |
|---|---|---|
| テキスト（メイン） | `--color-text-primary` | `#1E293B` |
| テキスト（補助） | `--color-text-secondary` | `#64748B` |
| テキスト（薄） | `--color-text-muted` | `#94a3b8` |
| 背景 | `--color-background` | `#fff` |
| サーフェス | `--color-surface` | `#FFFFFF` |
| ボーダー | `--color-border` | `#E2E8F0` |
| ボーダー薄 | `--color-border-light` | `#f1f5f9` |

### 使い分けルール
- **静的ページ（計算ツール、トップページ等）**: ブランドカラーを使用
- **記事ページ・v2コンポーネント**: v2カラーを使用
- 新規ページを作る際は、ページの種類に応じてどちらのカラーセットを使うかユーザーに確認すること

---

## タイポグラフィ

### フォント
- 本文・見出しすべて: `Noto Sans JP`（`font-['Noto_Sans_JP']`）
- ウェイト: 400（本文）、500（中強調）、700（見出し・ボタン）、900（特殊用途のみ）

### フォントサイズ（PC / SP）
| 用途 | PC | SP |
|---|---|---|
| h1 | 30px (1.875rem) | 24px (1.5rem) |
| h2 | 24px (1.5rem) | 20px (1.25rem) |
| h3 | 20px (1.25rem) | 18px (1.125rem) |
| h4 | 18px (1.125rem) | 16px (1rem) |
| 本文 | 16px (1rem) | 16px (1rem) |
| キャプション | 14px (0.875rem) | 14px (0.875rem) |
| 最小（注釈） | 12px (0.75rem) | 12px (0.75rem) |
| ボタン | 16px (1rem) | 18px (1.125rem) |
| ヒーロー | 32px (2rem) | 24px (1.5rem) |

### 行間・文字間
| 用途 | 値 |
|---|---|
| 見出し行間 | 1.4 (`--line-height-tight`) |
| 本文行間 | 1.8 (`--line-height-base`) |
| SP本文行間 | 2.0 (`--line-height-relaxed`) |
| 見出し文字間 | -0.01em (`--letter-spacing-tight`) |
| 本文文字間 | 0.02em (`--letter-spacing-base`) |

### v2記事ページの文字サイズ
記事ページ（v2）では、globals.cssの変数ではなく直接指定されている：
- 本文: `text-[14px] leading-[25px]`
- 見出し（h1）: `text-[16px]` （SP）/ `text-[20px]`（PC）
- キャプション: `text-[12px]`
- カテゴリタグ: `text-[10px]`
- **v2記事ページを編集する場合は、この直接指定パターンに合わせること**

---

## 共通CSSクラス（globals.css定義済み）
以下のクラスは `globals.css` に定義済み。新しくスタイルを書く前に、既存クラスを使えないか確認すること。

| クラス名 | 用途 |
|---|---|
| `.card-base` | カード（影あり、角丸、padding） |
| `.card-no-border` | 枠なしカード |
| `.card-flat` | 背景・枠なし（計算ツール等） |
| `.btn-primary` | プライマリCTAボタン（アンバー、全幅） |
| `.btn-primary-inline` | インラインCTAボタン |
| `.input-field` | 入力フォーム |
| `.heading-h2` | h2見出し統一 |
| `.heading-h2-underline` | h2見出し（下線付き） |
| `.page-title` | ページタイトル（h1） |
| `.text-body` | 本文テキスト |
| `.text-caption` | キャプション |
| `.text-small` | 最小テキスト |
| `.breadcrumb` | パンくずリスト |
| `.section-gap` | セクション間余白 |
| `.result-amount` | 計算結果の金額表示 |
| `.table-scroll-x` | テーブル横スクロール |
| `.table-zebra` | テーブル縞模様 |
| `.shine-effect` | 光が流れるアニメーション（CTA等） |
| `.placeholder-unified` | プレースホルダー統一（Noto Sans JP / Bold / 14px / #AAA） |
| `.article-rich-text h2` | 記事リッチテキスト内のh2（青い下線付き） |
| `.article-rich-text p` | 記事リッチテキスト内の段落間隔（mb: 16px） |

**独自のスタイルを新規追加する前に、上記クラスで対応できないか検討すること。**

---

## レスポンシブ設計
- SPブレークポイント: `max-width: 640px`（Tailwind: `sm:` で640px以上に適用）
- タブレット以上: `min-width: 768px`（Tailwind: `md:` で768px以上に適用）
- SP時のbody行間は `2.0` に変更される
- SP時のフォントサイズは `:root` で上書きされる（globals.css内の `@media (max-width: 640px)` セクション）

---

## コンポーネント実装ルール

### レイアウト
- ページレイアウトは `PageLayout` コンポーネント（`app/components/v2/layouts/PageLayout.tsx`）を使用する
- `<PageLayout maxWidth="content">` で記事幅に統一

### 画像
- 必ず Next.js の `<Image>` コンポーネントを使用する（`<img>` 禁止）
- microCMS画像のドメイン: `images.microcms-assets.io`（next.config.ts で許可設定済みの前提）
- サムネイルのアスペクト比: `aspect-[16/9]`
- `alt` 属性は必須（空文字禁止）

### リンク
- 内部リンクは Next.js の `<Link>` コンポーネントを使用する
- 外部リンクには `rel="noopener noreferrer" target="_blank"` を付与
- アフィリエイトリンクは affiliate.md のルールに従う

### パンくずリスト
- 記事ページのパンくずは `TOP > 記事一覧 > カテゴリ名 > 記事タイトル` の形式
- スタイル: `font-['Noto_Sans_JP'] text-[12px] text-[#64748B] py-3`
- リンクホバー色: `hover:text-[#1390c8]`

---

## 禁止事項
- globals.css のカラー変数やクラスを無断で変更しない
- v2コンポーネントのデザインを無断で変更しない
- ブランドカラーとv2カラーを混在させない（ページの種類に応じて統一する）
- 新しいフォントを追加しない（Noto Sans JPのみ使用）
- `!important` の使用は原則禁止（既存の `.placeholder-unified` や `.banner-html-wrapper` は例外）
