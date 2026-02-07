// SchoolRankingCTA.tsx
// 手取りのミカタ用 - スクールランキングCTAコンポーネント
// PC・モバイル共に横並び表示

// ============================================================
// 型定義
// ============================================================
interface School {
  name: string;
  rating: number;
  // アフィリエイトバナーHTML（A8.net / AccessTrade等のタグをそのまま格納）
  bannerHtml: string;
  // トラッキングピクセルHTML（A8.netの1x1 gif等）
  trackingHtml?: string;
  // アフィリエイトリンクURL（名前クリック用）
  url: string;
  // rel属性追加分（referrerpolicy等）
  linkAttrs?: string;
}

// ============================================================
// スクールデータ
// ============================================================
const SCHOOLS: School[] = [
  {
    name: "プログラミングスクールSkillHacks",
    rating: 4.8,
    url: "https://px.a8.net/svt/ejp?a8mat=4AX40I+CGBFAQ+4K3S+60OXD",
    bannerHtml: `<img border="0" width="120" height="60" alt="" src="https://www25.a8.net/svt/bgt?aid=260205714753&wid=001&eno=01&mid=s00000021268001011000&mc=1" style="max-width:100%;max-height:100%;object-fit:contain;">`,
    trackingHtml: `<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4AX40I+CGBFAQ+4K3S+60OXD" alt="">`,
  },
  {
    name: "ディープロ",
    rating: 4.5,
    url: "https://h.accesstrade.net/sp/cc?rk=0100kno000onsa",
    bannerHtml: `<img src="https://h.accesstrade.net/sp/rr?rk=0100kno000onsa" alt="ディープロ" border="0" style="max-width:100%;max-height:100%;object-fit:contain;" />`,
    linkAttrs: 'referrerpolicy="no-referrer-when-downgrade"',
  },
  // TODO: 残り3校のアフィリエイトバナーを追加
];

// ============================================================
// 星レーティング
// ============================================================
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  const starPath =
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

  return (
    <div className="flex items-center gap-0.5 mt-0.5 flex-shrink-0">
      <div className="flex">
        {Array.from({ length: full }).map((_, i) => (
          <svg key={`f${i}`} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d={starPath} />
          </svg>
        ))}
        {hasHalf && (
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${rating}`}>
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${rating})`} d={starPath} />
          </svg>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <svg key={`e${i}`} className="w-3.5 h-3.5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d={starPath} />
          </svg>
        ))}
      </div>
      <span className="text-[11px] font-bold text-gray-700 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

// ============================================================
// メインコンポーネント
// ============================================================
export default function SchoolRankingCTA({
  title = "＼人気のプログラミングスクール／",
}: {
  title?: string;
}) {
  return (
    <section className="w-full bg-slate-100 py-5 px-3 md:px-4">
      <h2 className="text-center text-[11px] font-bold text-slate-800 mb-4">
        {title}
      </h2>

      {/* 常に横並び（flexbox + overflow-x-auto） */}
      <div className="flex gap-4 overflow-x-auto pb-1 justify-center snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {SCHOOLS.map((school, i) => (
          <div key={i} className="flex-shrink-0 snap-center w-[160px] flex flex-col items-center">
            {/* バナー画像（アフィリエイトHTMLを直接レンダリング） */}
            <a
              href={school.url}
              rel="nofollow noopener noreferrer"
              target="_blank"
              {...(school.linkAttrs ? { referrerPolicy: "no-referrer-when-downgrade" as const } : {})}
              className="w-full overflow-hidden flex items-center justify-center mt-[10px] mb-[10px]"
            >
              <span dangerouslySetInnerHTML={{ __html: school.bannerHtml }} />
            </a>

            {/* トラッキングピクセル */}
            {school.trackingHtml && (
              <span dangerouslySetInnerHTML={{ __html: school.trackingHtml }} />
            )}

            {/* スクール名 */}
            <a
              href={school.url}
              rel="nofollow noopener noreferrer"
              target="_blank"
              {...(school.linkAttrs ? { referrerPolicy: "no-referrer-when-downgrade" as const } : {})}
              className="text-[11px] md:text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {school.name}
            </a>

            {/* 星レーティング */}
            <StarRating rating={school.rating} />
          </div>
        ))}
      </div>
    </section>
  );
}
