import type { RecommendArticle } from '@/lib/topPageTypes';
import RecommendBlockHeading from './common/RecommendBlockHeading';
import ArticleCard from './article/ArticleCard';

interface RecommendSectionProps {
  articles: RecommendArticle[];
  /** 見出しのサブラベル（デフォルト: おすすめコンテンツ） */
  subLabel?: string;
  /** コンテナのクラス名（指定時はこれを使用、未指定時はデフォルトの max-w-md） */
  containerClassName?: string;
}

export function RecommendSection({
  articles,
  subLabel = 'おすすめコンテンツ',
  containerClassName = 'max-w-md mx-auto px-[10px]',
}: RecommendSectionProps) {
  return (
    <section className="bg-[var(--color-v2-bg)] py-4 md:py-6 lg:py-8">
      <div className={containerClassName}>
        <RecommendBlockHeading subLabel={subLabel} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              imageUrl={article.imageUrl}
              tags={article.tags}
              href={article.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
