import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AnnualIncomePageClient from './AnnualIncomePageClient';
import { createPageMetadata } from '@/app/lib/metadata';

type Props = {
  // Next.js 16+ では params が Promise として渡される
  params: Promise<{ amount: string }>;
};

// 静的パラメータ生成（200万円から1000万円まで20万円刻み）
export async function generateStaticParams() {
  const amounts = [];
  for (let i = 200; i <= 1000; i += 20) {
    amounts.push({ amount: (i * 10000).toString() });
  }
  return amounts;
}

// 動的メタデータ生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount: amountStr } = await params;
  const amount = parseInt(amountStr, 10);
  
  // パラメータ検証
  if (isNaN(amount) || amount < 2000000 || amount > 10000000) {
    return {
      title: 'ページが見つかりません',
      description: '指定された年収のページは存在しません。',
    };
  }
  
  const amountInMan = amount / 10000;
  
  return createPageMetadata({
    title: `年収${amountInMan}万円の手取りはいくら？｜テドリさん`,
    description: `年収${amountInMan}万円の手取り額を自動計算。月収、所得税、住民税、社会保険料の詳細内訳も表示。年代別の位置づけや同年代との比較も。完全無料。`,
    keywords: [`年収${amountInMan}万 手取り`, `年収${amountInMan}万円`, `手取り計算`, `年収 手取り`],
    canonicalPath: `/tables/annual-income/${amount}`,
    openGraphTitle: `年収${amountInMan}万円の手取りはいくら？`,
    openGraphDescription: `年収${amountInMan}万円の手取り額を詳しく解説`,
    openGraphType: 'website',
  });
}

export default async function AnnualIncomePage({ params }: Props) {
  const { amount: amountStr } = await params;
  const amount = parseInt(amountStr, 10);
  
  // パラメータ検証
  if (isNaN(amount) || amount < 2000000 || amount > 10000000) {
    notFound();
  }
  
  return <AnnualIncomePageClient amount={amount} />;
}
