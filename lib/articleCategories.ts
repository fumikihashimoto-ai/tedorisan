/** 記事カテゴリのスラッグと日本語名のマッピング */
export const ARTICLE_CATEGORIES = {
  "career-change": "転職",
  "skill-up": "スキルアップ",
  "salary-data": "給与データ",
  "salary-basics": "手取りの基礎知識",
} as const;

export type ArticleCategorySlug = keyof typeof ARTICLE_CATEGORIES;

export function isValidCategory(slug: string): slug is ArticleCategorySlug {
  return slug in ARTICLE_CATEGORIES;
}

export function getCategoryLabel(slug: string): string {
  if (isValidCategory(slug)) {
    return ARTICLE_CATEGORIES[slug];
  }
  return slug;
}

/** カテゴリスラッグの表示用ラベル（タグ・セクション見出し用） */
export const CATEGORY_LABELS: Record<string, string> = {
  'career-change': '転職する',
  'skill-up': 'スキルアップ',
  'salary-data': '年収を調べる',
  'salary-basics': '手取りの基礎知識',
  'tools': 'ツール',
};
