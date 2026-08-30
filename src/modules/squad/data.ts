import type { Player } from '@/shared/types/player';
import squadJson from '@/mocks/squad.json';

export function getSquadData(): Player[] {
  return squadJson as Player[];
}
