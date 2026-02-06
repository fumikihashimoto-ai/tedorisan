/** TOPページ右カラム：就職エージェントneo 広告ブロック */

import CTAButton from '@/app/components/CTAButton';

const BANNER_AD = {
  href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH',
  imgSrc: 'https://www26.a8.net/svt/bgt?aid=260126641266&wid=001&eno=01&mid=s00000018427002005000&mc=1',
  pixelSrc: 'https://www17.a8.net/0.gif?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH',
} as const;

const CTA_AD = {
  href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4EDBOY+3Y6M+BWVTE',
  pixelSrc: 'https://www14.a8.net/0.gif?a8mat=4AVF01+4EDBOY+3Y6M+BWVTE',
} as const;

const RECOMMENDED_ITEMS = [
  '早く就職を決めたい',
  '効率的に質の高い企業に出会いたい',
  '自己分析や面接対策に自信がない',
  '就活の相談相手がいない',
  '企業とのやりとりが面倒だ',
] as const;

export default function TopPageSidebar() {
  return (
    <aside className="hidden lg:block lg:w-72 xl:w-80 lg:flex-shrink-0 lg:self-start sticky top-5 h-fit">
      <div className="space-y-4">
        <div className="space-y-3">
          {/* キャッチコピー */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500 text-lg">👑</span>
              <p className="text-sm font-bold text-[#1E293B]">大学・大学院・専門・短大向け｜就職エージェントneo</p>
            </div>
            <p className="text-sm font-bold text-red-600 mb-2">内定まで最短1日！内定支援実績約45,000件</p>
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
              <p className="text-xs font-bold text-[#1E293B]">こんな方にお勧めです！</p>
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
            <CTAButton href={CTA_AD.href} pixelSrc={CTA_AD.pixelSrc}>
              最短1日で内定獲得可能！就職エージェントneo
            </CTAButton>
          </div>
        </div>
      </div>
    </aside>
  );
}
