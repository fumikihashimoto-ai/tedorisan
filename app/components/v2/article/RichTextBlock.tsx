'use client';

import { useRef, useEffect } from 'react';

interface RichTextBlockProps {
  html: string;
  className: string;
}

/**
 * リッチテキストブロックのレンダリング。
 * HTML内の<table>要素を .table-scroll-x でラップして横スクロール対応する。
 */
export default function RichTextBlock({ html, className }: RichTextBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tables = ref.current.querySelectorAll('table');
    tables.forEach((table) => {
      // 既にラップ済みならスキップ
      if (table.parentElement?.classList.contains('table-scroll-x')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll-x';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
