'use client';

interface ArticleListItem {
  /** ラベル（太字で表示、省略可） */
  label?: string;
  /** 内容 */
  content: string;
}

interface ArticleListProps {
  /** リスト項目の配列 */
  items: ArticleListItem[];
  /** リストスタイル（デフォルト: disc） */
  listStyle?: 'disc' | 'decimal' | 'none';
  /** 追加のクラス名 */
  className?: string;
  /** 余白なし（デフォルト: false） */
  noMargin?: boolean;
}

export default function ArticleList({
  items,
  listStyle = 'disc',
  className = '',
  noMargin = false,
}: ArticleListProps) {
  const listStyleClasses = {
    disc: 'list-disc',
    decimal: 'list-decimal',
    none: 'list-none',
  };

  const ListTag = listStyle === 'decimal' ? 'ol' : 'ul';
  const listStyleClass = listStyleClasses[listStyle];

  return (
    <ListTag
      className={`${listStyleClass} list-inside space-y-2 ml-4 ${noMargin ? 'mb-0' : 'mb-6'} ${className}`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className="font-['Noto_Sans_JP'] font-normal text-[14px] text-black leading-[25px]"
        >
          {item.label && <strong>{item.label}：</strong>}
          {item.content}
        </li>
      ))}
    </ListTag>
  );
}
