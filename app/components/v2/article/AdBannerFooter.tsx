'use client';

import type { AdCreative } from '@/lib/microcms';

interface AdBannerFooterProps {
  creative: AdCreative;
}

/**
 * 320×50フッター固定バナー広告コンポーネント
 * 記事ページ下部にスマホで固定表示
 */
export default function AdBannerFooter({ creative }: AdBannerFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white/95 border-t border-[#e6e6e6] py-1 md:hidden">
      <div
        className="w-[320px] h-[50px] overflow-hidden"
        dangerouslySetInnerHTML={{ __html: creative.raw_html }}
      />
    </div>
  );
}
