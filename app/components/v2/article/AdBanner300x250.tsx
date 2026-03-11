import type { AdCreative } from '@/lib/microcms';

interface AdBanner300x250Props {
  creative: AdCreative;
}

/**
 * 300×250バナー広告コンポーネント
 * 記事本文末尾に表示（show_ad_300x250 = true の記事のみ）
 */
export default function AdBanner300x250({ creative }: AdBanner300x250Props) {
  return (
    <div className="flex justify-center py-4">
      <div
        className="w-[300px] h-[250px] overflow-hidden"
        dangerouslySetInnerHTML={{ __html: creative.raw_html }}
      />
    </div>
  );
}
