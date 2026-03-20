'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORY_LABELS } from '@/lib/articleCategories';
import { formatArticleDate } from '@/lib/dateFormat';

interface ArticleCardProps {
  title: string;
  imageUrl: string;
  tags: string[];
  href: string;
  publishedAt?: string;
  updatedAt?: string;
  className?: string;
}

export default function ArticleCard({
  title,
  imageUrl,
  tags,
  href,
  publishedAt,
  updatedAt,
  className = '',
}: ArticleCardProps) {
  const dateText = formatArticleDate(publishedAt, updatedAt);

  return (
    <Link
      href={href}
      className={`flex flex-col bg-white rounded-lg overflow-hidden border border-[#e6e6e6] hover:shadow-md transition-shadow duration-200 h-full ${className}`}
    >
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="p-4">
        {dateText && (
          <p className="font-['Noto_Sans_JP'] text-xs text-gray-500 mb-1">
            {dateText}
          </p>
        )}
        <p className="font-['Noto_Sans_JP'] font-bold text-[15px] text-[#3f3f3f] line-clamp-3 mb-2">
          {title}
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-['Noto_Sans_JP'] text-[10px] text-[#1390c8] bg-[#f0f9ff] px-1.5 py-0.5 rounded"
            >
              {CATEGORY_LABELS[tag] ?? tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
