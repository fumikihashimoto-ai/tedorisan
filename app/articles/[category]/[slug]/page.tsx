import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/microcms';
import { createPageMetadata } from '@/app/lib/metadata';
import PageLayout from '@/app/components/v2/layouts/PageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import ComparisonTable from '@/app/components/v2/common/ComparisonTable';
import ArticleCTAButton from '@/app/components/v2/common/ArticleCTAButton';
import { affiliateServices } from '@/lib/comparisonData';
import {
  isValidCategory,
  getCategoryLabel,
  type ArticleCategorySlug,
  ARTICLE_CATEGORIES,
} from '@/lib/articleCategories';
import type { ArticleBodyBlock } from '@/lib/microcms';

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

/** microCMSのセレクトフィールドは配列で返る場合がある。先頭の値を文字列として取得する */
function resolveField(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return (value[0] ?? '').trim().toLowerCase();
  return (value ?? '').trim().toLowerCase();
}

/** partCategoryからComparisonTableのtargetSituationsへマッピング */
const PART_CATEGORY_SITUATIONS: Record<string, string[]> = {
  it: ['it_beginner', 'it_experienced'],
  programming: ['programming'],
  pharmacist: ['pharmacist'],
  'second-graduate': ['second_graduate'],
  'video-editing': ['video_editing'],
};

/** partCategoryからCTAテキストとリンクへマッピング */
const CTA_CONFIG: Record<string, { text: string; href: string }> = {
  it: { text: 'IT転職の無料相談はこちら', href: '/career/it-engineer' },
  programming: { text: 'プログラミングスクールを比較する', href: '/career/programming' },
  pharmacist: { text: '薬剤師の転職相談はこちら', href: '/career/pharmacist' },
  default: { text: '転職相談はこちら', href: '/career' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !isValidCategory(category)) {
    return { title: '記事が見つかりません | 手取りのミカタ' };
  }

  return createPageMetadata({
    title: `${article.title} | 手取りのミカタ`,
    description: article.description,
    canonicalPath: `/articles/${category}/${article.slug}`,
    openGraphType: 'article',
  });
}

function renderBodyBlock(block: ArticleBodyBlock, index: number) {
  // リッチテキストブロック
  if (block.fieldId === 'richTextBlock' && block.richText) {
    return (
      <div
        key={index}
        className="article-rich-text font-['Noto_Sans_JP'] text-[14px] leading-[25px] text-[#3f3f3f]"
        dangerouslySetInnerHTML={{ __html: block.richText }}
      />
    );
  }

  // パーツブロック
  if (block.fieldId === 'partsBlock') {
    const partType = resolveField(block.partType);
    const partCategory = resolveField(block.partCategory);

    if (partType === 'calculator') {
      return <TedoriCalculator key={index} noMargin contentLayout />;
    }

    if (partType === 'comparison') {
      const situations = PART_CATEGORY_SITUATIONS[partCategory] ?? ['it_beginner'];
      return (
        <ComparisonTable
          key={index}
          targetSituations={situations}
          title="転職サイト簡単比較表"
          services={affiliateServices}
        />
      );
    }

    if (partType === 'cta') {
      const config = CTA_CONFIG[partCategory] ?? CTA_CONFIG.default;
      return (
        <div key={index} className="py-2">
          <ArticleCTAButton href={config.href}>
            {config.text}
          </ArticleCTAButton>
        </div>
      );
    }

    // 未知のpartType
    return (
      <div
        key={index}
        className="bg-[#f5f5f5] border border-[#e6e6e6] rounded p-4 text-center"
      >
        <p className="font-['Noto_Sans_JP'] text-[12px] text-[#64748B]">
          パーツ: {partType || '不明'}
        </p>
      </div>
    );
  }

  return null;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { category, slug } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const article = await getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const categoryLabel = ARTICLE_CATEGORIES[category as ArticleCategorySlug];

  return (
    <PageLayout maxWidth="content">
      {/* ヒーローセクション（thumbnail画像がある場合のみ） */}
      {article.thumbnail && (
        <section className="relative w-full overflow-hidden rounded-[2px]">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 750px"
              priority
            />
            {/* 暗いグラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            {/* タイトルオーバーレイ */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h1 className="font-['Noto_Sans_JP'] text-[16px] md:text-[20px] font-bold text-white leading-[1.5] drop-shadow-md">
                {article.title}
              </h1>
              {article.category.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {article.category.map((cat) => (
                    <span
                      key={cat}
                      className="font-['Noto_Sans_JP'] text-[10px] text-white bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded"
                    >
                      {getCategoryLabel(cat)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* パンくずリスト */}
      <nav className="font-['Noto_Sans_JP'] text-[12px] text-[#64748B] py-3">
        <Link href="/" className="hover:text-[#1390c8]">TOP</Link>
        <span className="mx-1">&gt;</span>
        <Link href="/articles" className="hover:text-[#1390c8]">記事一覧</Link>
        <span className="mx-1">&gt;</span>
        <Link href={`/articles/${category}`} className="hover:text-[#1390c8]">
          {categoryLabel}
        </Link>
        <span className="mx-1">&gt;</span>
        <span className="text-[#3f3f3f] line-clamp-1">{article.title}</span>
      </nav>

      <article className="py-6">
        {/* thumbnailがない場合のみ通常のh1タイトルを表示 */}
        {!article.thumbnail && (
          <>
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
                    {getCategoryLabel(cat)}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        <div className="flex flex-col gap-6">
          {article.bodyBlocks.map((block, index) => renderBodyBlock(block, index))}
        </div>
      </article>
    </PageLayout>
  );
}
