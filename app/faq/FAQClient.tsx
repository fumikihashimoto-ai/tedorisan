'use client';

import { useState } from 'react';
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
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] container-main">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
          <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
            <nav className="breadcrumb mb-3">
              <Link href="/">ホーム</Link> {'>'} FAQ
            </nav>
            <h1 className="page-title">よくある質問（FAQ）</h1>

            {/* FAQ カテゴリ */}
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <H2Underline>
                  {category.icon} {category.title}
                </H2Underline>

                <div className="space-y-4">
                  {category.items.map((item) => {
                    const isOpen = openFaq === item.id;
                    const panelId = `${item.id}-panel`;

                    return (
                      <div key={item.id} className="border-2 border-[#E2E8F0] rounded-2xl overflow-hidden shadow-lg bg-white">
                        <button
                          type="button"
                          onClick={() => toggleFaq(item.id)}
                          className="w-full text-left px-6 py-4 bg-white hover:bg-gray-100 flex justify-between items-center transition-all"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                        >
                          <span className="font-semibold pr-4">Q. {item.question}</span>
                          <span className="text-2xl text-gray-400 flex-shrink-0">{isOpen ? '−' : '+'}</span>
                        </button>

                        {isOpen && (
                          <div id={panelId} className="px-6 py-4 bg-white border-t border-[#E2E8F0]">
                            <BodyText className="leading-relaxed whitespace-pre-line">A. {item.answer}</BodyText>
                          </div>
                        )}
                      </div>
                    );
                  })}
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

