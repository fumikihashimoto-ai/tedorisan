/**
 * ISO 8601 日付文字列を yyyy/mm/dd 形式にフォーマットする
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

/**
 * 公開日・更新日の表示テキストを生成する
 * - 公開日と更新日が同じ日 → "yyyy/mm/dd"
 * - 公開日と更新日が異なる日 → "yyyy/mm/dd（更新：yyyy/mm/dd）"
 * - 更新日がない場合 → 公開日のみ表示
 */
export function formatArticleDate(
  publishedAt?: string,
  updatedAt?: string,
): string | null {
  if (!publishedAt) return null;

  const pub = formatDate(publishedAt);

  if (!updatedAt) return pub;

  const upd = formatDate(updatedAt);

  if (pub === upd) return pub;

  return `${pub}（更新：${upd}）`;
}
