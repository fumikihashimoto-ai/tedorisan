import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/app/lib/metadata';
import PageLayout from '@/app/components/v2/layouts/PageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';

export const metadata: Metadata = createPageMetadata({
  title: '手取り計算シミュレーター｜年収・月収から手取りを無料計算【2026年版】',
  description:
    '年収・月収を入力するだけで手取り額を即計算。社会保険料・所得税・住民税を自動計算。新卒・転職・副業など様々なシーンで使える無料の手取り計算ツール。',
  keywords: [
    '手取り計算',
    '手取り計算シミュレーター',
    '手取り額',
    '年収 手取り',
    '月収 手取り',
    '社会保険料計算',
    '所得税計算',
    '住民税計算',
    '年収400万 手取り',
  ],
  canonicalPath: '/calculator',
  openGraphType: 'website',
});

const relatedArticles = [
  {
    label: '年収400万の手取りはいくら？',
    href: '/articles/salary-basics/400man-takehome',
  },
  {
    label: '新卒1年目の手取りはいくら？',
    href: '/articles/salary-basics/shinsotsu-takehome',
  },
  {
    label: '大卒の手取り平均',
    href: '/articles/salary-basics/daigaku-takehome',
  },
  {
    label: '高卒の手取り平均',
    href: '/articles/salary-basics/highschool-takehome',
  },
];

export default function CalculatorPage() {
  return (
    <PageLayout maxWidth="content">
      <section className="w-[calc(100%+32px)] mx-[-16px]">
        <Image
          src="/images/hero_calculator.jpg"
          alt="手取り計算シミュレーター - 年収・月収から手取りを無料計算"
          width={750}
          height={420}
          className="w-full"
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </section>

      <h1 className="page-title mt-6">手取り計算シミュレーター</h1>

      <section className="mt-6">
        <TedoriCalculator />
      </section>

      <section className="mt-10 mb-10">
        <h2 className="heading-h2-underline">関連記事</h2>
        <ul className="mt-4 space-y-3">
          {relatedArticles.map((article) => (
            <li key={article.href}>
              <Link
                href={article.href}
                className="text-[#1390c8] hover:underline font-['Noto_Sans_JP'] text-[14px] leading-[25px]"
              >
                {article.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}
