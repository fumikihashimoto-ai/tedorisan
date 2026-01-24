import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MonthlyTakeHomePageClient from './MonthlyTakeHomePageClient';

type Props = {
  // Next.js 16+ では params が Promise として渡される
  params: Promise<{ amount: string }>;
};

export async function generateStaticParams() {
  const amounts: { amount: string }[] = [];
  // 手取り15万円から50万円まで、5万円刻みで8ページ
  for (let i = 15; i <= 50; i += 5) {
    amounts.push({ amount: (i * 10000).toString() });
  }
  return amounts;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount: amountStr } = await params;
  const amount = parseInt(amountStr, 10);
  const amountInMan = amount / 10000;

  return {
    title: `手取り${amountInMan}万円の年収は？｜テドリさん`,
    description: `手取り月収${amountInMan}万円に必要な年収を逆算。所得税・住民税・社会保険料を考慮した正確な計算。年代別の達成難易度も表示。完全無料。`,
    keywords: [`手取り${amountInMan}万`, `手取り${amountInMan}万 年収`, '月収 手取り', '年収 逆算'],
    openGraph: {
      title: `手取り${amountInMan}万円の年収は？`,
      description: `手取り月収${amountInMan}万円に必要な年収を逆算`,
      type: 'website',
      locale: 'ja_JP',
      siteName: '手取り計算ツール - テドリさん',
    },
    alternates: {
      canonical: `https://tedorikun.jp/monthly-takehome/${amount}`,
    },
  };
}

export default async function MonthlyTakeHomePage({ params }: Props) {
  const { amount: amountStr } = await params;
  const amount = parseInt(amountStr, 10);

  if (isNaN(amount) || amount < 150000 || amount > 500000) {
    notFound();
  }

  return <MonthlyTakeHomePageClient amount={amount} />;
}

