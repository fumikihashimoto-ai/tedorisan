import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/microcms';
import { createPageMetadata } from '@/app/lib/metadata';
import PageLayout from '@/app/components/v2/layouts/PageLayout';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: '記事が見つかりません | 手取りのミカタ' };
  }

  return createPageMetadata({
    title: `${article.title} | 手取りのミカタ`,
    description: article.description,
    canonicalPath: `/articles/${article.slug}`,
    openGraphType: 'article',
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <PageLayout maxWidth="content">
      <article className="py-6">
        <h1 className="font-['Noto_Sans_JP'] text-[16px] font-bold text-[#3f3f3f] pb-4 mb-6 border-b-2 border-[#1390c8]">
          {article.title}
        </h1>

        {article.category.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
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

        <div className="flex flex-col gap-6">
          {article.bodyBlocks.map((block, index) => {
            if (block.fieldId === 'richTextBlock' && block.richText) {
              return (
                <div
                  key={index}
                  className="article-rich-text font-['Noto_Sans_JP'] text-[14px] leading-[25px] text-[#3f3f3f]"
                  dangerouslySetInnerHTML={{ __html: block.richText }}
                />
              );
            }

            if (block.fieldId === 'partsBlock') {
              return (
                <div
                  key={index}
                  className="bg-[#f5f5f5] border border-[#e6e6e6] rounded p-4 text-center"
                >
                  <p className="font-['Noto_Sans_JP'] text-[12px] text-[#64748B]">
                    {block.partType === 'calculator' && 'ここに計算ツールが入ります'}
                    {block.partType === 'comparison' && 'ここに比較表が入ります'}
                    {block.partType === 'cta' && 'ここにCTAが入ります'}
                    {!['calculator', 'comparison', 'cta'].includes(block.partType ?? '') &&
                      `パーツ: ${block.partType ?? '不明'}`}
                  </p>
                </div>
              );
            }

            return null;
          })}
        </div>
      </article>
    </PageLayout>
  );
}
