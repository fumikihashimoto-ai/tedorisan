import { resolveField } from '@/lib/adUtils';
import { splitBeforeNthH2, splitAfterFirstH2 } from '@/lib/richTextUtils';
import { affiliateServices } from '@/lib/comparisonData';
import { freeConsultationCtaConfig } from '@/lib/articleData/itEngineerSalary';
import { PART_CATEGORY_SITUATIONS } from '@/lib/categoryMapping';
import type { ArticleBodyBlock, AdCreative } from '@/lib/microcms';
import AdBanner300x250 from './AdBanner300x250';
import TedoriCalculator from '../common/TedoriCalculator';
import ComparisonTable from '../common/ComparisonTable';
import PointHeaderBox from './PointHeaderBox';
import SectionBar from '../common/SectionBar';
import FreeConsultationCTA from '../common/FreeConsultationCTA';

/** リッチテキストの共通CSSクラス */
export const RICH_TEXT_CLASS = "article-rich-text font-['Noto_Sans_JP'] text-[16px] leading-[1.85] sm:text-[18px] sm:leading-[1.9] text-[#08131a]";

/** インラインバナー挿入の指示 */
export type InlineAdBannerConfig =
  | { creatives: AdCreative[]; mode: 'before'; nthH2: number }
  | { creatives: AdCreative[]; mode: 'after' };

/**
 * bodyBlockを1つレンダリングする。
 * インラインバナーを挿入する場合は inlineAdBanner を渡す。
 */
export function renderBodyBlock(
  block: ArticleBodyBlock,
  index: number,
  inlineAdBanner?: InlineAdBannerConfig,
) {
  // リッチテキストブロック
  if (block.fieldId === 'richTextBlock' && block.richText) {
    // インライン広告バナーの挿入: richTextを分割してReactコンポーネントを間に挟む
    if (inlineAdBanner) {
      const split = inlineAdBanner.mode === 'before'
        ? splitBeforeNthH2(block.richText, inlineAdBanner.nthH2)
        : splitAfterFirstH2(block.richText);

      if (split) {
        return (
          <div key={index}>
            {split.before && (
              <div
                className={RICH_TEXT_CLASS}
                dangerouslySetInnerHTML={{ __html: split.before }}
              />
            )}
            <AdBanner300x250 creatives={inlineAdBanner.creatives} />
            {split.after && (
              <div
                className={RICH_TEXT_CLASS}
                dangerouslySetInnerHTML={{ __html: split.after }}
              />
            )}
          </div>
        );
      }
    }

    return (
      <div
        key={index}
        className={RICH_TEXT_CLASS}
        dangerouslySetInnerHTML={{ __html: block.richText }}
      />
    );
  }

  // パーツブロック
  if (block.fieldId === 'partsBlock') {
    const partType = resolveField(block.partType);
    const partCategory = resolveField(block.partCategory);

    if (partType === 'calculator') {
      return <TedoriCalculator key={index} noMargin contentLayout />;
    }

    if (partType === 'comparison') {
      const situations = PART_CATEGORY_SITUATIONS[partCategory] ?? ['it_beginner'];
      return (
        <ComparisonTable
          key={index}
          targetSituations={situations}
          title="転職サイト簡単比較表"
          services={affiliateServices}
        />
      );
    }

    if (partType === 'pointbox') {
      const variant = resolveField(block.pointVariant) || 'highlight';
      return (
        <PointHeaderBox
          key={index}
          title={block.pointTitle || ''}
          bodyVariant={variant as 'highlight' | 'bordered'}
        >
          {block.pointBody && (
            <div
              className={RICH_TEXT_CLASS}
              dangerouslySetInnerHTML={{ __html: block.pointBody }}
            />
          )}
        </PointHeaderBox>
      );
    }

    if (partType?.toLowerCase() === 'sectionbar') {
      return (
        <SectionBar
          key={index}
          title={block.sectionBarTitle || ''}
          noMargin
        />
      );
    }

    if (partType === 'freeconsultationcta') {
      const deeproService = affiliateServices.find((s) => s.id === 'deepro');
      if (!deeproService) return null;
      return (
        <FreeConsultationCTA
          key={index}
          service={deeproService}
          {...freeConsultationCtaConfig}
          contentLayout
        />
      );
    }

    // 未知のpartType（旧 'cta' パーツタイプも含む）
    return (
      <div
        key={index}
        className="bg-[#f5f5f5] border border-[#e6e6e6] rounded p-4 text-center"
      >
        <p className="font-['Noto_Sans_JP'] text-[12px] text-[#64748B]">
          パーツ: {partType || '不明'}
        </p>
      </div>
    );
  }

  return null;
}
