'use client';

import type { ReactNode } from 'react';

export type TabItem = {
  key: string;
  label: string;
};

type Props = {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
};

/**
 * Horizontal tab nav. Per DESIGN.md: active tab is Club Blue text with a 2px
 * bottom border — no pills, no filled backgrounds. Scrolls sideways on mobile.
 */
export function Tabs({ items, active, onChange, className }: Props) {
  return (
    <div
      role="tablist"
      className={`flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide border-b border-[var(--border-color)] ${className ?? ''}`}
    >
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.key)}
            className={`shrink-0 px-3 sm:px-4 py-3 text-sm font-heading font-bold uppercase tracking-[var(--tracking-label)] border-b-2 -mb-px transition-colors duration-150 ${
              isActive
                ? 'border-club-blue text-club-blue'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

type PanelProps = {
  active: boolean;
  children: ReactNode;
};

export function TabPanel({ active, children }: PanelProps) {
  if (!active) return null;
  return <div role="tabpanel">{children}</div>;
}
