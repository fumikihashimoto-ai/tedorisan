import { SITE_URL } from '@/app/lib/metadata';

type Props = {
  headline: string;
  description: string;
  url: string;
  datePublished?: string; // ISO 8601形式
  dateModified?: string;
};

/**
 * マガジン記事用 Article 構造化データ
 * リッチリザルト表示のため、各記事ページで使用
 */
export default function ArticleStructuredData({
  headline,
  description,
  url,
  datePublished = '2025-01-01',
  dateModified,
}: Props) {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: fullUrl,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: '手取りのミカタ',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: '手取りのミカタ',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    inLanguage: 'ja',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}
