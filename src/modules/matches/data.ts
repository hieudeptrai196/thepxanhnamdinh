import type { Match } from '@/shared/types/match';
import matchesData from '@/mocks/matches.json';

export function getMatchesData(): Match[] {
  return matchesData as Match[];
}
