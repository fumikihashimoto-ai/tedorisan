import type { ReactNode } from 'react';

interface ArticleParagraphProps {
  children: ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

const BASE_CLASSES =
  "font-['Noto_Sans_JP'] font-normal text-[14px] text-black leading-[25px]";

/**
 * 記事本文のパラグラフ用共通スタイル
 */
export default function ArticleParagraph({
  children,
  className = '',
}: ArticleParagraphProps) {
  return (
    <p className={`${BASE_CLASSES} ${className}`.trim()}>{children}</p>
  );
}
