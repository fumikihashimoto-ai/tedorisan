import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from './cn';

type Tone = 'positive' | 'negative';

export function ResultAmount({
  tone,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { tone?: Tone }) {
  return (
    <div
      className={cn(
        'result-amount',
        tone === 'positive' && 'result-amount-positive',
        tone === 'negative' && 'result-amount-negative',
        className
      )}
      {...props}
    />
  );
}

export function ResultRow({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}: {
  label: ReactNode;
  value: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}) {
  return (
    <div className={cn('result-row', className)}>
      <span className={cn('result-row-label', labelClassName)}>{label}</span>
      <span className={cn('result-row-value', valueClassName)}>{value}</span>
    </div>
  );
}

