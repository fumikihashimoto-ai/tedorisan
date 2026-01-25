import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from './cn';

export function InputField({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('input-field', className)} {...props} />;
}

export function SelectField({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('input-field', className)} {...props} />;
}

