'use client';

import { useState, useEffect, useMemo } from 'react';
import type { AdCreative } from '@/lib/microcms';
import { sanitizeAdHtml } from '@/lib/adUtils';

/** カテゴリ別キャッチコピー */
const CATEGORY_CATCHCOPY: Record<string, string> = {
  'career-change': '＼【PR】年収アップを狙うなら今だ！／',
  'skill-up': '＼【PR】スキルアップで市場価値を上げよう！／',
  'tax-saving': '＼【PR】賢く節税して手取りを増やそう！／',
  'side-job': '＼【PR】副業で収入の柱を増やそう！／',
  'salary-data': '＼【PR】あなたの市場価値を高めよう！／',
  'salary-basics': '＼【PR】手取りを増やす第一歩を踏み出そう！／',
};
const DEFAULT_CATCHCOPY = '＼【PR】あなたのキャリアをアップグレードしよう！／';

/** 広告HTML内の最初の <a href="..."> からURLを抽出する */
function extractFirstLinkUrl(html: string): string | null {
  const match = html.match(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

interface AdTextProps {
  /** 表示候補のテキスト広告素材（複数可） */
  creatives: AdCreative[];
  /** 記事カテゴリ（キャッチコピー表示用） */
  category: string;
}

/**
 * テキスト広告コンポーネント
 * 複数件ある場合はクライアントサイドでランダム1件を選択して表示
 */
export default function AdText({ creatives, category }: AdTextProps) {
  const [selected, setSelected] = useState<AdCreative | null>(null);

  useEffect(() => {
    if (creatives.length === 0) return;
    if (creatives.length === 1) {
      setSelected(creatives[0]);
    } else {
      setSelected(creatives[Math.floor(Math.random() * creatives.length)]);
    }
  }, [creatives]);

  const safeHtml = useMemo(
    () => (selected ? sanitizeAdHtml(selected.raw_html) : ''),
    [selected]
  );

  const ctaUrl = useMemo(
    () => (selected ? extractFirstLinkUrl(selected.raw_html) : null),
    [selected]
  );

  if (creatives.length === 0 || !selected) return null;

  const catchcopy = CATEGORY_CATCHCOPY[category] ?? DEFAULT_CATCHCOPY;

  return (
    <div className="mb-6 border-[3px] border-[#BF0000] rounded-none bg-white px-5 py-5">
      <p className="font-['Noto_Sans_JP'] text-[12px] text-[#666666] text-center mb-2">
        {catchcopy}
      </p>
      <div
        className="ad-text-content font-['Noto_Sans_JP'] text-[16px] font-bold text-[#BF0000] text-center leading-[1.6] mb-3 [&_a]:text-[#BF0000] [&_a]:no-underline"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
      {ctaUrl && (
        <div className="text-center mt-3">
          <a
            href={ctaUrl}
            className="inline-block bg-[#BF0000] text-white text-[14px] font-bold px-8 py-3 rounded hover:opacity-85 transition-opacity no-underline"
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
          >
            詳しくはこちら →
          </a>
        </div>
      )}
    </div>
  );
}
