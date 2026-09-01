import type { MatchDetail } from '@/shared/types/match';
import detailsJson from '@/mocks/match-details.json';

/**
 * Detail data only exists for a handful of matches. Everything downstream
 * treats `undefined` as "no data yet" and renders an empty state.
 */
export function getMatchDetail(matchId: string): MatchDetail | undefined {
  return (detailsJson as MatchDetail[]).find((d) => d.matchId === matchId);
}
