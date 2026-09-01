import type { Match } from '@/shared/types/match';
import type { StandingEntry } from '@/shared/types/common';
import type { NewsArticle } from '@/shared/types/news';
import homeData from '@/mocks/home.json';
import newsJson from '@/mocks/news.json';

export type HomeData = {
  nextMatch: Match;
  latestResult: Match;
  standings: StandingEntry[];
  news: NewsArticle[];
};

/**
 * News comes from the shared article store rather than home.json, so the cards
 * on the homepage always link to articles that actually exist.
 */
export function getHomeData(): HomeData {
  const { nextMatch, latestResult, standings } = homeData as HomeData;

  const news = [...(newsJson as NewsArticle[])]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 4);

  return { nextMatch, latestResult, standings, news };
}
