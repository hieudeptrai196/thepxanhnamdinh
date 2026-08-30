'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Match } from '@/shared/types/match';
import { Badge } from '@/shared/components/ui/Badge';

type Props = {
  match: Match;
};

export function MatchCard({ match }: Props) {
  const t = useTranslations('matches');

  const statusBadge = {
    upcoming: <Badge variant="upcoming">{t('upcoming')}</Badge>,
    live: <Badge variant="live">{t('live')}</Badge>,
    finished: <Badge variant="ft">{t('ft')}</Badge>,
  }[match.status];

  const isWin =
    match.status === 'finished' &&
    ((match.homeTeam.id === 'txnd' && (match.homeScore ?? 0) > (match.awayScore ?? 0)) ||
      (match.awayTeam.id === 'txnd' && (match.awayScore ?? 0) > (match.homeScore ?? 0)));

  const isLoss =
    match.status === 'finished' &&
    ((match.homeTeam.id === 'txnd' && (match.homeScore ?? 0) < (match.awayScore ?? 0)) ||
      (match.awayTeam.id === 'txnd' && (match.awayScore ?? 0) < (match.homeScore ?? 0)));

  return (
    <div className="bg-bg-secondary rounded-[var(--radius-default)] border border-[var(--border-color)] p-4 sm:p-5 transition-shadow duration-150 hover:shadow-card">
      {/* Competition + Round + Result indicator */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-text-secondary">
          {match.competition}
        </span>
        <div className="flex items-center gap-2">
          {match.status === 'finished' && (
            <span
              className={`text-xs font-heading font-bold uppercase ${
                isWin ? 'text-win-green' : isLoss ? 'text-live-red' : 'text-draw-gray'
              }`}
            >
              {isWin ? t('win') : isLoss ? t('loss') : t('draw')}
            </span>
          )}
          {match.round && (
            <span className="text-xs font-mono text-text-secondary">
              {match.round}
            </span>
          )}
        </div>
      </div>

      {/* Scoreboard */}
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Home team */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Image
            src={match.homeTeam.logo}
            alt={match.homeTeam.name}
            width={40}
            height={40}
            className="size-9 sm:size-10 shrink-0"
          />
          <span className="font-heading font-bold text-text-primary text-sm sm:text-base">
            {match.homeTeam.shortName}
          </span>
        </div>

        {/* Score / Time */}
        <div className="flex flex-col items-center shrink-0">
          {match.status === 'upcoming' ? (
            <span className="font-mono font-medium text-lg text-club-blue">
              {match.time}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl sm:text-4xl tracking-[var(--tracking-display)] text-text-primary">
                {match.homeScore}
              </span>
              <span className="text-text-secondary text-sm">-</span>
              <span className="font-display text-3xl sm:text-4xl tracking-[var(--tracking-display)] text-text-primary">
                {match.awayScore}
              </span>
            </div>
          )}
          <div className="mt-1">{statusBadge}</div>
        </div>

        {/* Away team */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="font-heading font-bold text-text-primary text-sm sm:text-base text-right">
            {match.awayTeam.shortName}
          </span>
          <Image
            src={match.awayTeam.logo}
            alt={match.awayTeam.name}
            width={40}
            height={40}
            className="size-9 sm:size-10 shrink-0"
          />
        </div>
      </div>

      {/* Date + Venue */}
      <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-3 mt-3">
        <span className="text-xs font-mono text-text-secondary">{match.date}</span>
        <span className="text-xs text-text-secondary">{match.venue}</span>
      </div>
    </div>
  );
}
