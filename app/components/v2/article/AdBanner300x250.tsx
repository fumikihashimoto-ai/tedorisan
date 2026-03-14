'use client';

import { useState, useEffect } from 'react';
import type { AdCreative } from '@/lib/microcms';
import { sanitizeAdHtml } from '@/lib/adUtils';

interface AdBanner300x250Props {
  /** 表示候補の広告素材（複数可） */
  creatives: AdCreative[];
  /** trueの場合、PC（641px以上）のみ表示しSPでは非表示 */
  pcOnly?: boolean;
}

/**
 * 300×250バナー広告コンポーネント
 * - PC（641px以上）: 最大2件横並び表示
 * - SP（640px以下）: 1件のみ表示
 * - 登録数が多い場合はクライアントサイドでランダム選択
 */
export default function AdBanner300x250({ creatives, pcOnly = false }: AdBanner300x250Props) {
  // PC用: 最大2件をランダム選択
  const [pcCreatives, setPcCreatives] = useState<AdCreative[]>([]);
  // SP用: 1件をランダム選択
  const [spCreative, setSpCreative] = useState<AdCreative | null>(null);

  useEffect(() => {
    if (creatives.length === 0) return;

    if (creatives.length === 1) {
      setPcCreatives([creatives[0]]);
      setSpCreative(creatives[0]);
    } else if (creatives.length === 2) {
      setPcCreatives([creatives[0], creatives[1]]);
      setSpCreative(creatives[Math.floor(Math.random() * 2)]);
    } else {
      // 3件以上: PC用にランダム2件、SP用にランダム1件
      const shuffled = [...creatives].sort(() => Math.random() - 0.5);
      setPcCreatives([shuffled[0], shuffled[1]]);
      setSpCreative(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  }, [creatives]);

  if (creatives.length === 0) return null;

  // SSR時はレンダリングしない（hydrationエラー防止）
  if (pcCreatives.length === 0 && !spCreative) return null;

  return (
    <>
      {/* PC表示: 641px以上 */}
      <div className="hidden sm:flex justify-center gap-4 py-4">
        {pcCreatives.map((creative) => (
          <div
            key={creative.id}
            className="w-[300px] h-[250px] overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sanitizeAdHtml(creative.raw_html) }}
          />
        ))}
      </div>

      {/* SP表示: 640px以下（pcOnly時は非表示） */}
      {!pcOnly && spCreative && (
        <div className="flex sm:hidden justify-center py-4">
          <div
            className="w-[300px] h-[250px] overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sanitizeAdHtml(spCreative.raw_html) }}
          />
        </div>
      )}
    </>
  );
}
