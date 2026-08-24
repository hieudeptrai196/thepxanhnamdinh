import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'live' | 'ft' | 'upcoming' | 'category';

type Props = {
  variant: Variant;
  children: ReactNode;
  className?: string;
};

const variantStyles: Record<Variant, string> = {
  live: 'bg-live-red text-white',
  ft: 'bg-dark-navy text-white',
  upcoming: 'bg-light-gray text-body-text',
  category: 'bg-off-white text-charcoal border border-light-gray',
};

export function Badge({ variant, children, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 font-heading font-bold uppercase text-[0.75rem] tracking-[var(--tracking-label)] rounded-[var(--radius-badge)]',
        variantStyles[variant],
        className
      )}
    >
      {variant === 'live' && (
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
      )}
      {children}
    </span>
  );
}
