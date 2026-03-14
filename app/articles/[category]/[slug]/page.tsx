import type { Metadata } from 'next';
import { cache } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticlesByCategory, getAdServices, getAdCreatives } from '@/lib/microcms';
import { matchAdServices, findCreatives, resolveField } from '@/lib/adUtils';
import { findInlineBannerTarget } from '@/lib/inlineAdHelper';
import { renderBodyBlock } from '@/app/components/v2/article/BodyBlockRenderer';
import AdBanner300x250 from '@/app/components/v2/article/AdBanner300x250';
import AdText from '@/app/components/v2/article/AdText';
import AdBannerFooter from '@/app/components/v2/article/AdBannerFooter';
import ArticleCard from '@/app/components/v2/article/ArticleCard';
import { createPageMetadata, SITE_URL } from '@/app/lib/metadata';
import PageLayout from '@/app/components/v2/layouts/PageLayout';
import ComparisonTable from '@/app/components/v2/common/ComparisonTable';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import TableOfContents from '@/app/components/v2/article/TableOfContents';
import { affiliateServices } from '@/lib/comparisonData';
import {
  isValidCategory,
  getCategoryLabel,
  ARTICLE_CATEGORIES,
} from '@/lib/articleCategories';
import { ARTICLE_CATEGORY_SITUATIONS } from '@/lib/categoryMapping';
import type { AdCreative } from '@/lib/microcms';

/** 同一リクエスト内で getArticleBySlug の重複呼び出しを防ぐ（generateMetadata と page で共有） */
const getArticleCached = cache((slug: string) => getArticleBySlug(slug));

/** 常に最新の広告データを取得するためキャッシュを無効化 */
export const revalidate = 0;

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticleCached(slug);

  if (!article || !isValidCategory(category)) {
    return { title: '記事が見つかりません' };
  }

  return createPageMetadata({
    title: article.title,
    description: article.description,
    canonicalPath: `/articles/${category}/${article.slug}`,
    openGraphType: 'article',
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { category, slug } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  // 記事・広告・関連記事を並列取得（APIレスポンス待ちを最小化）
  const [article, { contents: categoryArticles }, { contents: adServices }, { contents: adCreatives }] = await Promise.all([
    getArticleCached(slug),
    getArticlesByCategory(category, {
      limit: 11,
      fields: ['id', 'title', 'slug', 'description', 'category', 'thumbnail'],
      orders: '-publishedAt',
    }),
    getAdServices({ limit: 100, filters: 'is_active[equals]true' }),
    getAdCreatives({ limit: 100, filters: 'is_active[equals]true' }),
  ]);

  if (!article) {
    notFound();
  }

  // v4広告マッチング: fixed_ad_creative が設定されていればマッチングをスキップ
  const hasFixedAd = Array.isArray(article.fixed_ad_creative) && article.fixed_ad_creative.length > 0;

  let banners300x250: AdCreative[] = [];
  let banners320x50: AdCreative[] = [];
  let textAds: AdCreative[] = [];

  if (hasFixedAd) {
    // 固定広告素材からフォーマット別に取得
    const fixedCreatives = article.fixed_ad_creative!;
    banners300x250 = fixedCreatives.filter((c) => c.is_active && resolveField(c.format) === 'banner_300x250');
    banners320x50 = fixedCreatives.filter((c) => c.is_active && resolveField(c.format) === 'banner_320x50');
    textAds = fixedCreatives.filter((c) => c.is_active && resolveField(c.format) === 'text');
  } else {
    // 通常のマッチングロジック
    const matchedServices = matchAdServices(adServices, category, article.target_occupation);
    const matchedServiceIds = matchedServices.map((s) => s.id);
    banners300x250 = findCreatives(adCreatives, matchedServiceIds, 'banner_300x250');
    banners320x50 = findCreatives(adCreatives, matchedServiceIds, 'banner_320x50');
    textAds = findCreatives(adCreatives, matchedServiceIds, 'text');
  }

  const relatedArticles = categoryArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 10);

  const categoryLabel = ARTICLE_CATEGORIES[category];

  // インラインバナー挿入ターゲットの計算
  const showInlineBanner = article.show_ad_300x250 && banners300x250.length > 0;
  const inlineTarget = showInlineBanner
    ? findInlineBannerTarget(article.bodyBlocks)
    : null;

  return (
    <PageLayout maxWidth="content">
      {/* 0. 構造化データ（JSON-LD） */}
      <ArticleStructuredData
        headline={article.title}
        description={article.description}
        url={`/articles/${category}/${article.slug}`}
        datePublished={article.publishedAt}
        dateModified={article.updatedAt}
        image={article.thumbnail?.url}
      />

      {/* 1. ヒーローセクション（thumbnail画像がある場合のみ） */}
      {article.thumbnail && (
        <section className="w-[calc(100%+32px)] mx-[-16px] overflow-hidden">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        </section>
      )}

      {/* 2. パンくずリスト（JSON-LD + 表示） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'TOP', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: '記事一覧', item: `${SITE_URL}/articles` },
              { '@type': 'ListItem', position: 3, name: categoryLabel, item: `${SITE_URL}/articles/${category}` },
              { '@type': 'ListItem', position: 4, name: article.title, item: `${SITE_URL}/articles/${category}/${article.slug}` },
            ],
          }),
        }}
      />
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

      {/* 4.5. 目次 */}
      <TableOfContents bodyBlocks={article.bodyBlocks} />

      {/* 4.55. PC専用 300×250バナー（目次直後・テキスト広告前） */}
      {showInlineBanner && (
        <AdBanner300x250 creatives={banners300x250} pcOnly />
      )}

      {/* 4.6. テキスト広告（目次直後・本文前） */}
      {textAds.length > 0 && <AdText creatives={textAds} category={category} />}

      {/* 5. 記事本文 */}
      <article className="pt-2 pb-6">
        <div className="flex flex-col gap-4">
          {article.bodyBlocks.map((block, index) => {
            if (inlineTarget) {
              const { targetBlockIndex, targetH2InBlock, firstH2BlockIndex } = inlineTarget;
              if (targetBlockIndex !== -1 && index === targetBlockIndex) {
                return renderBodyBlock(block, index, { creatives: banners300x250, mode: 'before', nthH2: targetH2InBlock });
              }
              if (targetBlockIndex === -1 && index === firstH2BlockIndex) {
                return renderBodyBlock(block, index, { creatives: banners300x250, mode: 'after' });
              }
            }
            return renderBodyBlock(block, index);
          })}
        </div>
      </article>

      {/* 5.5. v4 300×250バナー広告（show_ad_300x250 = true の記事のみ） */}
      {showInlineBanner && (
        <AdBanner300x250 creatives={banners300x250} />
      )}

      {/* 5.6. カテゴリ別比較表（bodyBlocks内にcomparisonが無い場合のみ自動挿入） */}
      {ARTICLE_CATEGORY_SITUATIONS[category] &&
        !article.bodyBlocks.some(
          (block) => block.fieldId === 'partsBlock' && resolveField(block.partType) === 'comparison'
        ) && (
          <ComparisonTable
            targetSituations={ARTICLE_CATEGORY_SITUATIONS[category]}
            title="おすすめサービス比較"
            services={affiliateServices}
          />
        )}

      {/* 6. 関連記事セクション */}
      {relatedArticles.length > 0 && (
        <section className="pt-4 pb-8">
          <h2 className="font-['Noto_Sans_JP'] text-[16px] md:text-[20px] font-bold text-[#3f3f3f] mb-4">
            同じカテゴリの記事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      {/* 7. v4 320×50フッター固定バナー（スマホのみ表示） */}
      {banners320x50.length > 0 && (
        <AdBannerFooter creatives={banners320x50} />
      )}
    </PageLayout>
  );
}
