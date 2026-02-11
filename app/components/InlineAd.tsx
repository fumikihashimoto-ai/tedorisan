type Ad = {
  href: string;
  imgSrc: string;
  pixelSrc: string;
  dataAffiliateName?: string;
  dataAffiliateNetwork?: string;
  dataAffiliateCategory?: string;
};

const INLINE_ADS: Ad[] = [
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH',
    imgSrc: 'https://www22.a8.net/svt/bgt?aid=260126641266&wid=001&eno=01&mid=s00000018427002005000&mc=1',
    pixelSrc: 'https://www11.a8.net/0.gif?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH',
    dataAffiliateName: 'ネオキャリア_新卒就職エージェントneo',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: '転職エージェント（新卒）',
  },
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4TULF6+5B0Y+HVNAP',
    imgSrc: 'https://www24.a8.net/svt/bgt?aid=260126641292&wid=001&eno=01&mid=s00000024757003003000&mc=1',
    pixelSrc: 'https://www19.a8.net/0.gif?a8mat=4AVF01+4TULF6+5B0Y+HVNAP',
    dataAffiliateName: 'MyVision_TechGo',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: 'その他（転職・キャリア）',
  },
];

function InlineAdItem({ ad }: { ad: Ad }) {
  return (
    <div>
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
        <img width={300} height={250} alt="" src={ad.imgSrc} />
      </a>
      <img width={1} height={1} src={ad.pixelSrc} alt="" />
    </div>
  );
}

export default function InlineAd() {
  return (
    <div className="my-8 flex justify-center">
      {/* PC: 2つ横並び */}
      <div className="hidden md:flex gap-4 justify-center">
        {INLINE_ADS.map((ad) => (
          <InlineAdItem key={ad.href} ad={ad} />
        ))}
      </div>

      {/* スマホ: 広告1のみ */}
      <div className="md:hidden">
        <InlineAdItem ad={INLINE_ADS[0]} />
      </div>
    </div>
  );
}
