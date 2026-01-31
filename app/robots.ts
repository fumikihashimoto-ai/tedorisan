import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/app/lib/metadata';

/**
 * robots.txt - Google Search Console 用
 * サイトマップURL: https://tedorisan.jp/sitemap.xml
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

