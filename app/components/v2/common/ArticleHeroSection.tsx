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
      className={`w-screen relative left-1/2 -translate-x-1/2 ${noMargin ? 'pb-0' : 'pb-6'}`}
    >
      <section
        className={`relative w-full overflow-hidden ${className}`}
        style={{ height: `${height}px` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={priority}
        />
      </section>
    </div>
  );
}
