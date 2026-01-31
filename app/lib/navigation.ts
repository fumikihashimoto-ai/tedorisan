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
      id: 'tools' | 'data' | 'career';
      label: string;
      items: NavMenuItem[];
      activePrefix: string;
      mobileLabel?: string;
    };

export const TOOLS_MENU_ITEMS: NavMenuItem[] = [
  { label: '手取り計算（TOP）', href: '/' },
  { label: '新卒向け手取り計算', href: '/tools/fresh-graduate' },
  { label: '転職向け手取り計算', href: '/tools/job-change' },
  { label: '副業向け手取り計算', href: '/tools/side-business' },
];

export const DATA_MENU_ITEMS: NavMenuItem[] = [
  { label: 'ITエンジニア', href: '/data/industry/it-engineer', footerLabel: 'ITエンジニアの年収・手取り' },
  { label: '保育士', href: '/data/industry/nursery', footerLabel: '保育士の年収・手取り' },
  { label: '営業職', href: '/data/industry/sales', footerLabel: '営業職の年収・手取り' },
  { label: '薬剤師', href: '/data/industry/pharmacist', footerLabel: '薬剤師の年収・手取り' },
  { label: '臨床検査技師', href: '/data/industry/medical-tech', footerLabel: '臨床検査技師の年収・手取り' },
  { label: '不動産業界', href: '/data/industry/real-estate', footerLabel: '不動産業界の年収・手取り' },
  { label: '建設業界', href: '/data/industry/construction', footerLabel: '建設業界の年収・手取り' },
];

export const CAREER_MENU_ITEMS: NavMenuItem[] = [
  { label: '20代未経験者の転職', href: '/career/inexperienced' },
  { label: '20代女性未経験者の転職', href: '/career/inexperienced-women' },
];

// PC/モバイルの表示順はこの配列に統一
export const NAV_ITEMS: NavItem[] = [
  {
    type: 'dropdown',
    id: 'tools',
    label: '計算ツール',
    items: TOOLS_MENU_ITEMS,
    activePrefix: '/tools',
    mobileLabel: '計算ツール',
  },
  {
    type: 'dropdown',
    id: 'data',
    label: '職種・年齢別 年収',
    items: DATA_MENU_ITEMS,
    activePrefix: '/data/industry',
    mobileLabel: '職種・年齢別 年収',
  },
  {
    type: 'dropdown',
    id: 'career',
    label: '未経験者の転職',
    items: CAREER_MENU_ITEMS,
    activePrefix: '/career',
    mobileLabel: '未経験者の転職',
  },
  {
    type: 'link',
    label: '早見表',
    href: '/tables/',
    mobileLabel: '早見表',
  },
  { type: 'link', label: 'FAQ', href: '/faq', mobileLabel: 'よくあるご質問', footerLabel: 'よくある質問（FAQ）' },
];

export const FOOTER_SECTIONS = [
  {
    title: '計算ツール',
    links: TOOLS_MENU_ITEMS.map((i) => ({
      href: i.href,
      label: i.footerLabel ?? i.label,
    })),
  },
  {
    title: '職種・年齢別 年収',
    links: DATA_MENU_ITEMS.map((i) => ({
      href: i.href,
      label: i.footerLabel ?? i.label,
    })),
  },
  {
    title: 'キャリア・その他',
    links: [
      ...CAREER_MENU_ITEMS.map((i) => ({ href: i.href, label: i.footerLabel ?? i.label })),
      { href: '/tables/', label: '早見表' },
      { href: '/faq', label: 'よくある質問（FAQ）' },
    ],
  },
] as const;

