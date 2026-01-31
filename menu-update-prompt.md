# ヘッダーメニュー変更のプロンプト

以下の修正を `app/lib/navigation.ts` に適用してください。

## 変更内容

### 1. 職種・年齢別 年収：医療技術職を臨床検査技師に変更

- **対象:** `DATA_MENU_ITEMS` 内の医療技術職の項目
- **変更前:** `{ label: '医療技術職', href: '/data/industry/medical-tech', footerLabel: '医療技術職の年収・手取り' }`
- **変更後:** `{ label: '臨床検査技師', href: '/data/industry/medical-tech', footerLabel: '臨床検査技師の年収・手取り' }`
- **補足:** `href` は `/data/industry/medical-tech` のまま。ページのルートやフォルダ名を変更する場合は別途対応。

### 2. キャリア：未経験転職の年収目安を20代未経験者の転職に変更

- **対象:** `CAREER_MENU_ITEMS` 内の未経験転職の項目
- **変更前:** `{ label: '未経験転職の年収目安', href: '/career/inexperienced' }`
- **変更後:** `{ label: '20代未経験者の転職', href: '/career/inexperienced' }`
- **補足:** `href` は `/career/inexperienced` のまま。

### 3. キャリア：20代転職の年収相場、年収1000万超えの手取りを削除

- **対象:** `CAREER_MENU_ITEMS`
- **削除する項目:**
  - `{ label: '20代転職の年収相場', href: '/career/career-change-20s' }`
  - `{ label: '年収1000万超えの手取り', href: '/career/high-income' }`

### 4. 変更後の CAREER_MENU_ITEMS

```typescript
export const CAREER_MENU_ITEMS: NavMenuItem[] = [
  { label: '20代未経験者の転職', href: '/career/inexperienced' },
];
```

## 補足・検討事項

1. **キャリアが1項目のみになった場合**
   - ドロップダウンではなく単一リンクに変更するか検討してください。
   - 単一リンクにする場合は、`NAV_ITEMS` の該当部分を `type: 'dropdown'` から `type: 'link'` に変更し、`CAREER_MENU_ITEMS` の代わりに直接リンクを指定する必要があります。

2. **削除されるページ**
   - `/career/career-change-20s` と `/career/high-income` のページは残りますが、メニューからは削除されます。
   - これらのページを完全に削除する場合は、`app/career/career-change-20s/` と `app/career/high-income/` フォルダの削除、および `sitemap.ts` からの除外を別途実施してください。

3. **影響範囲**
   - `app/lib/navigation.ts` を変更すると、Header・Footer・sitemap に自動反映されます。
   - `FOOTER_SECTIONS` は `CAREER_MENU_ITEMS` を参照しているため、上記変更で自動的に更新されます。
