import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/shared/components/ui/Container';
import { getMatchById, getMatchesData } from '@/modules/matches';
import { MatchDetailView, getMatchDetail } from '@/modules/match-detail';

type Props = {
  params: Promise<{ locale: string; matchId: string }>;
};

export async function generateStaticParams() {
  return getMatchesData().map((m) => ({ matchId: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, matchId } = await params;
  const match = getMatchById(matchId);
  const t = await getTranslations({ locale, namespace: 'matches' });

  if (!match) {
    return { title: t('matchNotFound') };
  }

  const score =
    match.status === 'upcoming'
      ? match.time
      : `${match.homeScore} - ${match.awayScore}`;

  return {
    title: `${match.homeTeam.shortName} ${score} ${match.awayTeam.shortName}`,
  };
}

export default async function MatchDetailPage({ params }: Props) {
  const { matchId } = await params;
  const match = getMatchById(matchId);

  if (!match) {
    notFound();
  }

  const detail = getMatchDetail(matchId);

  return (
    <section className="py-8 lg:py-12">
      <Container>
        <MatchDetailView match={match} detail={detail} />
      </Container>
    </section>
  );
}
