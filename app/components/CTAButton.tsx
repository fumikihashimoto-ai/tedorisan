/**
 * 共通 CTA ボタン
 * 右カラム・記事内などで利用。赤グラデ＋光の流れ演出（shine-effect）を共通化。
 */

import type { ReactNode } from 'react';

export const CTA_BUTTON_CLASS =
  'block w-full py-2.5 px-4 text-sm font-bold text-white text-center rounded-lg bg-gradient-to-b from-red-600 to-red-800 border-t border-red-500/50 shadow-md hover:from-red-700 hover:to-red-900 transition-colors relative shine-effect';

type Props = {
  href: string;
  pixelSrc?: string;
  children: ReactNode;
  /** アフィリエイト追跡用 data-属性（任意） */
  dataAffiliateName?: string;
  dataAffiliateNetwork?: string;
  dataAffiliateCategory?: string;
};

export default function CTAButton({
  href,
  pixelSrc,
  children,
  dataAffiliateName,
  dataAffiliateNetwork,
  dataAffiliateCategory,
}: Props) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={CTA_BUTTON_CLASS}
        {...(dataAffiliateName && {
          'data-affiliate-name': dataAffiliateName,
          'data-affiliate-network': dataAffiliateNetwork,
          'data-affiliate-category': dataAffiliateCategory,
        })}
      >
        {children}
      </a>
      {pixelSrc && <img width={1} height={1} src={pixelSrc} alt="" aria-hidden />}
    </>
  );
}
