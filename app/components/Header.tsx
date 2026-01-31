'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAGAZINE_GROUP_ORDER, NAV_ITEMS, type NavMenuItem } from '@/app/lib/navigation';

/** マガジンメニュー項目をグループごとに分割 */
function groupMagazineItems(items: NavMenuItem[]) {
  const groups = new Map<string, NavMenuItem[]>();
  for (const item of items) {
    const group = item.group ?? '';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(item);
  }
  return MAGAZINE_GROUP_ORDER.flatMap((groupName) => {
    const groupItems = groups.get(groupName);
    return groupItems ? [{ groupName, items: groupItems }] : [];
  });
}

function isActiveHref(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<'tools' | 'magazine' | null>(null);
  const pathname = usePathname();

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSection(null);
  };

  // スマホメニュー表示中は背景スクロールを抑止
  useEffect(() => {
    if (!isMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMenuOpen]);

  // ルート遷移（pathname変更）時に自動でメニューを閉じる
  useEffect(() => {
    if (!isMenuOpen) return;
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ESCで閉じる（アクセシビリティ改善）
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-[#0a57d1] shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center">
            {/* PC: 2カラム全体幅（左800 + gap32 + 右300 = 1132px）に合わせる */}
            <div className="relative w-full md:w-[1132px] md:flex md:items-center md:justify-between">
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
                className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-sm text-white hover:text-white/90 transition-colors whitespace-nowrap"
              >
                手取り計算ツール - テドリさん
              </Link>

              {/* PC: ヘッダー内メニュー表示（2カラム全体幅の右端に揃える） */}
              <nav className="hidden md:flex items-center">
                {NAV_ITEMS.map((item) =>
                  item.type === 'dropdown' ? (
                    <div
                      key={item.id}
                      className={`nav-dropdown ${item.id === 'tools'
                          ? pathname === '/' || pathname.startsWith(item.activePrefix)
                            ? 'nav-active'
                            : ''
                          : item.id === 'magazine'
                            ? pathname.startsWith('/magazine')
                              ? 'nav-active'
                              : ''
                          : pathname.startsWith(item.activePrefix)
                            ? 'nav-active'
                            : ''
                        }`}
                    >
                      <span className="nav-dropdown-trigger">{item.label}</span>
                      <div className="nav-dropdown-menu">
                        {item.id === 'magazine' ? (
                          groupMagazineItems(item.items).map(({ groupName, items: groupItems }) => (
                            <div key={groupName} className="mb-2 last:mb-0">
                              <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {groupName}
                              </div>
                              {groupItems.map((child) => (
                                <Link key={child.href} href={child.href} className="nav-dropdown-item">
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          ))
                        ) : (
                          item.items.map((child) => (
                            <Link key={child.href} href={child.href} className="nav-dropdown-item">
                              {child.label}
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`nav-item ${isActiveHref(pathname, item.href) ? 'nav-active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
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
          </div>
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
              <div className="text-left">
                {NAV_ITEMS.map((item) =>
                  item.type === 'dropdown' ? (
                    <div key={item.id}>
                      <button
                        type="button"
                        className="mobile-menu-item"
                        onClick={() => setOpenSection((prev) => (prev === item.id ? null : item.id))}
                        aria-expanded={openSection === item.id}
                      >
                        <span>{item.mobileLabel ?? item.label}</span>
                        <span className={`mobile-accordion-toggle ${openSection === item.id ? 'open' : ''}`}>+</span>
                      </button>
                      {openSection === item.id && (
                        <div className="mobile-submenu">
                          {item.id === 'magazine' ? (
                            groupMagazineItems(item.items).map(({ groupName, items: groupItems }) => (
                              <div key={groupName} className="mb-3 last:mb-0">
                                <div className="px-2 py-1 text-xs font-semibold text-white/70">
                                  {groupName}
                                </div>
                                {groupItems.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="mobile-submenu-item"
                                    onClick={closeMenu}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            ))
                          ) : (
                            item.items.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="mobile-submenu-item"
                                onClick={closeMenu}
                              >
                                {child.label}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link key={item.href} href={item.href} onClick={closeMenu} className="mobile-menu-item">
                      <span>{item.mobileLabel ?? item.label}</span>
                    </Link>
                  ),
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
