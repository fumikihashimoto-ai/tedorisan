'use client';

import React from 'react';

interface AppealBoxProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function AppealBox({
  title,
  children,
  className = '',
}: AppealBoxProps) {
  return (
    <div
      className={`bg-white border-2 border-[#1390c8] rounded-[2px] p-4 mb-6 ${className}`}
    >
      <h3 className="font-['Noto_Sans_JP'] font-bold text-[16px] text-[#3f3f3f] mb-3">
        {title}
      </h3>
      <div className="font-['Noto_Sans_JP'] font-normal text-[14px] text-[#3f3f3f] leading-[1.8] whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}
