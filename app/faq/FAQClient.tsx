'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* タイトルセクション */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">よくある質問（FAQ）</h1>
        <p className="text-gray-600">手取り計算に関する疑問を解決します</p>
      </div>

      {/* FAQ カテゴリ */}
      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-yellow-500">
            {category.icon} {category.title}
          </h2>

          <div className="space-y-4">
            {category.items.map((item) => {
              const isOpen = openFaq === item.id;
              const panelId = `${item.id}-panel`;

              return (
                <div key={item.id} className="border-2 border-yellow-200 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    className="w-full text-left px-6 py-4 bg-white hover:bg-yellow-50 flex justify-between items-center transition-all"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="font-semibold pr-4">Q. {item.question}</span>
                    <span className="text-2xl text-gray-400 flex-shrink-0">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div id={panelId} className="px-6 py-4 bg-[#FFFEF9] border-t border-yellow-200">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">A. {item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* A8.net FAQ広告 */}
          {category.title === '基本編' && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              {/* 左 */}
              <div
                dangerouslySetInnerHTML={{
                  __html: `
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVDG6+2XZ6GI+4N6C+BZVU9" rel="nofollow">
          <img border="0" width="300" height="250" alt="" src="https://www21.a8.net/svt/bgt?aid=260124630178&wid=001&eno=01&mid=s00000021666002015000&mc=1">
        </a>
        <img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4AVDG6+2XZ6GI+4N6C+BZVU9" alt="">
      `,
                }}
              />

              {/* 右 */}
              <div
                dangerouslySetInnerHTML={{
                  __html: `
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVDG5+A1ZKKY+4LJQ+5Z6WX" rel="nofollow">
          <img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=260124629608&wid=001&eno=01&mid=s00000021455001004000&mc=1">
        </a>
        <img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=4AVDG5+A1ZKKY+4LJQ+5Z6WX" alt="">
      `,
                }}
              />
            </div>
          )}
        </div>
      ))}

      {/* CTAセクション */}
      <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-8 text-center shadow-lg">
        <h3 className="text-xl font-bold mb-4">💡 あなたの手取り額を計算してみませんか？</h3>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
          手取り計算ツールを使う
        </Link>
      </div>
    </div>
  );
}

