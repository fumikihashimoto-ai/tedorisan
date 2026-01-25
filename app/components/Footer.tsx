import Link from 'next/link';
import { FOOTER_SECTIONS } from '@/app/lib/navigation';

export default function Footer() {
  const sections = FOOTER_SECTIONS;

  return (
    <footer className="bg-[#2e363b] border-t border-[#e0e0e0] mt-16 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* サイト名 */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-[#cccccc] transition-colors"
          >
            手取り計算ツール - テドリさん
          </Link>
        </div>

        {/* ページリンク */}
        <nav className="mb-6">
          {/* モバイル: 折りたたみ（JS不要） */}
          <div className="md:hidden space-y-3">
            {sections.map((section) => (
              <details key={section.title} className="border-t border-white/20 pt-3">
                <summary className="cursor-pointer select-none font-bold text-white/90 text-sm list-none flex items-center justify-between">
                  <span>{section.title}</span>
                  <span className="text-white/70">＋</span>
                </summary>
                <ul className="mt-3 space-y-2 text-sm">
                  {section.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white hover:text-[#cccccc] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          {/* PC: 3列 */}
          <div className="hidden md:grid gap-8 md:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <div className="text-sm font-bold mb-3 text-white/90">{section.title}</div>
                <ul className="space-y-2 text-sm">
                  {section.links.map((l) => (
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
        </nav>

        {/* コピーライト */}
        <div className="text-center text-sm text-[#cccccc]">
          <p>© {new Date().getFullYear()} 手取り計算ツール - テドリさん All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
