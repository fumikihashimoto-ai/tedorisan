import type { ArticleBodyBlock } from './microcms';

/**
 * bodyBlocks全体から2つ目のh2を含むブロックを特定し、
 * インラインバナー挿入に必要な情報を返す。
 *
 * @returns targetBlockIndex: バナーを挿入するブロックのindex
 *          targetH2InBlock: そのブロック内で何番目のh2の直前に挿入するか
 *          firstH2BlockIndex: h2が最初に出現するブロックのindex（フォールバック用）
 */
export function findInlineBannerTarget(bodyBlocks: ArticleBodyBlock[]): {
  targetBlockIndex: number;
  targetH2InBlock: number;
  firstH2BlockIndex: number;
} {
  let h2Count = 0;
  let targetBlockIndex = -1;
  let targetH2InBlock = 0;
  let firstH2BlockIndex = -1;

  for (let i = 0; i < bodyBlocks.length; i++) {
    const b = bodyBlocks[i];
    if (b.fieldId === 'richTextBlock' && b.richText) {
      const matches = b.richText.match(/<h2/g);
      if (matches) {
        if (firstH2BlockIndex === -1) firstH2BlockIndex = i;
        for (let j = 0; j < matches.length; j++) {
          h2Count++;
          if (h2Count === 2) {
            targetBlockIndex = i;
            break;
          }
        }
        if (targetBlockIndex !== -1) break;
      }
    }
  }

  // ブロック内で2つ目のh2が何番目か正確に計算
  if (targetBlockIndex !== -1) {
    let prevH2s = 0;
    for (let i = 0; i < targetBlockIndex; i++) {
      const bl = bodyBlocks[i];
      if (bl.fieldId === 'richTextBlock' && bl.richText) {
        prevH2s += (bl.richText.match(/<h2/g) || []).length;
      }
    }
    targetH2InBlock = 2 - prevH2s;
  }

  return { targetBlockIndex, targetH2InBlock, firstH2BlockIndex };
}
