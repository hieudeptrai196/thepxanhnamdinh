'use client';

import { useTranslations } from 'next-intl';
import type { MatchStat } from '@/shared/types/match';

type Props = {
  stats: MatchStat[];
};

export function MatchStats({ stats }: Props) {
  const t = useTranslations('matches');

  return (
    <div className="flex flex-col gap-5">
      {stats.map((stat) => {
        const total = stat.home + stat.away;
        // A 0-0 row would divide by zero; show it as an even split instead.
        const homePercent = total === 0 ? 50 : (stat.home / total) * 100;
        const suffix = stat.unit === 'percent' ? '%' : '';

        return (
          <div key={stat.key}>
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <span className="font-mono text-sm text-text-primary">
                {stat.home}
                {suffix}
              </span>
              <span className="text-xs font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-text-secondary text-center">
                {t(stat.key)}
              </span>
              <span className="font-mono text-sm text-text-primary">
                {stat.away}
                {suffix}
              </span>
            </div>

            {/* Comparison bar — club blue for home, neutral for away */}
            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-color)]">
              <div className="bg-club-blue" style={{ width: `${homePercent}%` }} />
              <div className="bg-draw-gray" style={{ width: `${100 - homePercent}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
