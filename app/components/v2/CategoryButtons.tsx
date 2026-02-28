'use client';

import React from 'react';

type CategoryType =
  | 'it_engineer'
  | 'pharmacist'
  | 'second_graduate'
  | 'programming'
  | 'video_editing';

interface CategoryButtonsProps {
  activeTab: 'transfer' | 'skillup';
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export function CategoryButtons({
  activeTab,
  activeCategory,
  onCategoryChange,
}: CategoryButtonsProps) {
  // 転職タブのカテゴリ
  const transferCategories = [
    { id: 'it_engineer' as CategoryType, label: 'ITエンジニア' },
    { id: 'pharmacist' as CategoryType, label: '薬剤師' },
    { id: 'second_graduate' as CategoryType, label: '既卒・第二新卒' },
  ];

  // スキルアップタブのカテゴリ
  const skillupCategories = [
    { id: 'programming' as CategoryType, label: 'プログラミング' },
    { id: 'video_editing' as CategoryType, label: '動画編集' },
  ];

  const categories =
    activeTab === 'transfer' ? transferCategories : skillupCategories;

  return (
    <div className="flex gap-0 my-0 pb-0">
      {categories.map((cat, index) => {
        const isActive = activeCategory === cat.id;
        const isFirst = index === 0;
        const isLast = index === categories.length - 1;

        let roundedClass = '';
        if (isFirst) roundedClass = 'rounded-tl-sm rounded-bl-sm';
        if (isLast) roundedClass = 'rounded-tr-sm rounded-br-sm';

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              flex-1 min-h-[44px] md:min-h-[48px] flex items-center justify-center py-2 px-2 text-center font-bold text-[14px] md:text-base transition
              ${isActive ? 'bg-[#1390c8] text-white' : 'bg-[#aaa] text-white'}
              ${roundedClass}
            `}
            type="button"
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
