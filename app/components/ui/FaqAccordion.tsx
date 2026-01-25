'use client';

import { useState } from 'react';

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
};

export function FaqAccordion({ items, defaultOpenIndex = 0 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question} className="border-2 border-[#e0e0e0] rounded-2xl bg-white overflow-hidden">
            <button
              type="button"
              className="w-full text-left px-4 py-4 flex items-center justify-between"
              onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[#1a1a1a]">
                Q{idx + 1}. {item.question}
              </span>
              <span className="text-[#0a57d1] font-bold">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4">
                <p className="text-body leading-relaxed">A. {item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

