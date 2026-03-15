import type { Metadata, Viewport } from 'next';
import { getArticles, getArticlesByCategory } from '@/lib/microcms';
import { affiliateServices } from '@/lib/comparisonData';
import { TopPageClient } from '@/app/components/v2/TopPageClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '手取り計算シミュレーター｜年収・月収から手取りを無料計算【2026年版】',
  description:
    '年収・月収を入力するだけで手取り額を即計算。社会保険料・所得税・住民税を自動計算。新卒・転職・副業など様々なシーンで使える無料の手取り計算ツール。年収400万・500万など気になる年収の手取りをすぐ確認できます。',
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
    '手取り計算シミュレーター',
    '手取り額',
    '社会保険料計算',
    '所得税計算',
    '年収400万手取り',
    '月収手取り計算',
  ],
  openGraph: {
    title: '手取り計算シミュレーター｜年収・月収から手取りを無料計算【2026年版】',
    description:
      '年収・月収を入力するだけで手取り額を即計算。社会保険料・所得税・住民税を自動計算。新卒・転職・副業など様々なシーンで使える無料の手取り計算ツール。',
    url: 'https://tedorisan.jp',
    siteName: '手取りのミカタ',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '手取り計算シミュレーター｜年収・月収から手取りを無料計算【2026年版】',
    description:
      '年収・月収を入力するだけで手取り額を即計算。社会保険料・所得税・住民税を自動計算。新卒・転職・副業など様々なシーンで使える無料の手取り計算ツール。',
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
