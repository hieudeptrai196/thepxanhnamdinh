import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/shared/components/ui/Container';
import { MatchesList, getMatchesData } from '@/modules/matches';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'matches' });
  return {
    title: t('title'),
  };
}

export default async function MatchesPage() {
  const t = await getTranslations('matches');
  const matches = getMatchesData();

  return (
    <section className="py-8 lg:py-12">
      <Container>
        <div className="mb-8">
          <h1 className="font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)]">
            {t('title')}
          </h1>
        </div>

        <MatchesList matches={matches} />
      </Container>
    </section>
  );
}
