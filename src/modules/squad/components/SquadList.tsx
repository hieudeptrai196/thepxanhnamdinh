'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Player, PlayerPosition } from '@/shared/types/player';
import { ContentLoader } from '@/shared/components/ui/ContentLoader';
import { PlayerCard } from './PlayerCard';
import { PositionFilter, type PositionFilterValue } from './PositionFilter';

type Props = {
  players: Player[];
  locale: string;
};

const positionOrder: PlayerPosition[] = ['goalkeeper', 'defender', 'midfielder', 'forward'];

export function SquadList({ players, locale }: Props) {
  const t = useTranslations('squad');
  const [position, setPosition] = useState<PositionFilterValue>('all');

  const counts = useMemo(() => {
    const c: Record<PositionFilterValue, number> = {
      all: players.length,
      goalkeeper: 0,
      defender: 0,
      midfielder: 0,
      forward: 0,
    };
    for (const p of players) c[p.position]++;
    return c;
  }, [players]);

  const filtered = useMemo(
    () => position === 'all' ? players : players.filter((p) => p.position === position),
    [players, position],
  );

  const grouped = useMemo(() => {
    if (position !== 'all') return null;
    const map = new Map<PlayerPosition, Player[]>();
    for (const pos of positionOrder) {
      const group = players.filter((p) => p.position === pos);
      if (group.length > 0) map.set(pos, group);
    }
    return map;
  }, [players, position]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-text-secondary font-mono">
          {t('subtitle')}
        </p>
        <span className="text-sm text-text-secondary font-mono">
          {filtered.length} {t('players')}
        </span>
      </div>

      <PositionFilter active={position} onChange={setPosition} counts={counts} />

      <ContentLoader count={8} skeleton="card" className="flex flex-col">
        {grouped ? (
          Array.from(grouped.entries()).map(([pos, group], groupIdx) => (
            <div
              key={pos}
              className={`py-6 first:pt-0 ${groupIdx % 2 === 1 ? 'bg-bg-primary -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-[var(--radius-default)]' : ''}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-display text-lg sm:text-xl tracking-[var(--tracking-display)] uppercase text-text-primary">
                  {t(pos)}
                </h2>
                <div className="flex-1 h-px bg-[var(--border-color)]" />
                <span className="text-sm text-text-secondary font-mono">{group.length}</span>
              </div>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {group.map((player) => (
                  <Link key={player.id} href={`/${locale}/squad/${player.id}`} className="block">
                    <PlayerCard player={player} />
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <p className="text-center text-text-secondary py-12">
            {t('noPlayers')}
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((player) => (
              <Link key={player.id} href={`/${locale}/squad/${player.id}`} className="block">
                <PlayerCard player={player} />
              </Link>
            ))}
          </div>
        )}
      </ContentLoader>
    </div>
  );
}
