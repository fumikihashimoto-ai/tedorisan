import type { Metadata, Viewport } from 'next';
import { getArticles, getArticlesByCategory } from '@/lib/microcms';
import { affiliateServices } from '@/lib/comparisonData';
import { TopPageClient } from '@/app/components/v2/TopPageClient';

export const metadata: Metadata = {
  title: '手取りのミカタ｜手取り計算・年収シミュレーション・転職サービス',
  description:
    '手取り計算から年収アップまで。たった3問であなたに最適な転職サービス・スキル習得方法をご提案。完全無料で今すぐ診断スタート！',
  keywords: [
    '手取り',
    '年収',
    '転職',
    'スキルアップ',
    '手取り計算',
    '年収シミュレーション',
    '転職サービス',
    'IT転職',
    'エンジニア転職',
  ],
  openGraph: {
    title: '手取りのミカタ｜手取り計算・年収シミュレーション・転職サービス',
    description:
      '手取り計算から年収アップまで。たった3問であなたに最適な転職サービス・スキル習得方法をご提案。',
    url: 'https://tedorisan.jp',
    siteName: '手取りのミカタ',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '手取りのミカタ｜手取り計算・年収シミュレーション・転職サービス',
    description:
      '手取り計算から年収アップまで。たった3問であなたに最適な転職サービス・スキル習得方法をご提案。',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const articleFields: string[] = ['id', 'title', 'slug', 'description', 'category', 'thumbnail'];

export default async function Home() {
  const [
    { contents: latestArticles },
    { contents: careerArticles },
    { contents: skillUpArticles },
    { contents: salaryArticles },
    { contents: basicsArticles },
  ] = await Promise.all([
    getArticles({ limit: 6, orders: '-publishedAt', fields: articleFields }),
    getArticlesByCategory('career-change', { limit: 3, fields: articleFields, orders: '-publishedAt' }),
    getArticlesByCategory('skill-up', { limit: 3, fields: articleFields, orders: '-publishedAt' }),
    getArticlesByCategory('salary-data', { limit: 3, fields: articleFields, orders: '-publishedAt' }),
    getArticlesByCategory('salary-basics', { limit: 3, fields: articleFields, orders: '-publishedAt' }),
  ]);

  return (
    <TopPageClient
      latestArticles={latestArticles}
      careerArticles={careerArticles}
      skillUpArticles={skillUpArticles}
      salaryArticles={salaryArticles}
      basicsArticles={basicsArticles}
      services={affiliateServices}
    />
  );
}
