import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/shared/components/ui/Container';
import {
  StadiumHero,
  StadiumStats,
  StadiumStory,
  StadiumMap,
  StadiumGallery,
  getStadiumData,
} from '@/modules/stadium';
import { getHistoryData } from '@/modules/history';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'stadium' });
  return { title: t('title') };
}

export default async function StadiumPage() {
  const stadium = getStadiumData();
  const titles = getHistoryData().championships.length;

  return (
    <>
      <StadiumHero ticketUrl={stadium.ticketUrl} />
      <Container>
        <StadiumStats capacity={stadium.capacity} opened={stadium.opened} titles={titles} />
        <StadiumStory stadium={stadium} />
        <StadiumMap stands={stadium.stands} map={stadium.map} />
        <StadiumGallery photos={stadium.gallery} />
      </Container>
    </>
  );
}
