'use client';

import { useTranslations } from 'next-intl';
import type { PlayerStats as Stats, PlayerPosition } from '@/shared/types/player';

type Props = {
  stats: Stats;
  position: PlayerPosition;
};

export function PlayerStats({ stats, position }: Props) {
  const t = useTranslations('squad');

  const items: { key: string; value: number | string }[] = [
    { key: 'appearances', value: stats.appearances },
    { key: 'goals', value: stats.goals },
    { key: 'assists', value: stats.assists },
    ...(position === 'goalkeeper' && stats.cleanSheets != null
      ? [{ key: 'cleanSheets', value: stats.cleanSheets }]
      : []),
    { key: 'yellowCards', value: stats.yellowCards },
    { key: 'redCards', value: stats.redCards },
    { key: 'minutesPlayed', value: stats.minutesPlayed.toLocaleString() },
    ...(stats.rating != null ? [{ key: 'rating', value: stats.rating.toFixed(1) }] : []),
  ];

  return (
    <div className="bg-bg-secondary rounded-[var(--radius-default)] border border-[var(--border-color)] p-5 sm:p-6">
      <h2 className="font-display text-lg sm:text-xl tracking-[var(--tracking-display)] uppercase text-text-primary mb-5">
        {t('seasonStats')}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.key}
            className={`flex flex-col items-center justify-center py-4 px-2 ${
              i < items.length - (items.length <= 4 ? items.length : items.length % 4 === 0 ? 4 : items.length % 4)
                ? 'border-b border-[var(--border-color)]'
                : ''
            } ${(i + 1) % 4 !== 0 && i < items.length - 1 ? 'border-r border-[var(--border-color)]' : ''}`}
          >
            <span className="font-display text-2xl sm:text-3xl text-text-primary tracking-wider">
              {item.value}
            </span>
            <span className="text-xs text-text-secondary mt-1 text-center">
              {t(item.key)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
