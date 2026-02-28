'use client';

import React from 'react';

interface SectionDividerProps {
  title: string;
  color?: 'blue' | 'pink';
  className?: string;
}

export default function SectionDivider({
  title,
  color = 'blue',
  className = '',
}: SectionDividerProps) {
  const lineColor = color === 'blue' ? 'bg-[#1390c8]' : 'bg-[#ff677e]';

  return (
    <div className={className}>
      <h2 className="font-['Noto_Sans_JP'] font-bold text-[16px] text-[#3f3f3f]">
        {title}
      </h2>
      <div className={`w-[50px] h-[2px] ${lineColor} mt-2`} />
    </div>
  );
}
