'use client';

import { useMemo } from 'react';

type Ad = {
  href: string;
  imgSrc: string;
  pixelSrc: string;
  dataAffiliateName?: string;
  dataAffiliateNetwork?: string;
  dataAffiliateCategory?: string;
};

/** TOPページと同じサイドバー広告（2件固定） */
const TOP_ADS: Ad[] = [
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4QVFEA+5P1E+5YZ75',
    imgSrc: 'https://www22.a8.net/svt/bgt?aid=260126641287&wid=001&eno=01&mid=s00000026573001003000&mc=1',
    pixelSrc: 'https://www18.a8.net/0.gif?a8mat=4AVF01+4QVFEA+5P1E+5YZ75',
    dataAffiliateName: '明光キャリアパートナーズ_エンジニア転職',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: '転職エージェント（エンジニア）',
  },
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4FK6WI+3Y6M+66H9D',
    imgSrc: 'https://www26.a8.net/svt/bgt?aid=260126641268&wid=001&eno=01&mid=s00000018427001038000&mc=1',
    pixelSrc: 'https://www14.a8.net/0.gif?a8mat=4AVF01+4FK6WI+3Y6M+66H9D',
    dataAffiliateName: 'ネオキャリア_第二新卒エージェントneo',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: '転職エージェント（第二新卒）',
  },
];

const ADS: Ad[] = [
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVDG6+2XZ6GI+4N6C+BZGEP',
    imgSrc: 'https://www20.a8.net/svt/bgt?aid=260124630178&wid=001&eno=01&mid=s00000021666002013000&mc=1',
    pixelSrc: 'https://www15.a8.net/0.gif?a8mat=4AVDG6+2XZ6GI+4N6C+BZGEP',
    // 未確認のため data-属性なし
  },
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVDG5+A36FSI+4N6C+631SX',
    imgSrc: 'https://www23.a8.net/svt/bgt?aid=260124629610&wid=001&eno=01&mid=s00000021666001022000&mc=1',
    pixelSrc: 'https://www14.a8.net/0.gif?a8mat=4AVDG5+A36FSI+4N6C+631SX',
    dataAffiliateName: '新生技術開発研究所_SARAスクール',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: '資格講座',
  },
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVDG5+9RV7AQ+3SPO+CEKE01',
    imgSrc: 'https://www25.a8.net/svt/bgt?aid=260124629591&wid=001&eno=01&mid=s00000017718075006000&mc=1',
    pixelSrc: 'https://www12.a8.net/0.gif?a8mat=4AVDG5+9RV7AQ+3SPO+CEKE01',
    dataAffiliateName: 'Wiz_コールシェア',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: 'その他',
  },
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVDG5+A1ZKKY+4LJQ+5Z6WX',
    imgSrc: 'https://www21.a8.net/svt/bgt?aid=260124629608&wid=001&eno=01&mid=s00000021455001004000&mc=1',
    pixelSrc: 'https://www19.a8.net/0.gif?a8mat=4AVDG5+A1ZKKY+4LJQ+5Z6WX',
    dataAffiliateName: 'ハズム_クリエイターズジャパン',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: 'その他',
  },
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVDG5+5CB16A+1WP2+6D4GH',
    imgSrc: 'https://www21.a8.net/svt/bgt?aid=260124629323&wid=001&eno=01&mid=s00000008903001069000&mc=1',
    pixelSrc: 'https://www15.a8.net/0.gif?a8mat=4AVDG5+5CB16A+1WP2+6D4GH',
    dataAffiliateName: 'DMM.com証券_DMM_FX',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: '証券・投資',
  },
];

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type Props = {
  /** true: TOPページと同じ広告（2件固定）、false: ランダム広告 */
  useTopAds?: boolean;
};

export default function PcAdSidebar({ useTopAds = false }: Props) {
  const ads = useMemo(
    () => (useTopAds ? TOP_ADS : shuffle(ADS)),
    [useTopAds]
  );

  return (
    <aside className="hidden lg:block lg:w-72 xl:w-80 lg:flex-shrink-0 lg:self-start sticky top-5 h-fit">
      <div className={useTopAds ? 'space-y-4' : 'space-y-5'}>
        {ads.map((ad) => (
          <div key={ad.href}>
            <a
              href={ad.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              {...(ad.dataAffiliateName && {
                'data-affiliate-name': ad.dataAffiliateName,
                'data-affiliate-network': ad.dataAffiliateNetwork,
                'data-affiliate-category': ad.dataAffiliateCategory,
              })}
            >
              <img
                width={300}
                height={250}
                alt=""
                src={ad.imgSrc}
                loading="lazy"
                decoding="async"
                style={{ border: 'none' }}
              />
            </a>
            <img
              width={1}
              height={1}
              alt=""
              src={ad.pixelSrc}
              loading="lazy"
              decoding="async"
              style={{ border: 'none' }}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}

