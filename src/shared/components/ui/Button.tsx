import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'dark' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-club-blue text-white hover:bg-club-blue-hover active:bg-club-blue-active',
  secondary:
    'bg-transparent border border-club-blue text-club-blue hover:bg-[var(--color-club-blue-8)]',
  dark: 'bg-dark-navy text-white hover:bg-charcoal',
  ghost:
    'bg-transparent border border-white/30 text-white hover:border-white/60',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-body font-semibold uppercase tracking-[var(--tracking-label)] rounded-[var(--radius-default)] transition-all duration-150 min-h-[44px]',
        disabled
          ? 'bg-light-gray text-disabled-text cursor-not-allowed'
          : variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
