import type { ArticleBodyBlock } from '@/lib/microcms';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  bodyBlocks: ArticleBodyBlock[];
}

/** richTextBlock の HTML 文字列から h2/h3 タグを抽出して目次項目を生成する */
function extractHeadings(bodyBlocks: ArticleBodyBlock[]): TocItem[] {
  const headings: TocItem[] = [];
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi;

  for (const block of bodyBlocks) {
    if (block.fieldId !== 'richTextBlock' || !block.richText) continue;

    let match: RegExpExecArray | null;
    while ((match = regex.exec(block.richText)) !== null) {
      const level = Number(match[1]) as 2 | 3;
      // HTMLタグを除去してプレーンテキストを取得
      const text = match[3].replace(/<[^>]*>/g, '').trim();
      if (text) {
        headings.push({ id: match[2], text, level });
      }
    }
  }

  return headings;
}

export default function TableOfContents({ bodyBlocks }: TableOfContentsProps) {
  const headings = extractHeadings(bodyBlocks);

  // 見出しが2件未満の場合は表示しない
  if (headings.length < 2) return null;

  return (
    <nav className="bg-white border border-[#e6e6e6] rounded-none p-4 mb-6">
      <p className="font-['Noto_Sans_JP'] text-[14px] font-bold text-[#3f3f3f] mb-3">
        目次
      </p>
      <ol className="list-none m-0 p-0 space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'pl-4' : ''}
          >
            <a
              href={`#${heading.id}`}
              className={`
                font-['Noto_Sans_JP'] text-[13px] leading-[22px] text-[#1390c8]
                hover:text-[#0e6f9c] hover:underline
                block py-0.5
                ${heading.level === 3 ? 'text-[12px] text-[#64748B] hover:text-[#1390c8] before:content-["└"] before:mr-1 before:text-[#e6e6e6]' : 'font-medium'}
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
