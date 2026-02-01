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
  const [openSection, setOpenSection] = useState<'tools' | 'magazine' | 'qualifications' | null>(null);
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
      <header className="shadow-sm border-b border-[#E2E8F0] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="h-14 md:h-16 flex items-center">
            {/* PC: 2カラム全体幅（記事+gap+サイドバー）に合わせ、ロゴは左端・ナビは右カラム右端に配置 */}
            <div className="relative w-full md:flex md:items-center md:justify-between lg:max-w-[1128px] xl:max-w-[1268px]">
              {/* PC: 左寄せロゴテキスト + キャッチコピー */}
              <div className="hidden md:flex md:items-center md:gap-4">
                <Link
                  href="/"
                  className="py-1.5 hover:opacity-90 transition-opacity text-2xl font-black"
                  style={{ color: '#3589fb' }}
                  aria-label="手取りのミカタ - 手取り計算・年収シミュレーション・転職の無料ツール"
                >
                  手取りのミカタ
                </Link>
                <span className="text-[12px] text-[#64748B] whitespace-nowrap font-semibold">
                  手取り計算・年収シミュレーション・転職の無料ツール
                </span>
              </div>

              {/* スマホ: 中央ロゴテキスト + キャッチコピー（縦並び） */}
              <Link
                href="/"
                className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-0.5 py-1 hover:opacity-90 transition-opacity"
                aria-label="手取りのミカタ - 手取り計算・年収シミュレーション・転職の無料ツール"
              >
                <span className="text-xl font-black" style={{ color: '#3589fb' }}>
                  手取りのミカタ
                </span>
                <span className="text-[11px] text-[#64748B] font-semibold whitespace-nowrap">
                  手取り計算・年収シミュレーション・転職の無料ツール
                </span>
              </Link>

              {/* PC: ヘッダー内メニュー表示（右カラムの右端に揃える） */}
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
                          : item.id === 'qualifications'
                            ? pathname.startsWith('/qualifications')
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

              {/* スマホ: メニューボタン（シンプル・お洒落） */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden ml-auto p-2 flex items-center justify-center text-[#1E293B] hover:opacity-80 transition-opacity z-10"
                aria-label="メニューを開く"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
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
          <div className="absolute inset-0 text-white bg-[#2563EB]">
            {/* 上部バー */}
            <div className="h-12 px-4 flex items-center justify-between border-b border-white/20">
              <div className="font-bold text-white">メニュー</div>
              <button
                type="button"
                onClick={closeMenu}
                className="p-2 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                aria-label="メニューを閉じる"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* リンク（左寄せ・シンプル） */}
            <nav className="px-6 py-6 overflow-y-auto h-[calc(100%-3rem)]">
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
