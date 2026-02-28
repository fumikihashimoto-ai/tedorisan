'use client';

import React from 'react';

interface ArticleCTAButtonProps {
  /** ボタンのテキスト（改行を含む場合はReactNodeで渡す） */
  children: React.ReactNode;
  /** クリック時の処理（任意） */
  onClick?: () => void;
  /** リンク先URL（任意） */
  href?: string;
  /** 追加のクラス名 */
  className?: string;
}

export default function ArticleCTAButton({
  children,
  onClick,
  href,
  className = '',
}: ArticleCTAButtonProps) {
  const baseClasses = `flex-1 bg-[#ff677e] text-white font-['Noto_Sans_JP'] font-bold text-[14px] md:text-base h-[60px] rounded-[2px] shadow-[0px_3px_0px_0px_#c41e37] hover:shadow-[0px_1px_0px_0px_#c41e37] active:shadow-none active:translate-y-[2px] transition-all relative flex items-center justify-center ${className}`;

  const arrowIcon = (
    <div
      className="absolute right-2 top-1/2 -translate-y-1/2 w-[13px] h-[13px] md:w-4 md:h-4"
      aria-hidden
    >
      <svg viewBox="0 0 13 13" fill="none" className="w-full h-full">
        <circle cx="6.5" cy="6.5" r="6.5" fill="white" />
        <path d="M5 4v6l4-3-4-3z" fill="#FF677E" />
      </svg>
    </div>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        <div className="text-center w-full">{children}</div>
        {arrowIcon}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      <div className="text-center w-full">{children}</div>
      {arrowIcon}
    </button>
  );
}
