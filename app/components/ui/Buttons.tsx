import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { cn } from './cn';

export function PrimaryButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('btn-primary', className)} {...props} />;
}

type PrimaryLinkButtonProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    className?: string;
  };

export function PrimaryLinkButton({ className, ...props }: PrimaryLinkButtonProps) {
  return <Link className={cn('btn-primary-inline', className)} {...props} />;
}

