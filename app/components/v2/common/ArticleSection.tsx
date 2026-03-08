import React from 'react';
import { COLORS } from '@/app/lib/constants/styles';

interface ArticleSectionProps {
  children: React.ReactNode;
  title?: string;
  id?: string;
  backgroundColor?: 'white' | 'gray' | 'highlight';
  className?: string;
}

export default function ArticleSection({
  children,
  title,
  id,
  backgroundColor = 'white',
  className = '',
}: ArticleSectionProps) {
  const bgStyles = {
    white: { backgroundColor: '#fff' },
    gray: { backgroundColor: COLORS.bgGray },
    highlight: { backgroundColor: COLORS.bgPoint },
  };

  return (
    <section
      id={id}
      className={`p-4 md:p-6 rounded-lg mb-6 ${className}`}
      style={bgStyles[backgroundColor]}
    >
      {title && (
        <h2
          className="text-lg md:text-xl font-black mb-4 pb-2 border-b-2"
          style={{
            color: COLORS.textPrimary,
            borderColor: COLORS.primary,
          }}
        >
          {title}
        </h2>
      )}

      <div className="space-y-4">{children}</div>
    </section>
  );
}
