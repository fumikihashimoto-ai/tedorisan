import Link from 'next/link';
import { FOOTER_SECTIONS, MAGAZINE_GROUP_ORDER } from '@/app/lib/navigation';

/** リンクをグループごとに分割（group を持つリンクのみ） */
function groupFooterLinks(links: { href: string; label: string; group?: string }[]) {
  const hasGroups = links.some((l) => l.group);
  if (!hasGroups) return null;
  const groups = new Map<string, { href: string; label: string }[]>();
  for (const link of links) {
    const group = link.group ?? '';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push({ href: link.href, label: link.label });
  }
  return MAGAZINE_GROUP_ORDER.flatMap((groupName) => {
    const groupLinks = groups.get(groupName);
    return groupLinks ? [{ groupName, links: groupLinks }] : [];
  });
}

export default function Footer() {
  const sections = FOOTER_SECTIONS;

  return (
    <footer className="bg-[#1E293B] border-t border-[#E2E8F0] mt-16 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* サイト名 */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-[#cccccc] transition-colors"
          >
            手取り計算シミュレーションツール テドリさん
          </Link>
        </div>

        {/* ページリンク */}
        <nav className="mb-6">
          {/* モバイル: 折りたたみ（JS不要） */}
          <div className="md:hidden space-y-3">
            {sections.map((section) => {
              const grouped = groupFooterLinks(section.links);
              return (
                <details key={section.title} className="border-t border-white/20 pt-3">
                  <summary className="cursor-pointer select-none font-bold text-white/90 text-sm list-none flex items-center justify-between">
                    <span>{section.title}</span>
                    <span className="text-white/70">＋</span>
                  </summary>
                  <div className="mt-3 space-y-4">
                    {grouped ? (
                      grouped.map(({ groupName, links: groupLinks }) => (
                        <div key={groupName}>
                          <div className="text-xs font-semibold text-white/70 mb-2">{groupName}</div>
                          <ul className="space-y-2 text-sm">
                            {groupLinks.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="text-white hover:text-[#cccccc] transition-colors">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <ul className="space-y-2 text-sm">
                        {section.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="text-white hover:text-[#cccccc] transition-colors">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              );
            })}
          </div>

          {/* PC: 3列 */}
          <div className="hidden md:grid gap-8 md:grid-cols-3">
            {sections.map((section) => {
              const grouped = groupFooterLinks(section.links);
              return (
                <div key={section.title}>
                  <div className="text-sm font-bold mb-3 text-white/90">{section.title}</div>
                  {grouped ? (
                    <div className="space-y-4">
                      {grouped.map(({ groupName, links: groupLinks }) => (
                        <div key={groupName}>
                          <div className="text-xs font-semibold text-white/70 mb-2">{groupName}</div>
                          <ul className="space-y-2 text-sm">
                            {groupLinks.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="text-white hover:text-[#cccccc] transition-colors">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      {section.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="text-white hover:text-[#cccccc] transition-colors">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* コピーライト */}
        <div className="text-center text-sm text-[#cccccc]">
          <p>© {new Date().getFullYear()} 手取り計算シミュレーションツール テドリさん All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
