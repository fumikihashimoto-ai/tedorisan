/**
 * サービスフィルタ用のロジック
 * TOPページ・比較表で共通利用
 */

import type { ServiceCategoryType } from './categoryMapping';
import { getTargetSituationsByCategory } from './categoryMapping';

// カテゴリ型・マッピング・ヘルパーは categoryMapping.ts に一元化して再エクスポート
export type { ServiceCategoryType } from './categoryMapping';
export {
  CATEGORY_TO_TARGET_SITUATIONS,
  getTargetSituationsByCategory,
} from './categoryMapping';

/** タブ種別（転職 or スキルアップ） */
export type ServiceTabType = 'transfer' | 'skillup';

/**
 * targetSituationsでフィルタ → EPCで降順ソート → 件数制限
 * ComparisonTable・filterServicesByCategory 等で共通利用
 */
export function filterAndSortServices<T extends { targetSituation: string[]; epc: number }>(
  targetSituations: readonly string[],
  services: T[],
  limit: number
): T[] {
  return services
    .filter((service) =>
      targetSituations.some((target) =>
        service.targetSituation.includes(target)
      )
    )
    .sort((a, b) => b.epc - a.epc)
    .slice(0, limit);
}

/**
 * カテゴリ・タブに応じてサービスをフィルタリングして返す
 * @param category 選択中のカテゴリ
 * @param tab アクティブなタブ
 * @param services 対象サービス一覧
 * @param limit 返却する最大件数（デフォルト: 3）
 */
export function filterServicesByCategory<T extends { targetSituation: string[]; epc: number }>(
  category: ServiceCategoryType,
  tab: ServiceTabType,
  services: T[],
  limit = 3
): T[] {
  if (tab === 'skillup') {
    if (category === 'programming') {
      return filterAndSortServices(['programming'], services, limit);
    }
    if (category === 'video_editing') {
      return filterAndSortServices(['video_editing'], services, limit);
    }
    return filterAndSortServices(['programming', 'video_editing'], services, limit);
  }

  const targetSituations = getTargetSituationsByCategory(category);
  if (targetSituations.length > 0) {
    return filterAndSortServices(targetSituations, services, limit);
  }
  return [...services].sort((a, b) => b.epc - a.epc).slice(0, limit);
}
