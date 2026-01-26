import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/app/lib/metadata';
import { CAREER_MENU_ITEMS, DATA_MENU_ITEMS } from '@/app/lib/navigation';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },

    // 主要ツール
    { url: `${SITE_URL}/tools/job-change`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/tools/fresh-graduate`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/tools/side-business`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/tables`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const industryPages: MetadataRoute.Sitemap = DATA_MENU_ITEMS.map((i) => ({
    url: `${SITE_URL}${i.href}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const careerPages: MetadataRoute.Sitemap = CAREER_MENU_ITEMS.map((i) => ({
    url: `${SITE_URL}${i.href}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // 動的ページ: 年収200万円〜1000万円（20万円刻み）
  const annualIncomePages: MetadataRoute.Sitemap = [];
  for (let i = 200; i <= 1000; i += 20) {
    const amount = i * 10000;
    annualIncomePages.push({
      url: `${SITE_URL}/tables/annual-income/${amount}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    });
  }

  // 動的ページ: 手取り15万円〜50万円（5万円刻み）
  const monthlyTakeHomePages: MetadataRoute.Sitemap = [];
  for (let i = 15; i <= 50; i += 5) {
    const amount = i * 10000;
    monthlyTakeHomePages.push({
      url: `${SITE_URL}/tables/monthly-takehome/${amount}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    });
  }

  return [...staticPages, ...industryPages, ...careerPages, ...annualIncomePages, ...monthlyTakeHomePages];
}
