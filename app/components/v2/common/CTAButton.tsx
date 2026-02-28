'use client';

import React from 'react';
import { COLORS } from '@/app/lib/constants/styles';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  className = '',
  external = true,
}: CTAButtonProps) {
  const variantStyles = {
    primary: {
      backgroundColor: COLORS.accent,
      color: '#fff',
      boxShadow: `0px 4px 0px 0px ${COLORS.accentDark}`,
    },
    secondary: {
      backgroundColor: COLORS.primary,
      color: '#fff',
      boxShadow: '0px 4px 0px 0px #0d6b9a',
    },
    outline: {
      backgroundColor: '#fff',
      color: COLORS.primary,
      border: `2px solid ${COLORS.primary}`,
    },
  };

  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-base',
    large: 'py-4 px-8 text-lg',
  };

  const baseStyle =
    variant === 'outline'
      ? { ...variantStyles[variant] }
      : { ...variantStyles[variant], border: 'none' };

  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        inline-block text-center font-black rounded-sm
        transition-all duration-150
        hover:opacity-95 active:translate-y-0.5
        ${sizeClasses[size]}
        ${className}
      `}
      style={baseStyle}
      target={external ? '_blank' : undefined}
      rel={external ? 'nofollow noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
