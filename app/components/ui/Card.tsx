import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from './cn';

type CardVariant = 'base' | 'noBorder' | 'flat';

type Props<T extends ElementType> = {
  as?: T;
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export function Card<T extends ElementType = 'section'>({
  as,
  variant = 'base',
  className,
  children,
  ...props
}: Props<T>) {
  const Comp = (as ?? 'section') as ElementType;
  const baseClass =
    variant === 'flat'
      ? 'card-flat'
      : variant === 'noBorder'
        ? 'card-no-border'
        : 'card-base';

  return (
    <Comp className={cn(baseClass, className)} {...props}>
      {children}
    </Comp>
  );
}

