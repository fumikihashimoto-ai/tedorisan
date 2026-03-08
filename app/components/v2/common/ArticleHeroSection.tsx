import Image from 'next/image';

interface ArticleHeroSectionProps {
  /** 画像パス */
  src: string;
  /** 画像のalt属性 */
  alt: string;
  /** 画像の優先読み込み（デフォルト: true） */
  priority?: boolean;
  /** 高さ（デフォルト: 256px = h-64） */
  height?: number;
  /** 追加のクラス名 */
  className?: string;
  /** 下余白なし */
  noMargin?: boolean;
}

export default function ArticleHeroSection({
  src,
  alt,
  priority = true,
  height = 256,
  className = '',
  noMargin = false,
}: ArticleHeroSectionProps) {
  return (
    <div
      className={`w-full mx-[-16px] w-[calc(100%+32px)] ${noMargin ? 'pb-0' : 'pb-6'}`}
    >
      <section
        className={`relative w-full overflow-hidden rounded-[2px] ${className}`}
        style={{ height: `${height}px` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority={priority}
        />
      </section>
    </div>
  );
}
