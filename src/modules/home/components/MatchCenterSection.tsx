'use client';

import { useTranslations } from 'next-intl';
import type { Match } from '@/shared/types/match';
import { Container } from '@/shared/components/ui/Container';
import { SectionHeader } from '@/shared/components/ui/SectionHeader';
import { MatchScoreCard } from '@/shared/components/match/MatchScoreCard';
import { useScrollReveal } from '@/shared/hooks/useScrollReveal';

type Props = {
  nextMatch: Match;
  latestResult: Match;
};

export function MatchCenterSection({ nextMatch, latestResult }: Props) {
  const t = useTranslations('matchCenter');
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-dark-navy py-[var(--section-gap)] scroll-reveal">
      <Container>
        <SectionHeader
          title={t('title')}
          className="[&_h2]:text-white [&_p]:text-white/50"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 rounded-[var(--radius-default)] overflow-hidden mt-2">
          <div className="bg-dark-navy p-6 lg:p-8" data-reveal>
            <MatchScoreCard
              match={nextMatch}
              label={t('nextMatch')}
            />
          </div>
          <div className="bg-charcoal p-6 lg:p-8" data-reveal>
            <MatchScoreCard
              match={latestResult}
              label={t('latestResult')}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
