'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRelatedLinks } from '@/lib/relatedLinks';

export default function RelatedLinks() {
  const pathname = usePathname();
  const links = getRelatedLinks(pathname);

  if (links.length === 0) return null;

  return (
    <section
      className="border-t border-[#E2E8F0] bg-white pt-8 pb-0"
      aria-labelledby="related-links-heading"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="w-full lg:max-w-[1128px] xl:max-w-[1268px]">
          {/* ヘッダー: RECOMMEND */}
          <h2
            id="related-links-heading"
            className="mb-6"
          >
            <span className="text-xl font-bold text-[#1E293B]">RECOMMEND</span>
            <span className="block mt-1 h-0.5 w-16 bg-[#1E293B]" aria-hidden />
          </h2>

          {/* カードグリッド（スマホ2列・PC3列） */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg overflow-hidden hover:opacity-95 transition-opacity group"
                >
                  {/* サムネイル（16:9） */}
                  <div className="relative w-full aspect-[16/9] rounded-t-lg overflow-hidden bg-[#f1f5f9]">
                    <Image
                      src={link.image}
                      alt=""
                      width={640}
                      height={360}
                      quality={90}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* コンテンツ（タイトル・タグ） */}
                  <div className="p-4">
                    <span className="block font-bold text-[#1E293B] text-sm sm:text-base line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                      {link.label}
                    </span>
                    <span className="mt-2 inline-flex w-fit px-2.5 py-0.5 text-xs font-medium rounded-full border border-[#2563EB] text-[#2563EB] bg-white">
                      {link.category}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
