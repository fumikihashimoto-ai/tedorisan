import React from 'react';
import { COLORS } from '@/app/lib/constants/styles';

interface SectionContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundColor?: 'white' | 'gray' | 'transparent';
  className?: string;
  id?: string;
}

export default function SectionContainer({
  children,
  title,
  subtitle,
  backgroundColor = 'transparent',
  className = '',
  id,
}: SectionContainerProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-[var(--color-v2-bg)]',
    transparent: 'bg-transparent',
  };

  return (
    <section
      id={id}
      className={`py-6 ${bgClasses[backgroundColor]} ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h2
              className="text-xl font-black mb-2"
              style={{ color: COLORS.textPrimary }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}
