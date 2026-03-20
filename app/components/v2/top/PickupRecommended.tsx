import type { Article } from '@/lib/microcms';
import ArticleCard from '@/app/components/v2/article/ArticleCard';

interface PickupRecommendedProps {
  articles: Article[];
}

export default function PickupRecommended({ articles }: PickupRecommendedProps) {
  if (articles.length === 0) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-4 md:py-6 lg:py-8">
      <h2 className="font-['Noto_Sans_JP'] text-[16px] md:text-[20px] font-bold text-[#3f3f3f] border-l-4 border-[#1390c8] pl-3 mb-4">
        おすすめ記事
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            imageUrl={article.thumbnail?.url ?? '/images/default-thumbnail.png'}
            tags={article.category ?? []}
            href={`/articles/${article.category?.[0] ?? 'career-change'}/${article.slug}`}
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
          />
        ))}
      </div>
    </section>
  );
}
