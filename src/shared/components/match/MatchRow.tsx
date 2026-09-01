'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Match } from '@/shared/types/match';
import { MatchBadge } from './MatchBadge';

type Props = {
  match: Match;
  /** When set, the whole row becomes a link. Wired up once match detail exists. */
  href?: string;
};

const CLUB_ID = 'txnd';

/** 'W' | 'D' | 'L' from TXND's point of view, or null when not applicable. */
function clubResult(match: Match): 'W' | 'D' | 'L' | null {
  if (match.status !== 'finished') return null;
  if (match.homeScore == null || match.awayScore == null) return null;

  const isHome = match.homeTeam.id === CLUB_ID;
  const isAway = match.awayTeam.id === CLUB_ID;
  if (!isHome && !isAway) return null;

  const own = isHome ? match.homeScore : match.awayScore;
  const other = isHome ? match.awayScore : match.homeScore;

  if (own > other) return 'W';
  if (own < other) return 'L';
  return 'D';
}

const resultColor = {
  W: 'text-win-green',
  D: 'text-draw-gray',
  L: 'text-live-red',
} as const;

const resultLabelKey = {
  W: 'win',
  D: 'draw',
  L: 'loss',
} as const;

export function MatchRow({ match, href }: Props) {
  const t = useTranslations('matches');
  const result = clubResult(match);

  const date = new Date(`${match.date}T00:00:00`);
  const dayMonth = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

  const content = (
    <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] lg:grid-cols-[104px_1fr_auto_1fr_150px_88px] items-center gap-2 sm:gap-4 py-4 px-2 sm:px-3 rounded-[var(--radius-small)] transition-colors duration-150 group-hover:bg-[var(--color-club-blue-8)]">
      {/* Date */}
      <div className="flex flex-col shrink-0">
        <span className="font-mono text-sm text-text-primary">{dayMonth}</span>
        <span className="font-mono text-xs text-text-secondary">{match.time}</span>
      </div>

      {/* Home team */}
      <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0">
        <span className="font-heading font-bold text-text-primary text-sm sm:text-base text-right truncate">
          <span className="lg:hidden">{match.homeTeam.shortName}</span>
          <span className="hidden lg:inline">{match.homeTeam.name}</span>
        </span>
        <Image
          src={match.homeTeam.logo}
          alt={match.homeTeam.name}
          width={36}
          height={36}
          className="size-8 sm:size-9 shrink-0 object-contain"
        />
      </div>

      {/* Score / kick-off time */}
      <div className="flex flex-col items-center shrink-0 min-w-[64px] sm:min-w-[80px]">
        {match.status === 'upcoming' ? (
          <span className="font-mono font-medium text-base sm:text-lg text-text-secondary">
            {match.time}
          </span>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-display text-2xl sm:text-3xl tracking-[var(--tracking-display)] text-text-primary">
              {match.homeScore}
            </span>
            <span className="text-text-secondary text-xs">-</span>
            <span className="font-display text-2xl sm:text-3xl tracking-[var(--tracking-display)] text-text-primary">
              {match.awayScore}
            </span>
          </div>
        )}
        {result && (
          <span className={`text-[0.6875rem] font-heading font-bold uppercase tracking-[var(--tracking-label)] ${resultColor[result]}`}>
            {t(resultLabelKey[result])}
          </span>
        )}
      </div>

      {/* Away team */}
      <div className="flex items-center justify-start gap-2 sm:gap-3 min-w-0">
        <Image
          src={match.awayTeam.logo}
          alt={match.awayTeam.name}
          width={36}
          height={36}
          className="size-8 sm:size-9 shrink-0 object-contain"
        />
        <span className="font-heading font-bold text-text-primary text-sm sm:text-base truncate">
          <span className="lg:hidden">{match.awayTeam.shortName}</span>
          <span className="hidden lg:inline">{match.awayTeam.name}</span>
        </span>
      </div>

      {/* Venue — desktop only */}
      <span className="hidden lg:block text-xs text-text-secondary truncate">
        {match.venue}
      </span>

      {/* Status */}
      <div className="flex justify-end shrink-0">
        <MatchBadge status={match.status} />
      </div>
    </div>
  );

  if (!href) {
    return <div className="group">{content}</div>;
  }

  return (
    <Link href={href} className="group block">
      {content}
    </Link>
  );
}
