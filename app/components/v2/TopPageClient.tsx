'use client';

import { useState } from 'react';
import type { TabType } from '@/lib/topPageTypes';
import type { ServiceCategoryType } from '@/lib/serviceFilter';
import { transferCategories, skillupCategories } from '@/lib/topPageData';
import { affiliateServices } from '@/lib/comparisonData';
import {
  getTargetSituationsByCategory,
  filterServicesByCategory,
} from '@/lib/serviceFilter';
import { HeroSection } from './HeroSection';
import { TabSwitch } from './TabSwitch';
import { CategoryButtons } from './CategoryButtons';
import { TopServiceCard } from './TopServiceCard';
import ComparisonTable from './common/ComparisonTable';
import SectionBar from './common/SectionBar';
import CategoryLinkGrid from './common/CategoryLinkGrid';

// TOP用の共通コンテナクラス（コンテンツ幅750px統一）
const TOP_CONTAINER = 'max-w-[750px] mx-auto px-4';

// セクション間余白（v2ルール準拠）
const SECTION_SPACING = 'py-4 md:py-6 lg:py-8';

export function TopPageClient() {
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
    affiliateServices,
    3
  );

  const categories =
    activeTab === 'transfer' ? transferCategories : skillupCategories;

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーロー */}
      <HeroSection />

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
          services={affiliateServices}
          title={
            activeTab === 'transfer'
              ? '転職サイト簡単比較表'
              : 'スキルアップサービス比較表'
          }
          maxItems={5}
          fullWidth={false}
        />
      </section>

      {/* 年代・業種から探す */}
      {/* <section
        className={`bg-white ${TOP_CONTAINER} ${SECTION_SPACING}`}
      >
        <SectionBar title="年代・業種から探す" variant="withPadding" />
        <CategoryLinkGrid categories={categories} />
      </section> */}
    </div>
  );
}
