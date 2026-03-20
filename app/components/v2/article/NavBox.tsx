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
    <div className="bg-[#FFF8F0] p-5 my-6 rounded-lg border border-[#F0D0A8]">
      {title && (
        <p className="font-bold text-base text-[#7A4A0A] mb-4">
          {title}
        </p>
      )}
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className="block px-4 py-3 bg-white border border-[#F0D0A8] rounded-md no-underline text-[#333] text-sm leading-normal hover:bg-[#FFF5E6] transition-colors"
          >
            <strong className="text-[#C4500A]">{link.label}</strong>
            ｜{link.description}
          </Link>
        ))}
      </div>
    </div>
  );
}
