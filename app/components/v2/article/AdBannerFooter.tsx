'use client';

import { useState, useEffect } from 'react';
import type { AdCreative } from '@/lib/microcms';
import { sanitizeAdHtml } from '@/lib/adUtils';

interface AdBannerFooterProps {
  /** 表示候補の320×50バナー素材（複数可） */
  creatives: AdCreative[];
}

/**
 * 320×50フッター固定バナー広告コンポーネント
 * 記事ページ下部にスマホで固定表示
 * 複数件ある場合はクライアントサイドでランダム1件を選択して表示
 */
export default function AdBannerFooter({ creatives }: AdBannerFooterProps) {
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white/95 border-t border-[#e6e6e6] py-1 md:hidden">
      <div
        className="w-[320px] h-[50px] overflow-hidden"
        dangerouslySetInnerHTML={{ __html: sanitizeAdHtml(selected.raw_html) }}
      />
    </div>
  );
}
