import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface CategoryLinkCardProps {
  /** リンク先URL */
  href: string;
  /** カテゴリラベル */
  label: string;
  /** 追加のクラス名 */
  className?: string;
}

export default function CategoryLinkCard({
  href,
  label,
  className = '',
}: CategoryLinkCardProps) {
  return (
    <Link
      href={href}
      className={`bg-white border border-[var(--color-v2-text)] rounded-sm py-1.5 px-3 md:py-1.5 md:px-4 font-extrabold text-[16px] md:text-base lg:text-lg text-[var(--color-v2-text)] hover:bg-gray-50 hover:border-[#1390c8] transition-colors duration-200 relative block h-14 md:h-16 lg:h-16 flex items-center ${className}`}
    >
      {label}

      {/* 右側の丸アイコン */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-[var(--color-v2-accent)] border border-[var(--color-v2-text)] rounded-full flex items-center justify-center">
        <ChevronDown className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 text-white rotate-[-90deg]" />
      </div>
    </Link>
  );
}
