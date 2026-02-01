'use client';

import { useEffect, useState } from 'react';

type Ad = {
  href: string;
  imgSrc: string;
  pixelSrc: string;
};

const ADS: Ad[] = [
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVDG6+2XZ6GI+4N6C+BXIYP',
    imgSrc: 'https://www25.a8.net/svt/bgt?aid=260124630178&wid=001&eno=01&mid=s00000021666002004000&mc=1',
    pixelSrc: 'https://www19.a8.net/0.gif?a8mat=4AVDG6+2XZ6GI+4N6C+BXIYP',
  },
];

export default function HeaderAd() {
  const [ad, setAd] = useState<Ad | null>(null);

  // クライアントマウント後に1件ランダムで確定（SSR/ハイドレーション差分を避ける）
  useEffect(() => {
    const idx = Math.floor(Math.random() * ADS.length);
    setAd(ADS[idx]);
  }, []);

  if (!ad) return null;

  return (
    <>
      <a href={ad.href} target="_blank" rel="nofollow noopener noreferrer">
        <img
          width={728}
          height={90}
          alt=""
          src={ad.imgSrc}
          loading="lazy"
          decoding="async"
          style={{ maxWidth: '100%', height: 'auto', border: 'none' }}
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
    </>
  );
}

