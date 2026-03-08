'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORY_LABELS } from '@/lib/articleCategories';

interface ArticleCardProps {
  title: string;
  imageUrl: string;
  tags: string[];
  href: string;
  className?: string;
}

export default function ArticleCard({
  title,
  imageUrl,
  tags,
  href,
  className = '',
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className={`flex gap-3 bg-white rounded-[2px] overflow-hidden border border-[#e6e6e6] p-0 hover:shadow-md transition-shadow duration-200 h-full ${className}`}
    >
      <div className="relative w-[100px] h-[75px] flex-shrink-0">
<Image
        src={imageUrl}
        alt={title}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>
      <div className="flex-1 min-w-0 py-2 pr-2">
        <p className="font-['Noto_Sans_JP'] font-bold text-[14px] text-[#3f3f3f] line-clamp-2 mb-1">
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
