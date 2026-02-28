'use client';

interface SectionBarProps {
  /** タイトルテキスト */
  title: string;
  /** 追加のクラス名 */
  className?: string;
  /** バリエーション */
  variant?: 'default' | 'withPadding';
  /** 下マージンなし */
  noMargin?: boolean;
}

export default function SectionBar({
  title,
  className = '',
  variant = 'default',
  noMargin = false,
}: SectionBarProps) {
  const marginClass = noMargin
    ? ''
    : variant === 'withPadding'
      ? 'mb-6 pb-[10px] md:pb-3'
      : 'mb-4';

  return (
    <div
      className={`bg-[#79ccf1] text-white text-center py-1.5 md:py-2 rounded-sm relative ${marginClass} ${className}`}
    >
      <p className="font-extrabold text-sm md:text-base lg:text-lg">{title}</p>
    </div>
  );
}
