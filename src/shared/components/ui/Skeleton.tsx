import { cn } from '@/lib/cn';

type Props = {
  className?: string;
};

export function Skeleton({ className }: Props) {
  return (
    <div
      className={cn(
        'bg-light-gray rounded-[var(--radius-default)] animate-shimmer',
        className
      )}
    />
  );
}
