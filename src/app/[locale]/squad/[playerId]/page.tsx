import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/shared/components/ui/Container';
import { getPlayerById, getSquadData } from '@/modules/squad';
import { PlayerProfile } from '@/modules/player-profile';

type Props = {
  params: Promise<{ locale: string; playerId: string }>;
};

export async function generateStaticParams() {
  const players = getSquadData();
  return players.map((p) => ({ playerId: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, playerId } = await params;
  const player = getPlayerById(playerId);
  const t = await getTranslations({ locale, namespace: 'squad' });

  if (!player) {
    return { title: t('playerNotFound') };
  }

  return {
    title: `${player.name} — #${player.number}`,
  };
}

export default async function PlayerPage({ params }: Props) {
  const { locale, playerId } = await params;
  const player = getPlayerById(playerId);

  if (!player) {
    notFound();
  }

  return (
    <section className="py-8 lg:py-12">
      <Container>
        <PlayerProfile player={player} locale={locale} />
      </Container>
    </section>
  );
}
