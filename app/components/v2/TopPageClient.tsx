'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { TabType } from '@/lib/topPageTypes';
import type { ServiceCategoryType } from '@/lib/serviceFilter';
import type { AffiliateService } from '@/lib/comparisonData';
import type { Article } from '@/lib/microcms';
import { transferCategories, skillupCategories } from '@/lib/topPageData';
import {
  getTargetSituationsByCategory,
  filterServicesByCategory,
} from '@/lib/serviceFilter';
import { CATEGORY_LABELS } from '@/lib/articleCategories';
import { HeroSection } from './HeroSection';
import { CategoryButtons } from './CategoryButtons';
import { TopServiceCard } from './TopServiceCard';
import ArticleCard from './article/ArticleCard';
import ComparisonTable from './common/ComparisonTable';

// TOP用の共通コンテナクラス（コンテンツ幅1200px統一）
const TOP_CONTAINER = 'max-w-[1200px] mx-auto px-4';

// セクション間余白（v2ルール準拠）
const SECTION_SPACING = 'py-4 md:py-6 lg:py-8';

interface TopPageClientProps {
  latestArticles: Article[];
  careerArticles: Article[];
  skillUpArticles: Article[];
  salaryArticles: Article[];
  basicsArticles: Article[];
  /** サーバー側から注入されたサービスデータ（クライアントバンドル削減のため） */
  services: AffiliateService[];
}

/** カテゴリ別記事セクション */
function CategoryArticleSection({
  title,
  articles,
  categorySlug,
}: {
  title: string;
  articles: Article[];
  categorySlug: string;
}) {
  if (articles.length === 0) return null;
  return (
    <section className={`${TOP_CONTAINER} ${SECTION_SPACING}`}>
      <h2 className="font-['Noto_Sans_JP'] text-[16px] md:text-[20px] font-bold text-[#3f3f3f] border-l-4 border-[#1390c8] pl-3 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            imageUrl={article.thumbnail?.url ?? '/images/default-thumbnail.png'}
            tags={article.category ?? []}
            href={`/articles/${article.category?.[0] ?? categorySlug}/${article.slug}`}
          />
        ))}
      </div>
      <div className="mt-3 text-right">
        <Link
          href={`/articles/${categorySlug}`}
          className="font-['Noto_Sans_JP'] text-[14px] text-[#2563EB] hover:underline"
        >
          一覧を見る →
        </Link>
      </div>
    </section>
  );
}

export function TopPageClient({
  latestArticles,
  careerArticles,
  skillUpArticles,
  salaryArticles,
  basicsArticles,
  services,
}: TopPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('transfer');
  const [serviceCategory, setServiceCategory] =
    useState<ServiceCategoryType>('it_engineer');

  const handleTabChange = (tab: 'transfer' | 'skillup') => {
    setActiveTab(tab);
    if (tab === 'transfer') {
      setServiceCategory('it_engineer');
    } else {
      setServiceCategory('programming');
    }
  };

  const displayedServices = filterServicesByCategory(
    serviceCategory,
    activeTab,
    services,
    3
  );

  const categories =
    activeTab === 'transfer' ? transferCategories : skillupCategories;

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーロー */}
      <HeroSection />

      {/* 新着記事セクション */}
      {latestArticles.length > 0 && (
        <section className={`${TOP_CONTAINER} ${SECTION_SPACING}`}>
          <h2 className="font-['Noto_Sans_JP'] text-[16px] md:text-[20px] font-bold text-[#3f3f3f] border-l-4 border-[#1390c8] pl-3 mb-4">
            新着記事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                imageUrl={article.thumbnail?.url ?? '/images/default-thumbnail.png'}
                tags={article.category ?? []}
                href={`/articles/${article.category?.[0] ?? 'career-change'}/${article.slug}`}
              />
            ))}
          </div>
          <div className="mt-3 text-right">
            <Link
              href="/articles"
              className="font-['Noto_Sans_JP'] text-[14px] text-[#2563EB] hover:underline"
            >
              もっと見る →
            </Link>
          </div>
        </section>
      )}

      {/* 目的選択セクション */}
      {/* <section
        className={`bg-[var(--color-v2-bg)] ${TOP_CONTAINER} ${SECTION_SPACING}`}
      >
        <SectionBar title="ご自身の目的を選択してください" />
        <div className="mb-4">
          <TabSwitch activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <CategoryLinkGrid categories={categories} />
      </section> */}

      {/* おすすめサービス（転職サイト簡単比較表の上に配置） */}
      <section className={`${TOP_CONTAINER} pt-4 md:pt-6 lg:pt-8 pb-0`}>
        <CategoryButtons
          activeTab={activeTab}
          activeCategory={serviceCategory}
          onCategoryChange={setServiceCategory}
        />
        <div className="mt-4 md:mt-6 lg:mt-8 mb-4 md:mb-6 lg:mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedServices.map((service, index) => (
            <TopServiceCard
              key={service.id}
              service={service}
              rank={index + 1}
            />
          ))}
        </div>
      </section>

      {/* 比較表セクション */}
      <section
        className={`bg-[var(--color-v2-bg)] ${TOP_CONTAINER} ${SECTION_SPACING}`}
      >
        <ComparisonTable
          targetSituations={getTargetSituationsByCategory(serviceCategory)}
          services={services}
          title={
            activeTab === 'transfer'
              ? '転職サイト簡単比較表'
              : 'スキルアップサービス比較表'
          }
          maxItems={5}
          fullWidth={false}
        />
      </section>

      {/* カテゴリ別記事セクション */}
      <CategoryArticleSection
        title="転職する"
        articles={careerArticles}
        categorySlug="career-change"
      />
      <CategoryArticleSection
        title="スキルアップ"
        articles={skillUpArticles}
        categorySlug="skill-up"
      />
      <CategoryArticleSection
        title="年収を調べる"
        articles={salaryArticles}
        categorySlug="salary-data"
      />
      <CategoryArticleSection
        title="手取りの基礎知識"
        articles={basicsArticles}
        categorySlug="salary-basics"
      />
    </div>
  );
}
