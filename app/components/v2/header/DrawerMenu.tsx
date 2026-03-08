'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  jobChangeMenu,
  skillUpMenu,
  salaryMenu,
  calculatorMenu,
} from '@/lib/headerMenuData';
import type { MenuItem } from '@/lib/headerMenuData';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item, index) => (
      <li key={index}>
        {item.href ? (
          <Link
            href={item.href}
            onClick={onClose}
            className="block py-2 text-sm text-gray-700 hover:text-[#1390c8]"
          >
            {item.label}
          </Link>
        ) : item.items ? (
          <>
            <div className="text-xs font-semibold text-gray-500 uppercase mt-3 mb-1">
              {item.label}
            </div>
            <ul className="pl-3 space-y-1">
              {renderMenuItems(item.items)}
            </ul>
          </>
        ) : null}
      </li>
    ));
  };

  return (
    <>
      {/* ドロワー */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[750px] bg-white shadow-xl z-[70] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">メニュー</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-[#1390c8] transition-colors"
            aria-label="メニューを閉じる"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* アコーディオンメニュー */}
        <ul className="py-2">
          {/* 転職する */}
          <li className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion('job-change')}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-900 font-medium hover:bg-gray-50"
              aria-expanded={openAccordion === 'job-change'}
              aria-haspopup="true"
            >
              <span>転職する</span>
              <span className="text-xs">
                {openAccordion === 'job-change' ? '▲' : '▼'}
              </span>
            </button>
            {openAccordion === 'job-change' && (
              <div className="px-4 py-2 bg-gray-50">
                <ul className="space-y-1">{renderMenuItems(jobChangeMenu)}</ul>
              </div>
            )}
          </li>

          {/* スキルアップする */}
          <li className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion('skillup')}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-900 font-medium hover:bg-gray-50"
              aria-expanded={openAccordion === 'skillup'}
              aria-haspopup="true"
            >
              <span>スキルアップする</span>
              <span className="text-xs">
                {openAccordion === 'skillup' ? '▲' : '▼'}
              </span>
            </button>
            {openAccordion === 'skillup' && (
              <div className="px-4 py-2 bg-gray-50">
                <ul className="space-y-1">{renderMenuItems(skillUpMenu)}</ul>
              </div>
            )}
          </li>

          {/* 年収を調べる */}
          <li className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion('salary')}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-900 font-medium hover:bg-gray-50"
              aria-expanded={openAccordion === 'salary'}
              aria-haspopup="true"
            >
              <span>年収を調べる</span>
              <span className="text-xs">
                {openAccordion === 'salary' ? '▲' : '▼'}
              </span>
            </button>
            {openAccordion === 'salary' && (
              <div className="px-4 py-2 bg-gray-50">
                <ul className="space-y-1">{renderMenuItems(salaryMenu)}</ul>
              </div>
            )}
          </li>

          {/* 手取りを計算 */}
          <li className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion('calculator')}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-900 font-medium hover:bg-gray-50"
              aria-expanded={openAccordion === 'calculator'}
              aria-haspopup="true"
            >
              <span>手取りを計算</span>
              <span className="text-xs">
                {openAccordion === 'calculator' ? '▲' : '▼'}
              </span>
            </button>
            {openAccordion === 'calculator' && (
              <div className="px-4 py-2 bg-gray-50">
                <ul className="space-y-1">{renderMenuItems(calculatorMenu)}</ul>
              </div>
            )}
          </li>

          {/* よくある質問 */}
          <li>
            <Link
              href="/faq"
              onClick={onClose}
              className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50"
            >
              よくある質問
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
