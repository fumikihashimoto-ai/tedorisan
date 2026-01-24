'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<'tools' | 'support' | null>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSection(null);
  };

  return (
    <>
      <header className="bg-[#0a57d1] shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          {/* PC: 左寄せロゴ */}
          <Link
            href="/"
            className="hidden md:inline font-bold text-xl text-white hover:text-white/90 transition-colors whitespace-nowrap"
          >
            手取り計算ツール - テドリさん
          </Link>

          {/* スマホ: 中央ロゴ（従来どおり） */}
          <Link
            href="/"
            className="md:hidden absolute left-1/2 -translate-x-1/2 font-bold text-sm text-white hover:text-white/90 transition-colors whitespace-nowrap"
          >
            手取り計算ツール - テドリさん
          </Link>

          {/* PC: ヘッダー内メニュー表示 */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 text-sm">
            <Link
              href="/comparison/list"
              className="px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white font-semibold"
            >
              📊 一覧表
            </Link>
            <Link
              href="/job-change"
              className="px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white"
            >
              💼 転職
            </Link>
            <Link
              href="/fresh-graduate"
              className="px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white"
            >
              🎓 新卒
            </Link>
            <Link
              href="/side-business"
              className="px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white"
            >
              💻 副業
            </Link>
            <Link
              href="/faq"
              className="px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white font-semibold"
            >
              ❓ FAQ
            </Link>
          </nav>

          {/* スマホ: メニューボタン */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden ml-auto w-10 h-10 rounded-full bg-white/10 border border-white/20 shadow-sm flex items-center justify-center text-2xl text-white hover:bg-white/20 transition-colors z-10"
            aria-label="メニューを開く"
          >
            ☰
          </button>
        </div>
      </header>

      {/* スマホ: フルスクリーン・オーバーレイメニュー */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* 背景オーバーレイ（タップで閉じる） */}
          <div className="absolute inset-0 bg-black/40" onClick={closeMenu} />

          {/* メニュー本体（画面全体） */}
          <div className="absolute inset-0 bg-[#0a57d1] text-white">
            {/* 上部バー */}
            <div className="h-16 px-4 flex items-center justify-between border-b border-white/20">
              <div className="font-bold text-white">メニュー</div>
              <button
                type="button"
                onClick={closeMenu}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 shadow-sm flex items-center justify-center text-2xl text-white hover:bg-white/20 transition-colors"
                aria-label="メニューを閉じる"
              >
                ×
              </button>
            </div>

            {/* リンク（左寄せ・シンプル） */}
            <nav className="px-6 py-6 overflow-y-auto h-[calc(100%-4rem)]">
              <ul className="space-y-5 text-left">
                <li>
                  <Link href="/" onClick={closeMenu} className="text-base font-semibold text-white hover:bg-white/10 rounded-lg px-2 py-1 -mx-2">
                    手取り計算（TOP）
                  </Link>
                </li>
                <li>
                  <Link
                    href="/comparison/list"
                    onClick={closeMenu}
                    className="text-base font-semibold text-white hover:bg-white/10 rounded-lg px-2 py-1 -mx-2"
                  >
                    年代・年収別 手取り一覧表
                  </Link>
                </li>

                {/* 詳細計算ツール（下層あり） */}
                <li>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-white">詳細計算ツール</span>
                    <button
                      type="button"
                      onClick={() => setOpenSection((prev) => (prev === 'tools' ? null : 'tools'))}
                      className="w-8 h-8 rounded-lg border border-white/30 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                      aria-label="詳細計算ツールを開く"
                      aria-expanded={openSection === 'tools'}
                    >
                      {openSection === 'tools' ? '−' : '+'}
                    </button>
                  </div>
                  {openSection === 'tools' && (
                    <ul className="mt-4 ml-4 space-y-4">
                      <li>
                        <Link href="/job-change" onClick={closeMenu} className="text-base text-white hover:bg-white/10 rounded-lg px-2 py-1 -mx-2">
                          転職者向け計算
                        </Link>
                      </li>
                      <li>
                        <Link href="/fresh-graduate" onClick={closeMenu} className="text-base text-white hover:bg-white/10 rounded-lg px-2 py-1 -mx-2">
                          新卒・就活生向け計算
                        </Link>
                      </li>
                      <li>
                        <Link href="/side-business" onClick={closeMenu} className="text-base text-white hover:bg-white/10 rounded-lg px-2 py-1 -mx-2">
                          副業者向け計算
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* サポート（下層あり） */}
                <li>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-white">サポート</span>
                    <button
                      type="button"
                      onClick={() => setOpenSection((prev) => (prev === 'support' ? null : 'support'))}
                      className="w-8 h-8 rounded-lg border border-white/30 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                      aria-label="サポートを開く"
                      aria-expanded={openSection === 'support'}
                    >
                      {openSection === 'support' ? '−' : '+'}
                    </button>
                  </div>
                  {openSection === 'support' && (
                    <ul className="mt-4 ml-4 space-y-4">
                      <li>
                        <Link href="/faq" onClick={closeMenu} className="text-base text-white hover:bg-white/10 rounded-lg px-2 py-1 -mx-2">
                          よくある質問（FAQ）
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
