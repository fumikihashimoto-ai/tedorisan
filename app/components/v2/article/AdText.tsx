'use client';

import { useState, useEffect } from 'react';
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

  if (creatives.length === 0 || !selected) return null;

  const safeHtml = sanitizeAdHtml(selected.raw_html);
  const catchcopy = CATEGORY_CATCHCOPY[category] ?? DEFAULT_CATCHCOPY;

  return (
    <div className="mb-6 bg-[#f0f8ff] border-l-4 border-[#1390c8] rounded-r-md p-4 relative">
      <span className="font-['Noto_Sans_JP'] text-[10px] font-bold text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-[#e6e6e6] absolute top-2 right-2">
        PR
      </span>
      <p className="font-['Noto_Sans_JP'] text-[13px] font-bold text-[#1390c8] text-center mb-1">
        {catchcopy}
      </p>
      <div
        className="ad-text-content font-['Noto_Sans_JP'] text-[13px] leading-[22px] text-[#3f3f3f]"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
}
