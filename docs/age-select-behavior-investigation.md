# 年代プルダウン挙動差の調査レポート

## 現象
ITエンジニア記事ページの「年代を選択」プルダウンが、/tools/fresh-graduate の「年代を選択」「あなたの年代」プルダウンと挙動が異なる。

---

## 要因

### 実装の違い（根本原因）

| 項目 | /tools/fresh-graduate | ITエンジニア記事ページ |
|------|------------------------|-------------------------|
| コンポーネント | **AnimatedSelect**（カスタム） | **ネイティブ `<select>`** |
| 開き方 | トリガー div クリックで開閉 | ブラウザ標準の select UI |
| ドロップダウン | createPortal で document.body に固定配置 | ブラウザ描画（OS/ブラウザ依存） |
| オプション | クリック可能な div（role="option"） | `<option>` 要素 |
| 外クリック | 自前で mousedown/touchstart 検知して閉じる | ブラウザ任せ |
| スクロール時 | リサイズ/スクロールで位置再計算 | なし（ネイティブに任せている） |
| キーボード | Enter/Space で開閉など自前実装 | ネイティブのキー操作 |
| 見た目 | globals.css の .animated-select-* で統一 | ブラウザ・OS により見た目が変わる |

### 結論
- **fresh-graduate**: カスタムの **AnimatedSelect** を使い、開閉・ポジション・外クリック・スタイルをすべて制御している。
- **ITエンジニア**: ネイティブ **`<select>`** のため、開閉の仕方・リストの出方・スタイルがブラウザ/OS 依存で、fresh-graduate と挙動・見た目が一致しない。

---

## 改善案

**ITエンジニア記事ページでも AnimatedSelect を使う。**

- 年代の選択肢は現状の値（20s, 30s, 40s, 50s）とラベル（20代〜50代以上）を維持。
- `placeholder="年代を選択"` を渡す。
- 既存の `ageGroup` state と `ageGroupToYears` はそのまま利用可能。

これで「開く→リストが body 直下に固定表示→外クリックで閉じる」など、fresh-graduate と同じ挙動に揃えられる。

**補足**
- AnimatedSelect の未選択時テキスト色は現在 `text-gray-500`。ITエンジニアで #AAAAAA に揃えたい場合は、AnimatedSelect に `placeholderClassName` のような props を追加するか、既存の className で上書きする必要がある。
- 今回は「挙動の統一」を優先し、コンポーネント差し替えのみ行う。
