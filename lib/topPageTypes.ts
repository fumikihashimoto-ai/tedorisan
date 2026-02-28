/**
 * TOPページ v2 用の型定義
 */

export type TabType = 'transfer' | 'skillup';

export interface CategoryButton {
  id: string;
  label: string;
  href: string;
  icon?: string; // 絵文字など
}

export interface RecommendArticle {
  id: string;
  title: string;
  href: string;
  imageUrl: string;
  category: string;
  tags: string[];
}
