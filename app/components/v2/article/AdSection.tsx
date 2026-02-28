'use client';

import React from 'react';

interface AdSectionProps {
  title: string;
  titleColor?: 'blue' | 'pink';
  children: React.ReactNode;
  className?: string;
}

export default function AdSection({
  title,
  titleColor = 'blue',
  children,
  className = '',
}: AdSectionProps) {
  const barBg = titleColor === 'pink' ? 'bg-[#ff677e]' : 'bg-[#79ccf1]';

  return (
    <div className={`mb-6 ${className}`}>
      <div className={`${barBg} text-white text-center py-1.5 rounded-sm mb-2 relative`}>
        <p className="font-extrabold text-sm">{title}</p>
      </div>
      {children}
    </div>
  );
}
