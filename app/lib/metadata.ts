import type { Metadata } from 'next';

export const SITE_URL = 'https://tedorikun.jp' as const;
export const SITE_NAME = '手取り計算ツール - テドリさん' as const;

type CommonMetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string; // ex: "/industry/pharmacist"
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphType?: 'article' | 'website';
};

export function createPageMetadata(input: CommonMetadataInput): Metadata {
  const ogTitle = input.openGraphTitle ?? input.title;
  const ogDescription = input.openGraphDescription ?? input.description;
  const canonicalUrl = `${SITE_URL}${input.canonicalPath}`;
  const ogType = input.openGraphType ?? 'article';

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: ogType,
      locale: 'ja_JP',
      siteName: SITE_NAME,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function createArticleMetadata(input: Omit<CommonMetadataInput, 'openGraphType'>): Metadata {
  return createPageMetadata({ ...input, openGraphType: 'article' });
}

