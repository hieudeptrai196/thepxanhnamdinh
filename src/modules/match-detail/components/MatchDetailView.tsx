'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Match, MatchDetail } from '@/shared/types/match';
import { Tabs, TabPanel, ShareButtons } from '@/shared/components/ui';
import { MatchScoreboard } from './MatchScoreboard';
import { MatchLineups } from './MatchLineups';
import { MatchStats } from './MatchStats';
import { MatchBroadcast } from './MatchBroadcast';
import { MatchSidebar } from './MatchSidebar';

type Props = {
  match: Match;
  detail?: MatchDetail;
};

function EmptyState({ message }: { message: string }) {
  return (
    <p className="text-sm text-text-secondary text-center py-12">{message}</p>
  );
}

export function MatchDetailView({ match, detail }: Props) {
  const t = useTranslations('matches');
  const [tab, setTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: t('tabOverview') },
    { key: 'lineups', label: t('tabLineups') },
    { key: 'stats', label: t('tabStats') },
    { key: 'broadcast', label: t('tabBroadcast') },
  ];

  const title = `${match.homeTeam.name} ${match.homeScore ?? ''} - ${match.awayScore ?? ''} ${match.awayTeam.name}`;

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <MatchScoreboard match={match} />

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">
        {/* Tabbed content */}
        <div>
          <Tabs items={tabs} active={tab} onChange={setTab} className="mb-6" />

          <TabPanel active={tab === 'overview'}>
            {detail?.recap ? (
              <article className="max-w-[820px]">
                <h2 className="font-display text-2xl sm:text-3xl tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-5">
                  {detail.recap.title}
                </h2>

                {detail.recap.image && (
                  <div className="relative w-full aspect-[16/9] rounded-[var(--radius-default)] overflow-hidden mb-6 bg-light-gray">
                    <Image
                      src={detail.recap.image}
                      alt={detail.recap.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {detail.recap.body.map((paragraph, i) => (
                    <p key={i} className="text-base text-text-primary leading-[1.65]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ) : (
              <EmptyState message={t('noOverview')} />
            )}
          </TabPanel>

          <TabPanel active={tab === 'lineups'}>
            {detail?.lineups ? (
              <MatchLineups lineups={detail.lineups} match={match} />
            ) : (
              <EmptyState message={t('noLineups')} />
            )}
          </TabPanel>

          <TabPanel active={tab === 'stats'}>
            {detail?.stats && detail.stats.length > 0 ? (
              <MatchStats stats={detail.stats} />
            ) : (
              <EmptyState message={t('noStats')} />
            )}
          </TabPanel>

          <TabPanel active={tab === 'broadcast'}>
            {detail?.broadcast ? (
              <MatchBroadcast broadcast={detail.broadcast} />
            ) : (
              <EmptyState message={t('noBroadcast')} />
            )}
          </TabPanel>

          <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
            <ShareButtons url={`/matches/${match.id}`} title={title} />
          </div>
        </div>

        <MatchSidebar match={match} detail={detail} />
      </div>

      <Link
        href="/matches"
        className="inline-flex items-center gap-2 text-sm text-club-blue hover:text-club-blue-hover font-heading font-bold transition-colors"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t('backToMatches')}
      </Link>
    </div>
  );
}
