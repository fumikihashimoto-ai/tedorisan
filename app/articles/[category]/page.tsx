import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticlesByCategory } from '@/lib/microcms';
import { formatArticleDate } from '@/lib/dateFormat';
import { createPageMetadata } from '@/app/lib/metadata';
import PageLayout from '@/app/components/v2/layouts/PageLayout';
import {
  ARTICLE_CATEGORIES,
  isValidCategory,
  getCategoryLabel,
} from '@/lib/articleCategories';

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return Object.keys(ARTICLE_CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) {
    return { title: 'カテゴリが見つかりません' };
  }

  const label = ARTICLE_CATEGORIES[category];
  return createPageMetadata({
    title: `${label}の記事一覧`,
    description: `${label}に関する記事一覧です。年収・手取り・転職に関する最新情報をお届けします。`,
    canonicalPath: `/articles/${category}`,
    openGraphType: 'website',
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isValidCategory(category)) {
    notFound();
  }

  const label = ARTICLE_CATEGORIES[category];
  const { contents: articles } = await getArticlesByCategory(category, {
    fields: ['id', 'title', 'slug', 'description', 'category', 'thumbnail', 'publishedAt', 'updatedAt'],
    orders: '-publishedAt',
  });

  return (
    <PageLayout maxWidth="content">
      {/* パンくずリスト */}
      <nav className="font-['Noto_Sans_JP'] text-[12px] text-[#64748B] py-3">
        <Link href="/" className="hover:text-[#1390c8]">TOP</Link>
        <span className="mx-1">&gt;</span>
        <Link href="/articles" className="hover:text-[#1390c8]">記事一覧</Link>
        <span className="mx-1">&gt;</span>
        <span className="text-[#3f3f3f]">{label}</span>
      </nav>

      <h1 className="font-['Noto_Sans_JP'] text-[16px] font-bold text-[#3f3f3f] py-6 border-b-2 border-[#1390c8]">
        {label}の記事一覧
      </h1>

      {articles.length === 0 ? (
        <p className="font-['Noto_Sans_JP'] text-[14px] text-[#64748B] py-10 text-center">
          このカテゴリの記事はまだありません。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${category}/${article.slug}`}
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
                <h2 className="font-['Noto_Sans_JP'] text-[14px] font-bold text-[#3f3f3f] line-clamp-2">
                  {article.title}
                </h2>
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
          ))}
        </div>
      )}
    </PageLayout>
  );
}
