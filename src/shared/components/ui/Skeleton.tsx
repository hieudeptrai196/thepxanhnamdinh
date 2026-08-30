import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  variant?: 'light' | 'dark';
};

export function Skeleton({ className, variant = 'light' }: Props) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-default)]',
        variant === 'dark'
          ? 'animate-shimmer-dark'
          : 'bg-light-gray animate-shimmer',
        className,
      )}
    />
  );
}
