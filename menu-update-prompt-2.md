# ヘッダーメニュー変更のプロンプト（2）

以下の修正を実行してください。

## 変更内容

### 1. 20代未経験者の転職を「未経験者の転職」に変更し、下層メニューに「20代未経験者の転職」を追加

現在は単一リンク「20代未経験者の転職」となっています。これをドロップダウンメニューに変更します。

- **親ラベル（ドロップダウン名）:** 未経験者の転職
- **下層メニュー（子項目）:** 20代未経験者の転職 → `/career/inexperienced`

### 2. 修正対象ファイルと具体的な変更

#### `app/lib/navigation.ts`

**CAREER_MENU_ITEMS**
- 変更なし（既に `{ label: '20代未経験者の転職', href: '/career/inexperienced' }` が含まれている）

**NAV_ITEMS**
- 変更前（単一リンク）:
```typescript
{
  type: 'link',
  label: '20代未経験者の転職',
  href: '/career/inexperienced',
  mobileLabel: '20代未経験者の転職',
},
```
- 変更後（ドロップダウン）:
```typescript
{
  type: 'dropdown',
  id: 'career',
  label: '未経験者の転職',
  items: CAREER_MENU_ITEMS,
  activePrefix: '/career',
  mobileLabel: '未経験者の転職',
},
```

**NavItem 型**
- `id` の型を `'tools' | 'data'` から `'tools' | 'data' | 'career'` に戻す

#### `app/components/Header.tsx`

**openSection の型**
- `'tools' | 'data' | null` から `'tools' | 'data' | 'career' | null` に戻す

### 3. 変更後のメニュー構成イメージ

| 親メニュー | 子メニュー |
|-----------|-----------|
| 未経験者の転職 | 20代未経験者の転職 → /career/inexperienced |

### 4. 影響範囲

- Header（PC・スマホ）: ドロップダウン「未経験者の転職」が表示され、クリック/タップで「20代未経験者の転職」が展開される
- Footer: `CAREER_MENU_ITEMS` を参照しているため、「20代未経験者の転職」が「キャリア・その他」セクションに表示される
- sitemap: `CAREER_MENU_ITEMS` を参照しているため、変更なし
