# 問題調査: スマホで記事コンテンツが太字になる

## 調査結果レポート

---

### 【1. グローバルCSS設定】

**ファイル:** `app/globals.css`

**該当コード:**
```css
body {
  background: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing-base);
}
```

**設定値:**
- `font-weight`: **未指定**（ブラウザデフォルトの normal / 400 を継承）
- `-webkit-font-smoothing`: **未指定**
- `-moz-osx-font-smoothing`: **未指定**
- `font-family`: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, "Noto Sans JP", Arial, sans-serif`

**指摘:** body に `font-weight` が明示されていない。スマホ実機ではフォントの解釈差で太く見える可能性がある。

---

### 【2. メディアクエリでのフォント設定】

**ファイル:** `app/globals.css`

**該当コード:**
```css
@media (max-width: 640px) {
  body {
    line-height: var(--line-height-relaxed);
  }
}

@media (max-width: 640px) {
  :root {
    --font-size-h1: 1.5rem;
    --font-size-h2: 1.25rem;
    --font-size-h3: 1.125rem;
    --font-size-h4: 1rem;
    --font-size-hero: 1.5rem;
    --font-size-button: 1.125rem;
  }
}
```

**設定値:**
- モバイル向けメディアクエリ内で `font-weight` の上書き: **なし**
- `font-family` の変更: **なし**

**指摘:** モバイル向けに `font-weight` や `font-family` の変更はない。

---

### 【3. 対象ページのスタイル確認】

**ファイル:** `app/components/ComparisonListClient.tsx`, `app/tables/TablesArticle.tsx`

**該当コード（ComparisonListClient.tsx）:**
- リード文: `<p className="text-base leading-[1.8] mb-6">`（font-weight なし）
- CTA: `<p className="text-base font-semibold text-gray-800 mb-4">`（font-semibold あり）

**該当コード（TablesArticle.tsx）:**
- 本文: `<p className="text-base leading-[1.8] mb-4">`（font-weight なし）
- 強調: `<strong className="text-blue-700">`（strong は font-weight: bold）

**カスタムクラス定義（globals.css）:**
```css
.text-body {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: var(--line-height-base);
}
.text-caption {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}
```

**設定値:**
- `text-body`, `text-caption` に `font-weight` 指定: **なし**
- 本文の `<p>` は `text-base` のみで `font-weight` 未指定

**指摘:** 本文には `font-bold` や `font-semibold` は付与されていない。ただし、globals.css の h1〜h6 に `font-weight: 700` が一括適用されている。

---

### 【4. レイアウトのスタイル確認】

**ファイル:** `app/layout.tsx`

**該当コード:**
```tsx
<body className="antialiased bg-[#F8FAFC]">
```

**設定値:**
- `antialiased`: Tailwind のクラスで `-webkit-font-smoothing: antialiased` と `-moz-osx-font-smoothing: grayscale` を付与
- フォント関連の追加設定: **なし**

**指摘:** `antialiased` は macOS では細く見える効果があるが、iOS では挙動が異なる可能性がある。

---

### 【5. Tailwind設定の確認】

**ファイル:** `tailwind.config.ts` / `tailwind.config.js` は存在しない。Tailwind v4 で `@import "tailwindcss"` と `@theme inline` を使用。

**該当コード:** `app/globals.css` の `@theme inline` 内
```css
--font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, "Noto Sans JP", Arial,
  sans-serif;
```

**設定値:**
- `fontWeight` のカスタマイズ: **なし**
- `fontFamily` のカスタマイズ: 上記 `--font-sans` を使用

---

### 【追加発見】globals.css の h1〜h6 一括スタイル

**ファイル:** `app/globals.css` 185-194行目

**該当コード:**
```css
h1, h2, h3, h4, h5, h6 {
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  font-weight: 700;
}
```

**指摘:** 見出しタグには `font-weight: 700` が適用されている。本文の `<p>` には影響しない。

---

### 【追加発見】@font-face の使用（iOS 18 バグとの関連）

**ファイル:** `app/components/Header.tsx`

**該当コード:**
```tsx
import { Noto_Sans_JP } from 'next/font/google';
const notoSansJPBlack = Noto_Sans_JP({ weight: '900' });
```

**指摘:** Next.js の `next/font` により `@font-face` が注入される。WebKit bug 283393 では、`@font-face` が存在するページで iOS 18 Safari の CJK 文字が太く表示される問題が報告されている。Header 用の Noto Sans JP 読み込みが、ページ全体の CJK 表示に影響している可能性がある。

---

## 怪しい設定のまとめ

| 優先度 | 項目 | 内容 |
|--------|------|------|
| **高** | iOS 18 WebKit bug | `@font-face`（Noto Sans JP）の存在が、CJK 文字の太字表示を引き起こしている可能性 |
| **中** | body の font-weight 未指定 | スマホ実機でフォントの解釈差により太く見える可能性 |
| **中** | Hiragino フォント | iOS で Hiragino が使われる場合、実機とエミュレータで表示差が出る可能性 |
| **低** | antialiased | iOS での font-smoothing の挙動がデスクトップと異なる可能性 |

---

## 推奨対応

1. **body に `font-weight: 400` を明示**  
   本文の継承元を明確にする。

2. **iOS 18 WebKit bug の回避**  
   - `next/font` の利用方法の見直し  
   - または、CJK 用に別フォントを明示するなどの回避策の検討

3. **本文に `font-weight: 400` を明示**  
   例: `<p className="text-base font-normal leading-[1.8] mb-4">` のように `font-normal` を付与する。
