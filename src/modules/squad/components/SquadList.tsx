'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { Player } from '@/shared/types/player';
import { ContentLoader } from '@/shared/components/ui/ContentLoader';
import { PlayerCard } from './PlayerCard';
import { PositionFilter, type PositionFilterValue } from './PositionFilter';

type Props = {
  players: Player[];
};

export function SquadList({ players }: Props) {
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

      <ContentLoader count={8} skeleton="card" className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-text-secondary py-12">
            {t('noPlayers')}
          </p>
        ) : (
          filtered.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))
        )}
      </ContentLoader>
    </div>
  );
}
