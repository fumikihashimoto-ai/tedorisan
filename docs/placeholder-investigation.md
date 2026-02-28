# プレースホルダー表示差の調査レポート

## 現象
「あなたの月収」（input の placeholder）が「年代を選択」（select の未選択時表示）と異なる表示になっている。

---

## 要因

### 1. 実装方式の違い（主因）

| 項目 | 年代を選択（select） | あなたの月収（input） |
|------|----------------------|------------------------|
| 実体 | `<option>` のテキスト（実DOM） | `::placeholder` 疑似要素 |
| スタイル適用 | select 要素に直接 Tailwind で指定 | globals.css の `.placeholder-unified::placeholder` |
| 表示制御 | 未選択時のみ `text-[#AAAAAA]` を付与 | ブラウザが placeholder を描画 |

select は「実テキスト」にスタイルを当てているのに対し、input は「疑似要素」に当てているため、ブラウザごとの扱いの差が出やすい。

### 2. Tailwind Preflight との競合

`node_modules/tailwindcss/preflight.css` で以下が定義されている。

```css
::placeholder {
  opacity: 1;
}
@supports (...) {
  ::placeholder {
    color: color-mix(in oklab, currentcolor 50%, transparent);
  }
}
```

- 後者により、**placeholder が「現在の文字色の 50% 透明」** にされる可能性がある。
- `.placeholder-unified::placeholder` はクラス指定で詳細度が高いが、読み込み順やレイヤーによっては意図した色（#AAAAAA）が効かない場合がある。

### 3. ブラウザ差（::placeholder の仕様）

- **Firefox**: 昔は placeholder にデフォルトで opacity がかかっていた（Tailwind が opacity: 1 でリセット）。
- **Safari**: 一部バージョンでは `::-webkit-input-placeholder` でないと効かない場合がある。
- **font-weight**: 環境によっては `::placeholder` の `font-weight: 700` が無視されることがある。

### 4. input 本体スタイルの影響

- 月収 input には `text-[12px] text-[#3f3f3f]` が付いている（入力値用）。
- 一部ブラウザでは、placeholder が input の `font-size` を継承し、`.placeholder-unified` の 14px が効ききらない可能性がある。

---

## 改善案

### 案A: CSS の堅牢化（推奨・実装コスト低）

- `.placeholder-unified::placeholder` に以下を追加する。
  - **opacity: 1** を明示（Firefox 等の差を吸収）。
  - **ベンダー接頭辞**（`::-webkit-input-placeholder`, `::-moz-placeholder`）を併記し、Safari / Firefox でも同じ見た目に近づける。
  - Preflight の `color-mix` を上書きするため、**color に !important** を付与する（他に placeholder 色を変える箇所がなければ問題になりにくい）。

これで「あなたの月収」を、指定どおり Noto Sans JP・Bold・14px・#AAAAAA に寄せられる。

### 案B: 疑似プレースホルダー（表示の完全一致）

- `placeholder` 属性は使わず、input の上に「あなたの月収」の `<span>` を `position: absolute` で重ねる。
- 入力値が空のときだけ span を表示し、入力開始で非表示にする。
- スタイルは「年代を選択」と同じクラス（例: `text-[14px] font-bold text-[#AAAAAA]`）を付与する。

メリット: select と同一のスタイル指定で、見た目を完全に揃えられる。  
デメリット: 実装量が増え、フォーカス/入力状態の制御が必要。

---

## 推奨

まず **案A** を適用し、それでも差が残る場合に **案B** を検討するのがよい。
