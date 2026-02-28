import type { CategoryButton } from '@/lib/topPageTypes';
import CategoryLinkCard from './CategoryLinkCard';

interface CategoryLinkGridProps {
  /** カテゴリ一覧 */
  categories: CategoryButton[];
  /** 追加のクラス名 */
  className?: string;
}

/**
 * カテゴリリンクを2列グリッドで表示する共通コンポーネント
 * TOPページの「目的選択」「年代・業種から探す」で利用
 */
export default function CategoryLinkGrid({
  categories,
  className = '',
}: CategoryLinkGridProps) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 ${className}`.trim()}
    >
      {categories.map((category) => (
        <CategoryLinkCard
          key={category.id}
          href={category.href}
          label={category.label}
        />
      ))}
    </div>
  );
}
