import Image from 'next/image';
import { IMAGE_PATHS } from '@/app/lib/constants/styles';

interface PointHeaderBoxProps {
  /** ヘッダータイトル */
  title: string;
  /** コンテンツ */
  children: React.ReactNode;
  /** ボディのスタイルバリエーション */
  bodyVariant?: 'highlight' | 'bordered';
  /** 追加のクラス名 */
  className?: string;
  /** 下マージンなし */
  noMargin?: boolean;
}

export default function PointHeaderBox({
  title,
  children,
  bodyVariant = 'highlight',
  className = '',
  noMargin = false,
}: PointHeaderBoxProps) {
  const bodyClasses =
    bodyVariant === 'highlight'
      ? 'bg-[#fff9ed] p-4 space-y-3'
      : 'bg-white border border-[#1390c8] p-4';

  return (
    <div className={`${noMargin ? 'mb-0' : 'mb-6'} ${className}`}>
      {/* 青ヘッダー＋アイコン */}
      <div className="bg-[#1390c8] text-white text-sm font-medium py-2 px-4 rounded-t-md flex items-center gap-2">
        <Image
          src={IMAGE_PATHS.pointIcon}
          alt=""
          width={9}
          height={18}
          className="flex-shrink-0"
        />
        <span>{title}</span>
      </div>

      {/* ボディ */}
      <div className={bodyClasses}>{children}</div>
    </div>
  );
}
