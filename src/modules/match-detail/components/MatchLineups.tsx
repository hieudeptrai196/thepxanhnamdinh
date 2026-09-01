'use client';

import { useTranslations } from 'next-intl';
import type { Match, TeamLineup } from '@/shared/types/match';

type Props = {
  lineups: { home: TeamLineup; away: TeamLineup };
  match: Match;
};

function PlayerRow({ number, name, role }: { number: number; name: string; role?: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
      <span className="font-display text-lg text-club-blue w-7 shrink-0 tracking-wider">
        {number}
      </span>
      <div className="min-w-0">
        <p className="font-heading font-bold text-sm text-text-primary truncate">{name}</p>
        {role && <p className="text-xs text-text-secondary">{role}</p>}
      </div>
    </div>
  );
}

function TeamColumn({ lineup, teamName }: { lineup: TeamLineup; teamName: string }) {
  const t = useTranslations('matches');

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h3 className="font-heading font-bold text-base sm:text-lg text-text-primary truncate">
          {teamName}
        </h3>
        <span className="font-mono text-xs text-text-secondary shrink-0">
          {t('formation')} {lineup.formation}
        </span>
      </div>

      <h4 className="text-xs font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-text-secondary mb-2">
        {t('startingXI')}
      </h4>
      <div className="flex flex-col divide-y divide-[var(--border-color)] mb-6">
        {lineup.starting.map((p) => (
          <PlayerRow key={`${p.number}-${p.name}`} {...p} />
        ))}
      </div>

      {lineup.substitutes.length > 0 && (
        <>
          <h4 className="text-xs font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-text-secondary mb-2">
            {t('substitutes')}
          </h4>
          <div className="flex flex-col divide-y divide-[var(--border-color)]">
            {lineup.substitutes.map((p) => (
              <PlayerRow key={`${p.number}-${p.name}`} {...p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function MatchLineups({ lineups, match }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-10">
      <TeamColumn lineup={lineups.home} teamName={match.homeTeam.name} />
      <TeamColumn lineup={lineups.away} teamName={match.awayTeam.name} />
    </div>
  );
}
