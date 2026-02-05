import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/app/lib/metadata';
import { MAGAZINE_MENU_ITEMS, QUALIFICATION_MENU_ITEMS, TOOLS_MENU_ITEMS } from '@/app/lib/navigation';

/**
 * サイトマップ - Google Search Console 提出用
 *
 * 提出先: Search Console > サイトマップ > 新しいサイトマップの追加
 * URL: https://tedorisan.jp/sitemap.xml
 *
 * robots.txt に sitemap の記載あり（自動でクロール対象）
 * /qualifications はリダイレクト先のため掲載なし（QUALIFICATION_MENU_ITEMS に含まない）
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date().toISOString();

  // 1. TOPページ
  const topPage: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: lastMod, changeFrequency: 'daily', priority: 1.0 },
  ];

  // 2. 計算ツール（TOPを除く）
  const toolsPages: MetadataRoute.Sitemap = TOOLS_MENU_ITEMS.filter((i) => i.href !== '/').map((i) => ({
    url: `${SITE_URL}${i.href}`,
    lastModified: lastMod,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 3. マガジン（職種別年収 + 未経験者の転職 + 高卒・高校中退の就職）
  const magazinePages: MetadataRoute.Sitemap = MAGAZINE_MENU_ITEMS.map((i) => ({
    url: `${SITE_URL}${i.href}`,
    lastModified: lastMod,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 4. 資格（一覧ページ /qualifications は非掲載・リダイレクトのため）
  const qualificationsPages: MetadataRoute.Sitemap = QUALIFICATION_MENU_ITEMS.map((i) => ({
    url: `${SITE_URL}${i.href}`,
    lastModified: lastMod,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  // 5. 早見表
  const tablesTopPage: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/tables`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.7 },
  ];

  // 6. FAQ
  const faqPage: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/faq`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 7. キャリア（オーファンページ・メニュー非表示）
  const careerPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/career/career-change-20s`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/career/high-income`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.5 },
  ];

  return [
    ...topPage,
    ...toolsPages,
    ...magazinePages,
    ...qualificationsPages,
    ...tablesTopPage,
    ...faqPage,
    ...careerPages,
  ];
}
