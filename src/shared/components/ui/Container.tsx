import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
};

export function Container({ children, className, as: Tag = 'div' }: Props) {
  return (
    <Tag
      className={cn(
        'mx-auto max-w-[var(--max-width)] px-4 lg:px-10',
        className
      )}
    >
      {children}
    </Tag>
  );
}
