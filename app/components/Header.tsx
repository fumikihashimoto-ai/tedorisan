'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-[#FFFEF9] shadow-sm border-b border-[#F7C93D]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          {/* 左側: 空白（バランス用） */}
          <div className="w-10" />

          {/* 中央: ロゴ */}
          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 font-bold text-sm md:text-xl text-gray-800 hover:text-orange-600 transition-colors whitespace-nowrap"
          >
            手取り計算ツール - テドリさん
          </Link>

          {/* 右側: メニューボタン */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-2xl cursor-pointer text-gray-700 hover:text-orange-600 transition-colors z-10"
            aria-label="メニューを開く"
          >
            ☰
          </button>
        </div>
      </header>

      {/* スライドメニュー（ドロワー） */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-[#FFFEF9] shadow-2xl z-50 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* ヘッダー部分 */}
          <div className="pb-4 border-b border-yellow-300 px-6 pt-4 flex justify-end">
            <button
              onClick={closeMenu}
              className="text-2xl cursor-pointer text-gray-700 hover:text-orange-600 transition-colors"
              aria-label="メニューを閉じる"
            >
              ×
            </button>
          </div>

          {/* ナビゲーション */}
          <nav className="py-6 flex-1 overflow-y-auto">
            <ul className="space-y-2 px-4">
              <li>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block py-3 px-4 rounded-2xl hover:bg-yellow-50 transition-colors text-gray-800 font-semibold"
                >
                  🏠 手取り計算（TOP）
                </Link>
              </li>

              <li>
                <Link
                  href="/comparison/list"
                  onClick={closeMenu}
                  className="block py-3 px-4 rounded-2xl hover:bg-yellow-50 transition-colors text-gray-800 font-semibold"
                >
                  📊 年代・年収別 手取り一覧表
                </Link>
              </li>

              <li className="border-t border-yellow-200 pt-4">
                <p className="text-xs text-gray-500 mb-2 px-4">詳細計算ツール</p>
              </li>

              <li>
                <Link
                  href="/job-change"
                  onClick={closeMenu}
                  className="block py-3 px-4 rounded-2xl hover:bg-yellow-50 transition-colors text-gray-800"
                >
                  💼 転職者向け計算
                </Link>
              </li>

              <li>
                <Link
                  href="/fresh-graduate"
                  onClick={closeMenu}
                  className="block py-3 px-4 rounded-2xl hover:bg-yellow-50 transition-colors text-gray-800"
                >
                  🎓 新卒・就活生向け計算
                </Link>
              </li>

              <li>
                <Link
                  href="/side-business"
                  onClick={closeMenu}
                  className="block py-3 px-4 rounded-2xl hover:bg-yellow-50 transition-colors text-gray-800"
                >
                  💻 副業者向け計算
                </Link>
              </li>

              <li className="border-t border-yellow-200 pt-4">
                <p className="text-xs text-gray-500 mb-2 px-4">サポート</p>
              </li>

              <li>
                <Link
                  href="/faq"
                  onClick={closeMenu}
                  className="block py-3 px-4 rounded-2xl hover:bg-orange-50 transition-colors text-gray-800 font-semibold"
                >
                  ❓ よくある質問（FAQ）
                </Link>
              </li>
            </ul>
          </nav>

          {/* アフィリエイト領域 */}
          <div className="border-t border-yellow-200 pt-6 mt-6">
            <h3 className="px-6 pb-4 font-semibold text-gray-900">
              💡 おすすめサービス
            </h3>
            <div className="px-6 space-y-3 pb-6">
              {/* バナー1 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-1">転職で年収UP</h4>
                <p className="text-sm text-gray-600 mb-3">無料で求人検索</p>
                <a
                  href="#"
                  className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:scale-105"
                >
                  詳しく見る
                </a>
              </div>

              {/* バナー2 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-1">確定申告を簡単に</h4>
                <p className="text-sm text-gray-600 mb-3">会計ソフト</p>
                <a
                  href="#"
                  className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:scale-105"
                >
                  詳しく見る
                </a>
              </div>

              {/* バナー3 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-1">クレカでポイント</h4>
                <p className="text-sm text-gray-600 mb-3">年会費無料</p>
                <a
                  href="#"
                  className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:scale-105"
                >
                  詳しく見る
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 背景オーバーレイ */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
