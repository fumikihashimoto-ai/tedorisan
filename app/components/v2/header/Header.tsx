'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DrawerMenu from './DrawerMenu';
import { IMAGE_PATHS } from '@/app/lib/constants/styles';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* ヘッダー（全画面共通・ドロアーメニュー） */}
      <header className="border-b border-gray-200 shadow-sm w-full" style={{ backgroundColor: '#fff' }}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-14 px-4">
          <div aria-hidden />
          {/* ロゴ（grid中央、transformを使わずサブピクセルぼやけを回避） */}
          <Link
            href="/"
            className="flex justify-center text-gray-900 hover:text-[#1390c8] transition-colors"
          >
            <div className="relative w-32 h-8">
              <Image
                src={IMAGE_PATHS.headLogo}
                alt="手取りのミカタ"
                fill
                className="object-contain"
                priority
                quality={100}
                sizes="128px"
              />
            </div>
          </Link>
          {/* ハンバーガーメニュー（右端） */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-gray-600 hover:text-[#1390c8] transition-colors"
              aria-label="メニューを開く"
              aria-expanded={isDrawerOpen}
              aria-haspopup="true"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ドロアーメニュー */}
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
