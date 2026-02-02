/**
 * PC UI 右カラム広告
 * 記事ページの右サイドバーに表示する広告ブロック
 */

type Props = {
  title: string;
  subtitle?: string;
  bannerHref: string;
  bannerImgSrc: string;
  bannerPixelSrc: string;
  recommendedTitle?: string;
  recommendedItems?: string[];
  ctaHref: string;
  ctaPixelSrc: string;
  ctaLabel: string;
};

const CTA_BUTTON_CLASS =
  'block w-full py-2.5 px-4 text-sm font-bold text-white text-center rounded-lg bg-gradient-to-b from-red-600 to-red-800 border-t border-red-500/50 shadow-md hover:from-red-700 hover:to-red-900 transition-colors';

export default function ArticleSidebarAd({
  title,
  subtitle,
  bannerHref,
  bannerImgSrc,
  bannerPixelSrc,
  recommendedTitle,
  recommendedItems,
  ctaHref,
  ctaPixelSrc,
  ctaLabel,
}: Props) {
  return (
    <aside className="hidden lg:block lg:w-72 xl:w-80 lg:flex-shrink-0 lg:self-start sticky top-5 h-fit">
      <div className="space-y-4">
        <div className="space-y-3">
          {/* タイトル */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500 text-lg">👑</span>
              <p className="text-sm font-bold text-[#1E293B]">{title}</p>
            </div>
            {subtitle && <p className="text-sm font-bold text-red-600 mb-2">{subtitle}</p>}
            <hr className="border-red-500" />
          </div>

          {/* バナー */}
          <div className="flex justify-center">
            <a href={bannerHref} target="_blank" rel="nofollow noopener noreferrer">
              <img
                width={300}
                height={250}
                alt=""
                src={bannerImgSrc}
                loading="lazy"
                decoding="async"
                className="border-0"
              />
            </a>
            <img width={1} height={1} src={bannerPixelSrc} alt="" aria-hidden />
          </div>

          {/* こんな方にお勧めです / 〇〇の良いところ */}
          {recommendedTitle && recommendedItems && recommendedItems.length > 0 && (
            <div className="border border-gray-300 overflow-hidden rounded">
              <div className="bg-gray-100 px-3 py-2 border-b border-gray-300">
                <p className="text-xs font-bold text-[#1E293B]">{recommendedTitle}</p>
              </div>
              <ul className="px-3 py-3 text-xs leading-relaxed text-[#1E293B] space-y-1.5">
                {recommendedItems.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="text-red-600 shrink-0">✓</span>
                    <span className="font-bold text-red-600 bg-yellow-200 px-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTAボタン */}
          <div className="mt-4">
            <a href={ctaHref} target="_blank" rel="nofollow noopener noreferrer" className={CTA_BUTTON_CLASS}>
              {ctaLabel}
            </a>
            <img width={1} height={1} src={ctaPixelSrc} alt="" aria-hidden />
          </div>
        </div>
      </div>
    </aside>
  );
}
