'use client';

import { useState, useEffect } from 'react';

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

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -85% 0px',
      }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-white rounded-lg p-5 mb-6">
      {/* 目次ヘッダー */}
      <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
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
      </h2>

      {/* 目次リスト */}
      <ul className="space-y-1">
        {tocItems.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`
                block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200
                ${activeId === item.id
                  ? 'border-blue-500 text-blue-600 font-medium bg-blue-50 rounded-r'
                  : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-200'
                }
              `}
            >
              <span className="text-gray-400 mr-1.5">{index + 1}.</span>
              <span className="line-clamp-1">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
