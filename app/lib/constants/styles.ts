// カラーパレット（Figma Make準拠）
export const COLORS = {
  // プライマリカラー
  primary: '#1390c8', // ブルー - タブアクティブ、おすすめPOINTヘッダー
  primaryLight: '#79ccf1', // ライトブルー - タイトルバー、アクセント

  // アクセントカラー
  accent: '#ff677e', // ピンク - CTAボタン、カテゴリアイコン
  accentLight: '#ff8d9e', // ライトピンク - RECOMMENDバッジ
  accentDark: '#c41e37', // ダークピンク - ボタンシャドウ

  // その他
  star: '#f1cb43', // イエロー - 星評価

  // テキストカラー
  textPrimary: '#3f3f3f', // ダークグレー - メインテキスト
  textSecondary: '#666', // グレー - サブテキスト
  textInactive: '#aaa', // 非アクティブタブ

  // 背景カラー
  bgGray: '#f5f5f5', // 背景グレー
  bgPoint: '#fff9ed', // おすすめPOINT背景
  bgFooter: '#2c5364', // フッター背景

  // ボーダー
  border: '#e0e0e0', // 共通ボーダー
  borderLight: '#e6e6e6', // 比較表・カード枠線
} as const;

/** 画像パス定数（v2 記事・TOP で統一） */
export const IMAGE_PATHS = {
  heroAraforty: '/images/v2/hero_araforty-engineer.png',
  heroItEngineer: '/images/v2/hero_it-engineer.png',
  successIllustration: '/images/v2/success-illustration.png',
  schoolLogo: '/images/v2/school-logo.png',
  pointIcon: '/images/v2/point-icon.png',
  headLogo: '/images/v2/head-logo.png',
  menu: '/images/v2/menu.png',
  heroTop: '/images/v2/hero_top.png',
  /** ランキング画像（n=1,2,3） */
  getRanking: (n: number) => `/images/v2/ranking-${n}.png`,
  /** ユーザーアイコン（n=1,2,3） */
  getUserIcon: (n: number) => `/images/v2/user-icon-${n}.png`,
} as const;

// ブレークポイント
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// レイアウト定数
export const LAYOUT = {
  // コンテナ幅
  containerMaxWidth: {
    mobile: '448px', // max-w-md
    tablet: '672px', // max-w-2xl
    desktop: '896px', // max-w-4xl
    wide: '1152px', // max-w-6xl
  },

  // 余白
  spacing: {
    section: '24px', // セクション間の余白
    card: '16px', // カード内の余白
    element: '8px', // 要素間の余白
  },

  // ボーダー半径
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
} as const;

// フォントウェイト
export const FONT_WEIGHTS = {
  black: 900, // 見出し、CTAボタン
  bold: 700, // 小見出し
  medium: 500, // 本文
  normal: 400, // 通常テキスト
} as const;

// z-index管理
export const Z_INDEX = {
  dropdown: 10,
  header: 20,
  mobileMenu: 50,
  overlay: 40,
  modal: 60,
} as const;
