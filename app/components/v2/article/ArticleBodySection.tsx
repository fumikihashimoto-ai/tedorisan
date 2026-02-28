import React from 'react';

interface ArticleBodySectionProps {
  /** セクションの内容 */
  children: React.ReactNode;
  /** 要素ID（アンカーリンク用） */
  id?: string;
  /** 追加のクラス名 */
  className?: string;
  /** 子要素間の余白（4=16px, 6=24px, 8=32px） */
  spacing?: 4 | 6 | 8;
  /** 下マージンなし */
  noMargin?: boolean;
  /** コンテンツ幅750pxレイアウト（TOP仕様） */
  contentLayout?: boolean;
}

export default function ArticleBodySection({
  children,
  id,
  className = '',
  spacing = 6,
  noMargin = false,
  contentLayout = false,
}: ArticleBodySectionProps) {
  const fullBleedClass = contentLayout ? '-mx-4 px-4' : '-mx-[10px] px-[10px]';
  const spacingClass =
    spacing === 4 ? 'space-y-4' : spacing === 8 ? 'space-y-8' : 'space-y-6';

  return (
    <div
      id={id}
      className={`mb-0 ${spacingClass} bg-white ${fullBleedClass} pt-5 pb-4 ${className}`}
    >
      {children}
    </div>
  );
}
