import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/shared/components/ui/Container';
import {
  HistoryHero,
  ChampionshipYears,
  HistoryTimeline,
  HonoursList,
  getHistoryData,
} from '@/modules/history';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'history' });
  return { title: t('title') };
}

export default async function HistoryPage() {
  const { championships, milestones, honours } = getHistoryData();

  return (
    <>
      <HistoryHero />
      <Container>
        <ChampionshipYears championships={championships} />
        <HistoryTimeline milestones={milestones} />
        <HonoursList honours={honours} />
      </Container>
    </>
  );
}
