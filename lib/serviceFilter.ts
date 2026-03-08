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
  const targetSituations = getTargetSituationsByCategory(category);

  let filtered: T[];

  if (tab === 'skillup') {
    if (category === 'programming') {
      filtered = services.filter((s) => s.targetSituation.includes('programming'));
    } else if (category === 'video_editing') {
      filtered = services.filter((s) => s.targetSituation.includes('video_editing'));
    } else {
      filtered = services.filter(
        (s) =>
          s.targetSituation.includes('programming') ||
          s.targetSituation.includes('video_editing')
      );
    }
  } else {
    if (targetSituations.length > 0) {
      filtered = services.filter((s) =>
        targetSituations.some((t) => s.targetSituation.includes(t))
      );
    } else {
      filtered = [...services];
    }
  }

  return filtered.sort((a, b) => b.epc - a.epc).slice(0, limit);
}
