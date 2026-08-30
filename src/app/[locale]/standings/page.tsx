import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/shared/components/ui/Container';
import { StandingsView, getStandingsData } from '@/modules/standings';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'standings' });
  return {
    title: t('title'),
  };
}

export default async function StandingsPage() {
  const t = await getTranslations('standings');
  const data = getStandingsData();

  return (
    <section className="py-8 lg:py-12">
      <Container>
        <div className="mb-8">
          <h1 className="font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)]">
            {t('title')}
          </h1>
        </div>

        <StandingsView data={data} />
      </Container>
    </section>
  );
}
