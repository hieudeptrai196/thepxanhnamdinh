import type { Match } from '@/shared/types/match';
import matchesData from '@/mocks/matches.json';

export function getMatchesData(): Match[] {
  return matchesData as Match[];
}

export function getMatchById(id: string): Match | undefined {
  return (matchesData as Match[]).find((m) => m.id === id);
}
