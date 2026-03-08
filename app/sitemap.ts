import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/app/lib/metadata';
import { getArticles } from '@/lib/microcms';

/**
 * サイトマップ - Google Search Console 提出用
 *
 * 提出先: Search Console > サイトマップ > 新しいサイトマップの追加
 * URL: https://tedorisan.jp/sitemap.xml
 *
 * robots.txt に sitemap の記載あり（自動でクロール対象）
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastMod = new Date().toISOString();

  // 1. TOPページ
  const topPage: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: lastMod, changeFrequency: 'daily', priority: 1.0 },
  ];

  // 2. FAQ
  const faqPage: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/faq`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 3. CMS記事ページ（microCMSから動的取得）
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const { contents: articles } = await getArticles({
      limit: 100,
      fields: ['id', 'slug', 'category', 'updatedAt'],
      orders: '-publishedAt',
    });
    articlePages = articles
      .filter((article) => article.slug && article.category.length > 0)
      .map((article) => ({
        url: `${SITE_URL}/articles/${article.category[0]}/${article.slug}`,
        lastModified: article.updatedAt ?? lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch {
    // microCMS API エラー時は記事ページなしでサイトマップを生成（静的ページは維持）
  }

  return [
    ...topPage,
    ...faqPage,
    ...articlePages,
  ];
}
