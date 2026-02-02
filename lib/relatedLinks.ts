/**
 * 全ページの関連リンク定義
 * ページ下部に表示する「RECOMMEND」リンク
 */

export type RelatedLink = { href: string; label: string; image: string; category: string };

/** マップ定義用（image, category は getRelatedLinks で付与） */
type RelatedLinkInput = { href: string; label: string };

/** href からヒーロー画像パスを取得（リンク先ページの hero_*.png を使用） */
function getHeroImage(href: string): string {
  const path = href === '/' ? '/' : href.replace(/\/$/, '');
  const heroMap: Record<string, string> = {
    '/': 'hero_top',
    '/tools/job-change': 'hero_job-change',
    '/tools/fresh-graduate': 'hero_fresh-graduate',
    '/tools/side-business': 'hero_side-business',
    '/tables': 'hero_tables',
    '/faq': 'hero_faq',
    '/magazine/job-salary/it-engineer': 'hero_it-engineer',
    '/magazine/job-salary/nursery': 'hero_nursery',
    '/magazine/job-salary/sales': 'hero_sales',
    '/magazine/job-salary/pharmacist': 'hero_pharmacist',
    '/magazine/job-salary/medical-tech': 'hero_medical-tech',
    '/magazine/job-salary/real-estate': 'hero_real-estate',
    '/magazine/job-salary/construction': 'hero_construction',
    '/magazine/inexperienced/20s': 'hero_20s',
    '/magazine/inexperienced/20s-women': 'hero_20s-women',
    '/magazine/inexperienced/30s': 'hero_30s',
    '/magazine/inexperienced/30s-women': 'hero_30s-women',
    '/magazine/inexperienced/40s': 'hero_40s',
    '/magazine/inexperienced/40s-women': 'hero_40s-women',
    '/magazine/high-school': 'hero_high-school',
    '/magazine/inexperienced/high-school-women': 'hero_high-school-women',
    '/qualifications/araforty-engineer': 'hero_araforty-engineer',
    '/qualifications/40s-women-restart': 'hero_40s-women-restart',
    '/qualifications/stable-career': 'hero_stable-career',
    '/qualifications/high-income': 'hero_high-income',
    '/qualifications/no-entry-requirement': 'hero_no-entry-requirement',
    '/qualifications/no-work-experience': 'hero_no-work-experience',
    '/career/high-income': 'hero_high-income',
    '/career/career-change-20s': 'hero_job-change',
  };
  // 完全一致
  const exact = heroMap[path];
  if (exact) return `/images/${exact}.png`;
  // 動的ルート（/tables/annual-income/*, /tables/monthly-takehome/*）
  if (path.startsWith('/tables/')) return '/images/hero_tables.png';
  return '/images/hero_top.png';
}

/** href からカテゴリを取得 */
function getCategory(href: string): string {
  if (href === '/' || href.startsWith('/tools/')) return '計算ツール';
  if (href.startsWith('/magazine/job-salary/')) return '職種別年収';
  if (href.startsWith('/magazine/')) return '未経験転職';
  if (href.startsWith('/qualifications')) return '資格';
  if (href.startsWith('/tables') || href.startsWith('/career/')) return '早見表';
  if (href === '/faq') return 'FAQ';
  return 'その他';
}

/** パスパターン（完全一致 or 前方一致）と関連リンクのマッピング */
const RELATED_LINKS_MAP: { pattern: string | RegExp; links: RelatedLinkInput[] }[] = [
  // 計算ツール系
  {
    pattern: '/',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/tools/fresh-graduate', label: '新卒向け手取り計算' },
      { href: '/tools/side-business', label: '副業向け手取り計算' },
      { href: '/tables/', label: '年代・年収別 手取り早見表' },
      { href: '/faq', label: 'よくある質問（FAQ）' },
    ],
  },
  {
    pattern: '/tools/job-change',
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/tools/fresh-graduate', label: '新卒向け手取り計算' },
      { href: '/tools/side-business', label: '副業向け手取り計算' },
      { href: '/magazine/inexperienced/20s', label: '20代未経験者の転職' },
      { href: '/magazine/inexperienced/30s', label: '30代の未経験転職' },
      { href: '/magazine/job-salary/it-engineer', label: 'ITエンジニアの年収' },
      { href: '/career/high-income', label: '年収1000万超えの手取り早見表' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  {
    pattern: '/tools/fresh-graduate',
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/magazine/high-school', label: '高卒・高校中退の就職' },
      { href: '/tables/', label: '年代・年収別 手取り早見表' },
      { href: '/faq', label: 'よくある質問（FAQ）' },
    ],
  },
  {
    pattern: '/tools/side-business',
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/faq', label: 'よくある質問（FAQ）' },
      { href: '/tables/', label: '年代・年収別 手取り早見表' },
      { href: '/qualifications/no-entry-requirement', label: '受験資格なしで取れる資格' },
    ],
  },
  // マガジン - 職種別年収
  {
    pattern: '/magazine/job-salary/it-engineer',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/qualifications/araforty-engineer', label: 'アラフォー未経験からのエンジニア転職' },
      { href: '/magazine/inexperienced/20s', label: '20代未経験者の転職' },
      { href: '/magazine/job-salary/nursery', label: '保育士の年収' },
      { href: '/magazine/job-salary/sales', label: '営業職の年収' },
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
    ],
  },
  {
    pattern: '/magazine/job-salary/nursery',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/magazine/job-salary/it-engineer', label: 'ITエンジニアの年収' },
      { href: '/magazine/job-salary/sales', label: '営業職の年収' },
      { href: '/magazine/job-salary/pharmacist', label: '薬剤師の年収' },
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
      { href: '/magazine/inexperienced/20s-women', label: '20代女性の未経験転職' },
    ],
  },
  {
    pattern: '/magazine/job-salary/sales',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/magazine/job-salary/real-estate', label: '不動産営業の年収' },
      { href: '/magazine/job-salary/construction', label: '建設業界の年収' },
      { href: '/magazine/job-salary/it-engineer', label: 'ITエンジニアの年収' },
      { href: '/career/career-change-20s', label: '20代転職の年収相場' },
    ],
  },
  {
    pattern: '/magazine/job-salary/pharmacist',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/magazine/job-salary/medical-tech', label: '臨床検査技師の年収' },
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
      { href: '/qualifications/stable-career', label: '食いっぱぐれない資格' },
      { href: '/magazine/job-salary/nursery', label: '保育士の年収' },
    ],
  },
  {
    pattern: '/magazine/job-salary/medical-tech',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/magazine/job-salary/pharmacist', label: '薬剤師の年収' },
      { href: '/magazine/job-salary/nursery', label: '保育士の年収' },
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
      { href: '/qualifications/no-work-experience', label: '実務経験なしで取れる資格' },
    ],
  },
  {
    pattern: '/magazine/job-salary/real-estate',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/magazine/job-salary/sales', label: '営業職の年収' },
      { href: '/magazine/job-salary/construction', label: '建設業界の年収' },
      { href: '/magazine/inexperienced/20s', label: '20代未経験者の転職' },
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
    ],
  },
  {
    pattern: '/magazine/job-salary/construction',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/magazine/job-salary/real-estate', label: '不動産営業の年収' },
      { href: '/magazine/job-salary/sales', label: '営業職の年収' },
      { href: '/magazine/inexperienced/30s', label: '30代の未経験転職' },
      { href: '/qualifications/stable-career', label: '食いっぱぐれない資格' },
    ],
  },
  // マガジン - 未経験転職
  {
    pattern: '/magazine/inexperienced/20s',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/career/career-change-20s', label: '20代転職の年収相場' },
      { href: '/magazine/job-salary/it-engineer', label: 'ITエンジニアの年収' },
      { href: '/magazine/inexperienced/30s', label: '30代の未経験転職' },
      { href: '/magazine/high-school', label: '高卒・高校中退の就職' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  {
    pattern: '/magazine/inexperienced/20s-women',
    links: [
      { href: '/magazine/inexperienced/20s', label: '20代未経験者の転職' },
      { href: '/magazine/inexperienced/30s-women', label: '30代女性の未経験転職' },
      { href: '/magazine/job-salary/nursery', label: '保育士の年収' },
      { href: '/magazine/inexperienced/high-school-women', label: '高卒女性の就職' },
      { href: '/qualifications/40s-women-restart', label: '40代女性が人生をやり直す資格' },
    ],
  },
  {
    pattern: '/magazine/inexperienced/30s',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/magazine/inexperienced/20s', label: '20代未経験者の転職' },
      { href: '/magazine/inexperienced/40s', label: '40代の未経験転職' },
      { href: '/magazine/job-salary/it-engineer', label: 'ITエンジニアの年収' },
      { href: '/qualifications/araforty-engineer', label: 'アラフォーエンジニア転職' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  {
    pattern: '/magazine/inexperienced/30s-women',
    links: [
      { href: '/magazine/inexperienced/30s', label: '30代の未経験転職' },
      { href: '/magazine/inexperienced/20s-women', label: '20代女性の未経験転職' },
      { href: '/magazine/inexperienced/40s-women', label: '40代女性の未経験転職' },
      { href: '/magazine/job-salary/nursery', label: '保育士の年収' },
      { href: '/qualifications/40s-women-restart', label: '40代女性が人生をやり直す資格' },
    ],
  },
  {
    pattern: '/magazine/inexperienced/40s',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/qualifications/araforty-engineer', label: 'アラフォー未経験からのエンジニア転職' },
      { href: '/magazine/inexperienced/30s', label: '30代の未経験転職' },
      { href: '/magazine/inexperienced/40s-women', label: '40代女性の未経験転職' },
      { href: '/qualifications/stable-career', label: '食いっぱぐれない資格' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  {
    pattern: '/magazine/inexperienced/40s-women',
    links: [
      { href: '/magazine/inexperienced/40s', label: '40代の未経験転職' },
      { href: '/qualifications/40s-women-restart', label: '40代女性が人生をやり直す資格' },
      { href: '/magazine/inexperienced/30s-women', label: '30代女性の未経験転職' },
      { href: '/magazine/job-salary/nursery', label: '保育士の年収' },
    ],
  },
  {
    pattern: '/magazine/high-school',
    links: [
      { href: '/tools/fresh-graduate', label: '新卒向け手取り計算' },
      { href: '/magazine/inexperienced/high-school-women', label: '高卒女性の就職' },
      { href: '/magazine/inexperienced/20s', label: '20代未経験者の転職' },
      { href: '/qualifications/stable-career', label: '食いっぱぐれない資格' },
      { href: '/qualifications/no-entry-requirement', label: '受験資格なしで取れる資格' },
      { href: '/tables/', label: '年代・年収別 手取り早見表' },
    ],
  },
  {
    pattern: '/magazine/inexperienced/high-school-women',
    links: [
      { href: '/magazine/high-school', label: '高卒・高校中退の就職' },
      { href: '/magazine/inexperienced/20s-women', label: '20代女性の未経験転職' },
      { href: '/magazine/job-salary/nursery', label: '保育士の年収' },
      { href: '/qualifications/no-entry-requirement', label: '受験資格なしで取れる資格' },
      { href: '/tools/fresh-graduate', label: '新卒向け手取り計算' },
    ],
  },
  // 資格系
  {
    pattern: '/qualifications',
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/qualifications/araforty-engineer', label: 'アラフォー未経験からのエンジニア転職' },
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
      { href: '/qualifications/stable-career', label: '食いっぱぐれない資格' },
      { href: '/qualifications/no-entry-requirement', label: '受験資格なしで取れる資格' },
      { href: '/qualifications/no-work-experience', label: '実務経験なしで取れる資格' },
      { href: '/qualifications/40s-women-restart', label: '40代女性が人生をやり直す資格' },
    ],
  },
  {
    pattern: '/qualifications/araforty-engineer',
    links: [
      { href: '/magazine/job-salary/it-engineer', label: 'ITエンジニアの年収' },
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/qualifications/no-work-experience', label: '実務経験なしで取れる資格' },
      { href: '/magazine/inexperienced/40s', label: '40代の未経験転職' },
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  {
    pattern: '/qualifications/40s-women-restart',
    links: [
      { href: '/magazine/inexperienced/40s-women', label: '40代女性の未経験転職' },
      { href: '/qualifications', label: '資格一覧' },
      { href: '/qualifications/araforty-engineer', label: 'アラフォー未経験からのエンジニア転職' },
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
      { href: '/qualifications/no-entry-requirement', label: '受験資格なしで取れる資格' },
      { href: '/qualifications/stable-career', label: '食いっぱぐれない資格' },
    ],
  },
  {
    pattern: '/qualifications/stable-career',
    links: [
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
      { href: '/qualifications/no-entry-requirement', label: '受験資格なしで取れる資格' },
      { href: '/qualifications/no-work-experience', label: '実務経験なしで取れる資格' },
      { href: '/magazine/high-school', label: '高卒・高校中退の就職' },
      { href: '/magazine/job-salary/construction', label: '建設業界の年収' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  {
    pattern: '/qualifications/high-income',
    links: [
      { href: '/qualifications/stable-career', label: '食いっぱぐれない資格' },
      { href: '/qualifications/araforty-engineer', label: 'アラフォー未経験からのエンジニア転職' },
      { href: '/magazine/job-salary/it-engineer', label: 'ITエンジニアの年収' },
      { href: '/magazine/job-salary/pharmacist', label: '薬剤師の年収' },
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  {
    pattern: '/qualifications/no-entry-requirement',
    links: [
      { href: '/qualifications/no-work-experience', label: '実務経験なしで取れる資格' },
      { href: '/magazine/high-school', label: '高卒・高校中退の就職' },
      { href: '/qualifications/40s-women-restart', label: '40代女性が人生をやり直す資格' },
      { href: '/qualifications/stable-career', label: '食いっぱぐれない資格' },
      { href: '/tools/side-business', label: '副業向け手取り計算' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  {
    pattern: '/qualifications/no-work-experience',
    links: [
      { href: '/qualifications/no-entry-requirement', label: '受験資格なしで取れる資格' },
      { href: '/qualifications/araforty-engineer', label: 'アラフォー未経験からのエンジニア転職' },
      { href: '/magazine/job-salary/medical-tech', label: '臨床検査技師の年収' },
      { href: '/magazine/inexperienced/40s', label: '40代の未経験転職' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  // 早見表・その他（動的ルートは先に定義）
  {
    pattern: /^\/tables\/annual-income\/\d+$/,
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/tables/', label: '年代・年収別 手取り早見表' },
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/faq', label: 'よくある質問（FAQ）' },
    ],
  },
  {
    pattern: /^\/tables\/monthly-takehome\/\d+$/,
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/tables/', label: '年代・年収別 手取り早見表' },
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/faq', label: 'よくある質問（FAQ）' },
    ],
  },
  {
    pattern: '/tables',
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/career/high-income', label: '年収1000万超えの手取り早見表' },
      { href: '/career/career-change-20s', label: '20代転職の年収相場' },
      { href: '/faq', label: 'よくある質問（FAQ）' },
    ],
  },
  {
    pattern: '/faq',
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/tools/fresh-graduate', label: '新卒向け手取り計算' },
      { href: '/tools/side-business', label: '副業向け手取り計算' },
      { href: '/tables/', label: '年代・年収別 手取り早見表' },
    ],
  },
  {
    pattern: '/career/career-change-20s',
    links: [
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/magazine/inexperienced/20s', label: '20代未経験者の転職' },
      { href: '/tables/', label: '年代・年収別 手取り早見表' },
      { href: '/magazine/job-salary/it-engineer', label: 'ITエンジニアの年収' },
      { href: '/qualifications', label: '資格一覧' },
    ],
  },
  {
    pattern: '/career/high-income',
    links: [
      { href: '/', label: '手取り計算（TOP）' },
      { href: '/tools/job-change', label: '転職向け手取り計算' },
      { href: '/tables/', label: '年代・年収別 手取り早見表' },
      { href: '/qualifications/high-income', label: '高収入が期待できる資格' },
      { href: '/magazine/job-salary/it-engineer', label: 'ITエンジニアの年収' },
      { href: '/magazine/job-salary/pharmacist', label: '薬剤師の年収' },
    ],
  },
];

/** 現在のページへのリンクを除外し、最大10件に制限 */
const MAX_LINKS = 10;

export function getRelatedLinks(pathname: string): RelatedLink[] {
  // 末尾スラッシュを正規化（/tables/ と /tables の両方に対応）
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/';

  for (const { pattern, links } of RELATED_LINKS_MAP) {
    let isMatch = false;
    if (typeof pattern === 'string') {
      isMatch = normalizedPath === pattern || (pattern !== '/' && normalizedPath.startsWith(pattern + '/'));
    } else {
      isMatch = pattern.test(normalizedPath);
    }
    if (isMatch) {
      // 現在のページへのリンクを除外し、画像・カテゴリを付与
      const filtered = links
        .filter((link) => {
          const linkPath = link.href === '/' ? '/' : link.href.replace(/\/$/, '');
          return linkPath !== normalizedPath;
        })
        .slice(0, MAX_LINKS)
        .map((link) => ({
          ...link,
          image: getHeroImage(link.href),
          category: getCategory(link.href),
        }));
      return filtered;
    }
  }
  return [];
}
