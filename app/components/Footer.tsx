import Link from 'next/link';

export default function Footer() {
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
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <li>
              <Link href="/" className="text-white hover:text-[#cccccc] transition-colors">
                手取り計算
              </Link>
            </li>
            <li>
              <Link
                href="/comparison/list"
                className="text-white hover:text-[#cccccc] transition-colors"
              >
                年代・年収別 手取り一覧表
              </Link>
            </li>
            <li>
              <Link href="/job-change" className="text-white hover:text-[#cccccc] transition-colors">
                転職者向け計算
              </Link>
            </li>
            <li>
              <Link
                href="/fresh-graduate"
                className="text-white hover:text-[#cccccc] transition-colors"
              >
                新卒・就活生向け計算
              </Link>
            </li>
            <li>
              <Link
                href="/side-business"
                className="text-white hover:text-[#cccccc] transition-colors"
              >
                副業者向け計算
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-white hover:text-[#cccccc] transition-colors">
                よくある質問（FAQ）
              </Link>
            </li>
          </ul>
        </nav>

        {/* コピーライト */}
        <div className="text-center text-sm text-[#cccccc]">
          <p>© {new Date().getFullYear()} 手取り計算ツール - テドリさん All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
