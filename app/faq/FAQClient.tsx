'use client';

import Link from 'next/link';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import ArticleSectionHeading from '@/app/components/v2/article/ArticleSectionHeading';
import { BodyText } from '../components/ui';

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type FAQCategory = {
  title: string;
  icon: string;
  items: FAQItem[];
};

type Props = {
  faqData: FAQCategory[];
  breadcrumbParentHref?: string;
  breadcrumbParentLabel?: string;
};

export default function FAQClient({ faqData, breadcrumbParentHref = '/', breadcrumbParentLabel = 'ホーム' }: Props) {
  return (
    <ArticlePageLayout
      catchphrase1="＼手取り計算の疑問を解決／"
      catchphrase2="【よくある質問（FAQ）】"
    >
      <TedoriCalculator noMargin contentLayout={true} />
      <nav className="breadcrumb mb-3">
        <Link href={breadcrumbParentHref}>{breadcrumbParentLabel}</Link> {'>'} FAQ
      </nav>
      <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
        よくある質問（FAQ）
      </h1>

      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-12 font-['Noto_Sans_JP']">
          <ArticleSectionHeading>
            {category.title}
          </ArticleSectionHeading>

          <div className="space-y-4">
            {category.items.map((item) => (
              <details
                key={item.id}
                className="faq-details group border border-[#E2E8F0] rounded-lg overflow-hidden bg-white"
              >
                <summary className="faq-summary list-none cursor-pointer px-4 py-4 font-semibold text-[14px] text-[#1E293B] hover:bg-gray-50 flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                  <span>Q. {item.question}</span>
                  <span className="text-gray-400 flex-shrink-0">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="faq-content px-4 py-4 border-t border-[#E2E8F0] bg-white">
                  <BodyText className="leading-[25px] whitespace-pre-line text-[14px]">A. {item.answer}</BodyText>
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}
    </ArticlePageLayout>
  );
}

