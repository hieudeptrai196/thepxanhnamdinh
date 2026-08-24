'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { StandingEntry } from '@/shared/types/common';
import { Container } from '@/shared/components/ui/Container';
import { SectionHeader } from '@/shared/components/ui/SectionHeader';
import { LeagueTableMini } from '@/shared/components/data/LeagueTableMini';
import { useScrollReveal } from '@/shared/hooks/useScrollReveal';

type Props = {
  standings: StandingEntry[];
};

export function StandingsSection({ standings }: Props) {
  const t = useTranslations('standings');
  const tCommon = useTranslations('common');
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-[var(--section-gap)] bg-bg-primary scroll-reveal">
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          action={
            <Link
              href="/standings"
              className="text-sm font-heading font-semibold text-club-blue hover:text-club-blue-hover transition-colors duration-150 uppercase tracking-[var(--tracking-label)]"
            >
              {tCommon('viewAll')}
            </Link>
          }
        />
        <div data-reveal>
          <LeagueTableMini standings={standings} />
        </div>
      </Container>
    </section>
  );
}
