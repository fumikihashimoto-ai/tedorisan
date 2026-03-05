# SEO・メタ情報ルール

## ⚠️ 対応範囲の区分（重要）
SEO関連の設定は、ページの種類によって対応者が異なる。

### 動的ページ（microCMS管理）
- 記事ページ（`/articles/[category]/[slug]`）が該当
- title、description、OGP画像などはmicroCMSの管理画面で設定する
- **Claude Codeはテンプレート（レイアウト側）のみ担当する**
- テンプレートではmicroCMSから取得した値を正しく表示する実装を行う
- Claude CodeがmicroCMS管理の値を直接ハードコードしてはならない

### 静的ページ（Claude Code管理）
- トップページ、計算ツールページ、固定ページなどが該当
- title、description、OGP、構造化データはClaude Codeがコード内で設定する
- 以下のルールはすべて静的ページに適用する

## メタタグ（静的ページ：必須）
- すべての静的ページに `title` と `meta description` を設定する
- title: 30〜40文字以内。主要キーワードを含める
- description: 80〜120文字以内。ページの内容を簡潔に説明
- titleとdescriptionが未設定の静的ページを作成してはならない

## 動的ページのテンプレート実装ルール
- titleは `microCMSのtitleフィールド + サイト名` の形式で出力する
- descriptionはmicroCMSのdescriptionフィールドを使用する
- 値が空の場合のフォールバック（デフォルト値）を必ず実装する
- フォールバック値は定数として管理し、各ページにハードコードしない

## OGP（全ページ共通）
- すべての公開ページに以下のOGPタグを出力するテンプレートを用意する：
  - `og:title` / `og:description` / `og:image` / `og:url` / `og:type`
  - `twitter:card` / `twitter:title` / `twitter:description`
- og:imageは1200x630px推奨
- 動的ページ：OGP値はmicroCMSから取得して出力する
- 静的ページ：OGP値はコード内で設定する

## URL構造
- 記事ページのURLは `/articles/[category]/[slug]` の形式を厳守
- カテゴリは以下の4種のみ: `career-change`, `skill-up`, `salary-data`, `salary-basics`
- slugは英語のケバブケース（例: `high-school-career-guide`）
- 一度公開したURLは変更しない（SEO評価が失われるため）
- URLを変更せざるを得ない場合は、必ず301リダイレクトを設定する

## 見出し構造（全ページ共通）
- h1はページに1つだけ
- 見出し階層を飛ばさない（h1 → h3 のように h2 を飛ばさない）
- 見出しには対象キーワードを自然に含める

## 構造化データ
- 記事ページ（動的）：テンプレートで `Article` の構造化データ（JSON-LD）を自動生成する
- 計算ツールページ（静的）：必要に応じて `FAQPage` の構造化データを設定する
- 構造化データの値もページ種別に応じてmicroCMS or コード内から取得する

## 画像（全ページ共通）
- すべての画像に `alt` 属性を設定する（空のaltは禁止）
- Next.jsの `<Image>` コンポーネントを使用する（`<img>` タグは使わない）
- 画像ファイル名は内容がわかる英語名にする（例: `salary-comparison-chart.png`）

## 内部リンク（全ページ共通）
- 関連記事への内部リンクを適切に設置する
- リンクテキストは具体的にする（❌「こちら」→ ✅「高校生の年収シミュレーション」）
- 孤立ページ（どこからもリンクされていないページ）を作らない

## HTTPSの一貫性
- すべてのURLはhttpsで統一する
- サイト内リンクでhttpを使わない
