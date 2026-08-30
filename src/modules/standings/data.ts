import type { StandingEntry } from '@/shared/types/common';
import standingsJson from '@/mocks/standings.json';

export function getStandingsData(): Record<string, StandingEntry[]> {
  return standingsJson as Record<string, StandingEntry[]>;
}
