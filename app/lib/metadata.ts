import type { Metadata } from 'next';

export const SITE_URL = 'https://tedorisan.jp' as const;
export const SITE_NAME = '手取り計算ツール - テドリさん' as const;

/** 共通OG画像（1200x630推奨） */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png` as const;

type CommonMetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string; // ex: "/industry/pharmacist"
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphType?: 'article' | 'website';
  /** OG画像URL（未指定時は共通画像を使用） */
  openGraphImage?: string;
};

export function createPageMetadata(input: CommonMetadataInput): Metadata {
  const ogTitle = input.openGraphTitle ?? input.title;
  const ogDescription = input.openGraphDescription ?? input.description;
  const canonicalUrl = `${SITE_URL}${input.canonicalPath}`;
  const ogType = input.openGraphType ?? 'article';
  const ogImage = input.openGraphImage ?? DEFAULT_OG_IMAGE;

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
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

