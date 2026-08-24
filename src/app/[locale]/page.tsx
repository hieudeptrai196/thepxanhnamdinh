import {
  HeroSection,
  MatchCenterSection,
  StandingsSection,
  NewsSection,
  getHomeData,
} from '@/modules/home';

export default function HomePage() {
  const { nextMatch, latestResult, standings, news } = getHomeData();

  return (
    <>
      <HeroSection />
      <MatchCenterSection nextMatch={nextMatch} latestResult={latestResult} />
      <StandingsSection standings={standings} />
      <NewsSection articles={news} />
    </>
  );
}
