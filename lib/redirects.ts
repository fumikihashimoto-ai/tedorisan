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
];
