import type { Redirect } from 'next/dist/lib/load-custom-routes';

/**
 * CMS移行に伴う301リダイレクト定義
 * 旧URL → 新URL のマッピング
 * 新しいページを移行するたびにここに追加する
 */
export const cmsRedirects: Redirect[] = [
  {
    source: '/magazine/high-school',
    destination: '/articles/career-change/high-school-career',
    permanent: true,
  },
  {
    source: '/career/career-change-20s',
    destination: '/articles/career-change/career-change-20s',
    permanent: true,
  },
  {
    source: '/qualifications/40s-women-restart',
    destination: '/articles/skill-up/40s-women-restart',
    permanent: true,
  },
  {
    source: '/qualifications/high-income',
    destination: '/articles/skill-up/high-income-qualifications',
    permanent: true,
  },
  {
    source: '/qualifications/no-entry-requirement',
    destination: '/articles/skill-up/no-entry-requirement',
    permanent: true,
  },
  {
    source: '/qualifications/no-work-experience',
    destination: '/articles/skill-up/no-work-experience',
    permanent: true,
  },
  {
    source: '/qualifications/stable-career',
    destination: '/articles/skill-up/stable-career',
    permanent: true,
  },
];
