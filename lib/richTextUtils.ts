/**
 * richTextのHTML文字列を分割するユーティリティ関数群
 * 記事本文内への広告バナー挿入等で使用
 */

/**
 * richTextのHTML文字列をn番目(1-indexed)の<h2の直前で分割する。
 * 該当のh2が見つからない場合はnullを返す。
 */
export function splitBeforeNthH2(richText: string, n: number): { before: string; after: string } | null {
  let count = 0;
  let searchFrom = 0;
  while (searchFrom < richText.length) {
    const pos = richText.indexOf('<h2', searchFrom);
    if (pos === -1) break;
    count++;
    if (count === n) {
      return { before: richText.slice(0, pos), after: richText.slice(pos) };
    }
    searchFrom = pos + 1;
  }
  return null;
}

/**
 * richTextのHTML文字列を最初の</h2>直後で分割する。
 * </h2>が見つからない場合はnullを返す。
 */
export function splitAfterFirstH2(richText: string): { before: string; after: string } | null {
  const closingH2 = '</h2>';
  const pos = richText.indexOf(closingH2);
  if (pos === -1) return null;
  const splitAt = pos + closingH2.length;
  return { before: richText.slice(0, splitAt), after: richText.slice(splitAt) };
}
