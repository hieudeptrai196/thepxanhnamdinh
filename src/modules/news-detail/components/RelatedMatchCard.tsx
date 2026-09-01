'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Match } from '@/shared/types/match';

type Props = {
  match: Match;
};

export function RelatedMatchCard({ match }: Props) {
  const t = useTranslations('news');
  const played = match.status !== 'upcoming';

  return (
    <div className="rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] p-5">
      <h3 className="text-xs font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-text-secondary mb-4">
        {t('relatedMatch')}
      </h3>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <Image
            src={match.homeTeam.logo}
            alt={match.homeTeam.name}
            width={40}
            height={40}
            className="size-9 object-contain"
          />
          <span className="font-heading font-bold text-xs text-text-primary text-center truncate w-full">
            {match.homeTeam.shortName}
          </span>
        </div>

        <div className="shrink-0 px-1">
          {played ? (
            <span className="font-display text-2xl text-text-primary tracking-[var(--tracking-display)]">
              {match.homeScore} - {match.awayScore}
            </span>
          ) : (
            <span className="font-mono text-sm text-text-secondary">{match.time}</span>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <Image
            src={match.awayTeam.logo}
            alt={match.awayTeam.name}
            width={40}
            height={40}
            className="size-9 object-contain"
          />
          <span className="font-heading font-bold text-xs text-text-primary text-center truncate w-full">
            {match.awayTeam.shortName}
          </span>
        </div>
      </div>

      <p className="text-xs font-mono text-text-secondary text-center mt-3">
        {match.competition}
        {match.round ? ` · ${match.round}` : ''}
      </p>

      <Link
        href={`/matches/${match.id}`}
        className="mt-4 inline-flex items-center justify-center w-full min-h-[40px] px-4 rounded-[var(--radius-default)] border border-[var(--border-color)] text-sm font-heading font-bold text-club-blue hover:border-club-blue transition-colors duration-150"
      >
        {t('viewMatch')}
      </Link>
    </div>
  );
}
