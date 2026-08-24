import type { Match } from '@/shared/types/match';
import type { StandingEntry } from '@/shared/types/common';
import type { NewsArticle } from '@/shared/types/news';
import homeData from '@/mocks/home.json';

export type HomeData = {
  nextMatch: Match;
  latestResult: Match;
  standings: StandingEntry[];
  news: NewsArticle[];
};

export function getHomeData(): HomeData {
  return homeData as HomeData;
}
