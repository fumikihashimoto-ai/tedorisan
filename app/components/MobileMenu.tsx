'use client';

import { useState } from 'react';
import { IMAGE_PATHS } from '@/app/lib/constants/styles';
import Link from 'next/link';
import { X } from 'lucide-react';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ハンバーガーメニューボタン */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2"
        aria-label="メニュー"
        type="button"
      >
        <div className="relative w-6 h-6">
          <img
            src={IMAGE_PATHS.menu}
            alt="メニュー"
            width={24}
            height={24}
          />
        </div>
      </button>

      {/* オーバーレイ（透過） */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ドロワーメニュー */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* ヘッダー */}
          <div className="bg-[#79ccf1] text-white py-[5px] px-4 flex items-center justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition"
              aria-label="閉じる"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* メニュー項目 */}
          <nav className="py-4">
            <details className="group border-b border-gray-200">
              <summary className="py-3 px-4 cursor-pointer text-sm font-bold text-[#3f3f3f] flex items-center justify-between hover:bg-gray-50 transition">
                新卒・転職・副業の手取り
                <span className="text-xl text-[#79ccf1] group-open:hidden">+</span>
                <span className="text-xl text-[#79ccf1] hidden group-open:inline">−</span>
              </summary>
              <div className="bg-gray-50 px-4 py-2 space-y-2">
                <Link
                  href="/tools/fresh-graduate"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  新卒向け手取り計算
                </Link>
                <Link
                  href="/tools/job-change"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  転職向け手取り計算
                </Link>
                <Link
                  href="/tools/side-business"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  副業向け手取り計算
                </Link>
              </div>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="py-3 px-4 cursor-pointer text-sm font-bold text-[#3f3f3f] flex items-center justify-between hover:bg-gray-50 transition">
                職種別年収
                <span className="text-xl text-[#79ccf1] group-open:hidden">+</span>
                <span className="text-xl text-[#79ccf1] hidden group-open:inline">−</span>
              </summary>
              <div className="bg-gray-50 px-4 py-2 space-y-2">
                <Link
                  href="/magazine/job-salary/it-engineer"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  ITエンジニアの年収
                </Link>
                <Link
                  href="/magazine/job-salary/pharmacist"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  薬剤師の年収
                </Link>
                <Link
                  href="/magazine/job-salary/sales"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  営業の年収
                </Link>
              </div>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="py-3 px-4 cursor-pointer text-sm font-bold text-[#3f3f3f] flex items-center justify-between hover:bg-gray-50 transition">
                未経験者の就職・転職
                <span className="text-xl text-[#79ccf1] group-open:hidden">+</span>
                <span className="text-xl text-[#79ccf1] hidden group-open:inline">−</span>
              </summary>
              <div className="bg-gray-50 px-4 py-2 space-y-2">
                <Link
                  href="/magazine/inexperienced/20s"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  20代未経験転職
                </Link>
                <Link
                  href="/magazine/inexperienced/30s"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  30代未経験転職
                </Link>
                <Link
                  href="/magazine/inexperienced/40s"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  40代未経験転職
                </Link>
              </div>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="py-3 px-4 cursor-pointer text-sm font-bold text-[#3f3f3f] flex items-center justify-between hover:bg-gray-50 transition">
                資格
                <span className="text-xl text-[#79ccf1] group-open:hidden">+</span>
                <span className="text-xl text-[#79ccf1] hidden group-open:inline">−</span>
              </summary>
              <div className="bg-gray-50 px-4 py-2 space-y-2">
                <Link
                  href="/qualifications/high-income"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  高年収資格
                </Link>
                <Link
                  href="/qualifications/stable-career"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  安定職種資格
                </Link>
              </div>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="py-3 px-4 cursor-pointer text-sm font-bold text-[#3f3f3f] flex items-center justify-between hover:bg-gray-50 transition">
                その他
                <span className="text-xl text-[#79ccf1] group-open:hidden">+</span>
                <span className="text-xl text-[#79ccf1] hidden group-open:inline">−</span>
              </summary>
              <div className="bg-gray-50 px-4 py-2 space-y-2">
                <Link
                  href="/tables"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  手取り早見表
                </Link>
                <Link
                  href="/faq"
                  className="block py-2 text-sm text-gray-700 hover:text-[#79ccf1]"
                >
                  よくある質問
                </Link>
              </div>
            </details>
          </nav>
        </div>
      </div>
    </>
  );
}
