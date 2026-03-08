export interface MenuItem {
  label: string;
  href?: string;
  description?: string;
  badge?: 'popular' | 'new' | 'hot';
  items?: MenuItem[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

// ドロワーメニュー用データ（転職する）
export const jobChangeMenu: MenuItem[] = [
  { label: '20代の転職', href: '/articles/career-change/20s' },
  { label: '30代の転職', href: '/articles/career-change/30s' },
  { label: '40代の転職', href: '/articles/career-change/40s' },
  { label: '20代女性の転職', href: '/articles/career-change/20s-women' },
  { label: '30代女性の転職', href: '/articles/career-change/30s-women' },
  { label: '40代女性の転職', href: '/articles/career-change/40s-women' },
  { label: '高卒・高校中退の就職', href: '/articles/career-change/high-school-career' },
  { label: '高卒女性の就職', href: '/articles/career-change/high-school-women' },
  { label: '転職の年収ロードマップ', href: '/articles/career-change/job-change' },
];

// ドロワーメニュー用データ（スキルアップする）
export const skillUpMenu: MenuItem[] = [
  { label: '食いっぱぐれない資格', href: '/articles/skill-up/stable-career' },
  { label: '受験資格なしの国家資格', href: '/articles/skill-up/no-entry-requirement' },
  { label: '実務経験なしの国家資格', href: '/articles/skill-up/no-work-experience' },
  { label: '高収入が期待できる資格', href: '/articles/skill-up/high-income' },
  { label: '40代女性におすすめの資格', href: '/articles/skill-up/40s-women-restart' },
  { label: 'アラフォーエンジニア転職', href: '/articles/skill-up/araforty-engineer' },
];

// ドロワーメニュー用データ（年収を調べる）
export const salaryMenu: MenuItem[] = [
  { label: 'ITエンジニアの年収', href: '/articles/salary-data/it-engineer' },
  { label: '営業職の年収', href: '/articles/salary-data/sales' },
  { label: '薬剤師の年収', href: '/articles/salary-data/pharmacist' },
  { label: '保育士の年収', href: '/articles/salary-data/nursery' },
  { label: '建設業の年収', href: '/articles/salary-data/construction' },
  { label: '不動産営業の年収', href: '/articles/salary-data/real-estate' },
  { label: '臨床検査技師の年収', href: '/articles/salary-data/medical-tech' },
];

// ドロワーメニュー用データ（手取りを計算）
export const calculatorMenu: MenuItem[] = [
  { label: '年代別手取り解説', href: '/articles/salary-basics/tables' },
  { label: '副業の確定申告', href: '/articles/salary-basics/side-business' },
  { label: '新卒の手取り平均', href: '/articles/career-change/fresh-graduate' },
  { label: '20代転職の年収相場', href: '/articles/career-change/career-change-20s' },
];
