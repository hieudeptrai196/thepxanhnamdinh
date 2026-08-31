'use client';

import { useTranslations } from 'next-intl';
import type { RecentForm } from '@/shared/types/player';

type Props = {
  form: RecentForm[];
};

const resultColor: Record<string, string> = {
  W: 'bg-win-green',
  D: 'bg-draw-gray',
  L: 'bg-live-red',
};

const resultLabel: Record<string, string> = {
  W: 'T',
  D: 'H',
  L: 'B',
};

export function PlayerForm({ form }: Props) {
  const t = useTranslations('squad');

  return (
    <div className="bg-bg-secondary rounded-[var(--radius-default)] border border-[var(--border-color)] p-5 sm:p-6">
      <h2 className="font-display text-lg sm:text-xl tracking-[var(--tracking-display)] uppercase text-text-primary mb-5">
        {t('recentForm')}
      </h2>

      <div className="flex gap-2 mb-5">
        {form.map((match, i) => (
          <div
            key={i}
            className={`size-9 sm:size-10 rounded-[var(--radius-small)] ${resultColor[match.result]} flex items-center justify-center`}
          >
            <span className="font-display text-sm sm:text-base text-white tracking-wider">
              {resultLabel[match.result]}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-[var(--border-color)]">
        {form.map((match, i) => (
          <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className={`size-2 rounded-full ${resultColor[match.result]} shrink-0`} />
            <span className="text-sm text-text-primary font-heading flex-1">
              {t('vs')} {match.opponent}
            </span>
            <span className="text-sm text-text-secondary font-mono">{match.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
