import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({ title, subtitle, action, className }: Props) {
  return (
    <div className={cn('flex items-end justify-between gap-4 mb-6', className)}>
      <div>
        <h2 className="font-display text-[length:var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
