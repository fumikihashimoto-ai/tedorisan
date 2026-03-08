/**
 * カテゴリから targetSituations へのマッピング一元管理
 * microCMS partCategory / ServiceCategory / 記事カテゴリの3種類のキーに対応
 */

import type { Situation } from './diagnosisLogic';

// ============================================================
// サービスカテゴリ型（TOPページ・比較表で使用）
// ============================================================
export type ServiceCategoryType =
  | 'it_engineer'
  | 'pharmacist'
  | 'second_graduate'
  | 'programming'
  | 'video_editing';

// ============================================================
// 共通の Situation 配列（カテゴリ概念ごとに定義）
// 複数のマッピングで同じ値を共有し、変更時の漏れを防ぐ
// ============================================================
const SITUATIONS_IT: Situation[] = ['it_beginner', 'it_experienced'];
const SITUATIONS_PHARMACIST: Situation[] = ['pharmacist'];
const SITUATIONS_SECOND_GRADUATE: Situation[] = ['second_graduate'];
const SITUATIONS_PROGRAMMING: Situation[] = ['programming'];
const SITUATIONS_VIDEO_EDITING: Situation[] = ['video_editing'];

// ============================================================
// microCMS partCategory → targetSituations
// 記事内の partsBlock (partType='comparison') で使用
// キー: microCMS管理画面のpartCategoryセレクトフィールド値
// ============================================================
export const PART_CATEGORY_SITUATIONS: Record<string, Situation[]> = {
  it: SITUATIONS_IT,
  programming: SITUATIONS_PROGRAMMING,
  pharmacist: SITUATIONS_PHARMACIST,
  'second-graduate': SITUATIONS_SECOND_GRADUATE,
  'video-editing': SITUATIONS_VIDEO_EDITING,
};

// ============================================================
// ServiceCategoryType → targetSituations
// TOPページ・比較表のカテゴリフィルタで使用
// ============================================================
export const CATEGORY_TO_TARGET_SITUATIONS: Record<
  ServiceCategoryType,
  Situation[]
> = {
  it_engineer: SITUATIONS_IT,
  pharmacist: SITUATIONS_PHARMACIST,
  second_graduate: SITUATIONS_SECOND_GRADUATE,
  programming: SITUATIONS_PROGRAMMING,
  video_editing: SITUATIONS_VIDEO_EDITING,
};

// ============================================================
// 記事カテゴリ slug → targetSituations
// 記事ページで ComparisonTable を自動挿入する際に使用
// ============================================================
export const ARTICLE_CATEGORY_SITUATIONS: Record<string, Situation[]> = {
  'career-change': ['it_beginner', 'second_graduate'],
  'skill-up': ['programming', 'video_editing'],
  'salary-data': ['it_beginner', 'it_experienced', 'second_graduate'],
  'salary-basics': ['it_beginner', 'second_graduate'],
};

/**
 * ServiceCategoryType から targetSituations を取得
 */
export function getTargetSituationsByCategory(
  category: ServiceCategoryType
): Situation[] {
  return CATEGORY_TO_TARGET_SITUATIONS[category] ?? [];
}
