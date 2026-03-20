import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/microcms';
import { CATEGORY_LABELS } from '@/lib/articleCategories';

interface PickupHeroProps {
  article: Article;
}

export default function PickupHero({ article }: PickupHeroProps) {
  const category = article.category?.[0] ?? 'career-change';
  const href = `/articles/${category}/${article.slug}`;

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-4 md:py-6 lg:py-8">
      <Link href={href} className="block group">
        {/* サムネイル画像 */}
        {article.thumbnail ? (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[#f5f5f5]">
            <Image
              src="/images/default-thumbnail.png"
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {/* テキスト情報 */}
        <div className="mt-4">
          {/* カテゴリタグ */}
          {article.category.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {article.category.map((cat) => (
                <span
                  key={cat}
                  className="font-['Noto_Sans_JP'] text-[10px] text-[#1390c8] bg-[#f0f9ff] px-1.5 py-0.5 rounded"
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </span>
              ))}
            </div>
          )}

          {/* タイトル */}
          <h2 className="font-['Noto_Sans_JP'] text-xl md:text-2xl font-bold text-[#3f3f3f] group-hover:text-[#1390c8] transition-colors duration-200">
            {article.title}
          </h2>

          {/* 説明文 */}
          {article.description && (
            <p className="font-['Noto_Sans_JP'] text-sm text-gray-600 mt-2 line-clamp-2">
              {article.description}
            </p>
          )}
        </div>
      </Link>
    </section>
  );
}
