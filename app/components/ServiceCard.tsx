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

  /** 星評価（1-5、四捨五入） */
  const renderStars = (rating: number) => {
    const filled = Math.round(rating);
    return (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={i < filled ? 'text-yellow-400' : 'text-gray-300'}
            aria-hidden
          >
            ★
          </span>
        ))}
      </>
    );
  };

  /** CTAボタン（size: normal / large） */
  const CTAButton = ({ size = 'normal' }: { size?: 'normal' | 'large' }) => (
    <a
      href={service.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-affiliate-type={service.id}
      data-affiliate-position={position}
      data-affiliate-label={service.name}
      onClick={handleClick}
      className={`block w-full bg-red-600 hover:bg-red-700 text-white text-center rounded-lg font-bold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 ${
        size === 'large' ? 'py-4 text-lg' : 'py-3 text-base'
      }`}
    >
      無料で相談する
    </a>
  );

  return (
    <article className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* ヘッダー: ランキング＋サービス名＋星評価 */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            {/* 王冠＋ランキング（1〜3位は画像、それ以外は絵文字＋テキスト） */}
            <div className="flex items-center gap-2">
              {rank >= 1 && rank <= 3 ? (
                <img
                  src={`/images/ranking-${rank}.png`}
                  alt={`第${rank}位`}
                  className="h-10 w-auto"
                  width={40}
                  height={40}
                />
              ) : (
                <>
                  <span className="text-2xl font-bold text-gray-800">第{rank}位</span>
                </>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{service.name}</h3>
          </div>
          <div className="flex flex-col items-end text-gray-700" aria-label={`評価 ${service.rating}つ星`}>
            <div className="flex items-center text-lg gap-0.5">
              {renderStars(service.rating)}
            </div>
            <span className="text-sm">{service.rating}</span>
          </div>
        </div>
      </div>

      {/* バナーセクション */}
      {service.bannerHtml && (
        <div
          className="flex justify-center items-center p-6 bg-gray-50 border-b border-gray-200 [&_img]:max-w-[300px] [&_img]:h-auto"
          dangerouslySetInnerHTML={{ __html: service.bannerHtml }}
        />
      )}

      {/* コンテンツエリア */}
      <div className="p-8 space-y-8">
        {/* キャッチコピー */}
        {service.catchCopy && (
          <div className="text-left">
            <p className="text-sm font-bold text-gray-800 leading-relaxed whitespace-pre-line">
              {service.catchCopy}
            </p>
          </div>
        )}

        {/* CTAボタン1（大） */}
        <CTAButton size="large" />

        {/* おすすめポイント */}
        {service.recommendPoints && service.recommendPoints.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border-2 border-yellow-200">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              おすすめポイント
            </h4>
            <div className="space-y-3">
              {service.recommendPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm"
                >
                  <span className="text-2xl flex-shrink-0" aria-hidden>
                    {index === 0 ? '1' : index === 1 ? '2' : '3'}
                  </span>
                  <div>
                    <span className="font-bold text-gray-800">{index + 1}：</span>
                    <span className="text-gray-700">{point}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 転職者の声 */}
        {service.userVoices && service.userVoices.length > 0 && (
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              転職者の声
            </h4>
            <div className="space-y-4">
              {service.userVoices.map((voice, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={`/images/user-${(index % 3) + 1}.png`}
                      alt=""
                      className="w-12 h-12 flex-shrink-0 rounded-full object-cover"
                      width={48}
                      height={48}
                      aria-hidden
                    />
                    <div>
                      {(voice.salaryBefore || voice.salaryAfter) && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-red-600 font-bold text-xl">
                            {voice.salaryBefore} → {voice.salaryAfter}
                          </span>
                        </div>
                      )}
                      <p className="text-sm font-bold text-gray-700">
                        {voice.jobTitle}（{voice.age}歳）
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {voice.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTAボタン2（大） */}
        <CTAButton size="large" />

        {/* フォールバック: 既存のfeatures（catchCopyがない場合のみ表示） */}
        {!service.catchCopy && service.features && service.features.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-3">特徴</h4>
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
