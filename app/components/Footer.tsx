'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  jobChangeMenu,
  skillUpMenu,
  salaryMenu,
  calculatorMenu,
  womenSideJobMenu,
} from '@/lib/headerMenuData';
import type { MenuItem } from '@/lib/headerMenuData';

function FooterLinkList({ title, items }: { title: string; items: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* SP: タップで開閉 / PC: 常時表示 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-white md:pointer-events-none"
        aria-expanded={isOpen}
      >
        <span className="font-['Noto_Sans_JP'] text-[13px] font-bold text-white">
          {title}
        </span>
        <span className="text-white text-xs md:hidden">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      <ul
        className={`space-y-2 mt-2 overflow-hidden ${
          isOpen ? 'block' : 'hidden'
        } md:block`}
      >
        {items.map((item, index) =>
          item.href ? (
            <li key={index}>
              <Link
                href={item.href}
                className="font-['Noto_Sans_JP'] text-[12px] text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ) : null,
        )}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="font-['Noto_Sans_JP']">
      {/* ナビゲーションエリア */}
      <div className="bg-[#1E293B] px-6 py-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <FooterLinkList title="転職する" items={jobChangeMenu} />
          <FooterLinkList title="スキルアップする" items={skillUpMenu} />
          <FooterLinkList title="年収を調べる" items={salaryMenu} />
          <FooterLinkList title="手取りを計算" items={calculatorMenu} />
          <FooterLinkList title="女性の副業" items={womenSideJobMenu} />
        </div>
      </div>

      {/* ロゴ + リンク */}
      <div className="bg-[#1B3C65] px-4 pt-6 pb-4">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-4">
          {/* 運営者情報・プライバシーポリシー */}
          <div className="flex gap-4 text-[11px] text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">
              運営者情報
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              プライバシーポリシー
            </Link>
          </div>

          {/* コピーライト */}
          <p className="text-[10px] text-slate-500">
            © 2026 手取りのミカタ All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
