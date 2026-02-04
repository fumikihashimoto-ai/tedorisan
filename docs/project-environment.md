# 本プロジェクトの環境・言語

## ランタイム・言語

| 項目 | 内容 |
|------|------|
| **言語** | TypeScript（メイン）、JavaScript（設定・スクリプトで一部） |
| **JSX** | React JSX（`react-jsx`） |
| **TypeScript ターゲット** | ES2017 |
| **モジュール** | ESNext / bundler（Next.js） |
| **パスエイリアス** | `@/*` → プロジェクトルート |

## フレームワーク・ライブラリ

| 種類 | 名前 | バージョン |
|------|------|------------|
| **フレームワーク** | Next.js | 16.1.4 |
| **UI ライブラリ** | React | 19.2.3 |
| **DOM** | react-dom | 19.2.3 |
| **グラフ** | recharts | ^3.7.0 |

## スタイル

| 種類 | 内容 |
|------|------|
| **CSS フレームワーク** | Tailwind CSS | ^4 |
| **PostCSS** | @tailwindcss/postcss（Tailwind v4 用） |

## 開発ツール

| 種類 | 内容 |
|------|------|
| **Lint** | ESLint 9 + eslint-config-next（Core Web Vitals / TypeScript） |
| **型定義** | @types/node (^20)、@types/react / @types/react-dom (^19) |
| **画像処理** | sharp ^0.34.5（Next.js の画像最適化用） |
| **その他** | to-ico ^1.1.5（favicon 生成スクリプト用） |

## ビルド・実行

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバー起動（Next.js） |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint 実行 |
| `npm run generate-favicon` | favicon 生成スクリプト |

## プロジェクト種別

- **Next.js App Router** ベースの Web アプリ
- **サーバーコンポーネント** と **クライアントコンポーネント**（`'use client'`）の併用
- メタデータ・OGP・リダイレクトなどは `next.config.ts` で設定

## 補足

- Node.js のバージョンは `package.json` に明示されていません。Next.js 16 利用を想定すると、**Node.js 18.18 以上**（推奨は 20.x）が目安です。
- パッケージ管理は **npm**（`package-lock.json` あり）を前提とした構成です。
