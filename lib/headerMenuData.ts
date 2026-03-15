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
  { label: '食いっぱぐれない仕事ランキング', href: '/articles/career-change/stable-job' },
  { label: '転職ロードマップ｜20代・30代・40代別戦略', href: '/articles/career-change/tensyoku-roadmap' },
  { label: '40代未経験転職を成功させる方法', href: '/articles/career-change/40dai-mikeiken' },
];

// ドロワーメニュー用データ（スキルアップする）
export const skillUpMenu: MenuItem[] = [
  { label: '食いっぱぐれない資格', href: '/articles/skill-up/stable-career' },
  { label: '受験資格なしの国家資格', href: '/articles/skill-up/no-entry-requirement' },
  { label: '実務経験なしの国家資格', href: '/articles/skill-up/no-work-experience' },
  { label: '高収入が期待できる資格', href: '/articles/skill-up/high-income' },
  { label: '40代女性におすすめの資格', href: '/articles/skill-up/40s-women-restart' },
  { label: 'アラフォーエンジニア転職', href: '/articles/skill-up/araforty-engineer' },
  { label: '食いっぱぐれない資格【女性向け】', href: '/articles/skill-up/shokaku-josei' },
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
  { label: '薬剤師で年収1000万円は可能？', href: '/articles/salary-data/yakuzaishi-1000man' },
];

// ドロワーメニュー用データ（手取りを計算）
export const calculatorMenu: MenuItem[] = [
  { label: '年代別手取り解説', href: '/articles/salary-basics/tables' },
  { label: '副業の確定申告', href: '/articles/salary-basics/side-business' },
  { label: '新卒の手取り平均', href: '/articles/career-change/fresh-graduate' },
  { label: '20代転職の年収相場', href: '/articles/career-change/career-change-20s' },
  { label: '年収400万の手取りはいくら？', href: '/articles/salary-basics/400man-takehome' },
  { label: '新卒1年目の手取りはいくら？', href: '/articles/salary-basics/shinsotsu-takehome' },
  { label: '大卒の手取り平均', href: '/articles/salary-basics/daigaku-takehome' },
  { label: '高卒の手取り平均', href: '/articles/salary-basics/highschool-takehome' },
  { label: '副業の確定申告はいくらから？', href: '/articles/salary-basics/fukugyou-kakutei' },
];

// ドロワーメニュー用データ（女性の副業）
export const womenSideJobMenu: MenuItem[] = [
  { label: 'チャットレディとは？', href: '/articles/women-side-job/chatlady-guide' },
  { label: 'チャットレディで稼げる？', href: '/articles/women-side-job/chatlady-earning-tips' },
  { label: 'ノンアダルトのチャットレディ', href: '/articles/women-side-job/chatlady-non-adult' },
  { label: 'チャットレディは危ない？', href: '/articles/women-side-job/chatlady-risk-safety' },
  { label: 'チャットレディの副業', href: '/articles/women-side-job/chatlady-side-job' },
  { label: 'チャットレディの確定申告', href: '/articles/women-side-job/chatlady-kakuteishinkoku' },
  { label: 'チャットレディのコツ', href: '/articles/women-side-job/chatlady-tips' },
  { label: 'マスクでもできる？', href: '/articles/women-side-job/chatlady-mask' },
  { label: '女性におすすめの副業比較', href: '/articles/women-side-job/chatlady-womens-side-job' },
  { label: 'チャットレディアプリ比較', href: '/articles/women-side-job/chatlady-app' },
];
