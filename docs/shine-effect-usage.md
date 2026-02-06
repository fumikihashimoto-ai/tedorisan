# 光が流れる演出（shine-effect）の汎用利用

ボタンやリンクなどに「左から右へ光が流れる」演出を付ける方法です。

## 基本の使い方

1. **クラスを付与する**  
   光を付けたい要素に `shine-effect` を付ける  
2. **基準位置を指定する**  
   同じ要素に `position: relative` を付ける（Tailwind なら `relative`）

### 例（HTML / JSX）

```tsx
<a href="..." className="relative shine-effect block py-3 px-6 bg-blue-600 text-white rounded-lg">
  登録する
</a>
```

## リピート間隔を変える

デフォルトは **3秒** ごとに光が流れます。  
変えたい場合は CSS 変数 `--shine-duration` を指定します。

```tsx
// 4秒ごとにリピート
<a
  className="relative shine-effect ..."
  style={{ '--shine-duration': '4s' } as React.CSSProperties}
>
  ボタン
</a>
```

```tsx
// 2秒ごとにリピート
style={{ '--shine-duration': '2s' } as React.CSSProperties}
```

## 注意点

- 光のレイヤーは `::after` で描画しているため、**クリックなどは透過**します（`pointer-events: none`）。
- 光がはみ出さないよう、要素には **`overflow: hidden`** がクラス内で指定されています。
- **角丸ボタン** の場合は、その要素自身に `rounded-lg` などを付けると、光も角丸内に収まります。

## 既存の利用箇所

- **薬剤師ページ（スマホ記事内 CTA）**  
  `MobileArticleAd.tsx` の CTA ボタンで `cta-button-shine` を使用（`shine-effect` と同じ挙動）。

## 光の速さを変えたい場合

光が「流れている時間」の長さを変えたい場合は、`app/globals.css` の `@keyframes shine-loop` の **12%** の値を変更します。

- **速くする**: 12% → 8% など（数値を小さくする）
- **遅くする**: 12% → 16% など（数値を大きくする）

数値は「アニメーション全体の何 % で光が右端に到達するか」を表します。
