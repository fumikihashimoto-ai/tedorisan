import React from 'react';
import { COLORS } from '@/app/lib/constants/styles';

interface SectionTitleProps {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  color?: 'primary' | 'dark' | 'white';
  className?: string;
}

export default function SectionTitle({
  children,
  level = 'h2',
  color = 'dark',
  className = '',
}: SectionTitleProps) {
  const Tag = level;

  const colorStyles = {
    primary: { color: COLORS.primary },
    dark: { color: COLORS.textPrimary },
    white: { color: '#fff' },
  };

  const sizeClasses = {
    h1: 'text-2xl md:text-3xl',
    h2: 'text-xl md:text-2xl',
    h3: 'text-lg md:text-xl',
    h4: 'text-base md:text-lg',
  };

  return (
    <Tag
      className={`font-black ${sizeClasses[level]} ${className}`}
      style={colorStyles[color]}
    >
      {children}
    </Tag>
  );
}
