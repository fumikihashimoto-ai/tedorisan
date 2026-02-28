import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  /** コンテンツの最大幅（デフォルト: mobile） */
  maxWidth?: 'mobile' | 'tablet' | 'desktop' | 'wide' | 'content';
  className?: string;
}

/**
 * 記事・ページのコンテンツ領域をラップするレイアウト。
 * ルート layout（app/layout.tsx）が Header/Footer を常に表示するため、
 * 本コンポーネントは最大幅と余白のみを担当する。
 */
export default function PageLayout({
  children,
  maxWidth = 'mobile',
  className = '',
}: PageLayoutProps) {
  const maxWidthClasses = {
    mobile: 'max-w-md', // 448px
    tablet: 'max-w-2xl', // 672px
    desktop: 'max-w-4xl', // 896px
    wide: 'max-w-6xl', // 1152px
    content: 'max-w-[750px] px-4', // TOPページ仕様: 750px統一
  };

  const paddingClass = maxWidth === 'content' ? '' : 'px-[10px]';

  return (
    <div
      className={`${maxWidthClasses[maxWidth]} mx-auto ${paddingClass} ${className}`}
    >
      {children}
    </div>
  );
}
