'use client';

import { useState, useMemo, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import type { Match } from '@/shared/types/match';
import { ContentLoader } from '@/shared/components/ui/ContentLoader';
import { MatchRow } from '@/shared/components/match/MatchRow';
import { MatchFilters, type MatchFilter } from './MatchFilters';

type Props = {
  matches: Match[];
};

type MonthGroup = {
  key: string;
  label: string;
  matches: Match[];
};

/** Groups matches into chronological month buckets. */
function groupByMonth(matches: Match[], locale: string): MonthGroup[] {
  const buckets = new Map<string, Match[]>();

  for (const match of [...matches].sort((a, b) => a.date.localeCompare(b.date))) {
    const key = match.date.slice(0, 7); // YYYY-MM
    const bucket = buckets.get(key);
    if (bucket) bucket.push(match);
    else buckets.set(key, [match]);
  }

  return [...buckets.entries()].map(([key, items]) => ({
    key,
    label: new Date(`${key}-01T00:00:00`).toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric',
    }),
    matches: items,
  }));
}

export function MatchesList({ matches }: Props) {
  const t = useTranslations('matches');
  const locale = useLocale();
  const [filter, setFilter] = useState<MatchFilter>('all');
  const [competition, setCompetition] = useState('all');
  const [round, setRound] = useState('all');
  const [monthIndex, setMonthIndex] = useState(0);
  const laneRef = useRef<HTMLDivElement>(null);

  const subtitleText = competition === 'all'
    ? t('subtitle')
    : `${competition} — ${t('season')}`;

  const competitions = useMemo(
    () => [...new Set(matches.map((m) => m.competition))],
    [matches],
  );

  const rounds = useMemo(() => {
    const source = competition === 'all'
      ? matches
      : matches.filter((m) => m.competition === competition);
    return [...new Set(source.map((m) => m.round).filter(Boolean))] as string[];
  }, [matches, competition]);

  const filtered = useMemo(() => {
    let result = matches;
    if (filter !== 'all') {
      result = result.filter((m) => m.status === filter);
    }
    if (competition !== 'all') {
      result = result.filter((m) => m.competition === competition);
    }
    if (round !== 'all') {
      result = result.filter((m) => m.round === round);
    }
    return result;
  }, [matches, filter, competition, round]);

  const groups = useMemo(() => groupByMonth(filtered, locale), [filtered, locale]);

  // Filters can shrink the list, so never point past the last month.
  const activeMonth = Math.min(monthIndex, Math.max(groups.length - 1, 0));

  function goToMonth(index: number) {
    setMonthIndex(index);
    const lane = laneRef.current;
    if (lane) {
      lane.scrollTo({ left: index * lane.clientWidth, behavior: 'smooth' });
    }
  }

  function handleLaneScroll() {
    const lane = laneRef.current;
    if (!lane || lane.clientWidth === 0) return;
    setMonthIndex(Math.round(lane.scrollLeft / lane.clientWidth));
  }

  function handleCompetitionChange(comp: string) {
    setCompetition(comp);
    setRound('all');
    goToMonth(0);
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-text-secondary font-mono">{subtitleText}</p>

      <MatchFilters
        active={filter}
        onChange={setFilter}
        competitions={competitions}
        activeCompetition={competition}
        onCompetitionChange={handleCompetitionChange}
        rounds={rounds}
        activeRound={round}
        onRoundChange={setRound}
      />

      {/* Month switcher — mobile swipe companion */}
      {groups.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide lg:hidden">
          {groups.map((group, i) => (
            <button
              key={group.key}
              type="button"
              onClick={() => goToMonth(i)}
              className={`shrink-0 px-3 py-2 text-xs font-heading font-bold uppercase tracking-[var(--tracking-label)] border-b-2 transition-colors duration-150 ${
                i === activeMonth
                  ? 'border-club-blue text-club-blue'
                  : 'border-transparent text-text-secondary'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
      )}

      <ContentLoader count={6} skeleton="row" className="flex flex-col gap-4">
        {groups.length === 0 ? (
          <p className="text-center text-text-secondary py-12">{t('noMatches')}</p>
        ) : (
          <div
            ref={laneRef}
            onScroll={handleLaneScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:block lg:overflow-visible"
          >
            {groups.map((group) => (
              <section
                key={group.key}
                className="w-full shrink-0 snap-start lg:w-auto lg:mb-8 lg:last:mb-0"
              >
                <h2 className="font-display text-2xl sm:text-3xl tracking-[var(--tracking-display)] uppercase text-text-primary mb-2">
                  {group.label}
                </h2>

                {/* 1px dividers between rows — no individual cards */}
                <div className="flex flex-col divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
                  {group.matches.map((match) => (
                    <MatchRow key={match.id} match={match} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </ContentLoader>
    </div>
  );
}
