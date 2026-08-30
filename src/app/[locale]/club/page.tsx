import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/shared/components/ui/Container';
import {
  ClubHero,
  ClubAbout,
  ClubStats,
  ClubTimeline,
  ClubTrophies,
  ClubStadium,
  ClubFans,
} from '@/modules/club';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'club' });
  return {
    title: t('title'),
  };
}

export default async function ClubPage() {
  return (
    <>
      <ClubHero />
      <Container>
        <ClubAbout />
        <ClubStats />
        <ClubTrophies />
        <ClubTimeline />
        <ClubStadium />
        <ClubFans />
      </Container>
    </>
  );
}
