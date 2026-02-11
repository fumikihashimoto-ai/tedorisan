/** TOPページ右カラム：就職エージェントneo 広告ブロック */

import CTAButton from '@/app/components/CTAButton';

type Ad = {
  href: string;
  imgSrc?: string;
  pixelSrc: string;
  dataAffiliateName?: string;
  dataAffiliateNetwork?: string;
  dataAffiliateCategory?: string;
};

const BANNER_AD: Ad = {
  href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH',
  imgSrc: 'https://www26.a8.net/svt/bgt?aid=260126641266&wid=001&eno=01&mid=s00000018427002005000&mc=1',
  pixelSrc: 'https://www17.a8.net/0.gif?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH',
  dataAffiliateName: '\u30CD\u30AA\u30AD\u30E3\u30EA\u30A2_\u65B0\u5352\u5C31\u8077\u30A8\u30B8\u30A7\u30F3\u30C8neo',
  dataAffiliateNetwork: 'a8net',
  dataAffiliateCategory: '\u8EE2\u8077\u30A8\u30B8\u30A7\u30F3\u30C8\uff08\u65B0\u5352\uff09',
};

const CTA_AD: Ad = {
  href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4EDBOY+3Y6M+BWVTE',
  pixelSrc: 'https://www14.a8.net/0.gif?a8mat=4AVF01+4EDBOY+3Y6M+BWVTE',
  dataAffiliateName: '\u30CD\u30AA\u30AD\u30E3\u30EA\u30A2_\u65B0\u5352\u5C31\u8077\u30A8\u30B8\u30A7\u30F3\u30C8neo',
  dataAffiliateNetwork: 'a8net',
  dataAffiliateCategory: '\u8EE2\u8077\u30A8\u30B8\u30A7\u30F3\u30C8\uff08\u65B0\u5352\uff09',
};

const RECOMMENDED_ITEMS = [
  '\u65E9\u304F\u5C31\u8077\u3092\u6C7A\u3081\u305F\u3044',
  '\u52B9\u7387\u7684\u306B\u8CEA\u306E\u9AD8\u3044\u4F01\u696D\u306B\u51FA\u4F1A\u3044\u305F\u3044',
  '\u81EA\u5206\u6790\u3084\u9078\u8003\u5BFE\u7B56\u306B\u81EA\u4FE1\u304C\u306A\u3044',
  '\u5C31\u6D3B\u306E\u6B21\u306E\u9078\u629E\u809A\u304C\u306A\u3044',
  '\u4F01\u696D\u3068\u306E\u3084\u308A\u3068\u308A\u304C\u9762\u5012\u3060',
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
            <a
              href={BANNER_AD.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              {...(BANNER_AD.dataAffiliateName && {
                'data-affiliate-name': BANNER_AD.dataAffiliateName,
                'data-affiliate-network': BANNER_AD.dataAffiliateNetwork,
                'data-affiliate-category': BANNER_AD.dataAffiliateCategory,
              })}
            >
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

          {/* CTAボタン（data-属性は CTAButton のオプション引数で渡す） */}
          <div className="mt-4">
            <CTAButton
              href={CTA_AD.href}
              pixelSrc={CTA_AD.pixelSrc}
              dataAffiliateName={CTA_AD.dataAffiliateName}
              dataAffiliateNetwork={CTA_AD.dataAffiliateNetwork}
              dataAffiliateCategory={CTA_AD.dataAffiliateCategory}
            >
              最短1日で内定獲得可能！就職エージェントneo
            </CTAButton>
          </div>
        </div>
      </div>
    </aside>
  );
}
