import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/microcms';
import { formatArticleDate } from '@/lib/dateFormat';
import { createPageMetadata } from '@/app/lib/metadata';
import PageLayout from '@/app/components/v2/layouts/PageLayout';
import { ARTICLE_CATEGORIES, CATEGORY_LABELS, getCategoryLabel } from '@/lib/articleCategories';

export const revalidate = 60;

export const metadata: Metadata = createPageMetadata({
  title: '記事一覧',
  description: '手取りのミカタの記事一覧ページです。年収・手取り・転職に関する最新情報をお届けします。',
  canonicalPath: '/articles',
  openGraphType: 'website',
});

export default async function ArticlesPage() {
  const { contents: articles } = await getArticles({
    fields: ['id', 'title', 'slug', 'description', 'category', 'thumbnail', 'publishedAt', 'updatedAt'],
    orders: '-publishedAt',
  });

  return (
    <PageLayout maxWidth="content">
      {/* パンくずリスト */}
      <nav className="font-['Noto_Sans_JP'] text-[12px] text-[#64748B] py-3">
        <Link href="/" className="hover:text-[#1390c8]">TOP</Link>
        <span className="mx-1">&gt;</span>
        <span className="text-[#3f3f3f]">記事一覧</span>
      </nav>

      <h1 className="font-['Noto_Sans_JP'] text-[16px] font-bold text-[#3f3f3f] py-6 border-b-2 border-[#1390c8]">
        記事一覧
      </h1>

      {/* カテゴリ一覧 */}
      <section className="py-6">
        <h2 className="font-['Noto_Sans_JP'] text-[14px] font-bold text-[#3f3f3f] mb-3">
          カテゴリから探す
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.keys(ARTICLE_CATEGORIES).map((slug) => (
            <Link
              key={slug}
              href={`/articles/${slug}`}
              className="flex items-center justify-between bg-white border border-[#e6e6e6] rounded-[4px] p-4 hover:border-[#1390c8] transition-colors duration-200"
            >
              <span className="font-['Noto_Sans_JP'] text-[14px] font-bold text-[#3f3f3f]">
                {CATEGORY_LABELS[slug] ?? slug}
              </span>
              <span className="font-['Noto_Sans_JP'] text-[12px] text-[#1390c8]">
                記事一覧を見る →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新記事 */}
      <section>
        <h2 className="font-['Noto_Sans_JP'] text-[14px] font-bold text-[#3f3f3f] mb-4">
          最新記事
        </h2>

        {articles.length === 0 ? (
          <p className="font-['Noto_Sans_JP'] text-[14px] text-[#64748B] py-10 text-center">
            記事が見つかりませんでした。
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
            {articles.map((article) => {
              const primaryCategory = article.category[0] ?? 'career-change';
              return (
                <Link
                  key={article.id}
                  href={`/articles/${primaryCategory}/${article.slug}`}
                  className="flex flex-col bg-white rounded-[2px] overflow-hidden border border-[#e6e6e6] hover:shadow-md transition-shadow duration-200"
                >
                  {article.thumbnail ? (
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={article.thumbnail.url}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/9] bg-[#f5f5f5] flex items-center justify-center">
                      <span className="font-['Noto_Sans_JP'] text-[12px] text-[#64748B]">
                        No Image
                      </span>
                    </div>
                  )}

                  <div className="p-3 flex flex-col gap-2">
                    {formatArticleDate(article.publishedAt, article.updatedAt) && (
                      <p className="font-['Noto_Sans_JP'] text-xs text-gray-500">
                        {formatArticleDate(article.publishedAt, article.updatedAt)}
                      </p>
                    )}
                    <h3 className="font-['Noto_Sans_JP'] text-[14px] font-bold text-[#3f3f3f] line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="font-['Noto_Sans_JP'] text-[12px] text-[#64748B] leading-[20px] line-clamp-2">
                      {article.description}
                    </p>
                    {article.category.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {article.category.map((cat) => (
                          <span
                            key={cat}
                            className="font-['Noto_Sans_JP'] text-[10px] text-[#1390c8] bg-[#f0f9ff] px-1.5 py-0.5 rounded"
                          >
                            {getCategoryLabel(cat)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
