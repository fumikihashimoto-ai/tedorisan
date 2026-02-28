'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { AffiliateService } from '@/lib/comparisonData';
import { COLORS, IMAGE_PATHS } from '@/app/lib/constants/styles';
import CTAButton from './CTAButton';

interface ServiceCardProps {
  service: AffiliateService;
  variant?: 'ranking' | 'comparison' | 'simple';
  layout?: 'vertical' | 'horizontal';
  rank?: number;
  showRank?: boolean;
  showRecommendBadge?: boolean;
  showRecommendPoints?: boolean;
  showUserVoices?: boolean;
  showFeatures?: boolean;
  onCTAClick?: () => void;
  className?: string;
}

export default function ServiceCard({
  service,
  variant = 'simple',
  layout = 'vertical',
  rank,
  showRank = false,
  showRecommendBadge = false,
  showRecommendPoints = false,
  showUserVoices = false,
  showFeatures = true,
  onCTAClick,
  className = '',
}: ServiceCardProps) {
  const [isVoiceExpanded, setIsVoiceExpanded] = useState(false);

  // ランキングバッジの表示判定
  const shouldShowRankBadge = showRank && rank !== undefined && rank <= 3;

  // GA4イベント送信
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick();
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        service_name: service.name,
        service_id: service.id,
        rank: rank != null ? String(rank) : '',
        variant: variant,
      });
    }
  };

  // CTAのURL（比較表用URLがあれば優先）
  const ctaUrl = service.comparisonTableCTAUrl ?? service.affiliateUrl;

  // variant別のスタイル
  const containerStyles = {
    ranking: 'bg-white rounded-lg shadow-md overflow-hidden',
    comparison: 'bg-white border border-gray-200 rounded-md',
    simple: 'bg-white rounded-md border border-gray-200',
  };

  return (
    <div className={`${containerStyles[variant]} ${className}`}>
      {/* ヘッダー部分（ランキングバッジ + RECOMMENDバッジ） */}
      {(shouldShowRankBadge || showRecommendBadge) && (
        <div
          className="flex items-center justify-between p-3"
          style={{ backgroundColor: COLORS.bgGray }}
        >
          {/* ランキングバッジ */}
          {shouldShowRankBadge && rank !== undefined && (
            <div className="relative w-16 h-16">
              <Image
                src={IMAGE_PATHS.getRanking(rank)}
                alt={`${rank}位`}
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* RECOMMENDバッジ */}
          {showRecommendBadge && (
            <div
              className="ml-auto text-white text-xs font-bold py-1 px-3 rounded-sm"
              style={{ backgroundColor: COLORS.accentLight }}
            >
              RECOMMEND
            </div>
          )}
        </div>
      )}

      <div
        className={`p-4 ${layout === 'horizontal' ? 'md:flex md:gap-4' : ''}`}
      >
        {/* バナー部分 */}
        {service.bannerHtml && (
          <div
            className={`mb-4 flex justify-center ${layout === 'horizontal' ? 'md:w-1/3 md:mb-0' : ''}`}
          >
            <div
              className="w-full max-w-[300px] [&_img]:max-w-[300px] [&_img]:h-auto [&_img[width='1']]:hidden banner-html-wrapper"
              dangerouslySetInnerHTML={{ __html: service.bannerHtml }}
            />
          </div>
        )}

        {/* コンテンツ部分 */}
        <div className={layout === 'horizontal' ? 'md:flex-1 md:min-w-0' : ''}>
          {/* サービス名 */}
          <h3
            className="font-black text-lg mb-2"
            style={{ color: COLORS.textPrimary }}
          >
            {service.name}
          </h3>

          {/* キャッチコピー */}
          {service.catchCopy && (
            <p
              className="text-sm mb-3 whitespace-pre-line"
              style={{ color: COLORS.textSecondary }}
            >
              {service.catchCopy}
            </p>
          )}

          {/* 星評価 */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(service.rating)
                      ? 'text-[#f1cb43]'
                      : 'text-gray-300'
                  }`}
                  style={
                    i < Math.floor(service.rating)
                      ? { color: COLORS.star }
                      : undefined
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: COLORS.textPrimary }}
            >
              {service.rating}
            </span>
          </div>

          {/* おすすめPOINT */}
          {showRecommendPoints &&
            service.recommendPoints &&
            service.recommendPoints.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-6 h-6">
                    <Image
                      src={IMAGE_PATHS.pointIcon}
                      alt="おすすめPOINT"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div
                    className="text-white text-xs font-bold py-1 px-2 rounded-sm"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    おすすめPOINT
                  </div>
                </div>
                <div
                  className="rounded-md p-3 space-y-2"
                  style={{ backgroundColor: COLORS.bgPoint }}
                >
                  {service.recommendPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span
                        className="font-bold flex-shrink-0"
                        style={{ color: COLORS.accent }}
                      >
                        {index + 1}.
                      </span>
                      <p
                        className="text-sm"
                        style={{ color: COLORS.textPrimary }}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* 特徴 */}
          {showFeatures &&
            service.features &&
            service.features.length > 0 && (
              <div className="mb-4">
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: COLORS.textPrimary }}
                    >
                      <span
                        className="font-bold flex-shrink-0"
                        style={{ color: COLORS.primary }}
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* 利用者のクチコミ */}
          {showUserVoices &&
            service.userVoices &&
            service.userVoices.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-6 h-6">
                    <Image
                      src={IMAGE_PATHS.pointIcon}
                      alt="利用者のクチコミ"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4
                    className="font-bold text-sm"
                    style={{ color: COLORS.textPrimary }}
                  >
                    利用者のクチコミ
                  </h4>
                </div>

                <div className="relative">
                  <div
                    className="rounded-md p-3"
                    style={{
                      backgroundColor: COLORS.bgGray,
                      maxHeight: !isVoiceExpanded ? '6rem' : undefined,
                      overflow: !isVoiceExpanded ? 'hidden' : undefined,
                    }}
                  >
                    {service.userVoices[0].salaryBefore &&
                      service.userVoices[0].salaryAfter && (
                        <div className="flex items-center gap-2 mb-2 text-sm font-bold">
                          <span
                            style={{ color: COLORS.textSecondary }}
                          >
                            年収
                          </span>
                          <span
                            style={{ color: COLORS.accent }}
                          >
                            {service.userVoices[0].salaryBefore}
                          </span>
                          <span
                            style={{ color: COLORS.textSecondary }}
                          >
                            →
                          </span>
                          <span
                            style={{ color: COLORS.primary }}
                          >
                            {service.userVoices[0].salaryAfter}
                          </span>
                        </div>
                      )}
                    {service.userVoices[0].jobTitle && (
                      <p
                        className="text-xs font-bold mb-1"
                        style={{ color: COLORS.textPrimary }}
                      >
                        {service.userVoices[0].jobTitle}
                      </p>
                    )}
                    <p
                      className="text-sm whitespace-pre-wrap"
                      style={{ color: COLORS.textPrimary }}
                    >
                      {service.userVoices[0].comment}
                    </p>
                  </div>

                  {!isVoiceExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent flex items-end justify-center pb-1">
                      <button
                        type="button"
                        onClick={() => setIsVoiceExpanded(true)}
                        className="text-xs font-bold underline"
                        style={{ color: COLORS.primary }}
                      >
                        もっと見る
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* CTAボタン */}
          <CTAButton
            href={ctaUrl}
            variant="primary"
            size="medium"
            onClick={handleCTAClick}
            className="w-full text-center"
          >
            ＼公式サイトを詳しくチェック／
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
