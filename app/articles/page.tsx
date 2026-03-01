import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/microcms';
import { createPageMetadata } from '@/app/lib/metadata';
import PageLayout from '@/app/components/v2/layouts/PageLayout';

export const metadata: Metadata = createPageMetadata({
  title: '記事一覧 | 手取りのミカタ',
  description: '手取りのミカタの記事一覧ページです。年収・手取り・転職に関する最新情報をお届けします。',
  canonicalPath: '/articles',
  openGraphType: 'website',
});

export default async function ArticlesPage() {
  const { contents: articles } = await getArticles({
    fields: ['id', 'title', 'slug', 'description', 'category', 'thumbnail'],
  });

  return (
    <PageLayout maxWidth="content">
      <h1 className="font-['Noto_Sans_JP'] text-[16px] font-bold text-[#3f3f3f] py-6 border-b-2 border-[#1390c8]">
        記事一覧
      </h1>

      {articles.length === 0 ? (
        <p className="font-['Noto_Sans_JP'] text-[14px] text-[#64748B] py-10 text-center">
          記事が見つかりませんでした。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
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
                        {cat}
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
