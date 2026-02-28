'use client';

import React from 'react';

interface ArticleSectionHeadingProps {
  /** 見出しテキスト */
  children: React.ReactNode;
  /** 下線の色（デフォルト: #1390c8） */
  lineColor?: string;
  /** 追加のクラス名 */
  className?: string;
  /** 下マージンなし */
  noMargin?: boolean;
}

export default function ArticleSectionHeading({
  children,
  lineColor = '#1390c8',
  className = '',
  noMargin = false,
}: ArticleSectionHeadingProps) {
  return (
    <h2
      className={`font-['Noto_Sans_JP'] font-bold text-[16px] text-black ${noMargin ? 'mb-0' : 'mb-4'} relative pb-2 ${className}`}
    >
      {children}
      <div
        className="absolute bottom-0 left-0 w-[75px] h-[3px]"
        style={{ backgroundColor: lineColor }}
      />
    </h2>
  );
}

interface ArticleSubHeadingProps {
  /** 見出しテキスト */
  children: React.ReactNode;
  /** 下線の色（デフォルト: #1390c8） */
  lineColor?: string;
  /** 追加のクラス名 */
  className?: string;
  /** 下マージンなし */
  noMargin?: boolean;
}

export function ArticleSubHeading({
  children,
  lineColor = '#1390c8',
  className = '',
  noMargin = false,
}: ArticleSubHeadingProps) {
  return (
    <h3
      className={`font-['Noto_Sans_JP'] font-bold text-[14px] text-black mt-6 relative pb-1 ${noMargin ? 'mb-0' : 'mb-4'} ${className}`}
    >
      {children}
      <div
        className="absolute bottom-0 left-0 w-[75px] h-[1px]"
        style={{ backgroundColor: lineColor }}
      />
    </h3>
  );
}
