import type { HistoryData } from '@/shared/types/history';
import historyJson from '@/mocks/history.json';

export function getHistoryData(): HistoryData {
  return historyJson as HistoryData;
}
