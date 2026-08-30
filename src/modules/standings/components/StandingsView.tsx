'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { StandingEntry } from '@/shared/types/common';
import { ContentLoader } from '@/shared/components/ui/ContentLoader';
import { StandingsTable } from './StandingsTable';

type Props = {
  data: Record<string, StandingEntry[]>;
};

export function StandingsView({ data }: Props) {
  const t = useTranslations('standings');
  const competitions = useMemo(() => Object.keys(data), [data]);
  const [competition, setCompetition] = useState(competitions[0] ?? '');

  const entries = data[competition] ?? [];

  const subtitleText = `${competition} — ${t('subtitle')}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-text-secondary font-mono">{subtitleText}</p>
      </div>

      {/* Competition selector */}
      <div className="flex flex-wrap gap-2">
        {competitions.map((comp) => (
          <button
            key={comp}
            onClick={() => setCompetition(comp)}
            className={`px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wide rounded-[var(--radius-small)] transition-colors duration-150 ${
              competition === comp
                ? 'bg-club-blue text-white'
                : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-[var(--border-color)]'
            }`}
          >
            {comp}
          </button>
        ))}
      </div>

      <ContentLoader count={10} skeleton="row" className="flex flex-col gap-0">
        {entries.length === 0 ? (
          <p className="text-center text-text-secondary py-12">
            {t('noData')}
          </p>
        ) : (
          <StandingsTable entries={entries} />
        )}
      </ContentLoader>
    </div>
  );
}
