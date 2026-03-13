import type { AdCreative } from '@/lib/microcms';
import { sanitizeAdHtml } from '@/lib/adUtils';

interface AdTextProps {
  creative: AdCreative;
}

export default function AdText({ creative }: AdTextProps) {
  const safeHtml = sanitizeAdHtml(creative.raw_html);

  return (
    <div className="mb-6 bg-[#f0f8ff] border-l-4 border-[#1390c8] rounded-r-md p-4 relative">
      <span className="font-['Noto_Sans_JP'] text-[10px] font-bold text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-[#e6e6e6] absolute top-2 right-2">
        PR
      </span>
      <div
        className="ad-text-content font-['Noto_Sans_JP'] text-[13px] leading-[22px] text-[#3f3f3f]"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
}
