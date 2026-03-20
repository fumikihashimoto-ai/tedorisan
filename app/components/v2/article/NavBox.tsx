import Link from 'next/link';

export interface NavLink {
  label: string;
  description: string;
  url: string;
}

interface NavBoxProps {
  title: string;
  links: NavLink[];
}

/**
 * navLinksJson（JSON文字列）をパースして NavLink[] を返す。
 * パースに失敗した場合は空配列を返す。
 */
export function parseNavLinks(json: string | undefined): NavLink[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item: unknown): item is NavLink =>
        typeof item === 'object' &&
        item !== null &&
        'label' in item &&
        'description' in item &&
        'url' in item
    );
  } catch {
    return [];
  }
}

export default function NavBox({ title, links }: NavBoxProps) {
  if (links.length === 0) return null;

  return (
    <div className="border-[3px] border-[#128EC7] rounded-none bg-white px-5 py-5 my-6 text-center">
      {title && (
        <p className="font-['Noto_Sans_JP'] text-[18px] font-bold text-[#128EC7] mb-4">
          {title}
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className="block px-4 py-3 border-[2px] border-[#128EC7] rounded bg-white text-[#128EC7] text-[14px] font-bold text-center no-underline hover:bg-[#128EC7] hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
