import type { HTMLAttributes } from 'react';
import { cn } from './cn';

export function H2({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('heading-h2', className)} {...props} />;
}

export function H2Underline({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('heading-h2-underline', className)} {...props} />;
}

export function Caption({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-caption', className)} {...props} />;
}

export function BodyText({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-body', className)} {...props} />;
}

