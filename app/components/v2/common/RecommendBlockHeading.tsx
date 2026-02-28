interface RecommendBlockHeadingProps {
  /** サブラベル（例: おすすめ記事、関連記事） */
  subLabel?: string;
  /** 下線の色（デフォルト: #1390c8） */
  lineColor?: string;
  /** 追加のクラス名 */
  className?: string;
  /** 下マージンなし */
  noMargin?: boolean;
}

export default function RecommendBlockHeading({
  subLabel = 'おすすめ記事',
  lineColor = '#1390c8',
  className = '',
  noMargin = false,
}: RecommendBlockHeadingProps) {
  return (
    <div className={`${noMargin ? 'mb-0' : 'mb-4'} ${className}`}>
      <h3 className="font-['Noto_Sans_JP'] font-bold text-[16px] text-[var(--color-v2-text)] inline">
        RECOMMEND
      </h3>
      <span className="font-['Noto_Sans_JP'] font-bold text-[10px] text-[var(--color-v2-text)] ml-2">
        {subLabel}
      </span>
      <div
        className="w-[50px] h-[1px] mt-2"
        style={{ backgroundColor: lineColor }}
      />
    </div>
  );
}
