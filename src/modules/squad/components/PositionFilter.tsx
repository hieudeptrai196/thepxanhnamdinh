'use client';

import { useTranslations } from 'next-intl';
import type { PlayerPosition } from '@/shared/types/player';

export type PositionFilterValue = 'all' | PlayerPosition;

type Props = {
  active: PositionFilterValue;
  onChange: (pos: PositionFilterValue) => void;
  counts: Record<PositionFilterValue, number>;
};

const positions: { key: PositionFilterValue; labelKey: string }[] = [
  { key: 'all', labelKey: 'all' },
  { key: 'goalkeeper', labelKey: 'goalkeeper' },
  { key: 'defender', labelKey: 'defender' },
  { key: 'midfielder', labelKey: 'midfielder' },
  { key: 'forward', labelKey: 'forward' },
];

export function PositionFilter({ active, onChange, counts }: Props) {
  const t = useTranslations('squad');

  return (
    <div className="flex flex-wrap gap-2">
      {positions.map(({ key, labelKey }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wide rounded-[var(--radius-small)] transition-colors duration-150 ${
            active === key
              ? 'bg-club-blue text-white'
              : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-[var(--border-color)]'
          }`}
        >
          {t(labelKey)}
          <span className="ml-1.5 text-xs opacity-70">({counts[key]})</span>
        </button>
      ))}
    </div>
  );
}
