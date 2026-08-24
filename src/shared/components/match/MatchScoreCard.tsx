'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Match } from '@/shared/types/match';
import { Badge } from '@/shared/components/ui/Badge';
import { cn } from '@/lib/cn';

type Props = {
  match: Match;
  label?: string;
  className?: string;
};

export function MatchScoreCard({ match, label, className }: Props) {
  const t = useTranslations('matchCenter');

  const statusBadge = {
    upcoming: <Badge variant="upcoming">{t('upcoming')}</Badge>,
    live: <Badge variant="live">{t('live')}</Badge>,
    finished: <Badge variant="ft">{t('ft')}</Badge>,
  }[match.status];

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <p className="text-sm font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-white/50 mb-4">
          {label}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {/* Competition + Round */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-white/40">
            {match.competition}
          </span>
          {match.round && (
            <span className="text-xs font-mono text-white/40">
              {match.round}
            </span>
          )}
        </div>

        {/* Scoreboard */}
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Home team */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Image
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              width={48}
              height={48}
              className="size-10 sm:size-12 shrink-0"
            />
            <span className="font-heading font-bold text-white text-sm sm:text-base">
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
                <span className="font-display text-3xl sm:text-4xl tracking-[var(--tracking-display)] text-white">
                  {match.homeScore}
                </span>
                <span className="text-white/30 text-sm">-</span>
                <span className="font-display text-3xl sm:text-4xl tracking-[var(--tracking-display)] text-white">
                  {match.awayScore}
                </span>
              </div>
            )}
            <div className="mt-1">{statusBadge}</div>
          </div>

          {/* Away team */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="font-heading font-bold text-white text-sm sm:text-base text-right">
              {match.awayTeam.shortName}
            </span>
            <Image
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              width={48}
              height={48}
              className="size-10 sm:size-12 shrink-0"
            />
          </div>
        </div>

        {/* Date + Venue */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-xs font-mono text-white/40">{match.date}</span>
          <span className="text-xs text-white/40">{match.venue}</span>
        </div>
      </div>
    </div>
  );
}
