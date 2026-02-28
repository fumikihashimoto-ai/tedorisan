'use client';

import type { AffiliateService } from '@/lib/comparisonData';

interface SubsidyInfo {
  /** 給付金額 */
  amount: string;
  /** 給付金プログラム名 */
  program: string;
  /** 指定番号 */
  designationNumber: string;
  /** 指定期間 */
  designationPeriod: string;
}

interface FreeConsultationCTAProps {
  /** アフィリエイトサービスデータ */
  service: AffiliateService;
  /** タイトル（デフォルト: 無料個別相談会開催中！） */
  title?: string;
  /** コース名（例: Webエンジニア4ヶ月短期集中コース） */
  courseName?: string;
  /** 説明文 */
  description?: string;
  /** 給付金情報（任意） */
  subsidyInfo?: SubsidyInfo;
  /** CTAボタンのテキスト（デフォルト: ＼公式サイトを詳しくチェック／） */
  ctaText?: string;
  /** コンテンツ幅750pxレイアウト（TOP仕様） */
  contentLayout?: boolean;
}

export default function FreeConsultationCTA({
  service,
  title = '無料個別相談会開催中！',
  courseName,
  description,
  subsidyInfo,
  ctaText = '＼公式サイトを詳しくチェック／',
  contentLayout = false,
}: FreeConsultationCTAProps) {
  const titleBarMarginClass = contentLayout ? '-mx-4' : '-mx-[10px]';
  return (
    <div className="mb-6">
      {/* タイトルバー：全幅 */}
      <div className={`bg-[#ff677e] h-[35px] rounded-[2px] ${titleBarMarginClass} flex items-center justify-center relative mb-2`}>
        <p className="font-['Noto_Sans_JP'] font-bold text-[18px] text-white text-center">
          {title}
        </p>

        {/* 下向き三角形 */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-[10px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px] border-t-[#ff677e]" />
      </div>

      {/* コンテンツエリア */}
      <div className="mt-4">
        {/* バナー */}
        <div className="w-full max-w-[300px] mx-auto mb-4">
          <div
            className="[&_img]:max-w-[300px] [&_img]:h-auto [&_img[width='1']]:hidden"
            dangerouslySetInnerHTML={{
              __html: service.bannerHtml ?? '',
            }}
          />
        </div>

        {/* サービス名とコース名 */}
        <div className="text-center mb-[10px]">
          <h3 className="font-['Noto_Sans_JP'] font-bold text-[20px] text-[#3f3f3f] mb-0">
            {service.name}
          </h3>
          {courseName && (
            <p className="font-['Noto_Sans_JP'] font-bold text-[16px] text-[#3f3f3f]">
              {courseName}
            </p>
          )}
        </div>

        {/* 説明文 */}
        {description && (
          <p className="font-['Noto_Sans_JP'] font-medium text-[12px] text-[#3f3f3f] leading-[18px] mb-4 text-center">
            {description}
          </p>
        )}

        {/* 給付金情報（任意） */}
        {subsidyInfo && (
          <>
            {/* 給付金額 */}
            <div className="bg-[#ff677e] text-white text-center py-2 px-4 rounded-[5px] mb-3 max-w-[300px] mx-auto">
              <p className="font-['Noto_Sans_JP'] font-bold text-[14px]">
                {subsidyInfo.amount}
              </p>
            </div>

            {/* 給付金プログラム */}
            <div className="bg-white border-[3px] border-[#ff677e] rounded-[5px] py-[10px] px-4 mb-3 max-w-[300px] mx-auto">
              <p className="font-['Noto_Sans_JP'] font-bold text-[14px] text-[#ff677e] text-center mb-0">
                厚生労働省指定
              </p>
              <p className="font-['Noto_Sans_JP'] font-bold text-[18px] text-[#ff677e] text-center">
                {subsidyInfo.program}
              </p>
            </div>

            {/* 指定番号・期間 */}
            <p className="font-['Noto_Sans_JP'] font-medium text-[10px] text-[#3f3f3f] leading-[16px] text-center mb-4">
              指定番号：{subsidyInfo.designationNumber}
              <br />
              指定期間：{subsidyInfo.designationPeriod}
              <br />
              ※ 詳細は無料個別相談にてご質問ください。
            </p>
          </>
        )}

        {/* CTAボタン */}
        <div className="max-w-[353px] mx-auto">
          <a
            href={service.affiliateUrl}
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'affiliate_click', {
                  service_name: service.name,
                  service_id: service.id,
                  section: 'free_consultation_cta',
                });
              }
            }}
            className="block bg-[#ff677e] text-white font-['Noto_Sans_JP'] font-black text-[16px] text-center py-4 rounded-[5px] shadow-[0px_3px_0px_0px_#c41e37] hover:shadow-[0px_1px_0px_0px_#c41e37] active:shadow-none active:translate-y-[2px] transition-all"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </div>
  );
}
