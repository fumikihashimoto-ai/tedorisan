'use client';

import { useState } from 'react';

interface TOCItem {
  id: string;
  title: string;
}

const tocItems: TOCItem[] = [
  { id: 'section-1', title: '年収の手取り額を最速で知りたいあなたへ' },
  { id: 'section-2', title: '額面と手取りの違いを理解しよう' },
  { id: 'section-3', title: '社会保険料の種類と計算方法' },
  { id: 'section-4', title: '税金の種類と計算方法' },
  { id: 'section-5', title: '年収手取り計算シミュレーション' },
  { id: 'section-6', title: '手取り額を増やすためにできること' },
  { id: 'section-7', title: 'まとめ' },
  { id: 'calculator', title: '手取り計算シミュレーション' },
];

export default function MobileTOC() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="lg:hidden mb-6">
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        {/* トグルボタン */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 text-left text-sm font-bold text-gray-800 flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h12"
              />
            </svg>
            目次
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* 目次リスト */}
        {isOpen && (
          <ul className="px-4 pb-4 space-y-1 border-t border-gray-100">
            {tocItems.map((item, index) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className="w-full text-left text-sm text-gray-600 py-2 hover:text-blue-600 flex items-center"
                >
                  <span className="text-gray-400 mr-2 w-5">{index + 1}.</span>
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
