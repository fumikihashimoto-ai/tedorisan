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
    dataAffiliateName: '\u30CD\u30AA\u30AD\u30E3\u30EA\u30A2_\u65B0\u5352\u5C31\u8077\u30A8\u30B8\u30A7\u30F3\u30C8neo',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: '\u8EE2\u8077\u30A8\u30B8\u30A7\u30F3\u30C8\uff08\u65B0\u5352\uff09',
  },
  {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4TULF6+5B0Y+HVNAP',
    imgSrc: 'https://www24.a8.net/svt/bgt?aid=260126641292&wid=001&eno=01&mid=s00000024757003003000&mc=1',
    pixelSrc: 'https://www19.a8.net/0.gif?a8mat=4AVF01+4TULF6+5B0Y+HVNAP',
    dataAffiliateName: 'MyVision_TechGo',
    dataAffiliateNetwork: 'a8net',
    dataAffiliateCategory: '\u305D\u306E\u4ED6\uff08\u8EE2\u8077\u30FB\u30AD\u30E3\u30EA\u30A2\uff09',
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
