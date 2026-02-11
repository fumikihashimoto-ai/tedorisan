/**
 * 診断ツール用の型定義とロジック
 * Phase 1: 3問の診断（年齢・状況・優先事項）
 */

// ============================================================
// Q1: 年齢を教えてください
// ============================================================
export type AgeRange = '20s' | '30s' | '40s' | '50s' | '60s_plus';

export const AGE_RANGES: readonly AgeRange[] = [
  '20s',
  '30s',
  '40s',
  '50s',
  '60s_plus',
] as const;

/** 年齢ラベルの表示用マップ */
export const AGE_RANGE_LABELS: Record<AgeRange, string> = {
  '20s': '20代',
  '30s': '30代',
  '40s': '40代',
  '50s': '50代',
  '60s_plus': '60代以上',
};

// ============================================================
// Q2: 現在の状況に最も近いものは？
// ============================================================
export type Situation =
  | 'it_beginner'    // IT業界へ転職したい（未経験）
  | 'it_experienced' // IT業界で年収アップしたい（経験者）
  | 'pharmacist'     // 薬剤師として転職したい
  | 'skill_learning'; // まずはスキルを身につけたい

export const SITUATIONS: readonly Situation[] = [
  'it_beginner',
  'it_experienced',
  'pharmacist',
  'skill_learning',
] as const;

/** 状況の表示用ラベル */
export const SITUATION_LABELS: Record<Situation, string> = {
  it_beginner: 'IT業界へ転職したい（未経験）',
  it_experienced: 'IT業界で年収アップしたい（経験者）',
  pharmacist: '薬剤師として転職したい',
  skill_learning: 'まずはスキルを身につけたい',
};

// ============================================================
// Q3: 最も重視することは？
// ============================================================
export type Priority =
  | 'income'            // 収入アップ
  | 'beginner_friendly' // 未経験でも始めやすい
  | 'stability'         // 安定性
  | 'skill_acquisition' // スキル習得
  | 'flexibility';      // 柔軟な働き方

export const PRIORITIES: readonly Priority[] = [
  'income',
  'beginner_friendly',
  'stability',
  'skill_acquisition',
  'flexibility',
] as const;

/** 優先事項の表示用ラベル */
export const PRIORITY_LABELS: Record<Priority, string> = {
  income: '収入アップ',
  beginner_friendly: '未経験でも始めやすい',
  stability: '安定性',
  skill_acquisition: 'スキル習得',
  flexibility: '柔軟な働き方',
};

// ============================================================
// 診断結果
// ============================================================
export interface DiagnosisResult {
  age: AgeRange;
  situation: Situation;
  priority: Priority;
}

// ============================================================
// バリデーション
// ============================================================

/** value が AgeRange として有効か判定 */
export function isAgeRange(value: unknown): value is AgeRange {
  return typeof value === 'string' && AGE_RANGES.includes(value as AgeRange);
}

/** value が Situation として有効か判定 */
export function isSituation(value: unknown): value is Situation {
  return typeof value === 'string' && SITUATIONS.includes(value as Situation);
}

/** value が Priority として有効か判定 */
export function isPriority(value: unknown): value is Priority {
  return typeof value === 'string' && PRIORITIES.includes(value as Priority);
}

/** 部分的な回答が完全な DiagnosisResult か判定 */
export function isCompleteDiagnosis(
  result: Partial<DiagnosisResult>
): result is DiagnosisResult {
  return (
    result.age != null &&
    result.situation != null &&
    result.priority != null &&
    isAgeRange(result.age) &&
    isSituation(result.situation) &&
    isPriority(result.priority)
  );
}
