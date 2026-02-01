'use client';

import Link from 'next/link';
import PcAdSidebar from '../components/PcAdSidebar';
import { BodyText, H2Underline } from '../components/ui';

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
};

export default function FAQClient({ faqData }: Props) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            {/* ヒーロー画像 */}
            <div className="mb-4">
              <img
                src="/images/hero_faq.png"
                alt="よくある質問（FAQ）"
                className="w-full max-w-full h-auto rounded-lg"
              />
            </div>
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} FAQ
            </nav>
            <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
              よくある質問（FAQ）
            </h1>

            {/* FAQ カテゴリ */}
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <H2Underline>
                  {category.icon} {category.title}
                </H2Underline>

                <div className="space-y-4">
                  {category.items.map((item) => (
                    <details
                      key={item.id}
                      className="faq-details group border border-[#E2E8F0] rounded-lg overflow-hidden bg-white"
                    >
                      <summary className="faq-summary list-none cursor-pointer px-4 py-4 font-semibold text-[#1E293B] hover:bg-gray-50 flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                        <span>Q. {item.question}</span>
                        <span className="text-gray-400 flex-shrink-0">
                          <span className="group-open:hidden">+</span>
                          <span className="hidden group-open:inline">−</span>
                        </span>
                      </summary>
                      <div className="faq-content px-4 py-4 border-t border-[#E2E8F0] bg-white">
                        <BodyText className="leading-relaxed whitespace-pre-line">A. {item.answer}</BodyText>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </main>

          <PcAdSidebar />
        </div>
      </div>
    </div>
  );
}

