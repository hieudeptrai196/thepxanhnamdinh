'use client';

import { useTranslations } from 'next-intl';

export type MatchFilter = 'all' | 'upcoming' | 'finished';

type Props = {
  active: MatchFilter;
  onChange: (filter: MatchFilter) => void;
  competitions: string[];
  activeCompetition: string;
  onCompetitionChange: (comp: string) => void;
  rounds: string[];
  activeRound: string;
  onRoundChange: (round: string) => void;
};

const filters: { key: MatchFilter; labelKey: string }[] = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'upcoming', labelKey: 'filterUpcoming' },
  { key: 'finished', labelKey: 'filterFinished' },
];

export function MatchFilters({
  active,
  onChange,
  competitions,
  activeCompetition,
  onCompetitionChange,
  rounds,
  activeRound,
  onRoundChange,
}: Props) {
  const t = useTranslations('matches');

  return (
    <div className="flex flex-col gap-3">
      {/* Dropdowns row */}
      <div className="flex flex-wrap gap-3">
        {/* Competition select */}
        <select
          value={activeCompetition}
          onChange={(e) => onCompetitionChange(e.target.value)}
          className="px-3 py-2 text-sm font-heading bg-bg-primary border border-[var(--border-color)] rounded-[var(--radius-default)] text-text-primary cursor-pointer"
        >
          <option value="all">{t('allCompetitions')}</option>
          {competitions.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>

        {/* Round select */}
        <select
          value={activeRound}
          onChange={(e) => onRoundChange(e.target.value)}
          className="px-3 py-2 text-sm font-heading bg-bg-primary border border-[var(--border-color)] rounded-[var(--radius-default)] text-text-primary cursor-pointer"
        >
          <option value="all">{t('allRounds')}</option>
          {rounds.map((round) => (
            <option key={round} value={round}>
              {round}
            </option>
          ))}
        </select>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 bg-bg-primary rounded-[var(--radius-default)] p-1 w-fit">
        {filters.map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wide rounded-[var(--radius-small)] transition-colors duration-150 ${
              active === key
                ? 'bg-club-blue text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
}
