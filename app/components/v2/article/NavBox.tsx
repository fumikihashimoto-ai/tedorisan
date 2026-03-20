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
    <div className="border-[3px] border-[#BF0000] rounded-none bg-white px-5 py-5 my-6">
      {title && (
        <p className="font-['Noto_Sans_JP'] text-[16px] font-bold text-[#BF0000] mb-4">
          {title}
        </p>
      )}
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className="block px-4 py-3 border border-[#E8E6E0] rounded-md hover:bg-[#FFF5F5] transition-colors no-underline text-[14px] text-[#333333] leading-[1.5]"
          >
            <strong className="text-[#BF0000] font-bold">{link.label}</strong>
            ｜{link.description}
          </Link>
        ))}
      </div>
    </div>
  );
}
