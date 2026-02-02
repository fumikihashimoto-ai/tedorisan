/**
 * スマホUI記事内広告
 * 記事コンテンツ内に配置するスマホ専用の広告ブロック
 */

type Props = {
  href: string;
  imgSrc: string;
  pixelSrc: string;
  imgWidth?: number;
  imgHeight?: number;
  copyText?: string;
};

export default function MobileArticleAd({
  href,
  imgSrc,
  pixelSrc,
  imgWidth = 350,
  imgHeight = 160,
  copyText,
}: Props) {
  return (
    <div className="md:hidden my-5 py-4 border-t border-b border-gray-200">
      <div className="flex justify-center">
        <a href={href} target="_blank" rel="nofollow noopener noreferrer">
          <img
            width={imgWidth}
            height={imgHeight}
            alt=""
            src={imgSrc}
            className="border-0"
          />
        </a>
      </div>
      <img width={1} height={1} src={pixelSrc} alt="" className="border-0" />
      {copyText && (
        <p className="mt-1 text-xs text-[#1E293B] leading-relaxed text-left">
          {copyText}
        </p>
      )}
    </div>
  );
}
