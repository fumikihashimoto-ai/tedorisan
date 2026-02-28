'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import type { AffiliateService } from '@/lib/comparisonData';
import { IMAGE_PATHS } from '@/app/lib/constants/styles';

interface TopServiceCardProps {
  service: AffiliateService;
  rank: number;
}

export function TopServiceCard({ service, rank }: TopServiceCardProps) {
  const [kuchikomiOpen, setKuchikomiOpen] = useState(false);

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        affiliate_type: service.id,
        affiliate_position: 'top_page',
        affiliate_label: service.name,
      });
    }
  };

  // ランキング画像のパス
  const rankingImagePath = rank <= 3 ? IMAGE_PATHS.getRanking(rank) : null;

  return (
    <div className="bg-white border border-[#e9e9e9] rounded mx-0 overflow-hidden hover:border-[#1390c8] hover:shadow-sm transition-all duration-200">
      {/* ランキングヘッダー */}
      <div className="p-4 pb-0 flex items-start gap-3">
        {rankingImagePath && (
          <div className="w-10 h-10 flex-shrink-0 relative">
            <Image
              src={rankingImagePath}
              alt={`第${rank}位`}
              width={40}
              height={40}
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-black !text-[22px] text-[#3f3f3f] mb-1">
            {service.name}
          </h3>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <div className="inline-block bg-[#ff8d9e] text-white text-xs px-3 py-0.5 rounded-full">
              RECOMMEND
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(service.rating)
                        ? 'fill-[#f1cb43] text-[#f1cb43]'
                        : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xl font-bold text-[#ff677e]">
                {service.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="h-px bg-[#e9e9e9] mb-4" />
      </div>

      {/* キャッチコピー */}
      {service.catchCopy && (
        <div className="px-4">
          <p className="text-[16px] font-bold text-[#3f3f3f] leading-relaxed mb-4 whitespace-pre-line">
            {service.catchCopy}
          </p>
        </div>
      )}

      {/* バナー画像 */}
      {service.bannerHtml && (
        <div className="px-4 mb-2 flex justify-center">
          <div
            className="w-full max-w-[300px] rounded [&_img]:max-w-[300px] [&_img]:h-auto [&_img]:rounded banner-html-wrapper"
            dangerouslySetInnerHTML={{ __html: service.bannerHtml }}
          />
        </div>
      )}

      {/* おすすめポイント */}
      {service.recommendPoints && service.recommendPoints.length > 0 && (
        <div className="mx-4 mb-4">
          <div className="bg-[#1390c8] text-white text-sm font-medium py-2 px-4 rounded-t-md flex items-center gap-2">
            <Image
              src={IMAGE_PATHS.pointIcon}
              alt=""
              width={9}
              height={18}
              className="flex-shrink-0"
            />
            <span>おすすめPOINT</span>
          </div>
          <div className="bg-[#fff9ed] p-4 space-y-3">
            {service.recommendPoints.slice(0, 3).map((point, idx) => (
              <div key={idx}>
                <p className="text-sm text-[#3f3f3f]">・{point}</p>
                {idx < 2 && <div className="h-px bg-[#f2e1c1] mt-3" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA（社内SE転職ナビは1つだけ表示するためここでは非表示） */}
      {service.id !== 'shanai-se-navi' && (
        <div className="px-4 mb-4">
          <a
            href={service.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="block w-full bg-[#ff677e] text-white font-black text-[20px] py-4 rounded-md shadow-[0px_3px_0px_0px_#c41e37] hover:bg-[#ff5569] transition-colors text-center"
          >
            ＼公式サイトを詳しくチェック／
          </a>
        </div>
      )}

      {/* 利用者の口コミ（最大3件表示） */}
      {service.userVoices && service.userVoices.length > 0 && (
        <div className="mx-4 mb-4">
          <div className="border border-[#1390c8] rounded-md overflow-hidden">
            <div className="bg-[#1390c8] text-white text-sm font-medium py-2 px-4 flex items-center gap-2">
              <Image
                src={IMAGE_PATHS.pointIcon}
                alt=""
                width={9}
                height={18}
                className="flex-shrink-0"
              />
              <span>利用者のクチコミ</span>
            </div>
            <div className="bg-white p-4 relative">
              {service.userVoices.slice(0, 3).map((voice, voiceIdx) => {
                const comment = voice.comment;
                const firstNewline = comment.indexOf('\n');
                const nameLine =
                  firstNewline >= 0
                    ? comment.slice(0, firstNewline).trim()
                    : '';
                const bodyText =
                  firstNewline >= 0
                    ? comment.slice(firstNewline + 1).trim()
                    : comment;
                const userIconPath = IMAGE_PATHS.getUserIcon(voiceIdx + 1);
                return (
                  <div
                    key={voiceIdx}
                    className={`flex items-start gap-3 mb-3 ${voiceIdx > 0 ? 'pt-3 border-t border-[#e9e9e9]' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={userIconPath}
                        alt=""
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      {voice.salaryBefore && voice.salaryAfter && (
                        <p className="text-sm text-[#1390c8] font-medium mb-2">
                          {voice.salaryBefore} → {voice.salaryAfter}
                        </p>
                      )}
                      {nameLine && (
                        <p className="text-sm text-[#1390c8] font-medium mb-2">
                          {nameLine}
                        </p>
                      )}
                      <p
                        className={`text-[14px] text-[#3f3f3f] leading-relaxed ${
                          kuchikomiOpen ? '' : 'line-clamp-3'
                        }`}
                      >
                        {bodyText}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* グラデーション（閉じている時のみ表示） */}
              {!kuchikomiOpen && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}

              {/* もっと見るボタン */}
              <div className="flex justify-center mt-4 relative z-10">
                <button
                  type="button"
                  onClick={() => setKuchikomiOpen((prev) => !prev)}
                  className="bg-[#1390c8] text-white font-black text-xs py-2 px-6 rounded-md shadow-[0px_3px_0px_0px_#0a81b7] hover:opacity-90 transition-opacity"
                >
                  {kuchikomiOpen ? '閉じる' : 'もっと見る'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 最後のCTA */}
      <div className="px-4 pb-4">
        <a
          href={service.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block w-full bg-[#ff677e] text-white font-black text-[20px] py-4 rounded-md shadow-[0px_3px_0px_0px_#c41e37] hover:bg-[#ff5569] transition-colors text-center"
        >
          ＼公式サイトを詳しくチェック／
        </a>
      </div>
    </div>
  );
}
