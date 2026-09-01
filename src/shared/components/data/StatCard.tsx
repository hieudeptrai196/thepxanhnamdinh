import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  value: ReactNode;
  label: string;
  /** Small caption under the label, e.g. a unit or a qualifier. */
  note?: string;
  className?: string;
};

export function StatCard({ value, label, note, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)]',
        className,
      )}
    >
      <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary tracking-[var(--tracking-display)] leading-none">
        {value}
      </span>
      <span className="mt-2 text-xs font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-text-secondary">
        {label}
      </span>
      {note && <span className="mt-1 text-xs text-text-secondary font-mono">{note}</span>}
    </div>
  );
}
