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
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. TOPページ
  const topPage: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
  ];

  // 2. 計算ツール（TOPを除く）
  const toolsPages: MetadataRoute.Sitemap = TOOLS_MENU_ITEMS.filter((i) => i.href !== '/').map((i) => ({
    url: `${SITE_URL}${i.href}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 3. マガジン（職種別年収 + 未経験者の転職 + 高卒・高校中退の就職）
  const magazinePages: MetadataRoute.Sitemap = MAGAZINE_MENU_ITEMS.map((i) => ({
    url: `${SITE_URL}${i.href}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 4. 資格
  const qualificationsPages: MetadataRoute.Sitemap = QUALIFICATION_MENU_ITEMS.map((i) => ({
    url: `${SITE_URL}${i.href}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: i.href === '/qualifications' ? 0.6 : 0.5,
  }));

  // 5. 早見表
  const tablesTopPage: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/tables`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  // 6. 早見表：年収別（200万円〜1000万円、20万円刻み）
  const annualIncomePages: MetadataRoute.Sitemap = [];
  for (let i = 200; i <= 1000; i += 20) {
    annualIncomePages.push({
      url: `${SITE_URL}/tables/annual-income/${i * 10000}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  // 7. 早見表：手取り別（15万円〜50万円、5万円刻み）
  const monthlyTakeHomePages: MetadataRoute.Sitemap = [];
  for (let i = 15; i <= 50; i += 5) {
    monthlyTakeHomePages.push({
      url: `${SITE_URL}/tables/monthly-takehome/${i * 10000}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  // 8. FAQ
  const faqPage: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 9. キャリア（オーファンページ・メニュー非表示）
  const careerPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/career/career-change-20s`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/career/high-income`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  return [
    ...topPage,
    ...toolsPages,
    ...magazinePages,
    ...qualificationsPages,
    ...tablesTopPage,
    ...annualIncomePages,
    ...monthlyTakeHomePages,
    ...faqPage,
    ...careerPages,
  ];
}
