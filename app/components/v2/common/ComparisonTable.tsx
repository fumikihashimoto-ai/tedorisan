import Image from 'next/image';
import { Star } from 'lucide-react';
import { IMAGE_PATHS } from '@/app/lib/constants/styles';
import type { AffiliateService } from '@/lib/comparisonData';
import type { Situation } from '@/lib/diagnosisLogic';
import SectionBar from './SectionBar';

interface ComparisonTableProps {
  /** フィルタリングするtargetSituation（複数指定可） */
  targetSituations: string[];
  /** 表のタイトル（showSectionBar が true の場合に表示） */
  title?: string;
  /** タイトルバー（SectionBar）を表示するか（デフォルト: true） */
  showSectionBar?: boolean;
  /** 表示する最大件数（デフォルト: 4） */
  maxItems?: number;
  /** 背景色を全幅にするか（デフォルト: true） */
  fullWidth?: boolean;
  /** 全てのサービスデータ（外部から注入） */
  services: AffiliateService[];
}

export default function ComparisonTable({
  targetSituations,
  title = '転職サイト簡単比較表',
  showSectionBar = true,
  maxItems = 4,
  fullWidth = true,
  services,
}: ComparisonTableProps) {
  // targetSituationsに含まれるサービスをフィルタリング
  const filteredServices = services
    .filter((service) =>
      targetSituations.some((target) =>
        service.targetSituation.includes(target as Situation)
      )
    )
    .sort((a, b) => b.epc - a.epc)
    .slice(0, maxItems);

  // サービスがない場合は何も表示しない
  if (filteredServices.length === 0) return null;

  return (
    <section
      className={
        fullWidth
          ? 'bg-[var(--color-v2-bg)] -mx-4 px-4 pt-[16px] pb-[16px]'
          : 'pt-[16px] pb-[16px]'
      }
    >
      {/* タイトル */}
      {showSectionBar && (
        <SectionBar title={title} variant="withPadding" />
      )}

      {/* 比較表（横スクロール対応） */}
      <div className="table-scroll-x">
        <div className="bg-white border border-[var(--color-v2-border)] rounded overflow-hidden min-w-[600px]">
        {/* ヘッダー */}
        <div className="grid grid-cols-4 bg-[var(--color-v2-primary)] text-white text-xs font-medium">
          <div className="py-2 px-3 md:py-3 md:px-4 border-r border-[var(--color-v2-border)] text-center">
            転職サイト
          </div>
          <div className="py-2 px-3 md:py-3 md:px-4 border-r border-[var(--color-v2-border)] text-center">
            おすすめPt
          </div>
          <div className="py-2 px-3 md:py-3 md:px-4 border-r border-[var(--color-v2-border)] text-center">
            特徴
          </div>
          <div className="py-2 px-3 md:py-3 md:px-4 text-center">公式サイト</div>
        </div>

        {/* サービス一覧 */}
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="grid grid-cols-4 border-t border-[var(--color-v2-border)]"
          >
            {/* サービス名 + バナー */}
            <div className="py-2 px-3 md:py-3 md:px-4 border-r border-[var(--color-v2-border)] flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center gap-1">
                {service.bannerHtml ? (
                  <div
                    className="w-full max-w-[100px] mx-auto [&_a]:block [&_img]:w-full [&_img]:h-auto [&_img]:object-contain [&_img[width='1']]:hidden"
                    dangerouslySetInnerHTML={{ __html: service.bannerHtml }}
                  />
                ) : (
                  <div className="relative w-20 h-14">
                    <Image
                      src={IMAGE_PATHS.schoolLogo}
                      alt={service.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-[10px] text-[var(--color-v2-text)] font-medium text-center leading-tight">
                  {service.name}
                </p>
              </div>
            </div>

            {/* おすすめポイント（星 + 評価） */}
            <div className="py-2 px-3 md:py-3 md:px-4 border-r border-[var(--color-v2-border)] flex flex-col items-center justify-center">
              <Star className="w-4 h-4 fill-[var(--color-v2-star)] text-[var(--color-v2-star)] mb-1" aria-hidden />
              <span className="text-xl font-bold text-[var(--color-v2-accent)]">
                {service.rating}
              </span>
            </div>

            {/* 特徴 */}
            <div className="py-2 px-3 md:py-3 md:px-4 border-r border-[var(--color-v2-border)] flex items-center">
              <p className="text-[10px] md:text-sm text-[var(--color-v2-text)] leading-tight line-clamp-3">
                {service.description}
              </p>
            </div>

            {/* 公式サイトボタン */}
            <div className="py-2 px-3 md:py-3 md:px-4 flex items-center justify-center">
              <a
                href={service.comparisonTableCTAUrl ?? service.affiliateUrl}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'affiliate_click', {
                      service_name: service.name,
                      service_id: service.id,
                      section: 'comparison_table',
                    });
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-v2-accent)] text-white font-black text-xs md:text-sm h-11 md:h-12 flex items-center justify-center px-2 rounded-md shadow-[0px_3px_0px_0px_var(--color-v2-accent-shadow)] hover:bg-[var(--color-v2-accent-hover)] transition-colors whitespace-nowrap"
              >
                公式サイト
              </a>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
