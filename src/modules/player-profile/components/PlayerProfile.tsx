'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Player } from '@/shared/types/player';
import { PlayerStats } from './PlayerStats';
import { PlayerForm } from './PlayerForm';
import { PlayerInfo } from './PlayerInfo';

type Props = {
  player: Player;
  locale: string;
};

const positionColor: Record<string, string> = {
  goalkeeper: 'bg-amber-500',
  defender: 'bg-emerald-500',
  midfielder: 'bg-club-blue',
  forward: 'bg-live-red',
};

export function PlayerProfile({ player, locale }: Props) {
  const t = useTranslations('squad');

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href={`/${locale}`} className="hover:text-club-blue transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${locale}/squad`} className="hover:text-club-blue transition-colors">
          {t('title')}
        </Link>
        <span>/</span>
        <span className="text-text-primary font-heading font-bold truncate">{player.name}</span>
      </nav>

      {/* Hero section */}
      <div className="relative bg-bg-inverse rounded-[var(--radius-max)] overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_1.2fr] items-end">
          {/* Player image side */}
          <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[480px]">
            <Image
              src={player.image}
              alt={player.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Oversized jersey number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-display text-[length:var(--text-number-display)] text-white/15 select-none">
                {player.number}
              </span>
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy via-dark-navy/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-dark-navy" />
          </div>

          {/* Info side */}
          <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col justify-end -mt-20 lg:mt-0">
            <div className={`inline-flex self-start px-3 py-1 rounded-[var(--radius-badge)] ${positionColor[player.position]} mb-3`}>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-white">
                {t(player.position)}
              </span>
            </div>

            <div className="flex items-end gap-4 mb-2">
              <span className="font-display text-5xl sm:text-6xl lg:text-7xl text-white/30 leading-none">
                {player.number}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white tracking-[var(--tracking-display)] uppercase leading-[var(--leading-tight)]">
                {player.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl">{player.nationalityFlag}</span>
              <span className="text-sm text-white/70 font-mono">{player.nationality}</span>
            </div>

            {player.bio && (
              <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-lg">
                {player.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
        <div className="flex flex-col gap-6 lg:gap-8">
          {player.stats && <PlayerStats stats={player.stats} position={player.position} />}
          {player.recentForm && player.recentForm.length > 0 && (
            <PlayerForm form={player.recentForm} />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <PlayerInfo player={player} />
        </div>
      </div>

      {/* Back link */}
      <Link
        href={`/${locale}/squad`}
        className="inline-flex items-center gap-2 text-sm text-club-blue hover:text-club-blue-hover font-heading font-bold transition-colors"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t('backToSquad')}
      </Link>
    </div>
  );
}
