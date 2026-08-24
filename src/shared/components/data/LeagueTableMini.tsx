'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { StandingEntry } from '@/shared/types/common';
import { cn } from '@/lib/cn';

type Props = {
  standings: StandingEntry[];
  highlightTeamId?: string;
  className?: string;
};

export function LeagueTableMini({
  standings,
  highlightTeamId = 'txnd',
  className,
}: Props) {
  const t = useTranslations('standings');

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border-color)]">
            <th className="py-2 pr-2 text-left font-mono text-xs text-text-secondary w-8">
              {t('pos')}
            </th>
            <th className="py-2 pr-4 text-left font-heading font-semibold text-xs text-text-secondary uppercase tracking-[var(--tracking-label)]">
              {t('team')}
            </th>
            <th className="py-2 px-2 text-center font-mono text-xs text-text-secondary hidden sm:table-cell">
              {t('p')}
            </th>
            <th className="py-2 px-2 text-center font-mono text-xs text-text-secondary hidden sm:table-cell">
              {t('w')}
            </th>
            <th className="py-2 px-2 text-center font-mono text-xs text-text-secondary hidden sm:table-cell">
              {t('d')}
            </th>
            <th className="py-2 px-2 text-center font-mono text-xs text-text-secondary hidden sm:table-cell">
              {t('l')}
            </th>
            <th className="py-2 px-2 text-center font-mono text-xs text-text-secondary">
              {t('gd')}
            </th>
            <th className="py-2 pl-2 text-right font-mono text-xs font-bold text-text-primary">
              {t('pts')}
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map((entry) => {
            const isHighlighted = entry.team.id === highlightTeamId;
            return (
              <tr
                key={entry.team.id}
                className={cn(
                  'border-b border-[var(--border-color)] last:border-0',
                  isHighlighted && 'bg-[var(--color-club-blue-8)]'
                )}
              >
                <td className="py-2.5 pr-2">
                  <span className="font-display text-lg text-text-primary">
                    {entry.position}
                  </span>
                </td>
                <td className="py-2.5 pr-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={entry.team.logo}
                      alt={entry.team.name}
                      width={24}
                      height={24}
                      className="size-6 shrink-0"
                    />
                    <span
                      className={cn(
                        'font-heading font-semibold text-sm truncate',
                        isHighlighted
                          ? 'text-club-blue'
                          : 'text-text-primary'
                      )}
                    >
                      {entry.team.shortName}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-2 text-center font-mono text-xs text-text-secondary hidden sm:table-cell">
                  {entry.played}
                </td>
                <td className="py-2.5 px-2 text-center font-mono text-xs text-text-secondary hidden sm:table-cell">
                  {entry.won}
                </td>
                <td className="py-2.5 px-2 text-center font-mono text-xs text-text-secondary hidden sm:table-cell">
                  {entry.drawn}
                </td>
                <td className="py-2.5 px-2 text-center font-mono text-xs text-text-secondary hidden sm:table-cell">
                  {entry.lost}
                </td>
                <td className="py-2.5 px-2 text-center font-mono text-xs text-text-secondary">
                  {entry.goalDifference > 0
                    ? `+${entry.goalDifference}`
                    : entry.goalDifference}
                </td>
                <td className="py-2.5 pl-2 text-right font-mono text-sm font-bold text-text-primary">
                  {entry.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
