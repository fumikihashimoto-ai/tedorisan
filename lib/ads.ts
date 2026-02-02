/**
 * 記事内広告の定義
 * スマホUI記事内広告（MobileArticleAd）で使用
 */

export type MobileArticleAdConfig = {
  href: string;
  imgSrc: string;
  pixelSrc: string;
  imgWidth?: number;
  imgHeight?: number;
  copyText?: string;
};

export const MOBILE_ARTICLE_ADS = {
  freshGraduate: {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH',
    imgSrc: 'https://www21.a8.net/svt/bgt?aid=260126641266&wid=001&eno=01&mid=s00000018427002005000&mc=1',
    pixelSrc: 'https://www15.a8.net/0.gif?a8mat=4AVF01+4EDBOY+3Y6M+BXQOH',
    imgWidth: 300,
    imgHeight: 250,
    copyText: '効率的に就活を進めるなら新卒就職エージェントneo！最短1での内定獲得！内定支援実績、約45,000件！',
  },
  pharmacist: {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+67Z9T',
    imgSrc: 'https://www27.a8.net/svt/bgt?aid=260126641284&wid=001&eno=01&mid=s00000010261001045000&mc=1',
    pixelSrc: 'https://www10.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+67Z9T',
    imgWidth: 350,
    imgHeight: 160,
    copyText: '20代・30代の薬剤師の転職＆派遣ならファルマスタッフ 薬剤師に選ばれる転職NO.1＆7冠獲得！',
  },
} as const satisfies Record<string, MobileArticleAdConfig>;

/**
 * PC UI 右カラム広告の定義
 * ArticleSidebarAd で使用
 */
export type ArticleSidebarAdConfig = {
  title: string;
  subtitle?: string;
  bannerHref: string;
  bannerImgSrc: string;
  bannerPixelSrc: string;
  recommendedTitle?: string;
  recommendedItems?: string[];
  ctaHref: string;
  ctaPixelSrc: string;
  ctaLabel: string;
};

export const ARTICLE_SIDEBAR_ADS = {
  pharmacist: {
    title: '薬剤師求人・薬剤師転職ならファルマスタッフ',
    bannerHref: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+65EOH',
    bannerImgSrc: 'https://www28.a8.net/svt/bgt?aid=260126641284&wid=001&eno=01&mid=s00000010261001033000&mc=1',
    bannerPixelSrc: 'https://www15.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+65EOH',
    recommendedTitle: 'ファルマスタッフの良いところ',
    recommendedItems: [
      '初めての転職で使いたい薬剤師転職サイトNO.1',
      '20代、30代に強い薬剤師に薬剤師転職サイトNO.1',
      '薬剤師のハイクラス転職に薬剤師転職サイトNO.1',
      '転職相談満足度「96.5％」',
    ],
    ctaHref: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+5ZU2A',
    ctaPixelSrc: 'https://www16.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+5ZU2A',
    ctaLabel: '薬剤師の転職＆派遣ならファルマスタッフ',
  },
} as const satisfies Record<string, ArticleSidebarAdConfig>;
