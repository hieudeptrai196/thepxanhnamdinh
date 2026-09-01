'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Match } from '@/shared/types/match';
import { MatchBadge } from '@/shared/components/match/MatchBadge';

type Props = {
  match: Match;
};

export function MatchScoreboard({ match }: Props) {
  const t = useTranslations('matches');
  const played = match.status !== 'upcoming';

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-max)] bg-dark-navy">
      {/* Stadium backdrop */}
      <div className="absolute inset-0">
        <Image
          src="/images/stadium/sanvandong.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-navy/70 via-dark-navy/85 to-dark-navy" />
      </div>

      <div className="relative px-4 py-8 sm:px-8 sm:py-10 lg:py-12">
        {/* Competition line */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-[var(--tracking-label)] text-white/70">
            {match.competition}
          </span>
          {match.round && (
            <>
              <span className="text-white/30">·</span>
              <span className="font-mono text-xs sm:text-sm text-white/70">{match.round}</span>
            </>
          )}
          <MatchBadge status={match.status} />
        </div>

        {/* Teams + score */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
          {/* Home */}
          <div className="flex flex-col items-center gap-3 min-w-0">
            <Image
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              width={96}
              height={96}
              className="size-14 sm:size-20 lg:size-24 object-contain"
            />
            <span className="font-heading font-bold text-sm sm:text-lg lg:text-xl text-white text-center leading-tight">
              {match.homeTeam.name}
            </span>
          </div>

          {/* Score / kick-off */}
          <div className="flex flex-col items-center shrink-0 px-2">
            {played ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-[var(--tracking-display)] leading-none">
                  {match.homeScore}
                </span>
                <span className="font-display text-3xl sm:text-4xl text-white/40 leading-none">-</span>
                <span className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-[var(--tracking-display)] leading-none">
                  {match.awayScore}
                </span>
              </div>
            ) : (
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-[var(--tracking-display)] leading-none">
                {match.time}
              </span>
            )}
          </div>

          {/* Away */}
          <div className="flex flex-col items-center gap-3 min-w-0">
            <Image
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              width={96}
              height={96}
              className="size-14 sm:size-20 lg:size-24 object-contain"
            />
            <span className="font-heading font-bold text-sm sm:text-lg lg:text-xl text-white text-center leading-tight">
              {match.awayTeam.name}
            </span>
          </div>
        </div>

        {/* Date + venue */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-6 sm:mt-8 pt-5 border-t border-white/10">
          <span className="font-mono text-xs sm:text-sm text-white/70">
            {match.date} · {match.time}
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="text-xs sm:text-sm text-white/70">{match.venue}</span>
          {!played && (
            <span className="font-mono text-xs text-white/40 w-full text-center sm:w-auto">
              {t('kickoff')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
