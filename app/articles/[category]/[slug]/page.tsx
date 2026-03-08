import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticlesByCategory, getAdsByCategory } from '@/lib/microcms';
import ArticleCard from '@/app/components/v2/article/ArticleCard';
import { createPageMetadata } from '@/app/lib/metadata';
import PageLayout from '@/app/components/v2/layouts/PageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import ComparisonTable from '@/app/components/v2/common/ComparisonTable';
import ArticleCTAButton from '@/app/components/v2/common/ArticleCTAButton';
import PointHeaderBox from '@/app/components/v2/article/PointHeaderBox';
import SectionBar from '@/app/components/v2/common/SectionBar';
import FreeConsultationCTA from '@/app/components/v2/common/FreeConsultationCTA';
import { affiliateServices } from '@/lib/comparisonData';
import { freeConsultationCtaConfig } from '@/lib/articleData/itEngineerSalary';
import {
  isValidCategory,
  getCategoryLabel,
  type ArticleCategorySlug,
  ARTICLE_CATEGORIES,
} from '@/lib/articleCategories';
import type { ArticleBodyBlock, Ad } from '@/lib/microcms';

/** 常に最新の広告データを取得するためキャッシュを無効化 */
export const revalidate = 0;

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

function renderBodyBlock(block: ArticleBodyBlock, index: number, ad: Ad | null) {
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

    if (partType === 'pointbox') {
      const variant = resolveField(block.pointVariant) || 'highlight';
      return (
        <PointHeaderBox
          key={index}
          title={block.pointTitle || ''}
          bodyVariant={variant as 'highlight' | 'bordered'}
        >
          {block.pointBody && (
            <div
              className="article-rich-text font-['Noto_Sans_JP'] text-[14px] leading-[25px] text-[#3f3f3f]"
              dangerouslySetInnerHTML={{ __html: block.pointBody }}
            />
          )}
        </PointHeaderBox>
      );
    }

    if (partType?.toLowerCase() === 'sectionbar') {
      return (
        <SectionBar
          key={index}
          title={block.sectionBarTitle || ''}
          noMargin
        />
      );
    }

    if (partType === 'freeconsultationcta') {
      const deeproService = affiliateServices.find((s) => s.id === 'deepro');
      if (!deeproService) return null;
      return (
        <FreeConsultationCTA
          key={index}
          service={deeproService}
          {...freeConsultationCtaConfig}
          contentLayout
        />
      );
    }

    if (partType === 'cta') {
      const service = ad?.services[0];
      if (!service) return null;
      return (
        <div key={index} className="py-2">
          <ArticleCTAButton href={service.affiliateUrl}>
            {service.ctaText ?? '無料で相談する'}
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

  const { contents: ads } = await getAdsByCategory(category);
  const ad = ads[0] ?? null;

  // 同カテゴリの関連記事を取得（現在の記事を除外して最大10件）
  const { contents: categoryArticles } = await getArticlesByCategory(category, {
    limit: 11,
    fields: ['id', 'title', 'slug', 'description', 'category', 'thumbnail'],
    orders: '-publishedAt',
  });
  const relatedArticles = categoryArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 10);

  const categoryLabel = ARTICLE_CATEGORIES[category as ArticleCategorySlug];

  return (
    <PageLayout maxWidth="content">
      {/* 1. ヒーローセクション（thumbnail画像がある場合のみ） */}
      {article.thumbnail && (
        <section className="w-full overflow-hidden rounded-[2px]">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 750px"
              priority
            />
          </div>
        </section>
      )}

      {/* 2. パンくずリスト */}
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

      {/* 4. タイトル（h1）+ カテゴリタグ */}
      <h1 className="font-['Noto_Sans_JP'] text-[16px] md:text-[20px] font-bold text-[#3f3f3f] pb-4 mb-4 border-b-2 border-[#1390c8]">
        {article.title}
      </h1>
      {article.category.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
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

      {/* 5. 記事本文（bodyBlocksをそのまま表示、calculatorもインラインで表示） */}
      <article className="pt-2 pb-6">
        <div className="flex flex-col gap-4">
          {article.bodyBlocks.map((block, index) => renderBodyBlock(block, index, ad))}
        </div>
      </article>

      {/* 6. 関連記事セクション */}
      {relatedArticles.length > 0 && (
        <section className="pt-4 pb-8">
          <h2 className="font-['Noto_Sans_JP'] text-[16px] md:text-[20px] font-bold text-[#3f3f3f] mb-4">
            同じカテゴリの記事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedArticles.map((related) => (
              <ArticleCard
                key={related.id}
                title={related.title}
                imageUrl={related.thumbnail?.url ?? '/images/default-thumbnail.png'}
                tags={related.category ?? []}
                href={`/articles/${category}/${related.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}
