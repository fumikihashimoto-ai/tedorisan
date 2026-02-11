'use client';

import type { AffiliateService } from '@/lib/comparisonData';

// ============================================================
// 型定義
// ============================================================

export type AffiliatePosition =
  | 'diagnosis_result'
  | 'pr_section'
  | 'comparison_table';

export interface ServiceCardProps {
  service: AffiliateService;
  /** 1, 2, 3 */
  rank: number;
  position: AffiliatePosition;
}

// ============================================================
// GA4（gtag）の型拡張
// ============================================================

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params: Record<string, string>
    ) => void;
  }
}

// ============================================================
// コンポーネント
// ============================================================

export function ServiceCard({ service, rank, position }: ServiceCardProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        affiliate_type: service.id,
        affiliate_position: position,
        affiliate_label: service.name,
      });
    }
  };

  /** 星評価の表示（1-5、0.5刻みを四捨五入） */
  const renderStars = (rating: number) => {
    const filledStars = Math.round(rating);
    const emptyStars = 5 - filledStars;
    return (
      <div className="flex items-center gap-0.5" aria-label={`評価 ${rating}つ星`}>
        {Array.from({ length: filledStars }, (_, i) => (
          <span key={`f-${i}`} className="text-yellow-400" aria-hidden>★</span>
        ))}
        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={`e-${i}`} className="text-yellow-400/40" aria-hidden>☆</span>
        ))}
        <span className="ml-1 text-sm text-gray-500 font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <article
      className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
    >
      <div className="relative p-4 sm:p-6">
        {/* PRバッジ */}
        {service.isPr && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
              おすすめ
            </span>
          </div>
        )}

        {/* メインコンテンツ: 2カラム */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* 左: バナー（ある場合のみ） */}
          {service.bannerHtml && (
            <div
              className="flex-shrink-0 [&_img]:max-w-full [&_img]:h-auto"
              dangerouslySetInnerHTML={{ __html: service.bannerHtml }}
            />
          )}

          {/* 右: テキスト情報 */}
          <div className="flex-1 min-w-0">
            {/* ランキング・星評価 */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {(rank === 1 || rank === 2 || rank === 3) && (
                <span className="text-2xl font-bold text-blue-600">
                  第{rank}位
                </span>
              )}
              <div className="text-sm">{renderStars(service.rating)}</div>
            </div>

            {/* サービス名・説明 */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {service.name}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>

            {/* 特徴 */}
            <ul className="space-y-1">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5 flex-shrink-0" aria-hidden>✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTAボタン（全幅・グラデーション＋光の演出） */}
        <a
          href={service.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          data-affiliate-type={service.id}
          data-affiliate-position={position}
          data-affiliate-label={service.name}
          className="block w-full py-3 px-5 text-sm font-bold text-white text-center rounded-lg bg-gradient-to-b from-red-600 to-red-800 border-t border-red-500/50 shadow-md hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-colors relative shine-effect"
        >
          無料で相談する
        </a>
      </div>
    </article>
  );
}
