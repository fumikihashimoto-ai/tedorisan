import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
  spacing?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export default function ContentWrapper({
  children,
  spacing = 'medium',
  className = '',
}: ContentWrapperProps) {
  const spacingClasses = {
    none: '',
    small: 'space-y-2',
    medium: 'space-y-4',
    large: 'space-y-6',
  };

  return (
    <div className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
}
