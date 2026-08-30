'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Player } from '@/shared/types/player';

type Props = {
  player: Player;
};

const positionColor: Record<string, string> = {
  goalkeeper: 'bg-amber-500',
  defender: 'bg-emerald-500',
  midfielder: 'bg-club-blue',
  forward: 'bg-live-red',
};

function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function PlayerCard({ player }: Props) {
  const t = useTranslations('squad');

  return (
    <div className="group bg-bg-secondary rounded-[var(--radius-default)] border border-[var(--border-color)] overflow-hidden transition-shadow duration-150 hover:shadow-card">
      {/* Player image */}
      <div className="relative aspect-[3/4] bg-bg-primary overflow-hidden">
        <Image
          src={player.image}
          alt={player.name}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />

        {/* Number overlay */}
        <div className="absolute top-3 left-3 flex items-center justify-center size-10 rounded-full bg-dark-navy/80 backdrop-blur-sm">
          <span className="font-display text-lg text-white tracking-[var(--tracking-display)]">
            {player.number}
          </span>
        </div>

        {/* Position badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-[var(--radius-badge)] ${positionColor[player.position]}`}>
          <span className="text-[0.65rem] font-heading font-bold uppercase tracking-wider text-white">
            {t(player.position)}
          </span>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark-navy/80 to-transparent" />

        {/* Flag + nationality on hover */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="text-base">{player.nationalityFlag}</span>
          <span className="text-xs text-white/90 font-mono">{player.nationality}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <h3 className="font-heading font-bold text-text-primary text-sm sm:text-base leading-tight truncate">
          {player.name}
        </h3>

        <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary font-mono">
          {player.dateOfBirth && (
            <span>{calculateAge(player.dateOfBirth)} {t('age')}</span>
          )}
          {player.height && <span>{player.height} cm</span>}
          {player.weight && <span>{player.weight} kg</span>}
        </div>
      </div>
    </div>
  );
}
