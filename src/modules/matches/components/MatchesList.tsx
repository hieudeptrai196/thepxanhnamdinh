'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { Match } from '@/shared/types/match';
import { MatchCard } from './MatchCard';
import { MatchFilters, type MatchFilter } from './MatchFilters';

type Props = {
  matches: Match[];
};

export function MatchesList({ matches }: Props) {
  const t = useTranslations('matches');
  const [filter, setFilter] = useState<MatchFilter>('all');
  const [competition, setCompetition] = useState('all');
  const [round, setRound] = useState('all');

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

  function handleCompetitionChange(comp: string) {
    setCompetition(comp);
    setRound('all');
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

      {filtered.length === 0 ? (
        <p className="text-center text-text-secondary py-12">
          {t('noMatches')}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
