'use client';

import React, { useState } from 'react';
import { COLORS } from '@/app/lib/constants/styles';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export default function TableOfContents({
  items,
  className = '',
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const handleClick = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav
      className={`rounded-lg p-4 mb-6 ${className}`}
      style={{ backgroundColor: COLORS.bgGray }}
    >
      <h2
        className="text-base font-black mb-3 flex items-center gap-2"
        style={{ color: COLORS.textPrimary }}
      >
        <span style={{ color: COLORS.primary }}>📋</span>
        目次
      </h2>

      <ol className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id} className={item.level > 1 ? 'ml-4' : ''}>
            <button
              type="button"
              onClick={() => handleClick(item.id)}
              className="text-left text-sm transition hover:opacity-80"
              style={{
                color:
                  activeId === item.id ? COLORS.primary : COLORS.textPrimary,
                fontWeight: activeId === item.id ? 700 : 400,
              }}
            >
              {index + 1}. {item.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
