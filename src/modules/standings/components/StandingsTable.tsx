'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { StandingEntry } from '@/shared/types/common';

type Props = {
  entries: StandingEntry[];
};

const columns = [
  'played', 'won', 'drawn', 'lost', 'goalsFor', 'goalsAgainst', 'goalDifference', 'points',
] as const;

export function StandingsTable({ entries }: Props) {
  const t = useTranslations('standings');

  return (
    <div className="overflow-x-auto rounded-[var(--radius-default)] border border-[var(--border-color)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-primary border-b border-[var(--border-color)]">
            <th className="px-3 py-3 text-left font-heading font-semibold text-text-secondary text-xs uppercase tracking-wider w-10">
              {t('pos')}
            </th>
            <th className="px-3 py-3 text-left font-heading font-semibold text-text-secondary text-xs uppercase tracking-wider">
              {t('team')}
            </th>
            {columns.map((col) => (
              <th
                key={col}
                className="px-2 py-3 text-center font-heading font-semibold text-text-secondary text-xs uppercase tracking-wider hidden sm:table-cell"
                title={t(`${col}Full`)}
              >
                {t(col)}
              </th>
            ))}
            <th className="px-3 py-3 text-center font-heading font-bold text-text-primary text-xs uppercase tracking-wider sm:hidden">
              {t('played')}
            </th>
            <th className="px-3 py-3 text-center font-heading font-bold text-text-primary text-xs uppercase tracking-wider sm:hidden">
              {t('goalDifference')}
            </th>
            <th className="px-3 py-3 text-center font-heading font-bold text-text-primary text-xs uppercase tracking-wider">
              {t('points')}
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const isTxnd = entry.team.id === 'txnd';
            return (
              <tr
                key={entry.team.id}
                className={`border-b border-[var(--border-color)] last:border-b-0 transition-colors ${
                  isTxnd
                    ? 'bg-club-blue-8 font-bold'
                    : 'bg-bg-secondary hover:bg-bg-primary'
                }`}
              >
                {/* Position */}
                <td className="px-3 py-3">
                  <span className={`inline-flex items-center justify-center size-7 rounded-full text-xs font-heading font-bold ${
                    entry.position <= 3
                      ? 'bg-club-blue text-white'
                      : entry.position >= entries.length - 1
                        ? 'bg-live-red/15 text-live-red'
                        : 'text-text-secondary'
                  }`}>
                    {entry.position}
                  </span>
                </td>

                {/* Team */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={entry.team.logo}
                      alt={entry.team.name}
                      width={28}
                      height={28}
                      className="size-6 sm:size-7 shrink-0"
                    />
                    <span className={`font-heading truncate ${isTxnd ? 'text-club-blue font-bold' : 'text-text-primary'}`}>
                      <span className="hidden sm:inline">{entry.team.name}</span>
                      <span className="sm:hidden">{entry.team.shortName}</span>
                    </span>
                  </div>
                </td>

                {/* Stats - desktop */}
                {columns.map((col) => (
                  <td
                    key={col}
                    className={`px-2 py-3 text-center font-mono text-sm hidden sm:table-cell ${
                      col === 'points' ? 'font-bold text-text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {entry[col]}
                  </td>
                ))}

                {/* Stats - mobile (only played, GD, points) */}
                <td className="px-3 py-3 text-center font-mono text-sm text-text-secondary sm:hidden">
                  {entry.played}
                </td>
                <td className="px-3 py-3 text-center font-mono text-sm text-text-secondary sm:hidden">
                  {entry.goalDifference > 0 ? `+${entry.goalDifference}` : entry.goalDifference}
                </td>
                <td className="px-3 py-3 text-center font-mono text-sm font-bold text-text-primary sm:hidden">
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
