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
  /** スマホ記事内CTAボタン（テキスト下部に表示、任意） */
  ctaHref?: string;
  ctaPixelSrc?: string;
  ctaLabel?: string;
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
  sideBusiness: {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4VMW8I+4JGQ+BY641',
    imgSrc: 'https://www22.a8.net/svt/bgt?aid=260126641295&wid=001&eno=01&mid=s00000021185002007000&mc=1',
    pixelSrc: 'https://www16.a8.net/0.gif?a8mat=4AVF01+4VMW8I+4JGQ+BY641',
    imgWidth: 300,
    imgHeight: 250,
    copyText: '自動入力で経理がラクに。自動連携数も国内No1！',
  },
  pharmacist: {
    href: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+67Z9T',
    imgSrc: 'https://www27.a8.net/svt/bgt?aid=260126641284&wid=001&eno=01&mid=s00000010261001045000&mc=1',
    pixelSrc: 'https://www10.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+67Z9T',
    imgWidth: 350,
    imgHeight: 160,
    copyText: '20代・30代の薬剤師の転職＆派遣ならファルマスタッフ 薬剤師に選ばれる転職NO.1＆7冠獲得！',
    ctaHref: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+5ZEMQ',
    ctaPixelSrc: 'https://www19.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+5ZEMQ',
    ctaLabel: '最短1分！簡単無料登録はこちら',
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
  sideBusiness: {
    title: 'マネーフォワード クラウド｜初めての方でも確定申告がラクラク完了！',
    bannerHref: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4VMW8I+4JGQ+C2GFL',
    bannerImgSrc: 'https://www29.a8.net/svt/bgt?aid=260126641295&wid=001&eno=01&mid=s00000021185002027000&mc=1',
    bannerPixelSrc: 'https://www10.a8.net/0.gif?a8mat=4AVF01+4VMW8I+4JGQ+C2GFL',
    recommendedTitle: 'マネーフォワード クラウドの良いところ',
    recommendedItems: [
      'クラウド会計ソフトシェア第2位！',
      '自動入力で経理がラクに。自動連携数も国内No1！',
      '人工知能・機械学習（AI）で、使うほど学習、賢く便利に！',
      '確定申告のサポートも充実！',
    ],
    ctaHref: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4VMW8I+4JGQ+BWVTE',
    ctaPixelSrc: 'https://www14.a8.net/0.gif?a8mat=4AVF01+4VMW8I+4JGQ+BWVTE',
    ctaLabel: '無料の確定申告自動化ソフト マネーフォワード クラウド確定申告',
  },
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
