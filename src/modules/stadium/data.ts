import type { StadiumData } from '@/shared/types/stadium';
import stadiumJson from '@/mocks/stadium.json';

export function getStadiumData(): StadiumData {
  return stadiumJson as StadiumData;
}
