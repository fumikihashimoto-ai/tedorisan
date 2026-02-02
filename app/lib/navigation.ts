export type NavMenuItem = {
  label: string;
  href: string;
  footerLabel?: string;
  /** マガジンメニュー用：グループ見出し（職種別年収 / 未経験者の就職・転職） */
  group?: string;
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
      id: 'tools' | 'job-salary' | 'inexperienced' | 'qualifications';
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
  { label: 'ITエンジニア', href: '/magazine/job-salary/it-engineer', footerLabel: 'ITエンジニアの年収・手取り', group: '職種別年収' },
  { label: '保育士', href: '/magazine/job-salary/nursery', footerLabel: '保育士の年収・手取り', group: '職種別年収' },
  { label: '営業職', href: '/magazine/job-salary/sales', footerLabel: '営業職の年収・手取り', group: '職種別年収' },
  { label: '薬剤師', href: '/magazine/job-salary/pharmacist', footerLabel: '薬剤師の年収・手取り', group: '職種別年収' },
  { label: '臨床検査技師', href: '/magazine/job-salary/medical-tech', footerLabel: '臨床検査技師の年収・手取り', group: '職種別年収' },
  { label: '不動産業界', href: '/magazine/job-salary/real-estate', footerLabel: '不動産業界の年収・手取り', group: '職種別年収' },
  { label: '建設業界', href: '/magazine/job-salary/construction', footerLabel: '建設業界の年収・手取り', group: '職種別年収' },
];

export const CAREER_MENU_ITEMS: NavMenuItem[] = [
  { label: '20代未経験者の転職', href: '/magazine/inexperienced/20s', group: '未経験者の就職・転職' },
  { label: '20代女性未経験者の転職', href: '/magazine/inexperienced/20s-women', group: '未経験者の就職・転職' },
  { label: '30代未経験者の転職', href: '/magazine/inexperienced/30s', group: '未経験者の就職・転職' },
  { label: '30代女性未経験者の転職', href: '/magazine/inexperienced/30s-women', group: '未経験者の就職・転職' },
  { label: '40代未経験者の転職', href: '/magazine/inexperienced/40s', group: '未経験者の就職・転職' },
  { label: '40代女性未経験者の転職', href: '/magazine/inexperienced/40s-women', group: '未経験者の就職・転職' },
];

/** 未経験者の就職・転職メニュー */
export const INEXPERIENCED_MENU_ITEMS: NavMenuItem[] = [
  ...CAREER_MENU_ITEMS,
  { label: '高卒・高校中退の就職', href: '/magazine/high-school', group: '未経験者の就職・転職' },
  { label: '高卒女性の就職', href: '/magazine/inexperienced/high-school-women', group: '未経験者の就職・転職' },
];

// フッター用（職種別年収 + 未経験者の就職・転職）
export const MAGAZINE_MENU_ITEMS: NavMenuItem[] = [
  ...DATA_MENU_ITEMS,
  ...INEXPERIENCED_MENU_ITEMS,
];

export const QUALIFICATION_MENU_ITEMS: NavMenuItem[] = [
  { label: '資格一覧', href: '/qualifications' },
  { label: 'アラフォー未経験からのエンジニア転職', href: '/qualifications/araforty-engineer' },
  { label: '40代女性が人生をやり直すためにおすすめな資格', href: '/qualifications/40s-women-restart' },
  { label: '食いっぱぐれない資格', href: '/qualifications/stable-career' },
  { label: '高収入が期待できる資格', href: '/qualifications/high-income' },
  { label: '受験資格なしで取れる国家資格', href: '/qualifications/no-entry-requirement' },
  { label: '実務経験なしで取れる国家資格', href: '/qualifications/no-work-experience' },
];

// PC/モバイルの表示順はこの配列に統一
export const NAV_ITEMS: NavItem[] = [
  {
    type: 'dropdown',
    id: 'tools',
    label: '新卒・転職・副業の手取り',
    items: TOOLS_MENU_ITEMS,
    activePrefix: '/tools',
    mobileLabel: '新卒・転職・副業の手取り',
  },
  {
    type: 'dropdown',
    id: 'job-salary',
    label: '職種別年収',
    items: DATA_MENU_ITEMS,
    activePrefix: '/magazine/job-salary',
    mobileLabel: '職種別年収',
  },
  {
    type: 'dropdown',
    id: 'inexperienced',
    label: '未経験者の就職・転職',
    items: INEXPERIENCED_MENU_ITEMS,
    activePrefix: '/magazine',
    mobileLabel: '未経験者の就職・転職',
  },
  {
    type: 'dropdown',
    id: 'qualifications',
    label: '資格',
    items: QUALIFICATION_MENU_ITEMS,
    activePrefix: '/qualifications',
    mobileLabel: '資格',
  },
  {
    type: 'link',
    label: '手取り一覧表',
    href: '/tables/',
    mobileLabel: '手取り一覧表',
  },
];

export type FooterLink = { href: string; label: string; group?: string };

/** フッターセクション（ヘッダーと同じ構成） */
export const FOOTER_SECTIONS: { title: string; links: FooterLink[] }[] = [
  {
    title: '新卒・転職・副業の手取り',
    links: TOOLS_MENU_ITEMS.map((i) => ({
      href: i.href,
      label: i.footerLabel ?? i.label,
    })),
  },
  {
    title: '職種別年収',
    links: DATA_MENU_ITEMS.map((i) => ({
      href: i.href,
      label: i.footerLabel ?? i.label,
    })),
  },
  {
    title: '未経験者の就職・転職',
    links: INEXPERIENCED_MENU_ITEMS.map((i) => ({
      href: i.href,
      label: i.footerLabel ?? i.label,
    })),
  },
  {
    title: '資格',
    links: QUALIFICATION_MENU_ITEMS.map((i) => ({
      href: i.href,
      label: i.footerLabel ?? i.label,
    })),
  },
  {
    title: 'その他',
    links: [
      { href: '/tables/', label: '手取り一覧表' },
      { href: '/faq', label: 'よくある質問（FAQ）' },
    ],
  },
];

