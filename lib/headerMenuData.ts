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

// メガメニュー用データ（転職する）
export const jobChangeMenu: {
  columns: MenuSection[];
  cta: {
    title: string;
    href: string;
    description: string;
  };
} = {
  columns: [
    // 第1列：年代別
    {
      title: '年代別',
      items: [
        {
          label: '40代の転職',
          items: [
            {
              label: 'アラフォーエンジニア転職',
              href: '/qualifications/araforty-engineer',
              description: '未経験からのキャリアチェンジ',
            },
            {
              label: '40代未経験の転職',
              href: '/magazine/inexperienced/40s',
            },
            {
              label: '40代女性の転職',
              href: '/magazine/inexperienced/40s-women',
            },
          ],
        },
        {
          label: '30代の転職',
          items: [
            {
              label: '30代未経験の転職',
              href: '/magazine/inexperienced/30s',
            },
            {
              label: '30代女性の転職',
              href: '/magazine/inexperienced/30s-women',
            },
          ],
        },
        {
          label: '20代の転職',
          items: [
            {
              label: '20代未経験の転職',
              href: '/magazine/inexperienced/20s',
            },
            {
              label: '20代女性の転職',
              href: '/magazine/inexperienced/20s-women',
            },
          ],
        },
      ],
    },
    // 第2列：職種別
    {
      title: '職種別',
      items: [
        {
          label: 'ITエンジニア',
          href: '/magazine/job-salary/it-engineer',
        },
        {
          label: '営業職',
          href: '/magazine/job-salary/sales',
        },
        {
          label: '薬剤師',
          href: '/magazine/job-salary/pharmacist',
        },
        {
          label: '保育士',
          href: '/magazine/job-salary/nursery',
        },
        {
          label: '臨床検査技師',
          href: '/magazine/job-salary/medical-tech',
        },
        {
          label: '不動産業界',
          href: '/magazine/job-salary/real-estate',
        },
        {
          label: '建設業界',
          href: '/magazine/job-salary/construction',
        },
      ],
    },
    // 第3列：特集
    {
      title: '特集',
      items: [
        {
          label: '高卒・高校中退の就職',
          href: '/magazine/high-school',
        },
        {
          label: '高卒女性の就職',
          href: '/magazine/inexperienced/high-school-women',
        },
        {
          label: '20代転職の年収相場',
          href: '/career/career-change-20s',
        },
        {
          label: '転職の手取り計算',
          href: '/tools/job-change',
        },
      ],
    },
  ],
  cta: {
    title: 'おすすめ転職サービス診断',
    href: '/comparison/services',
    description: 'あなたに最適な転職サイトが見つかる',
  },
};

// ドロップダウンメニュー用データ（スキルアップする）
export const skillUpMenu: MenuItem[] = [
  {
    label: 'おすすめスクール・講座を見る',
    href: '/comparison/services?priority=skillup',
    badge: 'popular',
  },
  {
    label: '実務経験なしで取れる資格',
    href: '/qualifications/no-work-experience',
    badge: 'hot',
  },
  {
    label: '受験資格なしで取れる資格',
    href: '/qualifications/no-entry-requirement',
    badge: 'popular',
  },
  {
    label: '食いっぱぐれない資格・仕事',
    href: '/qualifications/stable-career',
  },
  {
    label: '高収入が期待できる資格',
    href: '/qualifications/high-income',
  },
  {
    label: '40代女性が人生をやり直す資格',
    href: '/qualifications/40s-women-restart',
  },
];

// ドロップダウンメニュー用データ（年収を調べる）
export const salaryMenu: MenuItem[] = [
  {
    label: '人気の職種',
    items: [
      {
        label: '保育士の年収',
        href: '/magazine/job-salary/nursery',
        badge: 'popular',
      },
      {
        label: '薬剤師の年収',
        href: '/magazine/job-salary/pharmacist',
        badge: 'popular',
      },
      {
        label: 'ITエンジニアの年収',
        href: '/magazine/job-salary/it-engineer',
        badge: 'popular',
      },
      {
        label: '営業職の年収',
        href: '/magazine/job-salary/sales',
      },
      {
        label: '臨床検査技師の年収',
        href: '/magazine/job-salary/medical-tech',
      },
      {
        label: '不動産業界の年収',
        href: '/magazine/job-salary/real-estate',
      },
      {
        label: '建設業界の年収',
        href: '/magazine/job-salary/construction',
      },
    ],
  },
  {
    label: '年収早見表',
    items: [
      {
        label: '年収1000万超えの手取り早見表',
        href: '/career/high-income',
      },
    ],
  },
];

// ドロップダウンメニュー用データ（手取りを計算）
export const calculatorMenu: MenuItem[] = [
  {
    label: '年収400万円の手取りを見る',
    href: '/tables',
    badge: 'popular',
    description: '最も検索されている年収',
  },
  {
    label: '手取り計算ツール',
    items: [
      {
        label: '手取り計算（TOP）',
        href: '/',
      },
      {
        label: '新卒の手取り計算',
        href: '/tools/fresh-graduate',
      },
      {
        label: '転職の手取り計算',
        href: '/tools/job-change',
      },
      {
        label: '副業の手取り計算',
        href: '/tools/side-business',
      },
    ],
  },
  {
    label: '手取り一覧表',
    items: [
      {
        label: '手取り一覧表',
        href: '/tables',
      },
    ],
  },
];
