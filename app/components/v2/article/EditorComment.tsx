'use client';

import React from 'react';

interface EditorCommentProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function EditorComment({
  title,
  children,
  className = '',
}: EditorCommentProps) {
  return (
    <div
      className={`bg-[#fff9ed] border border-[#e6e6e6] rounded-[2px] p-4 mb-6 ${className}`}
      style={{ borderLeft: '4px solid #1390c8' }}
    >
      <h3 className="font-['Noto_Sans_JP'] font-bold text-[14px] text-[#3f3f3f] mb-3">
        {title}
      </h3>
      <div className="font-['Noto_Sans_JP'] font-normal text-[14px] text-[#3f3f3f] leading-[1.8] whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}
