import type { Player } from '@/shared/types/player';
import squadJson from '@/mocks/squad.json';

export function getSquadData(): Player[] {
  return squadJson as Player[];
}

export function getPlayerById(id: string): Player | undefined {
  return (squadJson as Player[]).find((p) => p.id === id);
}
