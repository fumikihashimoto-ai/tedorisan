export type NavMenuItem = {
  label: string;
  href: string;
  footerLabel?: string;
};

export type NavItem =
  | {
      type: 'link';
      label: string;
      href: string;
      mobileLabel?: string;
      footerLabel?: string;
    }
  | {
      type: 'dropdown';
      id: 'industry' | 'career';
      label: string;
      items: NavMenuItem[];
      activePrefix: string;
      mobileLabel?: string;
    };

export const INDUSTRY_MENU_ITEMS: NavMenuItem[] = [
  { label: 'ITエンジニア', href: '/industry/it-engineer', footerLabel: 'ITエンジニアの年収・手取り' },
  { label: '保育士', href: '/industry/nursery', footerLabel: '保育士の年収・手取り' },
  { label: '営業職', href: '/industry/sales', footerLabel: '営業職の年収・手取り' },
  { label: '薬剤師', href: '/industry/pharmacist', footerLabel: '薬剤師の年収・手取り' },
  { label: '医療技術職', href: '/industry/medical-tech', footerLabel: '医療技術職の年収・手取り' },
  { label: '不動産業界', href: '/industry/real-estate', footerLabel: '不動産業界の年収・手取り' },
  { label: '建設業界', href: '/industry/construction', footerLabel: '建設業界の年収・手取り' },
];

export const CAREER_MENU_ITEMS: NavMenuItem[] = [
  { label: '未経験転職の年収目安', href: '/career/inexperienced' },
  { label: '20代転職の年収相場', href: '/career/career-change-20s' },
  { label: '年収1000万超えの手取り', href: '/career/high-income' },
];

// PC/モバイルの表示順はこの配列に統一
export const NAV_ITEMS: NavItem[] = [
  { type: 'link', label: 'TOP', href: '/', mobileLabel: '手取り計算（TOP）' },
  { type: 'link', label: '新卒', href: '/fresh-graduate', mobileLabel: '新卒・就活生向け 手取り計算' },
  { type: 'link', label: '転職', href: '/job-change', mobileLabel: '転職検討者向け 手取り計算' },
  { type: 'link', label: '副業', href: '/side-business', mobileLabel: '副業検討者向け 手取り計算' },
  {
    type: 'dropdown',
    id: 'industry',
    label: '業種別',
    items: INDUSTRY_MENU_ITEMS,
    activePrefix: '/industry',
  },
  {
    type: 'dropdown',
    id: 'career',
    label: 'キャリアステージ別',
    items: CAREER_MENU_ITEMS,
    activePrefix: '/career',
  },
  {
    type: 'link',
    label: '年代別年収一覧',
    href: '/comparison/list',
    mobileLabel: '年代・年収別 手取り一覧表',
  },
  { type: 'link', label: 'FAQ', href: '/faq', mobileLabel: 'よくあるご質問', footerLabel: 'よくある質問（FAQ）' },
];

export const FOOTER_SECTIONS = [
  {
    title: '主要ツール',
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/fresh-graduate', label: '新卒・就活生向け計算' },
      { href: '/job-change', label: '転職者向け計算' },
      { href: '/side-business', label: '副業者向け計算' },
      { href: '/comparison/list', label: '年代・年収別 手取り一覧表' },
    ],
  },
  {
    title: '業種別',
    links: INDUSTRY_MENU_ITEMS.map((i) => ({
      href: i.href,
      label: i.footerLabel ?? i.label,
    })),
  },
  {
    title: 'キャリアステージ別',
    links: [
      ...CAREER_MENU_ITEMS.map((i) => ({ href: i.href, label: i.footerLabel ?? i.label })),
      { href: '/faq', label: 'よくある質問（FAQ）' },
    ],
  },
] as const;

