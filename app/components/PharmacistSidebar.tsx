/** 薬剤師ページ右カラム：ファルマスタッフ 広告ブロック */

const BANNER_AD = {
  href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+65EOH',
  imgSrc: 'https://www28.a8.net/svt/bgt?aid=260126641284&wid=001&eno=01&mid=s00000010261001033000&mc=1',
  pixelSrc: 'https://www15.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+65EOH',
} as const;

const CTA_AD = {
  href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+5ZU2A',
  pixelSrc: 'https://www16.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+5ZU2A',
} as const;

const RECOMMENDED_ITEMS = [
  '初めての転職で使いたい薬剤師転職サイトNO.1',
  '20代、30代に強い薬剤師に薬剤師転職サイトNO.1',
  '薬剤師のハイクラス転職に薬剤師転職サイトNO.1',
  '転職相談満足度「96.5％」',
] as const;

const CTA_BUTTON_CLASS =
  'block w-full py-2.5 px-4 text-sm font-bold text-white text-center rounded-lg bg-gradient-to-b from-red-600 to-red-800 border-t border-red-500/50 shadow-md hover:from-red-700 hover:to-red-900 transition-colors';

export default function PharmacistSidebar() {
  return (
    <aside className="hidden lg:block lg:w-72 xl:w-80 lg:flex-shrink-0 lg:self-start sticky top-5 h-fit">
      <div className="space-y-4">
        <div className="space-y-3">
          {/* タイトル */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500 text-lg">👑</span>
              <p className="text-sm font-bold text-[#1E293B]">薬剤師求人・薬剤師転職ならファルマスタッフ</p>
            </div>
            <hr className="border-red-500" />
          </div>

          {/* バナー */}
          <div className="flex justify-center">
            <a href={BANNER_AD.href} target="_blank" rel="nofollow noopener noreferrer">
              <img
                width={300}
                height={250}
                alt=""
                src={BANNER_AD.imgSrc}
                loading="lazy"
                decoding="async"
                className="border-0"
              />
            </a>
            <img width={1} height={1} src={BANNER_AD.pixelSrc} alt="" aria-hidden />
          </div>

          {/* こんな方にお勧めです */}
          <div className="border border-gray-300 overflow-hidden rounded">
            <div className="bg-gray-100 px-3 py-2 border-b border-gray-300">
              <p className="text-xs font-bold text-[#1E293B]">ファルマスタッフの良いところ</p>
            </div>
            <ul className="px-3 py-3 text-xs leading-relaxed text-[#1E293B] space-y-1.5">
              {RECOMMENDED_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="text-red-600 shrink-0">✓</span>
                  <span className="font-bold text-red-600 bg-yellow-200 px-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAボタン */}
          <div className="mt-4">
            <a href={CTA_AD.href} target="_blank" rel="nofollow noopener noreferrer" className={CTA_BUTTON_CLASS}>
              薬剤師の転職＆派遣ならファルマスタッフ
            </a>
            <img width={1} height={1} src={CTA_AD.pixelSrc} alt="" aria-hidden />
          </div>
        </div>
      </div>
    </aside>
  );
}
